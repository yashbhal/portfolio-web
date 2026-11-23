// components/StoryCard.tsx
"use client";

/* Animated hero card: a self-advancing story carousel. Each slide is its own animated SVG scene; the progress bars drive
   rotation and support tap / swipe / keyboard navigation. */

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { PointerEvent, ReactNode } from "react";

const SLIDE_MS = 3200;

type StoryScene = { caption: string; render: () => ReactNode };

/* Honors prefers-reduced-motion; false on the server. */
const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    (onChange) => {
      const q = window.matchMedia("(prefers-reduced-motion: reduce)");
      q.addEventListener("change", onChange);
      return () => q.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

/* ============================ Shared SVG helpers ============================ */

/* Stroke draw-in animation for paths/lines (pathLength normalized to 1) */
const drawProps = (delay = 0, cls = "", dur = 0.9) => ({
  pathLength: 1,
  className: `animate-draw ${cls}`,
  style: { animationDelay: `${delay}s`, animationDuration: `${dur}s` },
});

const Eye = ({ cx, cy, r = 2.8 }: { cx: number; cy: number; r?: number }) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    fill="currentColor"
    stroke="none"
    className="animate-blink"
  />
);

const Caption = ({ children }: { children: ReactNode }) => (
  <p className="text-base-content/60 font-mono text-[11px] tracking-wider">
    {children}
  </p>
);

/* Scene canvas: 240x160 blueprint with a faint dot grid */
const BlueprintShell = ({ children }: { children: ReactNode }) => {
  const gridId = useId();
  return (
    <svg
      viewBox="0 0 240 160"
      className="h-auto w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <defs>
        <pattern
          id={gridId}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="8"
            cy="8"
            r="0.75"
            fill="currentColor"
            stroke="none"
            className="text-base-content/15"
          />
        </pattern>
      </defs>
      <rect
        x="6"
        y="6"
        width="228"
        height="148"
        rx="12"
        fill={`url(#${gridId})`}
        stroke="none"
      />
      {children}
    </svg>
  );
};

/* Positioned critter with a gentle bob (rendered inside a BlueprintShell) */
const Critter = ({
  x,
  y,
  size,
  bobDelay = 0,
  children,
}: {
  x: number;
  y: number;
  size: number;
  bobDelay?: number;
  children: ReactNode;
}) => (
  <svg
    x={x}
    y={y}
    width={size}
    height={size}
    viewBox="0 0 120 120"
    className="animate-bob"
    style={{ animationDelay: `${bobDelay}s` }}
  >
    {children}
  </svg>
);

/* Side-profile full-body chicken (faces right by default; flip faces left) */
const Chicken = ({ flip = false }: { flip?: boolean }) => (
  <g
    transform={flip ? "translate(120 0) scale(-1 1)" : undefined}
    strokeWidth="3.2"
  >
    {/* 3-lobed comb */}
    <path d="M64 25 C64 17 71 17 72 23 C74 16 81 17 81 25" />
    {/* beak */}
    <path d="M88 33 L98 37 L88 41" />
    {/* head + breast + belly + fanned tail in one clean contour */}
    <path d="M64 25 C73 21 86 25 88 35 C88 42 84 46 86 52 C92 62 89 77 77 86 C65 94 44 93 33 82 C24 73 20 58 22 44 C27 49 32 53 36 55 C30 47 30 39 34 35 C39 42 44 50 52 53 C58 53 61 41 64 25 Z" />
    {/* eye */}
    <Eye cx={77} cy={34} r={2.3} />
    {/* folded wing arc */}
    <path d="M46 63 C45 77 65 80 73 67" />
    {/* legs + feet */}
    <line x1="54" y1="91" x2="54" y2="108" />
    <path d="M47 108 H61" />
    <line x1="68" y1="90" x2="68" y2="108" />
    <path d="M61 108 H75" />
  </g>
);

/* Side-profile full-body pig (faces right by default; flip faces left) */
const Pig = ({ flip = false }: { flip?: boolean }) => (
  <g
    transform={flip ? "translate(120 0) scale(-1 1)" : undefined}
    strokeWidth="3.2"
  >
    {/* perky ear */}
    <path d="M74 46 L72 34 L83 43" />
    {/* barrel body + head + upturned snout contour */}
    <path d="M32 48 C46 44 62 44 74 46 C83 42 94 46 97 56 L105 58 C108 59 108 70 104 71 L96 72 C92 82 81 88 68 88 H38 C23 88 18 76 18 65 C18 54 24 50 32 48 Z" />
    {/* snout nostril */}
    <circle cx="102" cy="64" r="1.4" fill="currentColor" stroke="none" />
    {/* eye + smile */}
    <Eye cx={85} cy={56} r={2.3} />
    <path d="M88 69 Q92 72 95 69" />
    {/* curly tail */}
    <path d="M18 62 C9 58 7 69 13 71 C18 72 17 65 12 64" />
    {/* 4 legs */}
    <line x1="31" y1="87" x2="31" y2="108" />
    <line x1="43" y1="88" x2="43" y2="108" />
    <line x1="69" y1="88" x2="69" y2="108" />
    <line x1="81" y1="86" x2="81" y2="108" />
  </g>
);

/* Compact geometric side-profile poultry mark (fits 36x36 viewBox) */
const PoultryGlyph = ({ x, y }: { x: number; y: number }) => (
  <svg x={x} y={y} width="34" height="34" viewBox="0 0 36 36">
    <path d="M19 9 C19 6 22 6 22 8.5 C23 6 25.5 6.5 25 9" strokeWidth="1.8" />
    <path d="M27.5 11.5 L31 13 L27.5 14.5" strokeWidth="1.8" />
    <path
      d="M19 9 C22.5 7.5 27 9 27.5 12.5 C28 15 26.5 16 27 18.5 C29 22 28 27 23.5 29.5 C19 32 12 31.5 9 27.5 C6.5 24 5.5 19 6.5 15 C8.5 17 10.5 18.5 13 18.5 C16.5 18.5 18 14 19 9 Z"
      fill="currentColor"
      className="text-accent/12"
      stroke="none"
    />
    <path
      d="M19 9 C22.5 7.5 27 9 27.5 12.5 C28 15 26.5 16 27 18.5 C29 22 28 27 23.5 29.5 C19 32 12 31.5 9 27.5 C6.5 24 5.5 19 6.5 15 C8.5 17 10.5 18.5 13 18.5 C16.5 18.5 18 14 19 9 Z"
      strokeWidth="1.8"
    />
    <path d="M14 21.5 C14 25.5 20 26.5 22 22.5" strokeWidth="1.6" />
    <circle cx="24" cy="12" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/* Compact geometric side-profile swine mark (fits 36x36 viewBox) */
const SwineGlyph = ({ x, y }: { x: number; y: number }) => (
  <svg x={x} y={y} width="34" height="34" viewBox="0 0 36 36">
    <path
      d="M10 15 C14 13.5 19.5 13.5 23 14.5 C26 13 29 14.5 30 17.5 L32.5 18 C33.5 18.5 33.5 22 32 22.5 L29.5 23 C28 26 24.5 28 20.5 28 H11.5 C7 28 5.5 24 5.5 20.5 C5.5 17 7.5 15.5 10 15 Z"
      fill="currentColor"
      className="text-accent/12"
      stroke="none"
    />
    <path d="M22.5 14.5 L21.5 10 L26 13" strokeWidth="1.8" />
    <path
      d="M10 15 C14 13.5 19.5 13.5 23 14.5 C26 13 29 14.5 30 17.5 L32.5 18 C33.5 18.5 33.5 22 32 22.5 L29.5 23 C28 26 24.5 28 20.5 28 H11.5 C7 28 5.5 24 5.5 20.5 C5.5 17 7.5 15.5 10 15 Z"
      strokeWidth="1.8"
    />
    <path d="M5.5 19.5 C2.8 18.5 2.5 22 4.5 22" strokeWidth="1.6" />
    <line x1="10" y1="28" x2="10" y2="32" strokeWidth="1.8" />
    <line x1="14" y1="28" x2="14" y2="32" strokeWidth="1.8" />
    <line x1="21" y1="28" x2="21" y2="32" strokeWidth="1.8" />
    <line x1="25" y1="27.5" x2="25" y2="32" strokeWidth="1.8" />
    <circle cx="26.5" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/* Stick figure, feet at y=0. Legs scissor while `walking`, briefcase optional. */
const StickFigure = ({
  walking = false,
  briefcase = false,
}: {
  walking?: boolean;
  briefcase?: boolean;
}) => {
  const swing = (from: number, to: number, cx: number, cy: number) =>
    walking ? (
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`${from} ${cx} ${cy}; ${to} ${cx} ${cy}; ${from} ${cx} ${cy}`}
        dur="0.4s"
        repeatCount="4"
      />
    ) : null;
  return (
    <g strokeWidth="2.2">
      <circle cx="0" cy="-41" r="6" />
      <line x1="0" y1="-35" x2="0" y2="-15" />
      <line x1="0" y1="-15" x2="0" y2="0">
        {swing(-22, 22, 0, -15)}
      </line>
      <line x1="0" y1="-15" x2="0" y2="0">
        {swing(22, -22, 0, -15)}
      </line>
      <line x1="0" y1="-30" x2="0" y2="-18">
        {swing(25, -25, 0, -30)}
      </line>
      {briefcase ? (
        <>
          <line x1="0" y1="-30" x2="5" y2="-19" />
          <rect
            x="2"
            y="-19"
            width="11"
            height="8"
            rx="1.5"
            fill="currentColor"
            className="text-accent/20"
          />
          <rect x="2" y="-19" width="11" height="8" rx="1.5" />
        </>
      ) : (
        <line x1="0" y1="-30" x2="0" y2="-18">
          {swing(-25, 25, 0, -30)}
        </line>
      )}
    </g>
  );
};

/* ================================ Scenes ================================== */

/* 1 — Forward deployed: walks out of HQ to the barn, crew checks in */
const ArriveScene = () => (
  <BlueprintShell>
    {/* hq */}
    <text
      x="34"
      y="62"
      textAnchor="middle"
      fontSize="7"
      fill="currentColor"
      stroke="none"
      className="text-base-content/50 font-mono tracking-wider uppercase"
    >
      ancera
    </text>
    <rect
      x="16"
      y="68"
      width="36"
      height="62"
      rx="3"
      fill="currentColor"
      className="text-base-content/4"
    />
    <rect x="16" y="68" width="36" height="62" rx="3" />
    {[78, 92, 106].map((y) =>
      [24, 38].map((x) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="6"
          height="6"
          rx="1"
          fill="currentColor"
          stroke="none"
          className="text-accent/70"
        />
      )),
    )}
    <rect x="29" y="118" width="10" height="12" />

    {/* the crew */}
    <Critter x={138} y={78} size={54}>
      <Chicken flip />
    </Critter>
    <Critter x={180} y={78} size={58} bobDelay={0.9}>
      <Pig flip />
    </Critter>

    {/* commute */}
    <g transform="translate(64 130)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="64 130; 124 130"
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0.4 0 0.4 1"
        dur="1.6s"
        fill="freeze"
      />
      <StickFigure walking briefcase />
    </g>

    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        begin="1.7s"
        dur="0.2s"
        fill="freeze"
      />
      <circle
        cx="124"
        cy="68"
        r="7"
        fill="currentColor"
        stroke="none"
        className="text-success/20"
      />
      <path
        d="M120.5 68 l2.5 2.5 5 -5"
        strokeWidth="2"
        className="text-success"
      />
    </g>

    <line
      x1="10"
      y1="130"
      x2="230"
      y2="130"
      strokeDasharray="2 6"
      className="text-base-content/30"
    />
  </BlueprintShell>
);

/* 2 — Rapid diagnostics: specimens flow into the assay chip, shielded verdict */
const DiagnosticsScene = () => (
  <BlueprintShell>
    {/* Left specimen badges */}
    <rect x="14" y="28" width="42" height="42" rx="8" />
    <PoultryGlyph x={18} y={32} />
    <rect x="14" y="90" width="42" height="42" rx="8" />
    <SwineGlyph x={18} y={94} />

    {/* Microfluidic channels into central assay chip */}
    <path d="M56 49 H74 L84 64" className="text-base-content/35" />
    <path d="M56 111 H74 L84 96" className="text-base-content/35" />
    <circle
      r="2.8"
      opacity="0"
      fill="currentColor"
      stroke="none"
      className="text-accent"
    >
      <animateMotion path="M56 49 H74 L84 64" dur="0.55s" fill="freeze" />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.85;1"
        dur="0.55s"
        fill="freeze"
      />
    </circle>
    <circle
      r="2.8"
      opacity="0"
      fill="currentColor"
      stroke="none"
      className="text-accent"
    >
      <animateMotion
        path="M56 111 H74 L84 96"
        begin="0.12s"
        dur="0.55s"
        fill="freeze"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.85;1"
        begin="0.12s"
        dur="0.55s"
        fill="freeze"
      />
    </circle>

    {/* Central Optical Assay Chip */}
    <rect
      x="84"
      y="24"
      width="82"
      height="112"
      rx="10"
      fill="currentColor"
      className="text-base-content/4"
    />
    <rect x="84" y="24" width="82" height="112" rx="10" />
    <text
      x="125"
      y="39"
      textAnchor="middle"
      fontSize="7"
      fill="currentColor"
      stroke="none"
      className="text-base-content/50 font-mono tracking-wider uppercase"
    >
      ASSAY · SCAN
    </text>

    {/* 3 diagnostic reaction wells */}
    {[56, 80, 104].map((y, i) => (
      <g key={y}>
        <rect
          x="96"
          y={y - 7}
          width="58"
          height="14"
          rx="4"
          strokeWidth="1.5"
          className="text-base-content/25"
        />
        <rect
          x="98"
          y={y - 5}
          width="0"
          height="10"
          rx="3"
          fill="currentColor"
          stroke="none"
          className="text-success/25"
        >
          <animate
            attributeName="width"
            values="0;54"
            begin={`${0.6 + i * 0.22}s`}
            dur="0.35s"
            fill="freeze"
          />
        </rect>
        <path
          d={`M142 ${y} l2.5 2.5 5 -5`}
          strokeWidth="1.9"
          opacity="0"
          className="text-success"
        >
          <animate
            attributeName="opacity"
            values="0;1"
            begin={`${0.85 + i * 0.22}s`}
            dur="0.15s"
            fill="freeze"
          />
        </path>
      </g>
    ))}

    {/* Sweeping laser scan line */}
    <line
      x1="88"
      y1="48"
      x2="162"
      y2="48"
      strokeWidth="2"
      opacity="0"
      className="text-accent"
    >
      <animate
        attributeName="y1"
        values="48;118"
        begin="0.5s"
        dur="0.9s"
        fill="freeze"
      />
      <animate
        attributeName="y2"
        values="48;118"
        begin="0.5s"
        dur="0.9s"
        fill="freeze"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.85;1"
        begin="0.5s"
        dur="0.9s"
        fill="freeze"
      />
    </line>

    {/* Right Food-Safety Shield Output */}
    <line x1="166" y1="80" x2="180" y2="80" className="text-base-content/35" />
    <g transform="translate(203 80)">
      <path
        d="M0 -24 L18 -17 V-2 C18 11 10 20 0 25 C-10 20 -18 11 -18 -2 V-17 Z"
        fill="currentColor"
        className="text-success/15"
        stroke="none"
      />
      <path
        d="M0 -24 L18 -17 V-2 C18 11 10 20 0 25 C-10 20 -18 11 -18 -2 V-17 Z"
        className="text-success"
      />
      <path
        d="M-6 0 l4 4 8 -9"
        strokeWidth="2.4"
        opacity="0"
        className="text-success"
      >
        <animate
          attributeName="opacity"
          values="0;1"
          begin="1.35s"
          dur="0.2s"
          fill="freeze"
        />
      </path>
    </g>
  </BlueprintShell>
);

/* 3 — Product manager: sprint board, cards glide SPEC -> BUILD -> SHIPPED */
const ProductScene = () => (
  <BlueprintShell>
    <rect
      x="16"
      y="18"
      width="208"
      height="124"
      rx="10"
      fill="currentColor"
      className="text-base-content/3"
    />
    <rect x="16" y="18" width="208" height="124" rx="10" />
    <line
      x1="16"
      y1="38"
      x2="224"
      y2="38"
      strokeWidth="1.4"
      className="text-base-content/20"
    />
    <line
      x1="85"
      y1="38"
      x2="85"
      y2="142"
      strokeDasharray="2 5"
      strokeWidth="1.4"
      className="text-base-content/20"
    />
    <line
      x1="155"
      y1="38"
      x2="155"
      y2="142"
      strokeDasharray="2 5"
      strokeWidth="1.4"
      className="text-base-content/20"
    />

    {[
      ["SPEC", 50],
      ["BUILD", 120],
      ["SHIPPED", 190],
    ].map(([label, x]) => (
      <text
        key={label as string}
        x={x as number}
        y="31"
        textAnchor="middle"
        fontSize="7.5"
        fill="currentColor"
        stroke="none"
        className="text-base-content/55 font-mono tracking-wider uppercase"
      >
        {label}
      </text>
    ))}

    {[54, 86, 118].map((y, i) => (
      <g key={y} transform={`translate(50 ${y})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`50 ${y}; 120 ${y}; 190 ${y}`}
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.22 1 0.36 1; 0.22 1 0.36 1"
          begin={`${0.1 + i * 0.2}s`}
          dur="1.15s"
          fill="freeze"
        />
        <rect
          x="-26"
          y="-11"
          width="52"
          height="22"
          rx="5"
          fill="currentColor"
          stroke="none"
          className="text-accent/18"
        />
        <rect x="-26" y="-11" width="52" height="22" rx="5" strokeWidth="1.6" />
        <line x1="-18" y1="-2" x2="4" y2="-2" strokeWidth="2" />
        <line
          x1="-18"
          y1="4"
          x2="-4"
          y2="4"
          strokeWidth="1.6"
          className="text-base-content/45"
        />
        <path
          d="M11 -1 l3 3 6 -6"
          strokeWidth="2.1"
          opacity="0"
          className="text-success"
        >
          <animate
            attributeName="opacity"
            values="0;1"
            begin={`${1.0 + i * 0.2}s`}
            dur="0.15s"
            fill="freeze"
          />
        </path>
      </g>
    ))}
  </BlueprintShell>
);

/* 4 — Software engineer: tosses UI blocks into an empty app window,
      the chart draws in, and the app goes live. */
const APP_BLOCKS = [
  { x: 116, y: 44, w: 102, h: 10, kind: "nav" },
  { x: 116, y: 60, w: 48, h: 26, kind: "stat" },
  { x: 170, y: 60, w: 48, h: 26, kind: "stat" },
  { x: 116, y: 92, w: 102, h: 28, kind: "chart" },
] as const;
const THROW_S = 0.45;
const HAND = { x: 70, y: 92 };

const BuildScene = () => (
  <BlueprintShell>
    {/* builder */}
    <g strokeWidth="2.2">
      <circle cx="58" cy="90" r="6" />
      <line x1="58" y1="96" x2="58" y2="116" />
      <path d="M58 116 L52 132 M58 116 L64 132" />
      <line x1="58" y1="101" x2="50" y2="114" />
      <line x1="58" y1="101" x2="68" y2="110">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 58 101; -80 58 101; 0 58 101"
          begin="0.15s"
          dur={`${THROW_S}s`}
          repeatCount={APP_BLOCKS.length}
        />
      </line>
    </g>

    {/* empty app window with dashed slots */}
    <rect
      x="108"
      y="24"
      width="118"
      height="104"
      rx="8"
      fill="currentColor"
      className="text-base-content/4"
    />
    <rect x="108" y="24" width="118" height="104" rx="8" />
    <line
      x1="108"
      y1="36"
      x2="226"
      y2="36"
      strokeWidth="1.4"
      className="text-base-content/25"
    />
    {["text-error/70", "text-warning/70", "text-success/70"].map((cls, i) => (
      <circle
        key={cls}
        cx={116 + i * 6}
        cy="30"
        r="1.6"
        fill="currentColor"
        stroke="none"
        className={cls}
      />
    ))}
    {APP_BLOCKS.map(({ x, y, w, h }) => (
      <rect
        key={`${x}-${y}`}
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        className="text-base-content/25"
      />
    ))}

    {/* thrown blocks */}
    {APP_BLOCKS.map(({ x, y, w, h, kind }, k) => {
      const cx = x + w / 2,
        cy = y + h / 2;
      const begin = 0.35 + k * THROW_S;
      return (
        <g key={`${x}-${y}`} opacity="0">
          <animate
            attributeName="opacity"
            values="0;1"
            begin={`${begin}s`}
            dur="0.08s"
            fill="freeze"
          />
          <animateMotion
            path={`M${HAND.x} ${HAND.y} Q${(HAND.x + cx) / 2} ${Math.min(cy, HAND.y) - 34} ${cx} ${cy}`}
            calcMode="spline"
            keyTimes="0;1"
            keyPoints="0;1"
            keySplines="0.3 0 0.3 1"
            begin={`${begin}s`}
            dur="0.4s"
            fill="freeze"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0.25;1"
              begin={`${begin}s`}
              dur="0.4s"
              fill="freeze"
            />
            <rect
              x={-w / 2}
              y={-h / 2}
              width={w}
              height={h}
              rx="3"
              strokeWidth="1.6"
              fill="currentColor"
              fillOpacity="0.14"
              className="text-accent"
            />
            {kind === "nav" && (
              <>
                <circle
                  cx={-w / 2 + 7}
                  cy="0"
                  r="2"
                  fill="currentColor"
                  stroke="none"
                  className="text-accent"
                />
                <line
                  x1={w / 2 - 34}
                  y1="0"
                  x2={w / 2 - 24}
                  y2="0"
                  strokeWidth="1.6"
                  className="text-base-content/50"
                />
                <line
                  x1={w / 2 - 18}
                  y1="0"
                  x2={w / 2 - 8}
                  y2="0"
                  strokeWidth="1.6"
                  className="text-base-content/50"
                />
              </>
            )}
            {kind === "stat" && (
              <>
                <line
                  x1={-w / 2 + 6}
                  y1="-5"
                  x2={-w / 2 + 20}
                  y2="-5"
                  strokeWidth="1.4"
                  className="text-base-content/45"
                />
                <line
                  x1={-w / 2 + 6}
                  y1="5"
                  x2={-w / 2 + 28}
                  y2="5"
                  strokeWidth="3"
                  className="text-base-content/80"
                />
              </>
            )}
          </g>
        </g>
      );
    })}

    {/* chart fills in once its block lands, then the app goes live */}
    <path
      d="M122 114 L142 106 L160 110 L180 99 L198 102 L212 96"
      strokeWidth="2"
      {...drawProps(2.15, "text-success", 0.4)}
    />
    <rect
      x="108"
      y="24"
      width="118"
      height="104"
      rx="8"
      opacity="0"
      className="text-success"
    >
      <animate
        attributeName="opacity"
        values="0;0.8"
        begin="2.55s"
        dur="0.2s"
        fill="freeze"
      />
    </rect>
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        begin="2.55s"
        dur="0.2s"
        fill="freeze"
      />
      <rect
        x="194"
        y="26"
        width="28"
        height="8"
        rx="4"
        fill="currentColor"
        stroke="none"
        className="text-success/20"
      />
      <circle
        cx="200"
        cy="30"
        r="1.6"
        fill="currentColor"
        stroke="none"
        className="text-success animate-pulse"
      />
      <text
        x="204"
        y="32.2"
        fontSize="6"
        fill="currentColor"
        stroke="none"
        className="text-success font-mono"
      >
        live
      </text>
    </g>

    <line
      x1="10"
      y1="132"
      x2="230"
      y2="132"
      strokeDasharray="2 6"
      className="text-base-content/30"
    />
  </BlueprintShell>
);

/* 5 — Data wrangler: messy tokens tumble out of the barn into the processor,
      clean rows fill a tidy table. */
const MESSY_TOKENS = ["NaN", "n/a", "??", "12kg?", "#REF", "null"];
const CLEAN_ROWS = [58, 76, 94, 112];

const DataScene = () => (
  <BlueprintShell>
    <PoultryGlyph x={10} y={22} />
    <SwineGlyph x={10} y={104} />
    <path
      d="M46 40 C70 30 82 70 104 80"
      strokeDasharray="2 5"
      strokeWidth="1.4"
      className="text-base-content/20"
    />
    <path
      d="M46 122 C70 132 82 90 104 80"
      strokeDasharray="2 5"
      strokeWidth="1.4"
      className="text-base-content/20"
    />

    {MESSY_TOKENS.map((token, k) => {
      const path =
        k % 2 ? "M46 122 C70 132 82 90 104 80" : "M46 40 C70 30 82 70 104 80";
      const begin = 0.1 + k * 0.18;
      return (
        <g key={token} opacity="0">
          <animateMotion
            path={path}
            begin={`${begin}s`}
            dur="0.75s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.8;1"
            begin={`${begin}s`}
            dur="0.75s"
            fill="freeze"
          />
          <text
            y="2.5"
            textAnchor="middle"
            fontSize="7.5"
            fill="currentColor"
            stroke="none"
            className="text-error font-mono font-semibold"
            transform={`rotate(${k % 2 ? 8 : -8})`}
          >
            {token}
          </text>
        </g>
      );
    })}

    {/* processor */}
    <rect
      x="96"
      y="60"
      width="40"
      height="40"
      rx="10"
      fill="currentColor"
      className="text-accent/12"
    />
    <rect x="96" y="60" width="40" height="40" rx="10" />
    <g transform="translate(116 80)">
      <g className="animate-spin-slow text-accent">
        <circle r="6.5" strokeWidth="1.9" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="-6.5"
            x2="0"
            y2="-10"
            strokeWidth="2"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
    </g>

    {/* clean table */}
    <rect
      x="152"
      y="28"
      width="74"
      height="104"
      rx="8"
      fill="currentColor"
      className="text-base-content/4"
    />
    <rect x="152" y="28" width="74" height="104" rx="8" />
    <text
      x="160"
      y="42"
      fontSize="6.5"
      fill="currentColor"
      stroke="none"
      className="text-base-content/50 font-mono tracking-wider uppercase"
    >
      clean
    </text>
    <line
      x1="152"
      y1="47"
      x2="226"
      y2="47"
      strokeWidth="1.2"
      className="text-base-content/20"
    />
    {CLEAN_ROWS.map((y, k) => {
      const t = 1.15 + k * 0.22;
      return (
        <g key={y}>
          <rect
            width="5"
            height="5"
            rx="1.2"
            fill="currentColor"
            stroke="none"
            opacity="0"
            className="text-accent"
          >
            <animateMotion
              path={`M136 80 L158 ${y}`}
              begin={`${t - 0.25}s`}
              dur="0.25s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              begin={`${t - 0.25}s`}
              dur="0.25s"
              fill="freeze"
            />
          </rect>
          <circle
            cx="161"
            cy={y}
            r="2"
            fill="currentColor"
            stroke="none"
            opacity="0"
            className="text-accent"
          >
            <animate
              attributeName="opacity"
              values="0;1"
              begin={`${t}s`}
              dur="0.1s"
              fill="freeze"
            />
          </circle>
          <line
            x1="168"
            y1={y}
            x2="188"
            y2={y}
            strokeWidth="2.4"
            {...drawProps(t, "text-base-content/70", 0.2)}
          />
          <line
            x1="193"
            y1={y}
            x2="205"
            y2={y}
            strokeWidth="2.4"
            {...drawProps(t + 0.05, "text-base-content/40", 0.2)}
          />
          <path
            d={`M211 ${y} l2 2 4 -4`}
            strokeWidth="1.8"
            opacity="0"
            className="text-success"
          >
            <animate
              attributeName="opacity"
              values="0;1"
              begin={`${t + 0.2}s`}
              dur="0.1s"
              fill="freeze"
            />
          </path>
        </g>
      );
    })}
  </BlueprintShell>
);

/* 6 — Whatever it takes: quick costume changes for each hat he wears,
      ending in a superhero pose. */
const OUTFITS = ["product manager", "engineer", "data wrangler", "field tech"];

const Outfit = ({ stage }: { stage: number }) => {
  const hero = stage >= OUTFITS.length;
  return (
    <g strokeWidth="2.2">
      {hero && (
        <path
          fill="currentColor"
          fillOpacity="0.2"
          strokeWidth="1.8"
          className="text-accent"
        >
          <animate
            attributeName="d"
            values="M117 82 Q102 88 84 104 Q92 106 90 114 Q102 108 108 116 Q114 100 123 83 Z; M117 82 Q100 84 82 96 Q90 100 86 108 Q100 104 104 112 Q112 98 123 83 Z; M117 82 Q102 88 84 104 Q92 106 90 114 Q102 108 108 116 Q114 100 123 83 Z"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}
      <circle cx="120" cy="70" r="7" />
      <line x1="120" y1="77" x2="120" y2="106" />
      <path
        d={
          hero
            ? "M120 106 L108 128 M120 106 L132 128"
            : "M120 106 L112 128 M120 106 L128 128"
        }
      />

      {stage === 0 && (
        <>
          <line x1="120" y1="84" x2="110" y2="100" />
          <path d="M120 84 L128 98" />
          <rect
            x="128"
            y="82"
            width="18"
            height="22"
            rx="2"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <line x1="133" y1="82" x2="141" y2="82" strokeWidth="2.6" />
          <line
            x1="132"
            y1="90"
            x2="142"
            y2="90"
            strokeWidth="1.4"
            className="text-base-content/50"
          />
          <line
            x1="132"
            y1="95"
            x2="139"
            y2="95"
            strokeWidth="1.4"
            className="text-base-content/50"
          />
          <path
            d="M136 99 l1.5 1.5 3 -3"
            strokeWidth="1.6"
            className="text-success"
          />
        </>
      )}
      {stage === 1 && (
        <>
          <path d="M120 84 L108 98 M120 84 L132 98" />
          <rect
            x="106"
            y="80"
            width="28"
            height="18"
            rx="2"
            fill="currentColor"
            fillOpacity="0.08"
            strokeWidth="1.8"
          />
          <line
            x1="110"
            y1="86"
            x2="122"
            y2="86"
            strokeWidth="1.8"
            className="text-info"
          />
          <line
            x1="113"
            y1="91"
            x2="129"
            y2="91"
            strokeWidth="1.8"
            className="text-accent"
          />
          <path d="M102 101 H138" strokeWidth="2" />
        </>
      )}
      {stage === 2 && (
        <>
          <path d="M120 84 L111 94 L116 104" />
          <path d="M120 84 L134 78" />
          <rect
            x="134"
            y="56"
            width="26"
            height="24"
            rx="2"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.06"
          />
          {[
            { x: 139, h: 6 },
            { x: 146, h: 11 },
            { x: 153, h: 16 },
          ].map(({ x, h }) => (
            <rect
              key={x}
              x={x}
              y={76 - h}
              width="4"
              height={h}
              rx="1"
              fill="currentColor"
              stroke="none"
              className="text-accent/70"
            />
          ))}
        </>
      )}
      {stage === 3 && (
        <>
          <path
            d="M111 66 Q111 57 120 57 Q129 57 129 66 Z"
            fill="currentColor"
            strokeWidth="1.8"
            className="text-warning"
          />
          <line
            x1="107"
            y1="66"
            x2="133"
            y2="66"
            strokeWidth="2.4"
            className="text-warning"
          />
          <line x1="120" y1="84" x2="110" y2="100" />
          <path d="M120 84 L134 74" />
          <g strokeWidth="1.8">
            <path d="M133 58 V72 A3 3 0 0 0 139 72 V58" />
            <line x1="131.5" y1="58" x2="140.5" y2="58" />
            <rect
              x="134.5"
              y="66"
              width="3"
              height="7"
              fill="currentColor"
              stroke="none"
              className="text-accent"
            />
          </g>
        </>
      )}
      {hero && (
        <>
          <path d="M120 84 L108 94 L114 104 M120 84 L132 94 L126 104" />
          <circle
            cx="120"
            cy="90"
            r="2.4"
            fill="currentColor"
            stroke="none"
            className="text-accent"
          />
          {["M100 58 L94 52", "M140 58 L146 52", "M120 54 V46"].map((d) => (
            <path key={d} d={d} strokeWidth="1.8" className="text-accent" />
          ))}
        </>
      )}
    </g>
  );
};

const WhateverScene = () => {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState(0);
  const effectiveStage = reduced ? OUTFITS.length : stage;

  useEffect(() => {
    if (reduced || stage >= OUTFITS.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), 420);
    return () => clearTimeout(t);
  }, [stage, reduced]);

  return (
    <BlueprintShell>
      <ellipse
        cx="120"
        cy="132"
        rx="40"
        ry="4.5"
        fill="currentColor"
        stroke="none"
        className="text-base-content/10"
      />
      <g transform="translate(120 132) scale(1.3) translate(-120 -129)">
        <g key={effectiveStage} className="animate-pop">
          <Outfit stage={effectiveStage} />
        </g>
      </g>
      {effectiveStage < OUTFITS.length && (
        <text
          key={`label-${effectiveStage}`}
          x="120"
          y="148"
          textAnchor="middle"
          fontSize="8"
          fill="currentColor"
          stroke="none"
          className="animate-pop text-base-content/55 font-mono tracking-widest uppercase"
        >
          {OUTFITS[effectiveStage]}
        </text>
      )}
    </BlueprintShell>
  );
};

/* ============================ Card + carousel ============================= */

const SCENES: StoryScene[] = [
  {
    caption: "forward deployed engineer @ ancera",
    render: () => <ArriveScene />,
  },
  {
    caption: "rapid diagnostics for food safety",
    render: () => <DiagnosticsScene />,
  },
  { caption: "sometimes: product manager", render: () => <ProductScene /> },
  { caption: "sometimes: software engineer", render: () => <BuildScene /> },
  { caption: "sometimes: data wrangler", render: () => <DataScene /> },
  { caption: "…basically: whatever it takes", render: () => <WhateverScene /> },
];

const StoryCarousel = ({ scenes }: { scenes: StoryScene[] }) => {
  const count = scenes.length;
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  const [focused, setFocused] = useState(false);
  const [playing, setPlaying] = useState(true);
  const press = useRef<{ x: number; t: number } | null>(null);
  const reduced = usePrefersReducedMotion();
  const paused = hovered || held || focused || reduced || !playing;
  const go = (d: number) => setIdx((i) => (i + d + count) % count);
  const current = scenes[idx];

  const onPointerDown = (e: PointerEvent) => {
    press.current = { x: e.clientX, t: Date.now() };
    setHeld(true);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setHeld(false);
    if (!press.current) return;
    const dx = e.clientX - press.current.x;
    const quick = Date.now() - press.current.t < 450;
    press.current = null;
    if (Math.abs(dx) > 40) return go(dx < 0 ? 1 : -1);
    if (!quick) return; // press-and-hold just pauses
    const r = e.currentTarget.getBoundingClientRect();
    go(e.clientX - r.left < r.width / 3 ? -1 : 1);
  };

  return (
    <div className="border-base-content/10 bg-base-200/60 w-full rounded-2xl border p-6 shadow-2xl backdrop-blur">
      <p className="text-base-content/70 text-xs font-semibold tracking-[0.2em] uppercase">
        Currently
      </p>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`What Yash is currently doing: ${current.caption}`}
        tabIndex={0}
        className="text-base-content focus-visible:ring-accent/40 relative mt-4 h-60 cursor-pointer touch-pan-y rounded-xl outline-none select-none focus-visible:ring-2"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setHeld(false);
          press.current = null;
        }}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFocused(false);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          setHeld(false);
          press.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div
          key={idx}
          role="group"
          aria-roledescription="slide"
          aria-label={`${idx + 1} of ${count}: ${current.caption}`}
          className="animate-fade-in pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
        >
          {current.render()}
          <Caption>{current.caption}</Caption>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {scenes.map(({ caption }, i) => (
            <button
              key={caption}
              type="button"
              aria-label={`Slide ${i + 1}: ${caption}`}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              className="group flex-1 py-2"
            >
              <span className="bg-base-content/15 group-hover:bg-base-content/25 relative block h-1 overflow-hidden rounded-full transition-colors">
                {i < idx && (
                  <span className="bg-base-content/40 absolute inset-0" />
                )}
                {i === idx && (
                  <span
                    key={idx}
                    className="bg-accent absolute inset-0 origin-left"
                    style={{
                      animation: `storyFill ${SLIDE_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={(e) =>
                      e.target === e.currentTarget && go(1)
                    }
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause story" : "Play story"}
            aria-pressed={!playing}
            className="btn btn-ghost btn-xs btn-circle text-base-content/70"
          >
            {playing ? (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export const StoryCard = () => <StoryCarousel scenes={SCENES} />;

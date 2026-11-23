"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { LottieProps } from "lottie-react";

// Keep the player (and the 1.8 MB animation) out of the initial bundle: the
// player is code-split and the JSON is fetched from /public at runtime.
const Lottie = dynamic(
  () => import("lottie-react").then((module) => module.Lottie),
  { ssr: false },
);

type AnimationData = LottieProps["src"];

const LoadingScreen = () => {
  const [animationData, setAnimationData] = useState<AnimationData | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    fetch("/animations/loading-animation.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to load animation: ${response.status}`);
        return response.json() as Promise<AnimationData>;
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        // The splash is decorative; if it fails, the page still loads.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-base-100 fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="relative w-[200px] sm:w-[300px] md:w-[400px]">
        {animationData ? (
          <Lottie
            src={animationData}
            loop={true}
            autoplay={true}
            className="h-full w-full"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center">
            <span className="loading loading-ring loading-lg text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;

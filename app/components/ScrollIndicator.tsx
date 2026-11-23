// components/ScrollIndicator.tsx
"use client";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if page is scrollable
    const checkScrollable = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const isScrollable = pageHeight > viewportHeight;

      // Only show if there's content to scroll and we're at the top
      setIsVisible(isScrollable && window.scrollY < 100);
    };

    // Initial check
    checkScrollable();

    // Check on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        checkScrollable();
      }
    };

    // Check on resize (in case content reflow makes page scrollable)
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 bottom-8 z-40 transition-all duration-500 md:right-12">
      <div className="bg-base-100/80 border-base-200/20 flex items-center gap-3 rounded-full border px-4 py-3 shadow-lg backdrop-blur-sm">
        <span className="text-base-content/70 hidden text-sm font-medium sm:block">
          Scroll to explore
        </span>
        <div className="relative h-5 w-5">
          <div className="animate-ping-slow bg-primary/20 absolute inset-0 rounded-full" />
          <svg
            className="text-primary h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;

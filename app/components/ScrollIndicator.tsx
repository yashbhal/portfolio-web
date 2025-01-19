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
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-8 right-8 md:right-12
        transition-all duration-500 z-40
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 
                    bg-base-100/80 backdrop-blur-sm
                    rounded-full shadow-lg
                    border border-base-200/20"
      >
        <span className="text-sm font-medium text-base-content/70 hidden sm:block">
          Scroll to explore
        </span>
        <div className="relative w-5 h-5">
          <div
            className="absolute inset-0 animate-ping-slow rounded-full 
                        bg-primary/20"
          />
          <svg
            className="w-5 h-5 text-primary animate-bounce"
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

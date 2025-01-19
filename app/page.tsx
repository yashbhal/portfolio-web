// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollIndicator from "./components/ScrollIndicator";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-base-100">
          <HeroSection />
          <AboutSection />
          <ScrollIndicator />
        </div>
      )}
    </>
  );
}

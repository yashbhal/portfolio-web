// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingScreen from "./components/LoadingScreen";
import ScrollIndicator from "./components/ScrollIndicator";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WorkSections } from "./components/WorkSections";
import workData from "./work/workData";

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
        <div className="bg-base-100 min-h-screen">
          <HeroSection />
          <AboutSection />
          <section id="work" className="bg-base-100 py-16 md:py-24">
            <div className="container-responsive">
              <WorkSections
                experiences={workData.experiences}
                projects={workData.projects}
                projectsAction={
                  <Link
                    href="/work"
                    className="text-primary hover:text-primary/75 text-sm font-semibold"
                  >
                    See all work →
                  </Link>
                }
              />
            </div>
          </section>
          <ScrollIndicator />
        </div>
      )}
    </>
  );
}

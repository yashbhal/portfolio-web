// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollIndicator from "./components/ScrollIndicator";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import Section from "./components/CardSection";
import workData from "./Work/workData";

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
          <section id="about" className="bg-base-100 py-16 md:py-24">
            <div className="container-responsive">
              <AboutSection />
            </div>
          </section>
          <section id="work" className="bg-base-100 py-16 md:py-24">
            <div className="container-responsive">
              <div className="mx-auto max-w-6xl space-y-16">
                <Section
                  title="Professional Experience"
                  experiences={workData.experiences}
                />
                <Section title="Projects" projects={workData.projects} />
              </div>
            </div>
          </section>
          <ScrollIndicator />
        </div>
      )}
    </>
  );
}

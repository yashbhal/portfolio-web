import React from "react";
import AboutCard from "../components/AboutCard";

const About = () => {
  return (
    <div className="min-h-screen bg-primary text-primary-content flex flex-col items-center py-10">
      <div className="w-full max-w-4xl mx-auto">
        <AboutCard />
      </div>
    </div>
  );
};

export default About;

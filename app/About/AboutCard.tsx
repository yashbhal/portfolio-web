import React from "react";

const AboutCard = () => {
  return (
    <div className="card glass shadow-lg bg-base-300 text-base-content relative z-10">
      <figure className="p-10">
        <img
          src="/about_photo.png"
          alt="Yash Bhalchandra"
          className="rounded-full w-52 h-52 object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <p className="mb-4">
          I have 2 years of experience working full-time as a software
          developer, and an undergraduate degree in Computer Science from
          Arizona State University. I love working in interdisciplinary teams
          towards building creative and intuitive products that solve problems.
        </p>
        <p className="mb-4">
          Currently, I am a graduate student studying Computer Science at
          Georgia Institute of Technology. I am open to work and actively
          looking for internships and co-ops starting Spring 2025. Feel free to
          reach out to me on LinkedIn or at yashbhal@gatech.edu with
          opportunities or even just for a chat!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Interests Beyond Tech</h2>
            <p>Soccer | Art | Reading</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Current Projects</h2>
            <p>
              QuestLife - A Privacy Focused Journalling App that brings you a
              new perspective on your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;

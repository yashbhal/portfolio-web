import React from "react";

const AboutCard = () => {
  return (
    <div className="card glass shadow-lg bg-primary text-primary-content">
      <figure className="p-10">
        <img
          src="/hero_image.jpeg"
          alt="Yash Bhalchandra"
          className="rounded-full w-52 h-52 object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h1 className="text-3xl font-bold mb-4">More about Yash</h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae
          dui in mauris tempor fermentum.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Personal Interests</h2>
            <p>Hiking, Reading, Coding, Music</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Currently Learning</h2>
            <p>Next.js, TypeScript, GraphQL</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Areas of Expertise</h2>
            <p>Web Development, UI/UX Design, Backend Development</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Current Projects</h2>
            <p>Portfolio Website, E-commerce App, Blogging Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;

import React from "react";

const AboutCard = () => {
  return (
    <div className="card glass shadow-lg bg-base-300 text-base-content">
      <figure className="p-10">
        <img
          src="/about_photo.png"
          alt="Yash Bhalchandra"
          className="rounded-full w-52 h-52 object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h1 className="text-3xl font-bold mb-4">More about Yash</h1>
        <p className="mb-4">
          I graduated from Arizona State University with an undergraduate degree
          in Computer Science and have experience working a software tester in
          the automotive industry at KPIT, and then working as a application
          developer for almost 2 years in the world of embedded products at
          Microchip Technology.
        </p>
        <p className="mb-4">
          Currently, I am a graduate student studying Computer Science at
          Georgia Institute of Technology. I love working in interdisciplinary
          teams towards building creative and intuitive products that solve
          problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Personal Interests</h2>
            <p>Soccer | Art | Reading</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Currently Learning</h2>
            <p>Artificial Intelligence | Python | Next.js</p>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">Current Projects</h2>
            <p>Portfolio Website | Grocery List Generator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;

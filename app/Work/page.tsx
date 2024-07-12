import React from "react";

const experiences = [
  {
    time: "July 2022 - April 2024",
    company: "Microchip Technology",
    description:
      "Development and maintenance of Microchip's 16-bit Bootloader and the CryptoAuthentication Library.",
  },
  {
    time: "May 2022 - August 2022",
    company: "KPIT",
    description:
      "Worked in an Agile team to design and develop test scripts to automate the functional and stability testing of automotive infotainment systems.",
  },
  {
    time: "May 2021 - August 2021",
    company: "Immersive Creation Studio",
    description:
      "Design and development of the studio's website alongside interstitials and environments to be used in virtual reality environments.",
  },
  {
    time: "November 2020 - May 2021",
    company: "Meteor Studio",
    description:
      "Design and development of an Augmented Reality software for iOS, Android, and Microsoft HoloLens using Unity Engine for use across all 4 campuses of Arizona State University",
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-primary text-primary-content px-10 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Professional Experience
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {experiences.map((exp, index) => (
          <div key={index} className="card bg-base-100 shadow-xl p-5">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{exp.company}</h2>
              <p className="italic">{exp.time}</p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

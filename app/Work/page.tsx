import Link from "next/link";
import Image from "next/image";

const Work = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description for Project 1",
      imageUrl: "/github-icon.svg",
      link: "/project1",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description for Project 2",
      imageUrl: "/github-icon.svg",
      link: "/project2",
    },
    {
      id: 3,
      title: "Project 3",
      description: "Description for Project 3",
      imageUrl: "/github-icon.svg",
      link: "/project3",
    },
    {
      id: 4,
      title: "Project 4",
      description: "Description for Project 4",
      imageUrl: "/github-icon.svg",
      link: "/project4",
    },
    {
      id: 5,
      title: "Project 5",
      description: "Description for Project 5",
      imageUrl: "/github-icon.svg",
      link: "/project5",
    },
  ];

  const experiences = [
    {
      id: 1,
      company: "Company A",
      description: "Description for Company A",
      imageUrl: "/github-icon.svg",
      link: "/companyA",
    },
    {
      id: 2,
      company: "Company B",
      description: "Description for Company B",
      imageUrl: "/github-icon.svg",
      link: "/companyB",
    },
    {
      id: 3,
      company: "Company C",
      description: "Description for Company C",
      imageUrl: "/github-icon.svg",
      link: "/companyC",
    },
    {
      id: 4,
      company: "Company D",
      description: "Description for Company D",
      imageUrl: "/github-icon.svg",
      link: "/companyD",
    },
    {
      id: 5,
      company: "Company E",
      description: "Description for Company E",
      imageUrl: "/github-icon.svg",
      link: "/companyE",
    },
  ];

  return (
    <div className="work-page bg-primary min-h-screen text-primary-content p-8 flex flex-col items-center">
      <section className="w-full max-w-5xl mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Work Experiences
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <div key={experience.id} className="card glass w-full">
              <figure>
                <Image
                  src={experience.imageUrl}
                  alt={experience.company}
                  width={400}
                  height={300}
                  className="object-cover w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{experience.company}</h2>
                <p>{experience.description}</p>
                <div className="card-actions justify-end">
                  <Link href={experience.link}>
                    <button className="btn btn-primary">View Company</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Projects</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="card glass w-full">
              <figure>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="object-cover w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <div className="card-actions justify-end">
                  <Link href={project.link}>
                    <button className="btn btn-primary">View Project</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Work;

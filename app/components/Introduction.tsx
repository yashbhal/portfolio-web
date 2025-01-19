// components/Introduction.tsx
export const Introduction = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center">
        About Me
      </h2>
      <div className="prose prose-lg mx-auto">
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
      </div>
    </div>
  );
};

// app/Work/page.tsx
import Section from "../components/CardSection";
import workData from "./workData";

const Work = () => {
  const { experiences, projects } = workData;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <Section title="Professional Experience" experiences={experiences} />
          <Section title="Projects" projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default Work;

import Section from "../components/CardSection";
import workData from "./workData";

const Work = () => (
  <div className="work-page bg-primary min-h-screen text-primary-content p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Experiences</h1>
      <div className="space-y-16">
        <Section
          title="Work Experiences"
          items={workData.experiences}
          isProject={false}
        />
        <Section title="Projects" items={workData.projects} isProject={true} />
      </div>
    </div>
  </div>
);

export default Work;

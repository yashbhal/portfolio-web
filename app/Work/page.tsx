import Section from "../components/CardSection";
import workData from "./workData";

const Work = () => (
  <div className="work-page bg-primary min-h-screen text-primary-content p-8 flex flex-col items-center">
    <Section
      title="Work Experiences"
      items={workData.experiences}
      isProject={false}
    />
    <Section title="Projects" items={workData.projects} isProject={true} />
  </div>
);

export default Work;

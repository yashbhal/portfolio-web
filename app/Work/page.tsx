// app/Work/page.tsx
import Section from "../components/CardSection";
import ScrollIndicator from "../components/ScrollIndicator";
import workData from "./workData";

const Work = () => (
  <div className="min-h-screen bg-base-100">
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto space-y-16">
        <Section
          title="Work Experience"
          items={workData.experiences}
          isProject={false}
        />
        <Section title="Projects" items={workData.projects} isProject={true} />
      </div>
    </div>
    <ScrollIndicator />
  </div>
);

export default Work;

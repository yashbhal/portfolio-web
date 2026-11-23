// app/work/page.tsx
import type { Metadata } from "next";
import { WorkSections } from "../components/WorkSections";
import workData from "./workData";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional experience and projects by Yash Bhalchandra.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Yash Bhalchandra",
    description: "Professional experience and projects by Yash Bhalchandra.",
    url: "/work",
    type: "website",
  },
};

const WorkPage = () => {
  const { experiences, projects } = workData;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container-responsive py-14 md:py-20">
        <WorkSections experiences={experiences} projects={projects} />
      </div>
    </div>
  );
};

export default WorkPage;

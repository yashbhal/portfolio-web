import type { ReactNode } from "react";
import type { Experience, Project } from "../work/workData";
import Section from "./WorkSection";

interface WorkSectionsProps {
  experiences: Experience[];
  projects: Project[];
  projectsAction?: ReactNode;
}

/** Shared work/experience layout used by the landing page and `/work`. */
export const WorkSections = ({
  experiences,
  projects,
  projectsAction,
}: WorkSectionsProps) => (
  <div className="mx-auto flex max-w-6xl flex-col gap-12">
    <Section title="Professional Experience" experiences={experiences} />
    <Section title="Projects" projects={projects} action={projectsAction} />
  </div>
);

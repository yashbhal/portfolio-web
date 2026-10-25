export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  role?: string;
  description: string;
  startDate: string;
  endDate?: string;
}

const workData: { projects: Project[]; experiences: Experience[] } = {
  projects: [
    {
      id: 1,
      title: "StoryToTest",
      description:
        "VS Code extension and GitHub automation that converts closed issues into test PRs. Scans TypeScript codebases, matches entities to interfaces/classes, generates validated tests, and opens labeled PRs with status checks.",
      link: "https://github.com/yashbhal/storytotest",
    },
    {
      id: 2,
      title: "LifeOS",
      description:
        "Built LifeOS: a drag-drop UI based productivity tool that allows you to control 1000+ integrations using natural language powered by a proprietary algorithm.",
      link: "https://thelifeos.io",
    },
    {
      id: 3,
      title: "Stardew Sage",
      description:
        "Open-source AI companion for Stardew Valley fans powered by Gemini 1.5 Flash.",
      link: "https://stardewsage.com",
    },
    {
      id: 4,
      title: "Creator Platform",
      description:
        "A platform that allows you to use natural language to query your videos, edit them, and stitch them together for posting on social media.",
      link: "https://github.com/yashbhal/thecreatormarket",
    },
    {
      id: 5,
      title: "Open Vocab Predictions for Indoor Scenes",
      description:
        "67.8% accuracy indoor scene understanding pipeline integrating Semantic SAM and SigLIP.",
      link: "https://loggs.github.io/cs7641-project-proposal/",
    },
    {
      id: 6,
      title: "Haptic Stroke Rehabilitation Games",
      description:
        "Gesture-based Unity games for vibrotactile stroke rehab testing with Mediapipe tracking.",
      link: "https://github.com/yashbhal/",
    },
    {
      id: 7,
      title: "Privacy Focused AI Journal Application",
      description:
        "Secure journaling platform that transforms entries into narratives using LangChain and Llama.",
      link: "https://github.com/yashbhal/",
    },
    {
      id: 8,
      title: "Portfolio Website",
      description:
        "Personal site for projects, writing, and career notes built with the modern web stack.",
      link: "https://github.com/yashbhal/portfolio-web",
    },
    {
      id: 9,
      title: "Grocery List Generator",
      description:
        "Weekly grocery assistant that auto-creates shopping lists from recipe selections.",
      link: "https://github.com/yashbhal/grocery-list-generator",
    },
    {
      id: 10,
      title: "Movie Recommender",
      description:
        "Lightweight picker that surfaces a random film from the IMDb Top 250 list.",
      link: "https://github.com/yashbhal/movie-finder",
    },
  ],
  experiences: [
    {
      id: 1,
      company: "Petpin",
      role: "Everything Technical",
      description:
        "The first wearable that lets you see life from your pet's perspective and lays the rails for the new digital pet economy.",
      startDate: "August 2025",
      endDate: "January 2026",
    },
    {
      id: 2,
      company: "Residency Delta",
      role: "Founder",
      description:
        "Built LifeOS: a drag-drop UI based productivity tool that allows you to control 1000+ integrations using natural language powered by a proprietary algorithm.",
      startDate: "July 2025",
      endDate: "August 2025",
    },
    {
      id: 3,
      company: "The ViTAL Lab",
      role: "Graduate Research Assistant",
      description:
        "A sensor-driven React Native app for longitudinal health studies across iOS and Android.",
      startDate: "August 2024",
      endDate: "May 2025",
    },
    {
      id: 4,
      company: "Microchip Technology",
      role: "Software Engineer",
      description:
        "Shipped features and maintenance for the 16-bit Bootloader and CryptoAuthentication libraries.",
      startDate: "July 2022",
      endDate: "April 2024",
    },
    {
      id: 5,
      company: "KPIT",
      role: "Software Engineering Intern",
      description:
        "Automated functional and stability tests for automotive infotainment systems.",
      startDate: "May 2022",
      endDate: "July 2022",
    },
    {
      id: 6,
      company: "XR @ ASU",
      role: "Full-Stack Developer",
      description:
        "Worked on the studio's website and prototyped XR learning environments for classes at ASU.",
      startDate: "May 2021",
      endDate: "August 2021",
    },
    {
      id: 7,
      company: "Meteor Studio",
      role: "AR Developer",
      description:
        "Built ScavengetHunt - gamified campus tours for Arizona State University campuses",
      startDate: "November 2020",
      endDate: "May 2021",
    },
  ],
};

export default workData;

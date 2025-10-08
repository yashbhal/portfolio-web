export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  role?: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate?: string;
}

const workData: { projects: Project[]; experiences: Experience[] } = {
  projects: [
    {
      id: 1,
      title: "LifeOS",
      description:
        "Built LifeOS: a drag-drop UI based productivity tool that allows you to control 1000+ integrations using natural language powered by a proprietary algorithm.",
      technologies: ["Next.js", "TypeScript", "OpenAI API"],
      link: "https://thelifeos.io",
    },
    {
      id: 2,
      title: "Stardew Sage",
      description:
        "Open-source AI companion for Stardew Valley fans powered by Gemini 1.5 Flash.",
      technologies: ["TypeScript", "Next.js", "Vercel", "Google Gemini", "LLM"],
      link: "https://stardewsage.com",
    },
    {
      id: 3,
      title: "Creator Platform",
      description:
        "A platform that allows you to use natural language to query your videos, edit them, and stitch them together for posting on social media.",
      technologies: ["Next.js", "TypeScript", "ffmpeg", "Twelve Labs"],
      link: "https://github.com/yashbhal/thecreatormarket",
    },
    {
      id: 4,
      title: "Open Vocab Predictions for Indoor Scenes",
      description:
        "67.8% accuracy indoor scene understanding pipeline integrating Semantic SAM and SigLIP.",
      technologies: [
        "Python",
        "PyTorch",
        "Jupyter Notebook",
        "Machine Learning",
        "Computer Vision",
      ],
      link: "https://loggs.github.io/cs7641-project-proposal/",
    },
    {
      id: 5,
      title: "Haptic Stroke Rehabilitation Games",
      description:
        "Gesture-based Unity games for vibrotactile stroke rehab testing with Mediapipe tracking.",
      technologies: ["Python", "C#", "Figma", "Unity Engine", "Mediapipe"],
      link: "https://github.com/yashbhal/",
    },
    {
      id: 6,
      title: "Privacy Focused AI Journal Application",
      description:
        "Secure journaling platform that transforms entries into narratives using LangChain and Llama.",
      technologies: ["TypeScript", "PostgreSQL", "Next.js", "LLM", "LangChain"],
      link: "https://github.com/yashbhal/",
    },
    {
      id: 7,
      title: "Portfolio Website",
      description:
        "Personal site for projects, writing, and career notes built with the modern web stack.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "DaisyUI"],
      link: "https://github.com/yashbhal/portfolio-web",
    },
    {
      id: 8,
      title: "Grocery List Generator",
      description:
        "Weekly grocery assistant that auto-creates shopping lists from recipe selections.",
      technologies: ["Python", "PyQt6"],
      link: "https://github.com/yashbhal/grocery-list-generator",
    },
    {
      id: 9,
      title: "Movie Recommender",
      description:
        "Lightweight picker that surfaces a random film from the IMDb Top 250 list.",
      technologies: ["Python", "BeautifulSoup"],
      link: "https://github.com/yashbhal/movie-finder",
  }
  ],
  experiences: [
    {
      id: 1,
      company: "Petpin",
      role: "Everything Technical",
      description:
        "An AI wearable for pets that captures POV footage and automatically edits clips for social media, turning your pet into a standout creator.",
      technologies: [],
      link: "https://petpin.ai",
      startDate: "Coming Soon!",
      endDate: "https://petpin.ai",
    },
    {
      id: 2,
      company: "The Residency Delta S1",
      role: "Founder",
      description:
        "Built LifeOS: a drag-drop UI based productivity tool that allows you to control 1000+ integrations using natural language powered by a proprietary algorithm.",
      technologies: ["TypeScript", "Next.js", "OpenAI API"],
      link: "https://thelifeos.io",
      startDate: "July 2025",
      endDate: "August 2025",
    },
    {
      id: 3,
      company: "ViTAL Lab (Emory x GT)",
      role: "Graduate Research Assistant",
      description:
        "A sensor-driven React Native app for longitudinal health studies across iOS and Android.",
      technologies: ["React Native", "Expo", "Git"],
      link: "https://kwonvitallab.github.io/",
      startDate: "August 2024",
      endDate: "May 2025",
    },
    {
      id: 4,
      company: "Microchip Technology",
      role: "Software Engineer",
      description:
        "Shipped features and maintenance for the 16-bit Bootloader and CryptoAuthentication libraries.",
      technologies: ["TypeScript", "Java", "C", "React"],
      link: "https://www.microchip.com/",
      startDate: "July 2022",
      endDate: "April 2024",
    },
    {
      id: 5,
      company: "KPIT",
      role: "Software Engineering Intern",
      description:
        "Automated functional and stability tests for automotive infotainment systems.",
      technologies: ["Python"],
      link: "https://www.kpit.com",
      startDate: "May 2022",
      endDate: "July 2022",
    },
    {
      id: 6,
      company: "Immersive Creation Studio",
      role: "Full-Stack Developer",
      description:
        "Prototyped XR learning environments and worked on the studio's website.",
      technologies: ["React", "TypeScript", "Blender", "Figma"],
      link: "https://xr.asu.edu",
      startDate: "May 2021",
      endDate: "August 2021",
    },
    {
      id: 7,
      company: "Meteor Studio",
      role: "AR Developer",
      description:
        "Built ScavengetHunt - gamified campus tours for Arizona State University campuses",
      technologies: ["C#", "UnityEngine", "Firebase"],
      link: "https://meteor.ame.asu.edu/",
      startDate: "November 2020",
      endDate: "May 2021",
    },
  ],
};

export default workData;

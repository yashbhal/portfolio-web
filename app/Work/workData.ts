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
      title: "Stardew Sage",
      description:
        "Open-source AI companion for Stardew Valley fans powered by Gemini 1.5 Flash.",
      technologies: ["TypeScript", "Next.js", "Vercel", "Google Gemini", "LLM"],
      link: "https://stardew-sage.vercel.app/",
    },
    {
      id: 2,
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
      id: 3,
      title: "Passive Haptic Stroke Rehabilitation Games",
      description:
        "Gesture-based Unity games for vibrotactile stroke rehab testing with Mediapipe tracking.",
      technologies: ["Python", "C#", "Figma", "Unity Engine", "Mediapipe"],
      link: "https://github.com/yashbhal/",
    },
    {
      id: 4,
      title: "Privacy Focused AI Journal Application",
      description:
        "Secure journaling platform that transforms entries into narratives using LangChain and Llama.",
      technologies: ["TypeScript", "PostgreSQL", "Next.js", "LLM", "LangChain"],
      link: "https://github.com/yashbhal/",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description:
        "Personal site for projects, writing, and career notes built with the modern web stack.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "DaisyUI"],
      link: "https://github.com/yashbhal/portfolio-web",
    },
    {
      id: 6,
      title: "Grocery List Generator",
      description:
        "Weekly grocery assistant that auto-creates shopping lists from recipe selections.",
      technologies: ["Python", "PyQt6"],
      link: "https://github.com/yashbhal/grocery-list-generator",
    },
    {
      id: 7,
      title: "Movie Recommender",
      description:
        "Lightweight picker that surfaces a random film from the IMDb Top 250 list.",
      technologies: ["Python", "BeautifulSoup"],
      link: "https://github.com/yashbhal/movie-finder",
    },
  ],
  experiences: [
    {
      id: 1,
      company: "ViTAL Lab at Georgia Tech & Emory University",
      role: "Graduate Research Assistant",
      description:
        "Building a sensor-rich React Native app for longitudinal health studies across iOS and Android.",
      technologies: ["React Native", "Expo", "Git"],
      link: "https://kwonvitallab.github.io/",
      startDate: "August 2024",
      endDate: "Present",
    },
    {
      id: 2,
      company: "Microchip Technology",
      role: "Software Engineer I",
      description:
        "Shipped features and maintenance for the 16-bit Bootloader and CryptoAuthentication libraries.",
      technologies: ["TypeScript", "Java", "C", "React"],
      link: "https://www.microchip.com/",
      startDate: "July 2022",
      endDate: "April 2024",
    },
    {
      id: 3,
      company: "KPIT",
      role: "Software Engineering Intern",
      description:
        "Automated functional and stability tests for automotive infotainment systems in an Agile team.",
      technologies: ["Python"],
      link: "https://www.kpit.com",
      startDate: "May 2022",
      endDate: "July 2022",
    },
    {
      id: 4,
      company: "Immersive Creation Studio",
      role: "Full-Stack Developer",
      description:
        "Prototyped XR learning environments spanning web, 3D assets, and spatial interactions.",
      technologies: ["React", "TypeScript", "Blender", "Figma"],
      link: "https://xr.asu.edu",
      startDate: "May 2021",
      endDate: "August 2021",
    },
    {
      id: 5,
      company: "Meteor Studio",
      role: "AR Developer",
      description:
        "Designed and built AR learning experiences for iOS, Android, and HoloLens using Unity.",
      technologies: ["C#", "UnityEngine", "Firebase"],
      link: "https://meteor.ame.asu.edu/",
      startDate: "November 2020",
      endDate: "May 2021",
    },
  ],
};

export default workData;

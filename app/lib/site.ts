/**
 * Single source of truth for site-wide identity, URLs, and contact links.
 * Import this instead of hardcoding the domain or social handles anywhere.
 */
export const siteConfig = {
  name: "Yash Bhalchandra",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashbhalchandra.com",
  description:
    "Portfolio of Yash Bhalchandra — projects, writing, and professional experience.",
  email: "yashbhal@gatech.edu",
  social: {
    linkedin: "https://www.linkedin.com/in/yashbhal",
    github: "https://github.com/yashbhal",
  },
} as const;

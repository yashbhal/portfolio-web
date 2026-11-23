import { FaLinkedin, FaGithub } from "react-icons/fa";
import { siteConfig } from "../lib/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="h-5 w-5" />,
      url: siteConfig.social.linkedin,
    },
    {
      name: "GitHub",
      icon: <FaGithub className="h-5 w-5" />,
      url: siteConfig.social.github,
    },
  ];

  return (
    <footer className="bg-base-200/50 border-base-200/10 border-t backdrop-blur-sm">
      <div className="container-responsive py-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright and Links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span className="text-base-content/80 text-sm">©</span>
              <p className="text-base-content/80 text-sm sm:text-base">
                <span className="font-heading">
                  {currentYear} {siteConfig.name}
                </span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-base-200/50 flex items-center rounded-lg p-2 transition-all duration-300"
                aria-label={link.name}
              >
                <div className="text-base-content/80 opacity-80 transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "/linkedin-icon.svg",
      url: "https://www.linkedin.com/in/yashbhal",
    },
    {
      name: "GitHub",
      icon: "/github-icon.svg",
      url: "https://github.com/yashbhal",
    },
  ];

  return (
    <footer className="bg-base-200/50 backdrop-blur-sm border-t border-base-200/10">
      <div className="container-responsive py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright and Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src="/copyright-icon.svg"
                  alt="Copyright"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm sm:text-base text-base-content/80">
                <span className="font-heading">
                  {currentYear} Yash Bhalchandra
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
                className="group p-2 rounded-lg hover:bg-base-200/50
                         transition-all duration-300"
                aria-label={link.name}
              >
                <div className="relative w-5 h-5">
                  <Image
                    src={link.icon}
                    alt={link.name}
                    fill
                    className="object-contain opacity-80 transition-transform
                             duration-300 group-hover:scale-110"
                  />
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

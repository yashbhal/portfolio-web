import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer bg-primary text-primary-content p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <Image
            src="/copyright-icon.svg"
            alt="Copyright"
            width={24}
            height={24}
            className="fill-current"
          />
          <p>© {new Date().getFullYear()} - Yash Bhalchandra</p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/yashbhal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/linkedin-icon.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="fill-current"
            />
          </a>
          <a
            href="https://github.com/yashbhal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github-icon.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="fill-current"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer bg-primary text-primary-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <Image
          src="/copyright-icon.svg"
          alt="Email"
          width={50}
          height={50}
          className="fill-current"
        />
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://www.linkedin.com/in/yashbhal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin-icon.svg"
            alt="LinkedIn"
            width={35}
            height={35}
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
            width={35}
            height={35}
            className="fill-current"
          />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;

// components/HeroSection.tsx
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-base-100 md:min-h-[90vh]">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-medium text-base-content/80">
                Hello, {`I'm`}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-base-content">
                Yash Bhalchandra
              </h1>
            </div>

            <h2 className="text-xl md:text-2xl font-heading text-base-content">
              Software Developer & Graduate Student
            </h2>

            <ul className="max-w-xl list-disc list-inside space-y-1.5 text-lg text-base-content/80">
              <li>MS CS at Georgia Tech</li>
              <li>Over 2 years of software development experience</li>
              <li>Actively looking for internships</li>
            </ul>

            <div className="flex gap-4 pt-4">
              <a
                href="https://linkedin.com/in/yashbhal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
              >
                Connect on LinkedIn
              </a>
              <a
                href="mailto:yashbhal@gatech.edu"
                className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/about_photo.png"
                alt="Yash Bhalchandra"
                width={320}
                height={320}
                className="rounded-2xl object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

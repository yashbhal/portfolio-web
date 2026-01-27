// components/HeroSection.tsx
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-base-100 md:min-h-[90vh]">
      <div className="container-responsive">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-base-content">
                Hi, {`I'm`} Yash.
              </h1>
            </div>

            <p className="max-w-xl text-base md:text-lg text-base-content/80">
I learn whatever I need to fast to build what gets me excited. Now, I'm hunting for my next opportunity towards creating something generational.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
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

// components/AboutSection.tsx
export const AboutSection = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Column - Main Text */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-base-content/80 font-medium">ABOUT ME</h4>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content">
                  I like building intuitive software that solves problems
                </h2>
              </div>

              <div className="space-y-4 text-base-content/80">
                <p className="leading-relaxed">
                  I have 2 years of experience working full-time as a software
                  developer, and an undergraduate degree in Computer Science
                  from Arizona State University.
                </p>
                <p className="leading-relaxed">
                  I'm currently pursuing MS in Computer Science at Georgia
                  Institute of Technology, and actively seeking internship
                  opportunities for Summer 2025.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="pt-4 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-base-content">
                    Education
                  </h3>
                  <ul className="space-y-2 text-base-content/80">
                    <li>MS Computer Science @ Georgia Tech</li>
                    <li>BS Computer Science @ ASU</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-base-content">
                    Beyond Tech
                  </h3>
                  <ul className="space-y-2 text-base-content/80">
                    <li>Soccer</li>
                    <li>Digital Art</li>
                    <li>Books</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Current Focus */}
            <div className="bg-base-200 rounded-2xl p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-semibold text-base-content">
                  Current Focus
                </h3>

                {/* Focus Areas */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Project in Development</h4>
                    <p className="text-base-content/80">
                      QuestLife - A Privacy Focused Journalling App that brings
                      you a new perspective on your life.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Academic</h4>
                    <p className="text-base-content/80">
                      Exploring advanced concepts in machine learning, deep
                      learning and computer vision at Georgia Tech.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Career</h4>
                    <p className="text-base-content/80">
                      Seeking internship opportunities where I can contribute to
                      innovative projects while expanding my technical
                      expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// components/AboutSection.tsx
export const AboutSection = () => {
  return (
    <section id="about" className="bg-base-100 py-20 md:py-24">
      <div className="container-responsive">
        <div className="mx-auto max-w-6xl">
          {/* Main Content */}
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-base-content/70 text-sm font-semibold uppercase tracking-[0.3em]">
                  ABOUT ME
                </h4>
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight text-base-content">
                  <span className="block">
                    Builder chasing curiosity-fueled problems.
                  </span>
                  <span className="block">
                    Always picking up whatever skills it takes to solve them.
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-base-content/80 max-w-3xl">
                <p className="text-base leading-relaxed">
                  I&apos;m pretty technology agnostic and chase the skills a
                  problem demands, even if that means learning something totally
                  outside my comfort zone. I like to build things that spark
                  excitement for me and the people who use them.
                </p>
                <p className="text-base leading-relaxed">
                  Picking a single niche has never stuck. I see that as a
                  feature, not a bug because there is too much remarkable stuff
                  out there to limit yourself. Do what pulls at your curiosity,
                  be kind, create momentum for others, and put in the reps to
                  become the person you want to be.
                </p>
                <p className="text-base leading-relaxed">
                  Life feels too short to ignore what lights you up and too long
                  to skip the marathon of improvement. Be a good person, build
                  happiness around you, and put in the work to create the life
                  you want.
                </p>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <section className="rounded-2xl border border-base-content/10 bg-base-200/60 p-6 backdrop-blur md:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                  Currently
                </h3>
                <ul className="mt-5 space-y-5 text-base-content/85">
                  <li className="border-l-2 border-base-content/20 pl-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                      Building
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      Petpin, the first wearable lets see you life from your
                      pet's perspective and lays the rails for the new digital
                      pet economy.
                    </p>
                  </li>
                  <li className="border-l-2 border-base-content/20 pl-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                      Reading
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      Chip War: The Fight for the World’s Most Critical
                      Technology by Chris Miller.
                    </p>
                  </li>
                  <li className="border-l-2 border-base-content/20 pl-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                      Watching
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      A heavy rotation of electrical and embedded engineering
                      videos.
                    </p>
                  </li>
                </ul>
              </section>

              <aside className="space-y-6">
                <div className="rounded-2xl border border-base-content/10 bg-base-200/40 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                    Education
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm text-base-content/80">
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base-content">
                        Georgia Institute of Technology
                      </dt>
                      <dd className="text-base-content/70">
                        MS Computer Science
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base-content">
                        Arizona State University
                      </dt>
                      <dd className="text-base-content/70">
                        BS Computer Science
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl border border-base-content/10 bg-base-200/40 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/70">
                    Beyond Tech
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm text-base-content/80">
                    <div>
                      <dt className="font-medium text-base-content">Sport</dt>
                      <dd className="text-base-content/70">
                        Love watching and playing sports, especially soccer and
                        Formula 1.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-base-content">Art</dt>
                      <dd className="text-base-content/70">
                        I&apos;ve been learning and making digital art in my
                        free time. It&apos;s calming and a skill I&apos;ve
                        always admired.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-base-content">Music</dt>
                      <dd className="text-base-content/70">
                        I used to play drums; now I&apos;m learning the ukulele
                        after falling in love with its sound.
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

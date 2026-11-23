// components/AboutSection.tsx
export const AboutSection = () => {
  return (
    <section id="about" className="bg-base-100 py-20 md:py-24">
      <div className="container-responsive">
        <div className="mx-auto max-w-6xl">
          {/* Main Content */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h4 className="text-base-content/70 text-sm font-semibold tracking-[0.3em] uppercase">
                ABOUT ME
              </h4>

              <div className="text-base-content/80 max-w-3xl space-y-4">
                <p className="text-base leading-relaxed">
                  I love learning something new about the world, whether it
                  comes from working in a new industry or just conversations
                  with friends and strangers.
                </p>
                <p className="text-base leading-relaxed">
                  I think anyone can become intermediate at anything with the
                  right amount of effort. Somehow, maybe because of that, every
                  job I&apos;ve taken started with me not knowing how to do it,
                  and that&apos;s always been my favorite part.
                </p>
                <p className="text-base leading-relaxed">
                  That&apos;s made me pretty tool agnostic. I chase whatever
                  skills a problem demands, even when it means learning
                  something totally outside my comfort zone.
                </p>
                <p className="text-base leading-relaxed">
                  Controversially, I see being niche-less as a feature, not a
                  bug. There&apos;s too much remarkable work out there to pick
                  one lane. I try to follow my curiosity and create momentum for
                  the people around me. Life&apos;s too short to ignore what
                  lights you up.
                </p>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <section className="border-base-content/10 bg-base-200/60 rounded-2xl border p-6 backdrop-blur md:p-8">
                <h3 className="text-base-content/70 text-sm font-semibold tracking-[0.2em] uppercase">
                  Recently
                </h3>
                <ul className="text-base-content/85 mt-5 space-y-5">
                  <li className="border-base-content/20 border-l-2 pl-4">
                    <span className="text-primary/70 text-xs font-semibold tracking-[0.2em] uppercase">
                      Learning
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      How food makes it to our table, the beauty and challenges
                      of data engineering, and building systems that scale.
                    </p>
                  </li>
                  <li className="border-base-content/20 border-l-2 pl-4">
                    <span className="text-primary/70 text-xs font-semibold tracking-[0.2em] uppercase">
                      Reading
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      Chip War: The Fight for the World’s Most Critical
                      Technology by Chris Miller.
                    </p>
                  </li>
                  <li className="border-base-content/20 border-l-2 pl-4">
                    <span className="text-primary/70 text-xs font-semibold tracking-[0.2em] uppercase">
                      Side Questing
                    </span>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">
                      3D printing. I&apos;ve brought the software I imagine to
                      life, now it&apos;s time to do the same for physical
                      objects.
                    </p>
                  </li>
                </ul>
              </section>

              <aside className="space-y-6">
                <div className="border-base-content/10 bg-base-200/40 rounded-2xl border p-6">
                  <h3 className="text-base-content/70 text-sm font-semibold tracking-[0.2em] uppercase">
                    Education
                  </h3>
                  <dl className="text-base-content/80 mt-4 space-y-3 text-sm">
                    <div className="flex flex-col gap-1">
                      <dt className="text-base-content font-medium">
                        Georgia Institute of Technology
                      </dt>
                      <dd className="text-base-content/70">
                        MS Computer Science
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-base-content font-medium">
                        Arizona State University
                      </dt>
                      <dd className="text-base-content/70">
                        BS Computer Science
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-base-content/10 bg-base-200/40 rounded-2xl border p-6">
                  <h3 className="text-base-content/70 text-sm font-semibold tracking-[0.2em] uppercase">
                    Beyond Tech
                  </h3>
                  <dl className="text-base-content/80 mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-base-content font-medium">Sport</dt>
                      <dd className="text-base-content/70">
                        Love watching and playing sports, especially soccer and
                        Formula 1.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-base-content font-medium">Art</dt>
                      <dd className="text-base-content/70">
                        I&apos;ve been learning and making digital art in my
                        free time. It&apos;s calming and a skill I&apos;ve
                        always admired.
                      </dd>
                    </div>
                    <div>
                      <dt className="text-base-content font-medium">Music</dt>
                      <dd className="text-base-content/70">
                        I used to play the drums; now I&apos;m learning the
                        ukulele after falling in love with its sound.
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

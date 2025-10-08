// components/ContactSection.tsx
export const ContactSection = () => {
  return (
    <section className="bg-base-200/50 py-16 md:py-24">
      <div className="container-responsive">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {`Let's Connect`}
          </h2>
          <p className="text-lg text-base-content/80 mb-8">
            Feel free to reach out to me on LinkedIn or at{" "}
            <a
              href="mailto:yashbhal@gatech.edu"
              className="text-primary hover:underline"
            >
              yashbhal@gatech.edu
            </a>{" "}
            with opportunities or even just for a chat!
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/yashbhal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
            >
              LinkedIn
            </a>
            <a
              href="mailto:yashbhal@gatech.edu"
              className="btn btn-outline text-base-content hover:bg-base-content hover:text-base-100"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

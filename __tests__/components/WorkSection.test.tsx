import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Section from "../../app/components/WorkSection";

describe("WorkSection", () => {
  it("renders experience date ranges", () => {
    render(
      <Section
        title="Professional Experience"
        experiences={[
          {
            id: 1,
            company: "Ancera",
            role: "Forward Deployed Engineer",
            description: "Making food production safer.",
            startDate: "August 2026",
          },
          {
            id: 2,
            company: "Petpin",
            description: "Wearables for pets.",
            startDate: "August 2025",
            endDate: "January 2026",
          },
        ]}
      />,
    );

    expect(screen.getByText("Aug 2026 — Present")).toBeInTheDocument();
    expect(screen.getByText("Aug 2025 — Jan 2026")).toBeInTheDocument();
  });

  it("renders project links and an optional header action", () => {
    render(
      <Section
        title="Projects"
        action={<a href="/work">All work</a>}
        projects={[
          {
            id: 1,
            title: "StoryToTest",
            description: "Turns issues into tests.",
            link: "https://github.com/yashbhal/storytotest",
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /view project/i })).toHaveAttribute(
      "href",
      "https://github.com/yashbhal/storytotest",
    );
    expect(screen.getByRole("link", { name: "All work" })).toHaveAttribute(
      "href",
      "/work",
    );
  });
});

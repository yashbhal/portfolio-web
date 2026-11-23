import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { StoryCard } from "../../app/components/StoryCard";

describe("StoryCard", () => {
  it("lets the user pause and resume the auto-advancing story", async () => {
    const user = userEvent.setup();
    render(<StoryCard />);

    const pause = screen.getByRole("button", { name: "Pause story" });
    expect(pause).toHaveAttribute("aria-pressed", "false");

    await user.click(pause);
    expect(screen.getByRole("button", { name: "Play story" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Play story" }));
    expect(
      screen.getByRole("button", { name: "Pause story" }),
    ).toBeInTheDocument();
  });

  it("exposes the current slide and progress controls", () => {
    render(<StoryCard />);

    expect(
      screen.getByRole("group", { name: /what yash is currently doing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /slide 1: forward deployed engineer/i,
      }),
    ).toHaveAttribute("aria-current", "true");
  });
});

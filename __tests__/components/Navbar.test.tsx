import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "../../app/components/Navbar";
import { ThemeProvider } from "../../app/components/ThemeProvider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

const renderNavbar = () =>
  render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );

describe("Navbar mobile menu", () => {
  it("opens, locks scroll, and closes on Escape", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
    expect(toggle).toHaveFocus();
  });

  it("closes when the user clicks outside", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    fireEvent.pointerDown(document.body);

    expect(screen.getByRole("button", { name: "Toggle menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(document.body.style.overflow).toBe("");
  });
});

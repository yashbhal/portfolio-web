import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "../app/components/ThemeProvider";

const ThemeControl = () => {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{theme}</button>;
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("restores a saved theme", async () => {
    localStorage.setItem("theme", "portfolioDark");

    render(
      <ThemeProvider>
        <ThemeControl />
      </ThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveTextContent("portfolioDark");
    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "portfolioDark")
    );
  });

  it("toggles and persists the theme", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeControl />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("portfolioDark");
    expect(localStorage.getItem("theme")).toBe("portfolioDark");
  });
});

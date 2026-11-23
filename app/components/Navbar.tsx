"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "About", path: "/#about" },
  { name: "Work", path: "/#work" },
  { name: "Blog", path: "/blog" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenedAt, setMenuOpenedAt] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Derived, not state-in-effect: navigating away closes the menu on its own.
  const isMenuOpen = menuOpen && menuOpenedAt === pathname;
  const setMenu = useCallback(
    (open: boolean) => {
      setMenuOpenedAt(pathname);
      setMenuOpen(open);
    },
    [pathname],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu(false);
      menuButtonRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }
      setMenu(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen, setMenu]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full">
      {/* Main Navbar */}
      <nav
        className={`relative h-16 w-full transition-all duration-300 md:h-20 ${
          isScrolled
            ? "bg-base-100/90 shadow-lg backdrop-blur-md"
            : "bg-base-100/80 backdrop-blur-sm"
        } `}
      >
        <div className="container-responsive h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="font-heading text-lg transition-all duration-300 hover:opacity-80 sm:text-xl md:text-2xl"
            >
              Yash Bhalchandra
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 md:flex lg:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hover:text-base-content/70 hover:bg-base-200/50 rounded-lg px-3 py-2 text-base font-medium transition-colors duration-300 lg:text-lg"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="hover:bg-base-200/50 rounded-lg p-2 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === "portfolioLight" ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                ref={menuButtonRef}
                onClick={() => setMenu(!isMenuOpen)}
                className="hover:bg-base-200/50 inline-flex items-center justify-center rounded-lg p-2 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`bg-base-100 absolute top-16 right-0 left-0 w-full shadow-lg transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"} `}
      >
        <div className="container-responsive py-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMenu(false)}
                className="hover:bg-base-200/50 rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setMenu(false);
              }}
              className="hover:bg-base-200/50 flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "portfolioLight" ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

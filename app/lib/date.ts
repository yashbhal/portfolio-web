/**
 * Date helpers.
 *
 * Frontmatter dates are calendar dates ("2025-01-31"), not instants. Parsing
 * them with `new Date("2025-01-31")` treats them as UTC midnight, which renders
 * as the previous day in western timezones. Anchor them to local noon instead.
 */

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const PRESENT = /present/i;

export function parseDateValue(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed || PRESENT.test(trimmed)) return null;

  const parsed = new Date(
    DATE_ONLY.test(trimmed) ? `${trimmed}T12:00:00` : trimmed,
  );

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** "August 2026" -> "Aug 2026"; unparseable values pass through unchanged. */
export function formatMonthYear(value: string): string {
  const trimmed = value.trim();
  if (PRESENT.test(trimmed)) return "Present";

  const parsed = parseDateValue(trimmed);
  if (!parsed) return trimmed;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} — ${end}`;
}

/** "2025-01-31" -> "January 31, 2025", independent of the server's timezone. */
export function formatPostDate(value: string): string {
  const parsed = parseDateValue(value);
  if (!parsed) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

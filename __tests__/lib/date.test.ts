import { describe, expect, it } from "vitest";
import {
  formatDateRange,
  formatMonthYear,
  formatPostDate,
  parseDateValue,
} from "../../app/lib/date";

describe("date helpers", () => {
  it("formats a date-only value without a timezone off-by-one", () => {
    // Suite runs with TZ=America/Los_Angeles, where UTC midnight is Jan 30.
    expect(formatPostDate("2025-01-31")).toBe("January 31, 2025");
  });

  it("formats month/year values and passes through unparseable ones", () => {
    expect(formatMonthYear("August 2026")).toBe("Aug 2026");
    expect(formatMonthYear("Present")).toBe("Present");
    expect(formatMonthYear("sometime")).toBe("sometime");
  });

  it("formats ranges with Present for a missing end date", () => {
    expect(formatDateRange("August 2026")).toBe("Aug 2026 — Present");
    expect(formatDateRange("August 2025", "January 2026")).toBe(
      "Aug 2025 — Jan 2026",
    );
  });

  it("rejects empty or unparseable values", () => {
    expect(parseDateValue("")).toBeNull();
    expect(parseDateValue("   ")).toBeNull();
    expect(parseDateValue("not a date")).toBeNull();
    expect(parseDateValue("2025-01-31")).toBeInstanceOf(Date);
  });
});

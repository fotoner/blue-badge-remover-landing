import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQItem } from "../FAQItem";

describe("FAQItem", () => {
  it("renders question text", () => {
    render(<FAQItem question="Test question?" answer="Test answer." />);
    expect(screen.getByText("Test question?")).toBeInTheDocument();
  });

  it("hides answer by default", () => {
    const { container } = render(<FAQItem question="Q?" answer="A." />);
    const details = container.querySelector("details");
    expect(details).not.toHaveAttribute("open");
  });

  it("shows answer when clicked", async () => {
    const user = userEvent.setup();
    render(<FAQItem question="Q?" answer="A." />);
    await user.click(screen.getByText("Q?"));
    expect(screen.getByText("A.")).toBeVisible();
  });
});

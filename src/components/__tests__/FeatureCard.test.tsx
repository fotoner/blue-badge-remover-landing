import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { LucideIcon } from "lucide-react";
import { FeatureCard } from "../FeatureCard";

vi.mock("lucide-react", () => ({
  Shield: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="shield-icon" />
  ),
}));

describe("FeatureCard", () => {
  it("renders icon, title, and description", () => {
    const Shield = ((props: any) => <span {...props} data-testid="test-icon" />) as unknown as LucideIcon;
    render(
      <FeatureCard icon={Shield} title="Test Title" description="Test Description" />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("applies span classes for grid sizing", () => {
    const Shield = ((props: any) => <span {...props} data-testid="test-icon" />) as unknown as LucideIcon;
    const { container } = render(
      <FeatureCard
        icon={Shield}
        title="Wide Card"
        description="Spans 2 columns"
        className="sm:col-span-2"
      />,
    );
    expect(container.firstChild).toHaveClass("sm:col-span-2");
  });
});

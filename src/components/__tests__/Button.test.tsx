import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-accent-blue");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-border");
  });

  it("calls onClick handler", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders as anchor when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

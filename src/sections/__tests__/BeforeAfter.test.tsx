import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BeforeAfter } from "../BeforeAfter";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({
  Check: ({ className, ...props }: Record<string, unknown>) => (
    <span className={className as string} {...props} data-testid="check-icon" />
  ),
  ShieldAlert: ({ className, ...props }: Record<string, unknown>) => (
    <span
      className={className as string}
      {...props}
      data-testid="shield-icon"
    />
  ),
}));

function renderDemo() {
  return render(
    <I18nProvider>
      <BeforeAfter />
    </I18nProvider>,
  );
}

describe("BeforeAfter (Live Demo)", () => {
  it("renders section heading and subtitle", () => {
    renderDemo();
    expect(screen.getByText("이렇게 작동합니다")).toBeInTheDocument();
    expect(
      screen.getByText(/토글을 켜보세요/),
    ).toBeInTheDocument();
  });

  it("renders all tweets initially", () => {
    renderDemo();
    expect(screen.getByText(/이 코인 지금 안 사면/)).toBeInTheDocument();
    expect(screen.getByText(/투자 정보 드립니다/)).toBeInTheDocument();
    expect(screen.getByText(/날씨 진짜 좋다/)).toBeInTheDocument();
    expect(screen.getByText(/영화 진짜 추천/)).toBeInTheDocument();
  });

  it("renders the extension header with toggle", () => {
    renderDemo();
    expect(screen.getByText("Blue Badge Remover")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enable filtering/i }),
    ).toBeInTheDocument();
  });

  it("shows spam badge indicators on spam tweets", () => {
    renderDemo();
    const badges = screen.getAllByText("유료 뱃지 감지");
    expect(badges).toHaveLength(2);
  });

  it("toggles filter on click", async () => {
    const user = userEvent.setup();
    renderDemo();

    const toggle = screen.getByRole("button", { name: /enable filtering/i });
    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: /disable filtering/i }),
    ).toBeInTheDocument();
  });
});

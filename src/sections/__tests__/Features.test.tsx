import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Features } from "../Features";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({}));

function renderFeatures() {
  return render(
    <I18nProvider>
      <Features />
    </I18nProvider>,
  );
}

describe("Features", () => {
  it("renders section title", () => {
    renderFeatures();
    expect(screen.getByText("주요 기능")).toBeInTheDocument();
  });

  it("renders all 4 feature tabs", () => {
    renderFeatures();
    expect(screen.getByText("유료 뱃지 감지")).toBeInTheDocument();
    expect(screen.getByText("트윗 필터링")).toBeInTheDocument();
    expect(screen.getByText("숨김 모드")).toBeInTheDocument();
    expect(screen.getByText("화이트리스트")).toBeInTheDocument();
  });

  it("shows first feature description by default", () => {
    renderFeatures();
    expect(
      screen.getByText(/API 응답 분석으로 유료 구독 뱃지/),
    ).toBeInTheDocument();
  });

  it("switches feature on tab click", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("트윗 필터링"));
    expect(
      screen.getByText(/홈 타임라인, 트윗 상세, 검색 결과/),
    ).toBeInTheDocument();
  });

  it("has features id for anchor navigation", () => {
    const { container } = renderFeatures();
    expect(container.querySelector("#features")).toBeInTheDocument();
  });
});

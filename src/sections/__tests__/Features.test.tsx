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

  it("renders all 6 feature tabs", () => {
    renderFeatures();
    expect(screen.getByText("유료 뱃지 감지")).toBeInTheDocument();
    expect(screen.getByText("트윗 필터링")).toBeInTheDocument();
    expect(screen.getByText("선택 필터")).toBeInTheDocument();
    expect(screen.getByText("숨김 모드")).toBeInTheDocument();
    expect(screen.getByText("화이트리스트")).toBeInTheDocument();
    expect(screen.getByText("인용 트윗 처리")).toBeInTheDocument();
  });

  it("shows first feature description by default", () => {
    renderFeatures();
    // 감지는 X API가 아니라 뱃지 모양(SVG) 분석으로 한다
    expect(screen.getByText(/뱃지 모양을 직접 분석해/)).toBeInTheDocument();
    expect(screen.queryByText(/API 응답 분석/)).not.toBeInTheDocument();
  });

  it("switches feature on tab click", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("트윗 필터링"));
    expect(screen.getByText(/북마크·리스트/)).toBeInTheDocument();
    // 데모도 대시보드의 필터링 범위 5개와 리트윗 옵션을 보여준다
    for (const scope of ["홈 타임라인", "트윗 상세 / 답글", "검색 결과", "북마크", "리스트", "파딱 리트윗 숨기기"]) {
      expect(screen.getByText(scope)).toBeInTheDocument();
    }
  });

  it("선택 필터 탭은 키워드 필터·신규 고확산 계정·보호 키워드를 소개한다", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("선택 필터"));
    expect(screen.getByText(/키워드 필터\(Beta\)/)).toBeInTheDocument();
    expect(screen.getByText(/신규 고확산 계정 숨기기/)).toBeInTheDocument();
    expect(screen.getByText(/보호 키워드/)).toBeInTheDocument();
  });

  it("has features id for anchor navigation", () => {
    const { container } = renderFeatures();
    expect(container.querySelector("#features")).toBeInTheDocument();
  });
});

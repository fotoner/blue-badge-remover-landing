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
    // 팔로우·화이트리스트·본인이 리트윗한 파딱 트윗은 항상 보인다
    expect(screen.getByText(/팔로우하지 않은 계정이 리트윗한 파딱 트윗/)).toBeInTheDocument();
    // 데모도 대시보드의 필터링 범위 5개와 리트윗 옵션을 보여준다
    for (const scope of ["홈 타임라인", "트윗 상세 / 답글", "검색 결과", "북마크", "리스트", "파딱 리트윗 숨기기"]) {
      expect(screen.getByText(scope)).toBeInTheDocument();
    }
  });

  it("선택 필터 탭은 키워드 필터·신규 고확산 계정·보호 키워드를 소개한다", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("선택 필터"));
    // 확장 UI에는 더 이상 Beta 표시가 없다
    expect(screen.queryByText(/\(Beta\)/)).not.toBeInTheDocument();
    expect(screen.getByText(/키워드 필터는/)).toBeInTheDocument();
    // 신규 고확산은 '빠르게 퍼지는지'가 아니라 고정 조건으로 판정한다
    expect(screen.getByText(/생성 6개월 이내·팔로워 1천 명 이상·팔로잉\/팔로워 비율 10% 이하/)).toBeInTheDocument();
    // 보호 키워드는 선택 필터뿐 아니라 파딱 계정 판정 전체에 적용된다.
    // 단, 보호 계정의 트윗도 '트윗 전체 숨기기' 인용 처리로는 숨겨질 수 있으므로 '언제나'라고 하지 않는다
    expect(screen.getByText(/보호 키워드가 아이디·이름·소개에 있는 파딱 계정은 숨기지 않습니다/)).toBeInTheDocument();
    expect(screen.queryByText(/언제나/)).not.toBeInTheDocument();
  });

  it("숨김 모드 탭은 확장과 같은 모드 이름과 접힘 문구를 보여준다", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("숨김 모드"));
    expect(screen.getByText(/완전 제거\(기본\)/)).toBeInTheDocument();
    expect(screen.getByText("완전 제거")).toBeInTheDocument();
    expect(screen.getByText("접어서 표시")).toBeInTheDocument();
    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
    expect(screen.getByText("파딱 @spam_user의 트윗이 숨겨졌습니다 (클릭하여 펼치기)")).toBeInTheDocument();
  });

  it("인용 트윗 탭은 확장과 같은 선택지와 접힘 문구, 예외 규칙을 보여준다", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("인용 트윗 처리"));
    for (const label of ["필터링하지 않음", "인용 부분만 숨기기", "트윗 전체 숨기기"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.queryByText("Quote Only")).not.toBeInTheDocument();
    expect(screen.getByText("파딱 @spam의 인용 트윗이 숨겨졌습니다 (클릭하여 펼치기)")).toBeInTheDocument();
    // 인용 부분만 숨기는 예외는 '트윗 전체 숨기기'를 골랐을 때만 적용된다
    expect(screen.getByText(/'트윗 전체 숨기기'를 골라도 팔로우·화이트리스트 계정의 트윗은 인용 부분만 숨깁니다/)).toBeInTheDocument();
  });

  it("화이트리스트 탭은 접힌 트윗에서 바로 추가하는 기능이 접어서 표시 모드 전용임을 알린다", async () => {
    const user = userEvent.setup();
    renderFeatures();

    await user.click(screen.getByText("화이트리스트"));
    expect(screen.getByText(/'접어서 표시' 모드에서는 접힌 트윗을 펼쳐/)).toBeInTheDocument();
  });

  it("has features id for anchor navigation", () => {
    const { container } = renderFeatures();
    expect(container.querySelector("#features")).toBeInTheDocument();
  });
});

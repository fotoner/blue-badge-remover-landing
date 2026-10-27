import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQ } from "../FAQ";
import { I18nProvider } from "../../hooks/useI18n";

describe("FAQ", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.getByText("자주 묻는 질문")).toBeInTheDocument();
  });

  it("renders all 8 questions", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.getByText(/모바일.*쓸 수 있나요/)).toBeInTheDocument();
    expect(screen.getByText(/트친이 파란 뱃지/)).toBeInTheDocument();
    expect(screen.getByText(/수익 목적이 아닌/)).toBeInTheDocument();
    expect(screen.getByText(/Firefox·Edge에서도/)).toBeInTheDocument();
    expect(screen.getByText(/계정 정지/)).toBeInTheDocument();
    expect(screen.getByText(/조회수도 안 올라가나요/)).toBeInTheDocument();
    expect(screen.getByText(/기업 인증.*숨겨지나요/)).toBeInTheDocument();
    expect(screen.getByText(/개인정보를 수집/)).toBeInTheDocument();
  });

  it("Firefox·Edge 지원 여부를 현재 배포 상태대로 답한다", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.queryByText(/검토 중/)).not.toBeInTheDocument();
    expect(screen.getByText(/Firefox 부가 기능, Edge 추가 기능에서 설치할 수 있습니다/)).toBeInTheDocument();
  });

  it("일부 파딱만 숨기고 싶을 때 설정의 '필터'와 예외 방법을 안내한다", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    // 확장 설정 화면의 섹션 이름은 '필터'이고, 본인 트윗·보호 키워드도 예외다
    expect(screen.getByText(/설정의 '필터'에서/)).toBeInTheDocument();
    expect(screen.getByText(/본인 트윗/)).toBeInTheDocument();
    expect(screen.getByText(/보호 키워드/)).toBeInTheDocument();
  });

  it("팔로우 목록은 사용 중 자동으로 모이고, 빠진 계정은 팔로잉 페이지를 스크롤해 채운다고 답한다", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.queryByText(/팔로잉 페이지를 방문하면/)).not.toBeInTheDocument();
    expect(screen.getByText(/사용하는 동안 자동으로 모이고/)).toBeInTheDocument();
  });

  it("개인정보 답변이 외부 통신이 전혀 없다고 과장하지 않는다", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    // 설정 화면은 웹 폰트를 불러오므로 '외부 서버와 통신하지 않는다'는 사실과 다르다
    expect(screen.queryByText(/외부 서버와 통신하지 않습니다/)).not.toBeInTheDocument();
    expect(screen.getByText(/개발자나 제3자에게 데이터를 보내지 않습니다/)).toBeInTheDocument();
  });

  it("has faq id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(container.querySelector("#faq")).toBeInTheDocument();
  });
});

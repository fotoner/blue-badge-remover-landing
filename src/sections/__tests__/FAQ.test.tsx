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
    expect(screen.getByText(/Firefox에서도/)).toBeInTheDocument();
    expect(screen.getByText(/계정 정지/)).toBeInTheDocument();
    expect(screen.getByText(/조회수도 안 올라가나요/)).toBeInTheDocument();
    expect(screen.getByText(/기업 인증.*숨겨지나요/)).toBeInTheDocument();
    expect(screen.getByText(/개인정보를 수집/)).toBeInTheDocument();
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

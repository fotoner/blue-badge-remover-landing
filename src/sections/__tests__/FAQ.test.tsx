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

  it("renders all 4 questions", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.getByText("팔로우 중인 계정도 숨겨지나요?")).toBeInTheDocument();
    expect(screen.getByText(/기업 인증 계정/)).toBeInTheDocument();
    expect(screen.getByText("개인정보를 수집하나요?")).toBeInTheDocument();
    expect(screen.getByText(/Firefox나 Safari/)).toBeInTheDocument();
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

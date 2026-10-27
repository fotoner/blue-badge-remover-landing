import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Privacy } from "../Privacy";
import { I18nProvider } from "../../hooks/useI18n";

function renderPrivacy() {
  return render(
    <I18nProvider>
      <Privacy />
    </I18nProvider>,
  );
}

describe("Privacy", () => {
  it("외부 통신이 전혀 없다고 과장하지 않는다", () => {
    renderPrivacy();
    // 확장의 설정 화면은 웹 폰트를 불러오므로 외부 요청이 아예 없는 것은 아니다
    expect(screen.queryByText(/외부 서버와 통신하지 않습니다/)).not.toBeInTheDocument();
    expect(screen.queryByText(/어떤 정보도 외부로 전송되지 않습니다/)).not.toBeInTheDocument();
  });

  it("데이터를 개발자·제3자에게 보내지 않고 브라우저에만 저장한다고 알린다", () => {
    renderPrivacy();
    expect(screen.getByText(/개발자나 제3자 서버로 데이터를 보내지 않습니다/)).toBeInTheDocument();
    expect(screen.getByText(/설정·목록·통계는 내 브라우저에만 저장됩니다/)).toBeInTheDocument();
  });
});

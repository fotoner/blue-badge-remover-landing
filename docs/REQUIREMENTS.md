# 요구사항 (EARS 기반)

EARS(Easy Approach to Requirements Syntax) 패턴으로 작성된 요구사항.
MECE 도메인별로 분류.

## EARS 패턴 참조

| 패턴 | 키워드 | 템플릿 |
|------|--------|--------|
| Ubiquitous | (없음) | "시스템은 {응답}해야 한다" |
| State-driven | While | "While {조건}, 시스템은 {응답}해야 한다" |
| Event-driven | When | "When {트리거}, 시스템은 {응답}해야 한다" |
| Unwanted | If...Then | "If {조건}, Then 시스템은 {응답}해야 한다" |
| Optional | Where | "Where {기능 포함 시}, 시스템은 {응답}해야 한다" |
| Complex | While+When | "While {조건}, When {트리거}, 시스템은 {응답}해야 한다" |

## MECE 도메인 분해 원칙

- 도메인은 **MECE**(Mutually Exclusive, Collectively Exhaustive)로 분해한다
- 각 도메인은 독립적이고 겹치지 않으며, 전체를 빠짐없이 커버한다
- 도메인 코드는 `D{번호}` 형식 (예: D1, D2, D3)
- 각 도메인 내에서 하위 도메인은 `D{번호}.{하위번호}` 형식
- 요구사항 ID는 `[D{n}.{m}-{순번}]` 형식 (예: [D1.1-01])

---

## D1: Hero & CTA

### D1.1: 히어로 섹션

- **[D1.1-01][Ubiquitous]** 시스템은 제품의 핵심 가치를 한 문장으로 전달하는 히어로 섹션을 표시해야 한다
- **[D1.1-02][Ubiquitous]** 시스템은 Chrome 웹 스토어로 연결되는 CTA 버튼을 표시해야 한다
- **[D1.1-03][When]** When CTA 버튼이 클릭되면, 시스템은 GA4에 전환 이벤트를 전송해야 한다

## D2: Feature Showcase

### D2.1: 기능 소개

- **[D2.1-01][Ubiquitous]** 시스템은 주요 기능(뱃지 감지, 트윗 필터링, 화이트리스트, 다국어)을 시각적으로 소개해야 한다
- **[D2.1-02][Ubiquitous]** 각 기능은 아이콘, 제목, 설명으로 구성되어야 한다

## D3: Social Proof

### D3.1: 신뢰 요소

- **[D3.1-01][Ubiquitous]** 시스템은 바이럴 실적(RT 수, 사용자 반응 등)을 표시해야 한다
- **[D3.1-02][Ubiquitous]** 시스템은 프라이버시 보호 정책(데이터 미수집)을 명시해야 한다

## D4: Guide & FAQ

### D4.1: 설치 가이드

- **[D4.1-01][Ubiquitous]** 시스템은 단계별 설치 가이드를 표시해야 한다

### D4.2: FAQ

- **[D4.2-01][Ubiquitous]** 시스템은 자주 묻는 질문과 답변을 아코디언 형태로 표시해야 한다

## D5: Layout & Navigation

### D5.1: 공통 레이아웃

- **[D5.1-01][Ubiquitous]** 시스템은 헤더(로고, 네비게이션, 언어 전환)와 푸터(크레딧, 링크)를 표시해야 한다
- **[D5.1-02][When]** When 언어 전환 버튼이 클릭되면, 시스템은 전체 페이지의 텍스트를 선택된 언어(Ko/En/Ja)로 변경해야 한다
- **[D5.1-03][Ubiquitous]** 시스템은 모바일/태블릿/데스크톱에서 반응형으로 표시되어야 한다

### D5.2: 라우팅

- **[D5.2-01][When]** When URL이 변경되면, 시스템은 TanStack Router를 통해 해당 페이지를 렌더링해야 한다

## D6: Analytics & SEO

### D6.1: GA4 연동

- **[D6.1-01][When]** When 페이지가 로드되면, 시스템은 GA4 페이지뷰 이벤트를 전송해야 한다
- **[D6.1-02][When]** When CTA 버튼이 클릭되면, 시스템은 GA4 전환 이벤트를 전송해야 한다

### D6.2: SEO

- **[D6.2-01][Ubiquitous]** 시스템은 적절한 메타태그(title, description, OG)를 포함해야 한다
- **[D6.2-02][Ubiquitous]** 시스템은 구조화 데이터(JSON-LD)를 포함해야 한다

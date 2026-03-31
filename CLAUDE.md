# Blue Badge Remover Landing

X(Twitter)에서 유료 파란 뱃지 계정을 숨기는 Chrome 확장 프로그램 "Blue Badge Remover"의 소개 및 설치 유도 랜딩 페이지.

## 기술 스택

- **언어**: TypeScript (strict)
- **UI 프레임워크**: React 19
- **스타일링**: Tailwind CSS 4
- **라우팅**: TanStack Router (파일 기반)
- **빌드**: Vite
- **테스트**: Vitest + React Testing Library
- **분석**: Google Analytics 4 (GA4)
- **배포**: GitHub Pages (정적 SPA)

## 아키텍처

Route-Centric Feature 구조

```
routes → sections → components → lib
```

교차 관심사(i18n, analytics 등)는 `lib/` 모듈을 통해서만 접근.

상세: `docs/ARCHITECTURE.md`

## 핵심 규칙

### TDD 필수
1. 실패하는 테스트 먼저 작성
2. 테스트를 통과하는 최소한의 코드만 구현
3. 리팩토링 시 테스트가 여전히 통과하는지 확인

### 브랜치 전략
- `main`에 직접 커밋 금지. 모든 작업은 feature 브랜치에서 수행
- 관련 이슈를 논리적 단위로 묶어 1개 브랜치로 작업
- **squash merge 전 코드 리뷰 필수** (`superpowers:requesting-code-review`)
- 완료 후 squash and merge로 main에 통합
- 상세: `docs/CONVENTIONS.md`

### 코딩
- 타입 안전성 위반 금지 — 명시적 타입 선언
- 디버그 출력 금지 — 구조화된 로거 사용
- 외부 데이터는 경계에서 검증
- 파일 최대 300줄, 함수 최대 50줄

### 점진적 하네스
- 에이전트가 같은 실수 2회 반복 → 이 파일 또는 QUALITY_RULES.md에 규칙 추가
- 문서 규칙으로도 위반 반복 → 린터/테스트로 승격하여 기계적 강제

## 프로젝트 관리

- **이슈/스프린트**: `docs/cycle/` (마크다운 기반)
- **스프린트**: 1주 단위 (월요일 시작)
- **작업 제목 형식**: `[D{도메인}.{번호}][EARS패턴] 요구사항 설명`
- **스킬**: `/manage-cycle` 로 이슈/스프린트 관리

## 문서 참조

| 문서 | 내용 |
|------|------|
| `docs/ARCHITECTURE.md` | 아키텍처 맵, 의존성 방향 규칙 |
| `docs/REQUIREMENTS.md` | EARS 기반 요구사항 (MECE 도메인별) |
| `docs/QUALITY_RULES.md` | TDD + 코딩 + 아키텍처 제약 규칙 |
| `docs/CONVENTIONS.md` | 작업/커밋/PR 컨벤션 |
| `docs/CODE_REVIEW.md` | 코드 리뷰 필수 규칙, 리뷰 관점 |
| `docs/RELIABILITY.md` | 에러 처리 정책, 데이터 무결성 |
| `docs/SECURITY.md` | 환경 변수 관리, 데이터 보호 |

## 디렉토리 구조

```
src/
├── routes/          # TanStack Router 파일 기반 라우팅
│   ├── __root.tsx   # 루트 레이아웃 (Header, Footer)
│   ├── index.tsx    # 메인 랜딩 페이지 (/)
│   └── ...          # 추가 페이지 라우트
├── sections/        # 페이지 섹션 컴포넌트
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── SocialProof.tsx
│   ├── Guide.tsx
│   └── FAQ.tsx
├── components/      # 재사용 UI 컴포넌트
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── hooks/           # 커스텀 React 훅
├── lib/             # 유틸리티, 상수, i18n, analytics
│   ├── i18n.ts
│   ├── analytics.ts
│   └── constants.ts
└── assets/          # 이미지, 아이콘, 폰트
```

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review

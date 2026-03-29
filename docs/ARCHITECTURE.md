# 아키텍처

## 아키텍처 패턴

Route-Centric Feature 구조

TanStack Router의 파일 기반 라우팅을 중심으로, 페이지 섹션과 재사용 컴포넌트를 분리하는 구조.
랜딩 페이지 규모에 적합하며, FSD보다 가볍고 flat 구조보다 체계적인 중간 지점.

## 구조

### 레이어 설명

| 레이어 | 역할 | 예시 |
|--------|------|------|
| `routes/` | URL ↔ 페이지 매핑, 데이터 로딩 | `__root.tsx`, `index.tsx` |
| `sections/` | 페이지를 구성하는 독립적 UI 블록 | `Hero`, `Features`, `SocialProof` |
| `components/` | 섹션에서 재사용하는 원자적 UI | `Button`, `Card`, `Badge` |
| `hooks/` | 상태/사이드이펙트 로직 재사용 | `useI18n`, `useScrollSpy` |
| `lib/` | 순수 유틸리티, 상수, 외부 연동 래퍼 | `i18n`, `analytics`, `constants` |
| `assets/` | 정적 리소스 | 이미지, 아이콘, 폰트 |

```
routes → sections → components → hooks → lib
                 ↘               ↗
                   lib (교차 관심사)
```

## 의존성 규칙

### 불변 원칙 (모든 아키텍처 패턴에 공통)

1. **단방향 의존성**: 정의된 의존성 방향만 허용. 역방향 의존성 금지
2. **경계 검증**: 시스템 경계(API 응답, 파일 파싱, 사용자 입력)에서 반드시 데이터 검증
3. **동일 레이어/모듈 간 참조 허용**: 같은 수준의 모듈끼리는 상호 참조 가능

### 프로젝트 특화 규칙

4. **섹션 독립성**: `sections/` 컴포넌트는 다른 섹션을 직접 import하지 않는다. 공유가 필요하면 `components/`로 추출
5. **routes는 조합만**: `routes/`는 섹션을 조합하고 레이아웃을 구성할 뿐, 비즈니스 로직을 포함하지 않는다
6. **lib은 React 무관**: `lib/`의 모듈은 React에 의존하지 않는다. React 관련 래핑이 필요하면 `hooks/`에서 처리

## 교차 관심사

`lib/` 모듈은 모든 레이어에서 임포트 가능:
- `i18n` — 다국어 텍스트 관리 (Ko/En/Ja)
- `analytics` — GA4 이벤트 전송 래퍼
- `constants` — 브랜딩 색상, URL, 메타데이터

## 데이터 흐름

```
[URL 변경] → TanStack Router → Route Component → Sections 조합 → 렌더링
                                                       ↓
[사용자 인터랙션] → Event Handler → analytics(GA4) / i18n(언어 전환)
```

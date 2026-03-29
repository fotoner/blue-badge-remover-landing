# 코드 리뷰

## 필수 규칙

**squash merge 이전에 반드시 코드 리뷰를 수행한다.** 코드 리뷰 없이 main에 merge하지 않는다.

## 리뷰 시점

| 시점 | 방법 |
|------|------|
| feature 브랜치 완료 후, squash merge 전 | `superpowers:requesting-code-review` 스킬 호출 |

## 리뷰 프로세스

```
1. feature 브랜치에서 구현 + 테스트 완료
2. superpowers:requesting-code-review 스킬로 코드 리뷰 요청
3. 리뷰 결과에서 Critical/Important 이슈 수정
4. 수정 후 재검증 (테스트 통과 확인)
5. squash merge to main
```

## 리뷰 관점

### 공통 (모든 프로젝트)

- **CLAUDE.md 규칙 준수**: 파일/함수 길이 제한, 아키텍처 의존성 방향, 코딩 규칙
- **기존 테스트 보존**: 새 코드 추가 시 기존 테스트가 삭제되지 않았는지 확인
- **타입 안전성**: 느슨한 타입 사용 회피
- **에러 처리**: 배치 작업은 per-record error handling 적용
- **경계 검증**: 외부 데이터에 스키마 검증 적용

### 프로젝트 특화

- **`any` 타입 금지**: TypeScript strict 모드 위반 여부 확인
- **접근성(a11y)**: 시맨틱 HTML, ARIA 속성, 키보드 탐색 가능 여부
- **반응형**: 모바일/태블릿/데스크톱 브레이크포인트에서 레이아웃 깨짐 여부
- **불필요한 리렌더링**: React.memo, useMemo, useCallback의 적절한 사용
- **Tailwind 일관성**: 커스텀 CSS 대신 Tailwind 유틸리티 클래스 우선 사용
- **i18n 누락**: 하드코딩된 텍스트가 없는지 확인 (모든 사용자 노출 텍스트는 i18n 경유)
- **GA4 이벤트**: CTA 등 주요 인터랙션에 analytics 이벤트가 누락되지 않았는지 확인
- **이미지 최적화**: 적절한 포맷(WebP/SVG), alt 속성, lazy loading 적용

## 리뷰 결과 처리

| 등급 | 조치 |
|------|------|
| Critical | 즉시 수정. merge 불가 |
| Important | merge 전 수정 |
| Suggestion | 다음 스프린트에서 처리 가능 |

## 병렬 워크트리 작업 시

병렬 에이전트가 각각 워크트리에서 작업한 경우, **각 워크트리 브랜치별로 개별 리뷰**한 후 main에 squash merge한다.

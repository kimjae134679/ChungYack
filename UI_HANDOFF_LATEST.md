# ChungYack Live UI — latest handoff

최종 갱신: 2026-09-05 KST

## 현재 실제 라이브 UI

- 배포 원본: `kimjae134679/stock/chungyack-apk/public/**`
- 라이브 주소: `https://kimjae134679.github.io/stock/chungyack/`
- APK 구조: 기존 `v0.8.0` 원격 HTML 셸 유지. 일반 UI 변경으로 APK 재빌드하지 않는다.
- 현재 화면 표기 버전: `v0.8.1-live`

## 2026-09-05 UI 개편

사용자가 승인한 두 개의 시각 도안을 참고해 실제 라이브 화면을 개편했다.

새 파일:
- `stock/chungyack-apk/public/assets/app-v8-ui.css`
- `stock/chungyack-apk/public/assets/app-v8-ui.js`

활성화 파일:
- `stock/chungyack-apk/public/index.html`
- `stock/chungyack-apk/public/sw.js`

배포:
- Pages workflow run `33963161475` SUCCESS
- 최종 배포 commit: `stock` `9e42474a411a23768d1a90bf25629fdcc5c29d49`

## 디자인 방향

기존 기능은 보존하면서 가독성을 최우선으로 재배치한다.

- 상단 청색 그라데이션 히어로 카드와 3개 핵심 카운터
- `전체 공고 / 저장 / 추적중 / 숨김`을 명확한 1차 필터로 유지
- `검토 / 조건부 / 보류 / 불가 / 전체`는 2차 필터
- 검색창을 독립된 큰 터치 영역으로 구성
- 공고 카드는 제목 → 기관/지역/유형 → 접수/모집 2개 핵심 타일 → 현재 상태 → 다음 일정 → 주소 → 행동 버튼 순서
- 카드 좌측 상태 색상 바 유지
- `저장 / 공식 공고 / 신청했음 → 추적` 버튼을 카드 하단에 고정된 3개 주요 행동으로 단순화
- `숨기기`는 카드 우측 상단의 보조 행동
- 홈의 시간별 보고는 중첩 accordion 없이 일정 그룹별 평면 타임라인 카드로 표시
- 기본 화면의 긴 검증 원문은 2줄 요약까지만 노출

## 절대 유지할 동작

- 저장 key: `chungyack.opportunity.saved.v1`
- 숨김 key: `chungyack.opportunity.hidden.v1`
- 보기 key: `chungyack.opportunity.view.v1`
- 기존 추적/백업/복원/localStorage 구조
- 공고 `id` 연결키
- 라이브 HTML 갱신 후에도 사용자 저장/숨김/추적 상태 유지

## 다음 작업자가 할 일

1. 새 UI를 실제 Galaxy S22 폭에서 확인한다.
2. 글자 겹침, 버튼 높이, 긴 공고명 2줄 처리, 접수/모집 타일 높이를 우선 QA한다.
3. 문제가 있으면 v8 CSS/JS만 수정하고 APK는 재빌드하지 않는다.
4. 데이터 자동갱신 스크립트가 `index.html`, `app-v8-ui.*`를 덮어쓰지 않는지 확인한다.
5. 사용자가 화면 캡처 피드백을 주면 v8 레이어에서만 조정한다.

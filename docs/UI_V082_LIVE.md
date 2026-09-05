# ChungYack live UI v0.8.2

갱신: 2026-09-05 KST

실제 라이브 소스는 `kimjae134679/stock/chungyack-apk/public/**`이며 APK는 v0.8.0 원격 HTML 셸을 그대로 사용한다. UI/데이터 수정 때문에 APK를 재빌드하지 않는다.

## v0.8.2 변경

- 홈의 시간그룹 공고 행을 탭 가능하게 변경.
- 홈 행 탭 시 상세 시트가 열리며 접수기간, 모집수, 현재요약, 주소, 결과/서류 발표 일정을 표시.
- 현재 검토 공고와 연결되는 항목은 상세 시트에서 `공고 화면에서 보기` 및 `공식 공고 열기` 가능.
- 공고 카드에 `🎯 결과 · 서류 발표` 행 추가.
- 결과 일정은 시간별 보고의 공식 일정 문구에서 `서류심사 대상자 발표`, `서류제출대상자 발표`, `예비입주자 발표`, `당첨자 발표`, `결과 발표` 등을 추출해 표시. 자료에 일정이 없으면 `공고문에서 발표 일정 확인 필요`로 표시하며 날짜를 추정하지 않음.
- 홈 각 행에도 발표 일정이 확인된 경우 파란 보조줄로 바로 표시.
- 저장/숨김/추적 localStorage 키와 공고 id는 기존 그대로 유지.

## active live files

- `stock/chungyack-apk/public/assets/app-v8-ui.css`
- `stock/chungyack-apk/public/assets/app-v8-ui.js`
- `stock/chungyack-apk/public/assets/app-v82-ui.css`
- `stock/chungyack-apk/public/assets/app-v82-ui.js`
- `stock/chungyack-apk/public/index.html`
- `stock/chungyack-apk/public/sw.js`

표시 버전: `v0.8.2-live`
서비스워커 캐시: `chungyack-live-v0.8.2-r1`

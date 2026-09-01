# ChungYack 앱 v0.6.0 완료 상태

최종 갱신: 2026-09-01 KST

## 사용자 요구 반영

- 공고 카드에서 `♡ 관심` / `♥ 관심` 전환
- 공고 카드에서 `☆ 북마크` / `★ 북마크` 전환
- `✅ 신청함 / 추적`으로 기존 추적 편집기에 연결
- `전체 / 관심만 / 북마크만 / 추적중만` 필터
- 관심·북마크 독립 저장
- 앱 재실행 후 관심·북마크·추적 및 선택 필터 유지
- JSON 백업/복원에 관심·북마크·저장 필터 포함
- 로컬 초기화 시 관련 상태도 함께 정리

## 발견 및 수정한 장애

`public/assets/app.js`의 검색 조건식에 닫는 괄호가 하나 더 있어 브라우저에서 전체 앱 초기화가 중단됐다. 기존 `npm run qa`는 파일 내용의 표식만 확인해 문법 오류를 놓쳤다.

수정 후 `npm run qa`가 모든 앱 레이어와 Service Worker, Android branding 스크립트의 문법까지 직접 검사한다.

## 검증 결과

- `npm run qa` 통과
- 관심 저장 및 관심만 필터 통과
- 북마크 저장 및 북마크만 필터 통과
- 신청 추적 저장 및 추적중만 필터 통과
- 페이지 재실행 후 상태 유지 통과
- 백업 생성 완료 표시 확인
- Capacitor Android 생성·동기화 통과
- Android 브랜딩 통과
- Gradle `assembleDebug` 통과
- APK 내부 버전 `0.6.0 (600)` 확인
- APK Signature Scheme v2 검증 통과

## 생성물

- `dist/ChungYack-Radar-v0.6.0-debug.apk`
- `reports/local-android-build-v0.6.0-2026-09-01.log`

# ChungYack 앱 v0.6.1 완료 상태

최종 갱신: 2026-09-02 KST

## 완료

- PR #4 `Release v0.6.1 final` 최신 main 기준 병합 완료
- 기존 관심 / 북마크 / 신청함·추적 기능 유지
- `전체 / 관심만 / 북마크만 / 추적중만` 필터 유지
- SH 2026년 2차 행복주택 청년 검증 UI 추가
- 사용자 제공 8개 후보와 현재회차 청년행 연결 상태 표시
- 추가 발견 청년 후보 공급/예비/우선·일반/임대조건 표시
- `officialFinal:false`를 강제하여 SH 공식 PDF/공급표 대조 전 확정값 오인 방지
- SH 국민임대 이번 회차 패스 유지
- Service Worker v0.6.1 캐시 갱신
- QA에서 행복주택 8개 후보, 주요 청년행, 은뜨락 25+예비41, officialFinal=false 검증

## Android

- GitHub Actions run: `33526245793`
- 결과: `success`
- APK artifact: `ChungYack-Radar-v0.6.1-debug-apk`
- Release tag: `apk-v0.6.1`
- Release asset: `ChungYack-Radar-v0.6.1-debug.apk`
- APK size: 4,183,300 bytes
- SHA-256: `f4369c329ac28700be71fad60184f1fad6169f985cc09f035525c20c0c50feca`
- signing cache: `chungyack-radar-debug-keystore-v1`

## 정리

- 충돌 난 이전 PR #3은 superseded로 종료
- 다음 데이터 작업은 SH 공식 PDF/공급표 확보 후 C단계 행복주택 청년행을 공식확정으로 승격하는 것

# ChungYack Current Status

최종 갱신: 2026-09-03 KST

## 1. 현재 청약 핵심

- `SH 2026년 국민임대주택` — 이번 회차 패스. 상세 추천·지도·행동후보 반복 금지.
- `SH 2026년 2차 행복주택` — 현재 메인 검토 공고. 2026-09-09 10:00 ~ 09-11 17:00, 전체 1,484호. 공식 공급표에서 청년 행만 추출·검증해야 함.
- 이번 회차 사용자 제공 공식 캡처의 1인가구(+20%p) 월평균소득 100% 값 `4,576,036원`을 우선 근거로 사용.
- 민간 집계/SNS/유튜브는 후보 발견용. 최종 판단은 공식 공고/PDF/공급표/임대조건표.

## 2. 신청 추적

- 비바힐스강변 — ✅ 신청완료 / 개인 결과확인 필요
- 센트레빌 웨스트온 청년형 특별공급 25형 — ✅ 신청완료 / 🎯 개인 결과확인 필요
- 호반써밋 양재 청년안심주택 공공임대 — 📄⚠️ 개인 대상자 여부 확인 필요
- UNIT125 18A — ✅ 예비 80번대
- 양천구 청년협동조합 공동체주택 — ✅ 신청완료 / 2026-11-25 결과 예정

## 3. 다음 공고 업무

- SH 2026년 2차 행복주택 전체 청년 공급행 공식 검증
- LH 경기남부 26년 3차 청년 매입임대 XLSX 실제 주택 단위 전개
- LH 인천·부천 26년 6차 청년 매입임대 XLSX 실제 주택 단위 전개
- SH 2026년 2차 장기미임대 매입임대 주소·가격·면적 전개
- 신청완료 공고 후속 결과→서류→계약→입주 추적

# 4. 앱 상태 — v0.7.1

2026-09-02 사용자 피드백에 따라 최근 누적 UI를 전면 재구축했다.

문제로 확정:
- 좋아요/북마크 중복
- 기본 화면 정보 과다
- 중첩 접기/펼치기
- 검증 원자료가 기본 UI를 압도
- 전반적 가독성 저하

현재 방향:
- 과거 읽기 쉬운 카드 구조를 기준으로 재시작
- 좋아요/북마크를 중복시키지 않고 **`저장` 하나로 통일**
- `저장한 공고`와 `신청 추적중` 전용 필터 제공
- 신청한 공고 카드에 `✅ 신청함 · 추적중` 표시
- 숨긴 공고는 별도 화면에서 복원
- 실제 신청한 공고만 추적
- 대형 검증자료는 데이터로 보존하되 기본 카드에서는 숨김

active 파일:
- `public/assets/app-v7.js`
- `public/assets/app-v7.css`
- `public/index.html`
- `VERSION` = `0.7.1`
- `package.json` = `0.7.1`
- `public/sw.js` = v0.7.1 cache

복구점:
- branch `backup-v0.6.1-before-ui-reset`
- commit `f20727d48d3fff35769432a8b7c568e8e51d3cbb`

기존 `app-v4/v5/v6/v61`은 호환성/과거 참고용이며 최종 사용자 화면은 v7이 덮어쓴다.

## 5. v0.7.1 APK 로컬 빌드 완료

2026-09-03 로컬 빌드/검증 성공:
- `dist/ChungYack-Radar-v0.7.1-debug.apk`
- versionName `0.7.1`, versionCode `701`
- APK SHA-256 `101D10CF8143AF19F211A4AB0CA5474EC66EBA83650B0AF57E3EDA4FB5009F78`
- signer SHA-256 `00908CB5CBFD5B94C841AC8FC028AE28B329CB7B0A0101345FCD3453574A13EA`
- 저장/필터/신청표시/추적필터/새로고침 유지/모바일 폭 검증 성공
- 로컬 빌드 스크립트가 Android SDK 위치를 자동 연결하도록 수정

GitHub Actions run `33658238577` 전 단계 성공. Release `apk-v0.7.1`은 로컬 연속서명 APK로 교체 후 재다운로드 검증까지 완료했다. 같은 버전의 이후 자동빌드가 Release 자산을 덮어쓰지 않도록 workflow도 보강했다. 실행 원장은 `ops/android-latest-run.json`을 따른다.

### 이전 v0.7.0 자동빌드 기록

GitHub Actions run `33546293696` — **SUCCESS**

통과 항목:
- UI and data QA
- Capacitor Android 생성/동기화
- 아이콘/Native Back 적용
- persistent debug signing key 복원
- Gradle assembleDebug
- APK rename
- artifact upload
- GitHub Release upload

생성물:
- `ChungYack-Radar-v0.7.0-debug-apk`
- Release `apk-v0.7.0`
- `ChungYack-Radar-v0.7.0-debug.apk`
- Release APK SHA-256 `f3deb5a2ff27b7ef062536d2f353639e6c94dc29c95ee1bdc6dc5119c28e2d7e`
- signing cache `chungyack-radar-debug-keystore-v1`

`ops/android-latest-run.json`도 success 상태로 정리 완료.

## 6. 앞으로 UI 수정 규칙

- 기능 수보다 가독성 우선.
- 같은 목적의 저장 버튼을 여러 개 만들지 않는다.
- 기본 카드에는 핵심 판단 정보만 둔다.
- 원자료/검증표를 기본 화면에 대량 노출하지 않는다.
- 중첩 accordion/details 금지.
- 새 기능은 하나씩 추가하고 실제로 화면을 더 편하게 만드는 경우에만 유지.

## 7. 다음 확인

1. 실제 v0.7.1 APK에서 공고 카드 가독성 확인
2. 저장 → 저장한 공고, 숨기기 → 숨긴 공고 → 복원 확인
3. 기존 관심/북마크의 단일 저장 이관 확인
4. 신청 표시/추적 필터와 추적 수정/삭제/되돌리기 확인
5. SH 행복주택 대량 검증 UI가 기본 카드에 다시 나오지 않는지 확인
6. 청약 데이터 공식 검증 업무 계속 진행

# ChungYack Handoff

최종 갱신: 2026-09-03 KST

새 대화·새 작업자·자동화는 이 문서와 `STATUS.md`를 먼저 읽고, 실제 앱 상태는 `VERSION` + main 최신 파일 + `ops/android-latest-run.json`을 최우선으로 본다.

## 0. 현재 배포 앱 — v0.8.0 라이브 셸

2026-09-03부터 실제 배포 기준은 번들형 v0.7.1이 아니라 **한 번 설치하는 원격 HTML 셸 v0.8.0**이다.

- 공개 라이브 HTML 기준점: `kimjae134679/stock/chungyack-apk/public/**`
- 라이브 주소: `https://kimjae134679.github.io/stock/chungyack/`
- APK release: `kimjae134679/stock` tag `chungyack-live-shell-v0.8.0`
- APK 파일: `ChungYack-Radar-Live-Shell-v0.8.0.apk`
- 소스 commit: `f9b8b0b979eb3b1a10a810615134c5d97a3ba103`
- Pages run: `33661958687` SUCCESS
- Android run: `33661958643` SUCCESS
- APK SHA-256: `22F5897314237E8FC6643840B5B0FD97125DE954DD2826CAF01B889DC0060B3B`
- Actions signing certificate SHA-256: `7BA627EE4C748015D8493DBED0E1623A39A0CA5FAE0042C34C74823FBA7E0543`

강제 운영 원칙:

- HTML/CSS/JS/공개 공고 데이터 수정은 `stock/chungyack-apk/public/**`만 바꾸고 Pages만 배포한다.
- 일반 UI·데이터 수정으로 APK 버전을 올리거나 APK를 다시 빌드하지 않는다.
- APK는 원격 URL, 패키지, 네이티브 브리지 자체가 바뀔 때만 재빌드한다.
- 저장 `chungyack.opportunity.saved.v1`, 숨김 `chungyack.opportunity.hidden.v1`, 보기 `chungyack.opportunity.view.v1`, 필터, 추적, 삭제복원 키를 유지한다.
- 공고 `id`는 사용자 기록의 연결키이므로 같은 공고에서 임의 변경하지 않는다.
- 공개 Pages의 `app.json`은 `trackingSeed: []`을 유지하고, 개인 신청·결과·예비·서류 상태를 공개 배포하지 않는다.
- 라이브 사이트에서 저장·숨김·추적을 만든 뒤 새로고침해도 세 상태가 모두 유지되는 것을 검증했다.

전환 주의:

- 최종 수동서명 v0.7.1 인증서(`00908CB5...`)와 v0.8.0 Actions 인증서(`7BA627EE...`)가 달라 Android가 기존 앱 위 덮어쓰기를 거부할 수 있다.
- 기존 v0.7.1에 기록이 있다면 먼저 앱 설정의 JSON 백업을 만든 후 기존 앱 삭제 → v0.8.0 설치 → 백업 가져오기 순서로 1회 전환한다.
- 원격 origin으로 바뀌므로 옛 번들형 `https://localhost` localStorage는 자동 이동하지 않는다. v0.8.0 설치 이후의 기록은 HTML 갱신과 무관하게 계속 유지된다.

## 1. 우선 읽기

1. `HANDOFF.md`
2. `STATUS.md`
3. `docs/MASTER_RULES.md`
4. `docs/USER_OUTPUT_OVERRIDES.md`
5. `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`
6. `docs/REPORTING_AND_MAP_RULES.md`
7. `data/tracking_registry.md`
8. `public/data/current-opportunities.json`
9. `reports/current_dashboard.html`
10. `ops/android-latest-run.json`

## 2. 청약 현재 핵심

- `SH 2026년 국민임대주택` — 2026-09-01 사용자 판단으로 이번 회차 패스. 상세·지도·행동후보 반복 금지.
- `SH 2026년 2차 행복주택` — 현재 메인 검토 공고.
  - 접수 2026-09-09 10:00 ~ 09-11 17:00
  - 전체 1,484호
  - 청년 공급행만 공식 공급표에서 따로 추출해야 함.
  - 이번 회차 사용자 제공 공식 캡처의 1인가구(+20%p) 월평균소득 100% 값 `4,576,036원`을 우선 근거로 사용.
- 민간 집계/집지켜/Zibble/SNS/유튜브는 후보 발견용. 최종 판단은 공식 공고/PDF/공급표/임대조건표.

## 3. 신청 추적

- 비바힐스강변 — ✅ 신청완료 / 개인 결과확인 필요
- 센트레빌 웨스트온 청년형 특별공급 25형 — ✅ 신청완료 / 🎯 개인 결과확인 필요
- 호반써밋 양재 청년안심주택 공공임대 — 📄⚠️ 개인 대상자 여부 확인 필요
- UNIT125 18A — ✅ 예비 80번대
- 양천구 청년협동조합 공동체주택 — ✅ 신청완료 / 2026-11-25 결과 예정

개인 당첨·예비·탈락은 공개검색으로 추정하지 않는다.

## 4. 다음 공고 업무

- SH 2026년 2차 행복주택 전체 청년 공급행 공식 검증
- LH 경기남부 26년 3차 청년 매입임대 실제 주택 XLSX 펼치기
- LH 인천·부천 26년 6차 청년 매입임대 실제 주택 XLSX 펼치기
- SH 2026년 2차 장기미임대 매입임대 주소·가격·면적 펼치기
- 신청완료 공고의 결과→서류→계약→입주 추적

## 5. 지도/보고 핵심 규칙

- 서울 25개 자치구 + 경기 전 시군 전수 탐색.
- 오늘·내일 / 2~3일 / 4~7일 / 이후 / 이미 신청 그룹별 지도.
- 정확한 공식 주소만 지도핀. 추정핀 금지.
- 패스/절대불가 공고는 상세·지도 반복 금지.
- 추천 숫자순위/별점 금지. 프로젝트 지정 상태 이모티콘 사용.

# 6. 앱 UI — v0.7.1 번들형 이력(참고용)

## 사용자 최신 판단

2026-09-02 사용자가 v0.5~v0.6.1 누적 UI를 전면 재검토했다.

문제로 확정:
- 예전 `숨기기` 중심 UI가 훨씬 읽기 쉬웠음
- 좋아요/북마크 역할 중복
- 기본 화면 정보량 과다
- 접기/펼치기 구조 불편
- SH 검증 상세가 기본 화면을 압도
- 전체 UI 가독성 저하

따라서 **v0.6.x에 기능을 더 붙이는 방식은 중단**한다.

## 복구점

기존 v0.6.1은 그대로 보존:

- branch: `backup-v0.6.1-before-ui-reset`
- base commit: `f20727d48d3fff35769432a8b7c568e8e51d3cbb`

이 브랜치는 복구/비교용이다. 새 UI 방향의 기준은 v0.7이다.

## 현재 active 파일

- `public/assets/app-v7.js`
- `public/assets/app-v7.css`
- `public/index.html`
- `VERSION` = `0.7.1`
- `package.json` = `0.7.1`
- `public/sw.js` cache = `chungyack-radar-v0.7.1-r1`

기존 `app-v4/v5/v6/v61`은 호환성/과거 구현 참고용. **최종 사용자 화면은 v7 렌더러가 마지막에 덮어쓴다.**

## v0.7 UI 강제 원칙

기본 공고 카드에는 아래만 우선 표시:
- 상태
- 공고명
- 기관/유형/지역
- 접수기간
- 모집수
- 내 조건 판정 요약
- 다음 행동
- 주소 요약
- 공식 공고
- `신청했음 → 추적`
- `☆ 저장 / ★ 저장됨`
- `숨기기`

저장/정리 기능:
- 좋아요/북마크처럼 겹치는 버튼은 하나의 **저장**으로 통일
- `★ 저장`에서 저장한 공고만 모아보기
- `✅ 추적중`에서 실제 신청한 현재 공고만 모아보기
- 신청한 공고 카드는 `✅ 신청함 · 추적중`으로 표시
- `숨긴 공고 N`에서 복원
- `숨김 모두 해제` 지원

유지 기능:
- 실제 신청 공고 추적
- 추적 수정/상태변경/제거
- 삭제 되돌리기
- JSON 백업/복원
- Native Back
- 최신 공고 데이터

기본 UI에서 제거:
- SH 행복주택 대형 검증표
- 사용자 화면 8개 후보 상세벽
- 추가 청년 후보 상세벽
- 여러 단계 중첩 details/accordion
- 같은 목적의 중복 버튼

**검증 데이터 자체는 삭제하지 않는다.** 화면에서만 감추고 분석/공식 검증에는 계속 사용한다.

## 로컬 상태

- 저장: `chungyack.opportunity.saved.v1`
- 숨김: `chungyack.opportunity.hidden.v1`
- 현재 보기: `chungyack.opportunity.view.v1` (`active`/`saved`/`tracked`/`hidden`)
- 추적/삭제복원은 기존 구조 유지
- 과거 v6의 관심/북마크는 v0.7.1 최초 시작 시 단일 저장 상태로 자동 이관한 뒤 구 키 제거

## 앞으로 UI 수정 시 금지

- 좋아요/북마크처럼 목적이 겹치는 저장 기능을 다시 분리하지 않는다.
- 기본 카드에 원자료를 전부 펼치지 않는다.
- 중첩 접기 UI를 만들지 않는다.
- 한 공고에 같은 목적의 버튼을 여러 개 만들지 않는다.
- 기능 수보다 가독성을 우선한다.

# 7. v0.7.1 번들형 APK 빌드 이력

2026-09-03 로컬 검증:
- `npm install → QA → Capacitor add/sync → Android branding → Gradle assembleDebug` 성공
- APK: `dist/ChungYack-Radar-v0.7.1-debug.apk`
- Android: `versionName 0.7.1`, `versionCode 701`
- application id: `com.kimjae134679.chungyack`
- SHA-256: `101D10CF8143AF19F211A4AB0CA5474EC66EBA83650B0AF57E3EDA4FB5009F78`
- signing certificate SHA-256: `00908CB5CBFD5B94C841AC8FC028AE28B329CB7B0A0101345FCD3453574A13EA`
- 이전에 직접 전달한 로컬 서명 APK와 인증서 연속성 확인
- 브라우저에서 저장/저장필터/새로고침 유지/신청추적 표시/추적필터/모바일 폭 검증 성공

GitHub Actions run `33658238577`도 전 단계 **SUCCESS**. Release `apk-v0.7.1`의 자동빌드 APK는 서명 불일치가 확인되어 같은 이름의 로컬 연속서명 APK로 교체했고, 다시 내려받아 SHA-256과 signer가 위 값과 동일함을 확인했다. 이후 같은 버전 자동빌드는 Release 자산을 덮어쓰지 않도록 workflow도 수정했다. 최종 run 원장은 `ops/android-latest-run.json`을 따른다.

## 이전 v0.7.0 자동빌드 기록

GitHub Actions 최종 run:
- run id: `33546293696`
- 결과: **SUCCESS**
- UI/data QA: success
- Capacitor add/sync: success
- Android branding / Native Back: success
- persistent debug signing key restore: success
- Gradle assembleDebug: success
- artifact upload: success
- Release upload: success

생성물:
- artifact: `ChungYack-Radar-v0.7.0-debug-apk`
- Release tag: `apk-v0.7.0`
- Release APK: `ChungYack-Radar-v0.7.0-debug.apk`
- Release APK SHA-256: `f3deb5a2ff27b7ef062536d2f353639e6c94dc29c95ee1bdc6dc5119c28e2d7e`
- signing cache: `chungyack-radar-debug-keystore-v1`

`ops/android-latest-run.json`도 success로 갱신했다.

# 8. 다음 작업자가 바로 할 일

0. UI/HTML/공고 데이터 수정은 반드시 `kimjae134679/stock/chungyack-apk/public/**`에 반영하고 Pages 배포만 확인한다. 일반 변경으로 APK를 재빌드하지 않는다.

1. 실제 v0.7.1 APK에서 공고 탭의 가독성을 최우선으로 확인
2. `★ 저장 → 저장한 공고`와 `숨기기 → 숨긴 공고 → 복원` 확인
3. 과거 관심/북마크가 단일 저장으로 이관되는지 확인
4. `신청했음 → 추적 → ✅ 신청함 · 추적중`과 추적 수정/삭제/되돌리기 확인
5. 대량 행복주택 검증 UI가 기본 카드에 다시 나오지 않는지 확인
6. 이후 기능은 한 번에 하나씩만 추가하고, 가독성이 좋아지는 경우에만 유지
7. 청약 데이터 검증 업무는 별도로 계속 진행

# ChungYack — 청약2 Project Hub

최종 갱신: 2026-09-01 KST

이 저장소는 청약2 프로젝트의 **단일 기준점(Single Source of Truth)** 이다. 새 대화·새 작업자·자동화·인수인계 시 이 저장소의 최신 상태를 우선 확인한다.

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

## 1. 가장 먼저 읽을 것

- 최상위 규칙 → `docs/MASTER_RULES.md`
- 사용자 최신 출력 우선규칙 → `docs/USER_OUTPUT_OVERRIDES.md`
- 사용자 조건 판정 표시규칙 → `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`
- 지도·통근·가격·대출·중복신청 규칙 → `docs/REPORTING_AND_MAP_RULES.md`
- 현재 진행상태 → `STATUS.md`
- 인수인계 → `HANDOFF.md`
- 신청/패스/결과 상태 원장 → `data/tracking_registry.md`
- 현재 앱 공고 데이터 → `public/data/current-opportunities.json`
- 현재 통합 HTML → `reports/current_dashboard.html`

문서 간 출력 형식이 충돌하면 사용자가 직접 지정한 최신 규칙을 우선한다.

## 2. 현재 프로젝트 핵심 상태

2026-09-01 기준:

- `SH 2026년 국민임대주택` — 사용자 판단으로 **이번 회차 패스**. 상세추천·지도·행동후보에서 제외.
- `SH 2026년 2차 행복주택` — **현재 메인 검토축**. 전체 1,484호, 2026-09-09 10:00 ~ 09-11 17:00 접수.
- 사용자 제공 이번 회차 공고문 캡처의 1인가구(+20%p) 월평균소득 100% 값 `4,576,036원`을 이번 공고 판단 기준으로 기록.
- 사용자 제공 집지켜 캡처에서 행복주택 8개 후보를 발견했으나, 민간 화면의 가격·단지정보는 후보발견용으로만 보존하고 이번 회차 `청년` 공급여부/공급수/임대조건은 공식 공급표로 재검증.
- `제8차 장기전세주택2(미리내집)` — 현재 프로젝트 프로필과 신혼/예비신혼 하드요건이 맞지 않아 행동후보 제외.
- Zibble·집지켜·SNS·유튜브·민간 집계는 발견용. 공식 공고/PDF/공급표/임대조건표가 최종 기준.

상세 현재상태는 `STATUS.md`를 따른다.

## 3. `오늘꺼 알려줘`의 의미

오늘 올라온 공고만 찾는 요청이 아니다. 항상 동시에 관리한다.

1. 현재 신청 가능
2. 곧 신청 시작
3. 신규 게시
4. 이미 신청
5. 결과발표 / 예비순번
6. 서류제출
7. 계약
8. 입주

탐색은 LH/SH/GH 등 메이저 기관만으로 끝내지 않는다. 서울 25개 자치구와 경기 전 시·군·구를 전수 탐색하고, 민간 집계·일반 웹검색·SNS·청약 관련 콘텐츠를 후보 발견용으로 이용한 뒤 공식자료로 재검증한다.

## 4. 보고 강제 규칙

- 사용자 추천 숫자순위/별점 기본 금지. 상태·긴급도는 지정 이모티콘 사용.
- 일정 그룹별 지도: 오늘·내일 / 2~3일 / 4~7일 / 이후 / 이미 신청.
- 공식자료에서 확인한 정확 도로명주소만 지도핀으로 사용. 추정핀 금지.
- 공고마다 `내 조건 판정 | 판정 근거 | 다시 볼 조건` 표시.
- `❌ 절대 불가`는 신혼전용·특정직종·필수거주기간 등 하드자격이 명확히 충돌할 때만 사용.
- 경쟁률·위치·가격 불리만으로 절대불가 처리 금지.
- 이번 회차 공급표/임대조건표 기준의 모집호수·공가/예비·보증금·월세 사용.
- 민간 화면의 금액은 공식 임대조건표 확인 전 확정값으로 쓰지 않음.
- 서로 다른 공고의 중복신청/택1 여부 확인.
- 패스 공고 상세·지도·추천 반복 금지.
- 이미 신청한 공고는 결과→서류→계약→입주까지 추적.

## 5. 청약 레이더 Android / PWA

현재 목표 버전: **v0.5.0**

```text
public/
  index.html
  assets/
    app.css
    app-v2.css
    app-v3.css
    app-v4.css
    app-v5.css
    app.js
    app-v2-fixes.js
    app-v3.js
    app-v4.js
    app-v5.js
    app-icon.svg
  data/
    app.json
    hourly-report.json
    current-opportunities.json
    sh-2026.csv
  manifest.webmanifest
  sw.js
```

### 현재 앱 레이어

- `app.js` — 로컬 추적/기존 카탈로그 핵심 기반.
- `app-v2-fixes.js` — 추적 안정성, 시간별 보고, 사용자 조건 판정 박스.
- `app-v3.js` — 삭제 되돌리기, JSON 백업/복원, Native Back 보정.
- `app-v4.js` — 기본 공고화면을 국민임대 카탈로그에서 `current-opportunities.json` 최신 공고 중심으로 전환.
- `app-v5.js` — SH 2차 행복주택 소득표 근거·8개 발견후보 상세·민간자료 경고·미리내집 하드불가·앱 버전 v0.5 보정.
- `app-v5.css` — 위 상세 후보/근거 UI.

### 앱 UX 원칙

- 후보를 보는 것만으로 추적에 자동 등록하지 않는다.
- `신청했음 → 추적 추가`를 눌러야 로컬 추적에 들어간다.
- 추적의 수정/상태변경/삭제는 실제 SH/LH 청약을 변경하지 않는다.
- 삭제한 추적은 되돌릴 수 있다.
- 로컬 추적은 JSON으로 백업/복원한다.
- 하드불가·조건부·가능 판정은 기존 판정 영역을 색상으로 구분하며 중복 배지를 남발하지 않는다.
- 민간 집계/SNS는 앱에서도 `후보 발견용`임을 명시한다.

### Private 저장소 대응

공고 데이터는 APK에 번들하고 개인 추적 상태는 기기 `localStorage`에 저장한다. 저장소가 나중에 공개돼도 개인 신청상태를 공개 저장소에 자동 업로드하지 않는 원칙을 유지한다.

## 6. APK 자동빌드

`.github/workflows/android.yml` 흐름:

`QA → Capacitor Android 생성 → 웹 번들 sync → 전용 아이콘/Native Back → Gradle assembleDebug → Artifact → GitHub Release`

- 현재 `VERSION`, `package.json`, Service Worker cache는 v0.5.0 기준.
- 시간별 보고 `hourly-report.json`만 바뀌는 경우 Android 재빌드가 자동 트리거되지 않도록 함.
- 앱 번들/현재공고 데이터가 바뀌면 빌드 트리거.
- 현재 GitHub Actions는 runner가 step 실행 전에 실패하는 장애가 반복 중. 자세한 내용은 `ops/ANDROID_BUILD_BLOCKER.md`.

## 7. 현재 우선 작업

1. SH 2026년 2차 행복주택 공식 공급표에서 청년 물량 전체 추출.
2. 사용자 제공 8개 행복주택 후보의 이번 회차 청년 공급여부/공급수/정확주소/임대조건 재검증.
3. LH 경기남부 549명, 인천·부천 269명 공급주택 XLSX 실제 주택 단위 비교.
4. SH 2차 장기미임대 476호 실제 주소·가격·면적 펼치기.
5. 이미 신청한 비바힐스/센트레빌/호반써밋/UNIT125/양천 공동체주택 결과·서류 추적.
6. Actions runner 정상화 후 v0.5.0 APK 생성/Release 확인.

## 8. 최종 목표

**많이 찾고 → 공식자료로 걸러내고 → 실제 신청 가능한 것과 불가능한 것을 사용자 조건 기준으로 명확히 표시하고 → 입지·가격·당첨가능성까지 비교하고 → 신청 후 결과까지 끝까지 추적한다.**

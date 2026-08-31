# Android Build Blocker

최종 확인: 2026-09-01 03:04 KST

## 현재 상태

청약 레이더 **v0.4.0 소스/UI/데이터 변경은 GitHub main에 반영**되어 있으나 GitHub Actions Android APK 빌드는 여전히 실제 step 실행 전에 실패한다.

관찰된 특징:

- workflow run은 정상 생성됨
- `build` job도 정상 생성됨
- job은 수 초 내 `completed / failure`
- job `steps` 배열이 비어 있음
- `runner_id: 0`, `runner_name: ""`
- checkout조차 실행되지 않음
- 따라서 npm / JS QA / Capacitor / Gradle / Android SDK 단계에는 진입하지 못함
- 첫 workflow step 이후 생성되는 `ops/android-latest-run.json`도 이 유형의 실패에서는 생성되지 않음

즉 현재 실패를 **앱 코드나 Gradle 오류로 판단할 근거가 없다.** GitHub-hosted runner가 실제 job step을 시작하기 전의 Actions 실행/할당 단계에서 차단되고 있다.

가능성:

- private repository GitHub Actions 사용량/결제 한도
- Actions 사용 정책/계정 제한
- GitHub-hosted runner 할당 문제
- GitHub 측 일시 장애

현재 연결된 GitHub API에서는 계정 Billing/Actions quota 설정을 직접 조회할 수 없으므로 원인을 더 좁힐 때는 GitHub 웹의 repository `Actions` 및 account `Billing / Actions usage` 상태 확인이 필요하다.

## 최신 v0.4.0 빌드 확인

- run `33422907827` — workflow/QA 갱신 커밋, failure
  - job `99589401528`
  - steps `[]`
  - runner_id `0`
- run `33422986539` — app metadata v0.4.0 정렬 커밋, failure
  - job `99589659925`
  - steps `[]`
  - runner_id `0`
  - 시작 18:04:22Z / 종료 18:04:25Z

이전에도 같은 step-0 패턴이 반복됨:

- run 33381904564
- run 33394016372
- run 33394955861

## v0.4.0에 반영 완료된 앱 변경

### 공고 화면 전환

기존 `SH 국민임대 전체 보기` 중심 화면을 최신 검토 공고 중심으로 전환.

- `public/data/current-opportunities.json` 신규
- `public/assets/app-v4.js` 신규
- `public/assets/app-v4.css` 신규
- `public/index.html`에서 app-v4 로드
- 공고 탭 제목: `현재 검토 공고`
- 필터: 검토 후보 / 조건부 / 보류 / 절대 불가 / 전체
- 기관 필터 + 검색
- 각 공고에 접수기간 / 모집물량 / 내 조건 판정 / 다시 볼 조건 / 공식 공고 링크 표시
- 정확주소가 확인된 경우에만 지도 링크 표시
- 행동후보에는 `신청했음 → 추적 추가` 제공

### 최신 사용자 결정 반영

`SH 2026년 국민임대주택`은 2026-09-01 사용자 판단으로 **이번 회차 패스**.

- 앱 기본 공고 목록에서 상세 추천 제거
- 패스 한 줄만 유지
- `data/tracking_registry.md` Pass에 기록
- `public/data/hourly-report.json`에서도 상세 후보 제거

### 현재 앱 핵심 후보

- LH 경기남부 26년 3차 청년 매입임대 — 09.07~09.09
- LH 인천·부천 26년 6차 청년 매입임대 — 09.07~09.09
- LH 경기 안성시 26년 2차 기숙사형 청년주택 — 09.07~09.09
- SH 2026년 2차 행복주택 — 09.09~09.11
- 파주시 FINE주택 매입형 — 09.14~09.18
- 금천구 청년 맞춤형주택 — 사용자 보류
- SH 2026년 2차 장기미임대 매입임대 — 09.28~09.30
- 마장 행복마을 / 충신동 연극인 두레주택 — 하드자격 불일치로 빨간 불가 표시 유지

### 신청 추적 유지

- 비바힐스강변
- 센트레빌 웨스트온 25형
- 호반써밋 양재
- UNIT125 18A
- 양천구 청년협동조합 공동체주택

사용자 로컬에서 수정·상태변경·삭제/복원·JSON 백업/복원 기능은 유지한다.

## 버전

- `VERSION`: 0.4.0
- `package.json`: 0.4.0
- 앱 표시 버전: 0.4.0
- Service Worker cache: `chungyack-radar-v0.4.0`

## Android workflow v0.4 QA 항목

빌드가 실제 runner에서 시작될 경우 다음을 먼저 검사한다.

- app.js / app-v2-fixes.js / app-v3.js / app-v4.js syntax
- sw.js syntax
- hourly-report.json JSON parse
- current-opportunities.json JSON parse
- app-v4.css 존재
- index.html에 app-v4.js / app-v4.css 연결
- current-opportunities 데이터 연결 확인
- 이후 Capacitor Android 생성 → branding → Gradle assembleDebug → artifact/release 업로드

## 다음 작업

GitHub Actions runner가 다시 실제 step을 시작할 수 있게 된 뒤:

1. main 최신 커밋 기준 v0.4.0 workflow 재실행
2. `UI and data QA`가 실제로 시작되는지 확인
3. QA 통과
4. `./gradlew assembleDebug` 성공 확인
5. `ChungYack-Radar-v0.4.0-debug.apk` artifact 생성 확인
6. `apk-v0.4.0` release asset 업로드 확인
7. 실제 폰에서 공고 탭 / 자격 색상 / 추적 추가 / 로컬 데이터 유지 확인

현재 단계에서는 **새 APK가 생성되었다고 기록하거나 배포 완료로 표시하면 안 된다.**

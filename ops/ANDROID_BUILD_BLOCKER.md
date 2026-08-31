# Android Build Blocker

최종 확인: 2026-09-01 KST

## 현재 상태

청약 레이더 **v0.5.0 소스/UI/데이터 변경은 GitHub main에 반영 완료**되어 있으나 GitHub Actions Android APK 빌드는 여전히 실제 step 실행 전에 실패한다.

관찰된 공통 특징:

- workflow run은 생성됨
- `build` job도 생성됨
- 수 초 내 `completed / failure`
- job `steps`가 `null` 또는 빈 배열
- checkout조차 실행되지 않음
- npm / Node syntax QA / Capacitor / Android SDK / Gradle 단계에 진입하지 못함
- 이 유형의 실패에서는 첫 workflow step 이후 생성될 `ops/android-latest-run.json`도 생성되지 않음

즉 현재 확인된 실패를 **앱 JS, Capacitor 또는 Gradle 오류로 판단할 근거가 없다.** GitHub-hosted runner가 실제 job step을 시작하기 전 Actions 실행/할당 단계에서 차단되는 패턴이다.

가능성:

- private repository GitHub Actions 사용량/결제 한도
- Actions 사용 정책/계정 제한
- GitHub-hosted runner 할당 문제
- GitHub 측 일시 장애

현재 연결된 GitHub API로는 계정 Billing / Actions quota 설정을 직접 확인할 수 없다. 원인을 더 좁힐 때는 GitHub 웹의 repository `Actions`와 account `Billing / Actions usage` 상태 확인이 필요하다.

## 최신 v0.5.0 빌드 확인

최신 확인 실행:

- run `33452767439`
- run number `123`
- head SHA `b357c244c68a3b6f34413fda60a48dd6d5a0abd4`
- display title `Validate extra discovery data in Android build`
- status `completed / failure`
- 시작 `2026-08-31T23:56:41Z`
- 종료 `2026-08-31T23:56:44Z`
- job `99686113773`
- job status `completed / failure`
- `steps: null`
- `logs_url: null`

따라서 이번 실행에서도 checkout/QA/Gradle이 한 줄도 실행되지 않았다.

이전 동일 패턴:

- v0.5 run `33425904982` / job `99599273931` — steps null
- v0.4 run `33422907827` / job `99589401528` — steps 0
- v0.4 run `33422986539` / job `99589659925` — steps 0
- run `33394955861` 등 이전 재시도도 동일

## v0.5.0 반영 완료 내용

### 현재 공고 구조

- SH 2026년 국민임대주택: 사용자 판단으로 이번 회차 패스
- SH 2026년 2차 행복주택: 현재 메인 검토축
- LH 경기남부 / 인천·부천 청년 매입임대: 검토 후보
- SH 2차 장기미임대: 검토 후보
- 안성 기숙사형 / 파주 FINE: 조건부
- 금천 청년 맞춤형: 사용자 보류
- 제8차 미리내집 / 마장 사회적경제 / 충신 연극인: 하드자격 불일치 표시

### SH 행복주택 v0.5 상세

- 사용자 제공 이번 회차 공고문 소득표 근거 표시
- 1인가구(+20%p) 100% 표기값 `4,576,036원` 기록
- 사용자 제공 집지켜 화면에서 발견한 행복주택 후보 8곳 표시
- 민간 화면의 월세/준비금 표기는 `민간 화면 표시값`으로 보존
- 공식 청년 공급여부·공급수·보증금·월세는 SH 공급표/임대조건표 재검증 전 확정하지 않음
- Zibble/SNS 자료는 후보 발견용으로 별도 표시

### 추가 SNS 국민임대 자료 분류

- `public/data/discovery-extra.json` 추가
- `보증금 3,200만원 / 월 25만원 / 1,973세대` SNS 게시물은 새 공고가 아니라 이미 패스한 SH 국민임대 홍보자료로 기록
- 앱에서 `후보 발견용 자료`에만 병합
- 기존 국민임대 패스를 자동 복원하거나 행동후보로 재승격하지 않음
- SNS 평균 임대조건 문구를 개별 단지 확정가격으로 사용하지 않음

### 앱 파일

- `public/assets/app-v5.js`
- `public/assets/app-v5.css`
- `public/data/current-opportunities.json` schema v2
- `public/data/discovery-extra.json`
- `public/index.html` v5 레이어 연결
- `public/sw.js` cache `chungyack-radar-v0.5.0`
- `public/data/app.json` version 0.5.0
- `VERSION` 0.5.0
- `package.json` 0.5.0

### Android workflow v0.5 QA

runner가 실제 시작되면 다음을 검사하도록 구성됨:

- app.js / app-v2-fixes.js / app-v3.js / app-v4.js / app-v5.js syntax
- sw.js syntax
- current-opportunities.json / discovery-extra.json JSON parse
- SH 행복주택 및 미리내집 항목 존재 확인
- 이번 회차 행복주택 소득표 값 `4576036` 존재 확인
- SNS 국민임대 중복자료 ID 존재 확인
- app-v5.css 존재
- index.html app-v5.js / app-v5.css 연결 확인
- 이후 Capacitor Android 생성 → branding → Gradle assembleDebug → artifact/release

## APK가 아직 없는 이유

현재 **v0.5.0 APK가 생성됐다고 기록하면 안 된다.**

빌드 runner가 checkout조차 하지 못했기 때문에:

- `ChungYack-Radar-v0.5.0-debug.apk` artifact 없음
- `apk-v0.5.0` release asset 생성 확인 안 됨
- 실제 폰 v0.5.0 설치 QA 미실행

## Actions 정상화 후 할 일

1. main 최신 v0.5.0 기준 workflow 실행
2. `UI and data QA` step이 실제로 시작되는지 확인
3. Node/JSON QA 통과
4. Capacitor sync 확인
5. `./gradlew assembleDebug` 성공
6. `ChungYack-Radar-v0.5.0-debug.apk` artifact 확인
7. `apk-v0.5.0` release asset 확인

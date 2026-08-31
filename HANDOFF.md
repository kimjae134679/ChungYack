# ChungYack Handoff

최종 갱신: 2026-09-01 KST

새 대화·새 작업자·자동화가 이 프로젝트를 이어받을 때 이 문서를 먼저 읽는다.

## 1. 가장 먼저 읽을 파일

1. `README.md`
2. `STATUS.md`
3. `docs/MASTER_RULES.md`
4. `docs/USER_OUTPUT_OVERRIDES.md`
5. `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`
6. `docs/REPORTING_AND_MAP_RULES.md`
7. `data/tracking_registry.md`
8. `public/data/current-opportunities.json`
9. `reports/current_dashboard.html`
10. 최신 `coverage/YYYY-MM-DD_local_hidden_scan.md`
11. `ops/ANDROID_BUILD_BLOCKER.md`
12. `ops/APP_V0.4_STATUS.md`는 과거 전환기 기록으로만 참고

## 2. 현재 핵심 상태

- `SH 2026년 국민임대주택`은 2026-09-01 사용자 판단으로 **이번 회차 패스**. 상세·지도·행동후보 반복 금지.
- `SH 2026년 2차 행복주택`이 **현재 메인 검토 공고**.
  - 접수: 2026-09-09 10:00 ~ 09-11 17:00
  - 전체: 1,484호
  - 전체가 청년 물량은 아니므로 공식 공급표에서 `청년` 공급행만 추출해야 함.
  - 사용자 제공 이번 회차 공고문 캡처: `1인 가구(+20%p) / 월평균소득 100% = 4,576,036원`.
  - 사용자 제공 집지켜 캡처에서 행복주택 후보 8곳 발견. 단지/가격은 발견용이며 청년 공급여부·공급수·임대조건은 공식표 재검증 필수.
- `제8차 장기전세주택2(미리내집)`은 현재 프로젝트 프로필과 신혼/예비신혼 하드요건이 맞지 않아 **❌ 사실상 신청 불가**, 행동후보 제외.
- Zibble·집지켜·SNS·일반웹·유튜브는 발견용. 공식 공고/PDF/공급표/임대조건표가 최종 기준.

## 3. 현재 신청 추적

- 비바힐스강변 — ✅ 신청완료 / 2026-09-01 15:00 서류심사 대상자 발표 확인
- 센트레빌 웨스트온 청년형 특별공급 25형 — ✅ 신청완료 / 🎯 개인 결과확인 필요
- 2026년 2차 청년안심주택(공공임대) 호반써밋 양재 — 📄⚠️ 대상자 여부 즉시 확인, 대상자라면 2026-09-02까지 등기우편
- UNIT125 18A — ✅ 예비 80번대
- 양천구 청년협동조합 공동체주택 — ✅ 신청완료 / 2026-11-25 결과 예정

개인 당첨/예비/탈락 결과는 공개검색으로 추정하지 않고 사용자 직접 확인값을 우선한다.

## 4. 다음 검토 공고

- 🔥 SH 2026년 2차 행복주택 — 청년 공급분 전체 추출 및 후보 비교
- 🔥 LH 경기남부 26년 3차 청년 매입임대 — 09-07~09-09, 예비 549명
- 🟢 LH 인천·부천 26년 6차 청년 매입임대 — 09-07~09-09, 예비 269명
- 🟢 SH 2026년 2차 장기미임대 매입임대 — 09-28~09-30, 476호
- 🟠 LH 경기 안성시 26년 2차 기숙사형 청년주택 — 정정공고/신청계층 확인
- 🟠 파주 FINE주택 — 파주시 2년 계속거주 요건 확인 전 조건부

## 5. 민간/SNS 자료 처리 규칙

사용자가 직접 제공한 이미지도 근거 종류를 구분한다.

### 공고문/기관 화면 캡처
- 공식자료 성격이 확인되는 표·신청화면은 해당 회차 근거로 기록 가능.
- 표에 적힌 값은 그대로 보존하고 범용 기준표로 임의 교체하지 않는다.

### 민간 집계/SNS/일정 이미지
- 후보 발견용.
- 화면의 단지명·면적·가격 표시는 `민간 화면 표시값`으로 보존.
- 공식 공급표/임대조건표 확인 전 `공식 보증금`, `공식 최소보증금`, `청년 공급 확정`으로 바꾸지 않는다.
- Zibble의 무순위/임의공급/오피스텔/일반분양 일정은 공공임대 행동후보에 자동 편입하지 않는다.

## 6. 지도 규칙

- 전체 후보를 한 지도에 몰아넣지 않는다.
- 오늘·내일 / 2~3일 / 4~7일 / 이후 / 이미 신청 그룹별 지도.
- 정확한 공식 주소가 확인된 곳만 핀.
- 민간 화면에서 단지명만 확인되고 정확주소가 공식자료로 확인되지 않았으면 추정 핀 금지.
- 패스/절대불가 공고는 상세 지도 제거.

## 7. 통합 HTML

현재 사람용 메인 현황판: `reports/current_dashboard.html`

- 일반·숨은 현재공고
- 대형 공고
- 이미 신청한 공고
- 패스/탈락/종료
- 서울25/경기31 탐색 커버리지

SH 국민임대 전용 HTML은 과거 검토 자료로 보존하되, 이번 회차 패스 이후 현재 행동판의 중심으로 쓰지 않는다.

별도 최신 비교판:
- `reports/청약_다른공고_검토대시보드_2026-09-01.html`

## 8. 청약 레이더 앱 — 현재 실제 파일

현재 목표 버전: **v0.5.0**

- `public/index.html`
- `public/assets/app.js`
- `public/assets/app-v2-fixes.js`
- `public/assets/app-v3.js`
- `public/assets/app-v4.js`
- `public/assets/app-v5.js`
- `public/assets/app.css`
- `public/assets/app-v2.css`
- `public/assets/app-v3.css`
- `public/assets/app-v4.css`
- `public/assets/app-v5.css`
- `public/data/app.json`
- `public/data/hourly-report.json`
- `public/data/current-opportunities.json`
- `public/data/sh-2026.csv`
- `public/sw.js`
- `VERSION`
- `package.json`
- `.github/workflows/android.yml`

**중요:** 과거 HANDOFF에 언급됐던 `app-v4-remote.js`, 기존 `app-v5.js` 원격동기화 구조 등은 현재 main의 실제 파일 기준이 아니었다. 앞으로는 위 실제 파일 목록을 기준으로 한다.

### 앱 레이어

- v1: 기존 SH 국민임대 카탈로그/필터/추적 기반
- v2: 안정성·시간별보고·조건판정
- v3: 삭제 되돌리기·백업/복원·Native Back
- v4: 국민임대 중심 화면을 최신 검토공고 중심으로 전환
- v5: SH 2차 행복주택 소득표 근거, 사용자 제공 8개 후보 상세, 민간자료 경고, 미리내집 하드불가 표시, v0.5 버전 보정

### 앱 UX 강제 규칙

- 후보는 자동으로 추적에 넣지 않는다.
- 실제 신청 후 `신청했음 → 추적 추가`.
- 추적 수정/삭제는 실제 신청 취소가 아니다.
- 하드불가 이유는 기존 자격판정 영역을 빨간색으로 사용하고 별도 중복 위젯을 만들지 않는다.
- 조건부는 주황, 가능은 초록, 추가확인은 회색/파랑.
- 민간자료는 `후보 발견용` 표기를 유지.

## 9. APK 빌드 상태

GitHub Actions가 반복적으로 runner step 시작 전에 실패하고 있음.

관찰값:
- run/job 생성
- 수 초 내 failure
- `steps=[]`
- `runner_id=0`
- `runner_name=""`
- checkout조차 실행되지 않음

따라서 지금 확인된 실패는 JS/Capacitor/Gradle 실행 후 오류가 아니다.

Actions 정상화 후:
1. v0.5.0 workflow 실행
2. Node syntax / JSON / UI QA 확인
3. Capacitor sync
4. Gradle assembleDebug
5. `ChungYack-Radar-v0.5.0-debug.apk` artifact
6. `apk-v0.5.0` Release asset 확인

## 10. 다음 작업자가 바로 할 일

1. SH 2차 행복주택 공식 공급표/PDF 확보
2. `청년` 공급행 전체 추출
3. 사용자 제공 8개 후보가 이번 회차 청년인지 각각 확인
4. 공식 공급/예비 수·전용면적·보증금·월세·전환조건·정확주소 입력
5. 강남/판교 통근까지 비교
6. LH 경기남부/인천부천 XLSX 실제 주택 단위 펼치기
7. 신청완료 5건의 결과/서류 상태 갱신
8. Actions runner 복구 여부 확인 후 APK 빌드

# ChungYack — 청약2 Project Hub

최종 갱신: 2026-08-31 KST

이 저장소는 청약2 프로젝트의 **단일 기준점(Single Source of Truth)** 이다.
새 대화·새 작업자·자동화·인수인계 시 최상단 문서부터 읽고 현재 상태를 확인한다.

## 1. 지금 바로 볼 것

- **최상위 규칙** → [`docs/MASTER_RULES.md`](docs/MASTER_RULES.md)
- **사용자 최신 출력 최우선 규칙** → [`docs/USER_OUTPUT_OVERRIDES.md`](docs/USER_OUTPUT_OVERRIDES.md)
- **사용자 조건 판정 표시 규칙** → [`docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`](docs/USER_ELIGIBILITY_ANNOTATION_RULES.md)
- **상세 보고·지도·통근·대출 규칙** → [`docs/REPORTING_AND_MAP_RULES.md`](docs/REPORTING_AND_MAP_RULES.md)
- **현재 진행상황 / 신청·관심·결과확인 상태** → [`STATUS.md`](STATUS.md)
- **인수인계** → [`HANDOFF.md`](HANDOFF.md)
- **탐색 소스/전수확인 체크리스트** → [`docs/SOURCES_AND_COVERAGE.md`](docs/SOURCES_AND_COVERAGE.md)
- **공고 검증/보고 템플릿** → [`templates/REPORT_TEMPLATE.md`](templates/REPORT_TEMPLATE.md)
- **상태 데이터 원장** → [`data/tracking_registry.md`](data/tracking_registry.md)

문서 간 출력 형식이 충돌하면 **사용자가 직접 지정한 최신 규칙인 `docs/USER_OUTPUT_OVERRIDES.md`를 우선 적용**한다. 사용자별 실제 신청 가능성 표시는 `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`를 반드시 함께 적용한다.

## 2. 프로젝트 핵심

`오늘꺼 알려줘`는 오늘 올라온 공고만 찾는 요청이 아니다.

항상 다음을 함께 관리한다.

1. 현재 신청 가능
2. 곧 신청 시작
3. 신규 게시
4. 이미 신청
5. 결과발표 / 예비순번
6. 서류제출
7. 계약
8. 입주

탐색은 **LH/SH/GH 등 메이저 기관만으로 종료하지 않는다.**
서울 25개 자치구와 경기 전 시·군·구를 전수 탐색하고, 민간 집계·일반 웹검색·청약 관련 유튜브까지 후보 발견용으로 이용한 뒤 반드시 공식자료로 재검증한다.

## 3. 보고 강제 규칙

`오늘꺼 알려줘`를 실행할 때는 단순 목록형 요약으로 끝내지 않는다.

- **추천 숫자순위/별점은 쓰지 않고 이모티콘으로 상태·중요도를 표시**
- 일정 그룹별 지도: 오늘·내일 / 2~3일 / 4~7일 / 이후 / 이미 신청
- 공식자료 기준 정확한 도로명주소 + 건물명
- 가까운 역/노선/도보
- 가능하면 평일 낮 네이버지도 지하철 기준 강남·판교 이동시간
- 이번 회차 공급표/임대조건표 기준 가격
- 최소/기본/최대 보증금 전환 조건
- 실제 자격 판정
- **발견된 공고는 자격이 안 맞는다고 탐색 단계에서 숨기지 않고 `내 조건 판정 | 판정 근거 | 추가 확인할 것`을 표시**
- **`❌ 절대 불가`는 신혼전용·특정직종·필수거주기간 등 공식 하드자격이 사용자 현재 조건과 명확히 충돌할 때만 사용**
- 경쟁률·거리·가격이 불리하다는 이유만으로 `❌ 절대 불가` 처리 금지
- 대출 가능성, 예상 자기자금, 월이자, 월세, 관리비, 총 월 주거비
- 서로 다른 공고 사이 중복신청 가능 여부 및 택1 경고
- 공고명 바로 아래 공식 공고 / PDF / 신청 / 결과조회 링크
- 패스 공고 상세·지도·추천 반복 금지

세부 형식은 `docs/USER_OUTPUT_OVERRIDES.md`, `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`, `docs/REPORTING_AND_MAP_RULES.md`를 함께 적용한다.

## 4. 저장소 운영 원칙

- 최상단은 `README.md`, `STATUS.md`, `HANDOFF.md`만 봐도 전체 상황을 파악할 수 있게 유지한다.
- 규칙은 `docs/MASTER_RULES.md`를 최우선으로 하되, 사용자 최신 출력 선호는 `docs/USER_OUTPUT_OVERRIDES.md`를 우선 적용하고 실전 출력 세부는 `docs/REPORTING_AND_MAP_RULES.md`를 함께 적용한다.
- 사용자별 신청 가능성 판정은 `docs/USER_ELIGIBILITY_ANNOTATION_RULES.md`를 적용한다.
- 공고 상태가 바뀔 때마다 `STATUS.md`와 `data/tracking_registry.md`를 함께 갱신한다.
- 사용자가 직접 알려준 신청/결과 상태는 공개 웹검색보다 우선한다.
- 패스 공고는 상세 분석을 반복하지 않는다.
- 보류는 패스와 다르며 새 정보가 생기면 재평가한다.
- 공식자료가 없는 가격·주소·개인 결과는 추정하지 않는다.

## 5. 청약 레이더 Android / PWA

`stock` 저장소의 Market Radar 운영 방식을 참고해 `public/` 웹앱을 Capacitor로 감싸 Android APK를 자동 생성한다.

```text
public/
  index.html                 앱 UI
  assets/app.css             기본 모바일 UI
  assets/app-v2.css          필터/추적 편집 UI
  assets/app-v3.css          백업/삭제복원 UI
  assets/app.js              공고/필터/추적 핵심 로직
  assets/app-v2-fixes.js     안정성 보정 레이어
  assets/app-v3.js           백업·되돌리기·native Back 보정
  assets/app-icon.svg        청약 레이더 전용 아이콘
  data/app.json              공개 공고 분석/초기 추적 seed
  data/sh-2026.csv           SH 국민임대 전체 타입 데이터
  manifest.webmanifest
  sw.js

.github/workflows/android.yml
scripts/apply-android-branding.mjs
scripts/qa-app.mjs
capacitor.config.json
VERSION
```

### 앱 UX 원칙

- `59㎡ 제외`, `북부권 제외` 같은 기준을 앱에 강제하지 않는다.
- 면적·지역·보증금·공가·경쟁률 분석 여부는 사용자가 직접 필터에서 켜고 끈다.
- 필터 선택은 기기 로컬에 저장되어 앱 재실행 후에도 유지한다.
- **추적에는 실제 신청한 공고만 넣는다.** 후보를 보는 것만으로 추적에 자동 등록하지 않는다.
- 추적 항목은 신청일·타입·현재상태·다음 일정·메모·주소를 수정할 수 있다.
- `취소/추적중단`은 앱 기록 상태일 뿐 실제 SH/LH 신청 취소 명령이 아니다.
- 추적 제거는 최근 제거 기록에 임시 보관하고 되돌릴 수 있다.
- 필터·추적은 JSON 파일로 백업/복원할 수 있다.
- UI 변경은 기능만 존재하는 상태로 끝내지 않고 모바일 safe-area, 가로밀림, 필터 동작, 로컬 저장, 뒤로가기까지 QA한다.

### Private 저장소 대응

현재 저장소가 Private이어도 APK는 정상 동작하도록 **공고 데이터는 APK에 번들하고 개인 수정 상태는 `localStorage`에 저장**한다.
저장소를 나중에 Public으로 전환할 경우 개인 신청상태를 공개 저장소 데이터로 내보내면 안 된다. 공개 데이터와 로컬 개인 추적을 분리하는 원칙을 유지한다.

### APK 자동빌드

`.github/workflows/android.yml`은 다음을 수행한다.

`QA → Capacitor Android 생성 → 웹 번들 sync → 전용 아이콘/Native Back 적용 → Gradle APK → Artifact → GitHub Release`

빌드 상태는 성공/실패/진행중을 `ops/android-latest-run.json`에 기록하도록 구성한다.

## 6. 권장 폴더 구조

```text
/
├─ README.md
├─ STATUS.md
├─ HANDOFF.md
├─ VERSION
├─ capacitor.config.json
├─ package.json
├─ public/
├─ scripts/
├─ .github/workflows/
├─ ops/
├─ docs/
│  ├─ MASTER_RULES.md
│  ├─ USER_OUTPUT_OVERRIDES.md
│  ├─ USER_ELIGIBILITY_ANNOTATION_RULES.md
│  ├─ REPORTING_AND_MAP_RULES.md
│  ├─ ELIGIBILITY_PROFILE.md
│  └─ SOURCES_AND_COVERAGE.md
├─ data/
│  └─ tracking_registry.md
├─ templates/
│  └─ REPORT_TEMPLATE.md
├─ logs/
│  └─ CHANGELOG.md
├─ reports/
├─ coverage/
└─ archive/
```

## 7. 최종 목표

**많이 찾고 → 공식자료로 걸러내고 → 실제 신청 가능한 것과 불가능한 것을 사용자 조건 기준으로 명확히 표시하고 → 입지·가격·당첨가능성까지 비교하고 → 신청 후 결과까지 끝까지 추적한다.**

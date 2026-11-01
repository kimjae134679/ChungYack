# AGENTS.md

## 2026-11-01 순위 표시·가독성 기준
- 홈 기본 화면은 현재·예정 전체 공고를 보여준다. 2026-11-01 당시 16건(공공 4·특별자격 4·민간 비용부담 8)을 4건만 표시하던 문제 수정. 고가 민간임대는 추천 제외로 명확히 구분한다.
- 접수는 좁은 2열 타일에 긴 문장으로 쓰지 않는다. 순위·일자별 독립 행으로 구분하고 날짜·'2순위' 단어 중간 줄바꿈 방지. 보증금·월세는 같은 호실·선택조건의 한 쌍으로 표기.
- LH 구리갈매 S1(2026-10-22 공고) 1순위 = 청약저축 가입 2년 이상·인정 납입 24회 이상·11/3 09~16시. 2순위 = 가입 6개월 이상·인정 납입 6회 이상·11/4 09~16시. 1순위 모집 마감 시 2순위 접수 없음.
- 사용자 통장 가입일 및 인정납입횟수는 공개 GitHub에 기록 금지. 앱 기기 내 localStorage key chungyack.rank.local.v1로만 보관해 공고일 기준 순위 표시. 정보 미입력 시 반드시 미확정으로 표시.
- 과천/동탄 행복주택과 LH 청년전세임대의 순위·우선공급 자격은 구리갈매 청약통장 순위와 별개이다. 공식 공고별 개별 조건 확인 전 같은 계산식을 재사용하지 않는다.
- 기존 신청 이력의 2026-10-27 초기화와 개인 공개 금지, 공고 ID 및 사용자 기록 연결키 호환을 유지한다. 공고/HTML/CSS 수정만으로 APK 재빌드 금지.

## 2026-11-01 최신 공개 공고·임대료 기준
- 활성 공개 공고 `stock/chungyack-apk/public/data/current-opportunities.json`은 실제 **접수 중·향후 접수·수시(확인 필요)** 건만 유지한다. 접수 마감 공고는 활성 목록에서 제거하고, 이전 저장소 이력을 현재 추천·신청·결과 추적으로 되살리지 않는다.
- **공고 게시종료일은 신청 마감일이 아니다.** 접수일 불명확한 항목은 직접 신청 가능한 공고로 단정하지 않는다.
- 보증금과 월세는 `rentDetails.offers[]`에 **같은 주택형·호실·전환비율의 정확한 한 쌍**(`depositWon`, `monthlyRentWon`)으로 저장한다. 금액 범위를 서로 다른 타입끼리 조합해 보여주지 않는다. 관리비·보증료/기숙사비는 구분한다.
- 1차 공식 PDF와 공급표로 확인한 가격은 `verification=official`, 공식 원문 접근 제한으로 2차 공개표 교차확인만 한 경우 `verification=secondary-crosscheck`로 명시한다. 추정·불완전한 숫자 파싱으로 가격을 채우지 않는다. LH 청년 전세임대처럼 계약 주택별로 달라지는 제도에는 임의 고정 월세를 넣지 않는다.
- 공개 3종 `current-opportunities.json`, `hourly-report.json`, `app.json`의 갱신시각·공고 수를 맞춘다. 만료 공고를 다음 6시간 갱신에서 다시 추가하지 않는다. 고가 민간 청년안심주택과 특수자격 주택은 일반 추천에서 제외하고 확인용으로만 둔다.
- 2026-11-01 정리 시 기존 공개 공고 98건에서 지난 접수 82건을 빼고 현재/예정·수시/잔여 확인 16건으로 전환했다. 16건 중 13건은 공식 자료 기반 가격/모집 검증, SH 도전숙·신림 사회주택 3건의 가격은 2차 공급표 대조이므로 공식 원문 검증을 우선한다. 기존 개인 신청 추적 공개 초기값 `[]` 유지.

## Latest state: 2026-10-27 reset
- 사용자가 기존 신청 내역 전부를 현재 신청/결과 화면에서 비우고 새 신청부터 기록하도록 요청했다. 과거 신청내역은 비공개 Supabase `chungyack_client_state.state.archivedTracking`에 보존한다.
- 활성 `state.tracking`은 빈 배열에서 재시작한다. 과거 목록을 결과 발표·서류·계약 추적 또는 신규 추천 대상으로 되살리지 않는다.
- `tracking_registry.md`, `STATUS.md`의 옛 신청 사례는 형식 참고 이력이다. 다음 작업의 현재 상태를 판단하는 근거로 쓰지 않는다.
- 개인 앱 기기의 옛 기록은 `chungyack.tracking.archive.20261027.v1`에 보관되며 클라우드로 병합된다. 구현 원천은 stock repo의 `app-v88-sync.js`이다.

## 2026-10-29 공식 공고 자동감시 보강
- 실시간 공개 자료는 `kimjae134679/stock/chungyack-apk/public/data/`의 JSON 3종. 2026-10-29 18:03 KST 확인 공고 98건, `app.json.trackingSeed=[]`; 개인 신청 내역은 공개 데이터에 넣지 않는다.
- SH 2026년 3차 희망하우징(10/28 게시), 구로구 청년창업인 도전숙(10/28 게시) 신규 발견. SH 공식 게시목록/구로구 공식 공지에서 확인했으나 SH 공고 PDF/임대료 및 상세 자격이 미열람인 항목은 보류 유지한다.
- `stock/chungyack-apk/scripts/sync-soco-youth.py`의 서울시 게시판 텍스트 감시는 공식 PDF 검증을 대신하지 못한다. 6712·6713은 원문 미검증 중복으로 차단. 6715는 이전 자동 텍스트 파싱에서 퀸즈W로 잘못 귀속됐지만 서울시 공식 상세 페이지와 PDF 원문은 별도의 '개봉역 에드가개봉' 공고(10/29 게시·43세대)임을 확인해 올바른 ID 6715로 공개 보류 목록에 신규 등록했고, 자동감시 차단에서 6715를 해제했음. 지역 카테고리가 공란인 공고는 공식 주소로만 지역을 추정해 교차검증하며 서로 충돌하면 수집하지 않음. 신규 자동 발견은 원문 검증 전 `hold`로만 두며 ‘긴급/신청 가능’이라 단정하지 않는다.
- 6714·6716·6717은 2026-10-29 18:03 KST 서울시 공식 PDF 가격을 검증했으며, 고가 민간임대로 일반 추천 제외. 6715도 공식 PDF에서 16형 보증금 2,900만~4,300만원/월세 44만~50만원, 35·36형 월세 80만~94만원 등을 확인해 비용 부담으로 일반 추천 제외. 6714는 월세 54.8만~62.7만원, 6716 19형 보증금 1억1,900만원/월 47만원(50% 보증금형), 6717 17D 보증금 4,800만원/월 33.76만원 등. 관리비 등은 별도 확인. 원문 검증 전 다른 자동 후보는 계속 보류하며 기존 ID 임의 변경 금지.
- LH 경기북부 김포·포천 선착순 청년 매입임대는 10/29 15:00 방문접수 기한이 경과했으므로 18:03 기준 '긴급 접수중'에서 제외. 현장 잔여물량·조기마감 실시간 확인은 못했으며 지난 신청기록을 활성 추적에 복원하지 않는다.

## Purpose
이 파일은 청약/ChungYack 프로젝트를 다음 AI/Codex 세션에서 바로 이어가기 위한 작업 인수인계다. 사용자용 요약은 루트 `README.md`를 본다. 기존 `docs/`, `STATUS.md`, `HANDOFF.md` 등은 이미 존재하는 상세 원장/증거이므로 현재는 삭제하지 않지만, 앞으로 새 관리 문서를 계속 만들지 말고 장기 작업 기준은 이 파일과 `README.md`에 병합한다.

## Repositories / deployment split
- Project hub / public reference repo (private personal state is in Supabase): `kimjae134679/ChungYack`.
- 실제 라이브 HTML/APK 셸 코드: `kimjae134679/stock/chungyack-apk/`.
- 라이브 Pages: `https://kimjae134679.github.io/stock/chungyack/`.
- 현재 `stock/chungyack-apk/public/sw.js`에서 확인되는 live cache: `chungyack-live-v0.10.0-r1`.
- 2026-09-09 12:18 KST까지 `stock` main에 청약 live data/hourly/opportunity refresh commit이 올라온 것이 확인된다.
- 로컬 Windows 절대경로는 이 문서 작성 시점에 GitHub에서 검증되지 않았으므로 추측하지 않는다.

## Product model
- APK는 한 번 설치하는 **원격 HTML shell** 방식이다.
- HTML/CSS/JS/공개 공고 데이터 수정은 `stock/chungyack-apk/public/**`에서 하고 GitHub Pages를 갱신한다.
- 일반 UI/데이터 수정만으로 APK를 재빌드하지 않는다.
- APK 재빌드는 remote URL, package/native bridge, Capacitor/native layer처럼 셸 자체가 바뀔 때만 한다.
- 공개 Pages와 개인 추적 상태를 분리한다. 개인 신청/결과/예비/서류 상태를 공개 repo 데이터에 넣지 않는다.

## Tech / build stack
- Web: HTML/CSS/JavaScript + PWA/service worker.
- Android shell: Capacitor 8 (`@capacitor/core`, `@capacitor/android`, `@capacitor/app`, CLI 8).
- Hosting: GitHub Pages.
- Build/release: GitHub Actions + Gradle/Capacitor Android.
- Public live code package: `chungyack-radar-live-shell`, package.json 자체 version은 shell 기준 `0.8.0`으로 남아 있을 수 있으므로 실제 UI/cache version과 혼동하지 않는다.

Capacitor 기본 명령 (`stock/chungyack-apk`에서):
```bash
npm install
npm run android:add
npm run android:sync
npm run android:brand
```
기존 Actions 흐름은 대략 `QA → Capacitor Android 생성/동기화 → branding/native back → Gradle assembleDebug → artifact/release`다.

과거 로컬 fallback에는 `build-apk.cmd`/`build.cmd` 계열이 사용된 이력이 있다. 실제 현재 파일 존재와 동작은 실행 전 repo에서 재확인한다.

## Runtime persistence / IDs
다음 key/identity를 호환성 없이 임의 변경하지 않는다.
- `chungyack.opportunity.saved.v1`
- `chungyack.opportunity.hidden.v1`
- `chungyack.opportunity.view.v1`
- 필터/추적/삭제복원 관련 기존 localStorage keys
- 공고 `id`는 사용자 기록 연결키이므로 같은 공고에서 임의 변경 금지.
- 공개 `app.json`의 `trackingSeed`는 빈 배열 유지. 개인 상태를 공개 seed로 배포하지 않는다.

## Supabase / sync
확인된 구조:
- GitHub Actions 쪽 공유 상태: Supabase `assistant_state`.
- APK/사용자 개인 상태: Supabase `client_state`.
- GitHub Actions secret 이름: `SUPABASE_SECRET_KEY`.
- 실제 secret 값은 문서/코드/로그에 쓰지 않는다.
- 동기화/쓰기 동작은 개인 상태와 공개 공고 데이터를 섞지 않게 검증한다.

## User-facing information rules
- 민간 집계/SNS/유튜브/블로그는 **후보 발견용**. 최종 자격·공급수·가격·주소는 공식 공고/PDF/공급표/임대조건표로 재검증한다.
- 숫자 순위/별점 기본 금지. 지정된 상태/긴급도 표기 규칙을 유지한다.
- 정확 주소가 공식 자료에서 확인되지 않으면 지도에 추정 핀을 찍지 않는다.
- 패스한 공고는 상세 추천/지도 반복 금지.
- 이미 신청한 공고는 결과 → 서류 → 계약 → 입주까지 추적한다.
- `❌ 절대 불가`는 하드자격 충돌이 공식 근거로 명확할 때만 사용한다.

## Current app UX direction
- 홈은 현재 신청/검토할 공고 중심으로 간결하게 유지하고 만료 공고를 기본 홈에서 제거한다.
- 결과 영역은 `확인 필요 / 합격·예비 / 탈락` 분류를 명확히 하고 항목 이동/결과 처리 액션을 지원하는 방향으로 구현돼 있다.
- 저장/숨김/추적은 새로고침 후에도 유지돼야 한다.
- 기본 카드에 검증 원자료를 과도하게 노출하지 않는다.
- 같은 목적의 버튼을 중복시키지 않고, 중첩 accordion/details를 피한다.

## APK / signing gotcha
- 과거 번들형 v0.7.1 수동서명 인증서와 live-shell v0.8.0 Actions 인증서가 달라 Android가 덮어쓰기를 거부할 수 있었다.
- 이전 앱에 사용자 기록이 있으면 JSON 백업 → 기존 앱 제거 → 새 shell 설치 → 백업 복원의 1회 전환이 필요할 수 있다.
- remote origin이 바뀌면 옛 `https://localhost` localStorage가 자동 이동하지 않는다.
- signing key/certificate의 실제 private material은 문서에 기록하지 않는다. SHA-256 fingerprint 같은 공개 검증값만 필요 시 기록한다.

## Verification checklist
1. `stock/chungyack-apk/public/sw.js` cache version과 실제 로드 asset 목록 확인.
2. GitHub Pages 최신 deploy가 성공했는지 확인.
3. 홈에서 만료 공고가 기본 노출되지 않는지 확인.
4. 저장 → 저장 목록 / 숨김 → 숨김 목록 → 복원 / 신청추적 / 결과 분류가 새로고침 후 유지되는지 확인.
5. 모바일/데스크톱에서 카드 가독성, 버튼 중복, 잘림 확인.
6. 공개 `app.json`/data에 개인 신청 상태가 섞이지 않았는지 확인.
7. APK shell 변경이 없으면 불필요한 APK rebuild를 하지 않는다.
8. native shell을 바꾼 경우 Capacitor sync + Gradle build + 설치/서명/bridge를 별도로 검증한다.

## Known recent state
- 프로젝트 hub 문서의 v0.8.x 설명보다 실제 live code가 더 앞서 있다. `stock/chungyack-apk/public/sw.js`는 v0.10.0-r1 cache를 사용한다.
- 2026-09-09 오전부터 `stock` repo에서 home active-only, result handling, opportunity/hourly/live data refresh 변경이 연속 반영됐다.
- 따라서 ChungYack hub의 과거 STATUS/HANDOFF 버전 숫자를 현재 live version으로 그대로 믿지 말고 항상 `stock/chungyack-apk/public/**`를 확인한다.

## Next work
1. 현재 live Pages에서 결과 분류/이동, active-only 홈, 저장/숨김/추적 persistence를 직접 검증.
2. `ChungYack` hub 문서와 실제 `stock/chungyack-apk` live state가 어긋난 항목을 이 AGENTS/README 기준으로 정리.
3. 공식 공고 데이터 갱신 시 민간 발견값과 공식 확정값을 구분.
4. Supabase sync에서 공개/개인 경계와 secret 사용을 재검증.
5. shell/native 변경이 실제로 필요할 때만 APK build/release를 수행.

## Repository hygiene
- 실제 제품 구조상 필요한 `public`, `assets`, `data`, `android` 폴더는 유지한다.
- 인수인계 때문에 새 `STATUS2`, `HANDOFF_NEW`, 날짜별 notes 폴더를 만들지 않는다.
- 앞으로는 사용자 요약 `README.md`와 에이전트 기준 `AGENTS.md`를 우선 최신화한다.

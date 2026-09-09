# AGENTS.md

## Purpose
이 파일은 청약/ChungYack 프로젝트를 다음 AI/Codex 세션에서 바로 이어가기 위한 작업 인수인계다. 사용자용 요약은 루트 `README.md`를 본다. 기존 `docs/`, `STATUS.md`, `HANDOFF.md` 등은 이미 존재하는 상세 원장/증거이므로 현재는 삭제하지 않지만, 앞으로 새 관리 문서를 계속 만들지 말고 장기 작업 기준은 이 파일과 `README.md`에 병합한다.

## Repositories / deployment split
- Project hub / private source-of-truth repo: `kimjae134679/ChungYack`.
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

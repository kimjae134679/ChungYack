# ChungYack Live Shell Architecture

최종 갱신: 2026-09-03 KST

## 목표

APK는 한 번 설치하고 유지한다. 화면, 공고, CSS, JavaScript는 GitHub Pages에서 바뀌며 다음 앱 실행/새로고침에 반영된다. 저장·숨김·필터·신청추적은 HTML 파일과 분리해 Android WebView의 동일 origin localStorage에 남긴다.

## 흐름

1. 작업자가 `kimjae134679/stock/chungyack-apk/public/**`를 수정한다.
2. `.github/workflows/pages.yml`이 Market Radar 루트와 ChungYack `/chungyack/`를 함께 배포한다.
3. 설치된 v0.8.0 APK의 Capacitor `server.url`이 `https://kimjae134679.github.io/stock/chungyack/`를 연다.
4. Service Worker는 네트워크 우선, 캐시 fallback으로 최신 파일을 받고 오프라인에는 마지막 성공본을 사용한다.
5. localStorage는 같은 HTTPS origin에 유지되어 HTML 파일 교체와 무관하게 남는다.

## APK 재빌드 경계

재빌드하지 않음:

- `public/index.html`
- `public/assets/**`
- `public/data/**`
- `public/sw.js`
- `public/manifest.webmanifest`

재빌드 필요:

- `capacitor.config.json`의 원격 URL 또는 appId 변경
- Android 아이콘·권한·Native Back·네이티브 플러그인 변경
- 패키지 서명/배포 셸 자체 변경

Android workflow의 push paths도 이 경계만 포함한다.

## 영구 상태 키

- 필터: `chungyack.filters.v2`
- 추적: `chungyack.tracking.v2`
- 추적 삭제복원: `chungyack.tracking.trash.v1`
- 저장: `chungyack.opportunity.saved.v1`
- 숨김: `chungyack.opportunity.hidden.v1`
- 현재 보기: `chungyack.opportunity.view.v1`

키 이름과 공고 id를 바꾸면 이전 사용자 기록과 연결이 끊기므로 migration 없이 변경 금지.

## 공개/개인 분리

Pages 배포본은 공개 공고만 포함한다. `trackingSeed`는 빈 배열이며 `already-applied` 개인 일정 그룹을 배포하지 않는다. 사용자가 앱에서 만든 신청추적은 기기 localStorage와 사용자가 직접 내보낸 JSON 백업에만 둔다.

## 검증 원장

- stock commit: `f9b8b0b979eb3b1a10a810615134c5d97a3ba103`
- Pages run: `33661958687` SUCCESS
- Android run: `33661958643` SUCCESS
- APK SHA-256: `22F5897314237E8FC6643840B5B0FD97125DE954DD2826CAF01B889DC0060B3B`
- signer SHA-256: `7BA627EE4C748015D8493DBED0E1623A39A0CA5FAE0042C34C74823FBA7E0543`

브라우저 실배포 검증에서 저장 1건, 숨김 1건, 추적 1건을 만든 후 reload해도 세 상태가 유지됨을 확인했다.

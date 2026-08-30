# 청약 레이더 APK 구조

최초 작성: 2026-08-31 KST

`kimjae134679/stock`의 Market Radar 구조를 참고해 청약 프로젝트도 **HTML/PWA UI + Capacitor Android + GitHub Actions 자동 APK 빌드** 구조로 전환한다.

## 1. 참고한 stock 구조

Market Radar는 다음 구조를 사용한다.

- `public/` = 실제 앱/웹 화면
- `public/data/*.json` = 화면 데이터
- `capacitor.config.json` = Android WebView 패키징
- `.github/workflows/android.yml` = 자동 APK 빌드
- PWA/모바일 safe-area 대응
- 데이터와 UI를 분리해 화면을 재사용

청약 레이더도 같은 방향을 따른다.

## 2. 현재 v0.1 구조

```text
/
├─ package.json
├─ capacitor.config.json
├─ VERSION
├─ .github/workflows/android.yml
├─ scripts/qa-app.mjs
└─ public/
   ├─ index.html
   ├─ manifest.webmanifest
   ├─ sw.js
   ├─ assets/
   │  ├─ app.css
   │  └─ app.js
   └─ data/
      └─ app.json
```

## 3. 앱 화면

하단 5탭:

1. `홈` — 긴급상태, 현재 추적, 과거 경쟁률
2. `추천` — SH 현실추천, 29/39㎡, 공급·보증금·경쟁률 필터
3. `추적` — 신청완료/예비/결과확인/신청중
4. `일정` — 다음 신청/결과/서류/계약 일정
5. `설정` — 버전, 갱신시각, 출처, 새로고침

## 4. 추천판 기본 원칙

- 현재 사용자 선호에 따라 59㎡ 고보증금 후보 기본 제외
- 서울 북부권 기본 추천판에서 후순위
- 공급호수 / 보증금 / 월세 / 입지 / 과거경쟁률을 같이 표시
- 실제 회차 경쟁률 전에는 `유추 경쟁률`로 명확히 표시
- 동일·유사지구 과거사례가 있으면 신뢰도 함께 표시
- 지도 링크 제공

## 5. UI/QA 기준 — 중요

사용자가 좋다고 평가한 핵심은 HTML이라는 형식 자체가 아니라 **완성된 디자인 / 정보 구조 / UI 작동 / QA**다.

따라서 모든 앱/표/대시보드는:

- 첫 화면에서 핵심 상태가 바로 보일 것
- 모바일/PC 모두 가로밀림이 없을 것
- Android 상태바/하단 제스처 영역 safe-area를 확보할 것
- 검색/필터/정렬은 실제로 작동할 것
- 버튼이 보이기만 하고 작동하지 않는 상태 금지
- 정보 위계를 색/여백/타이포로 명확히 구분
- 상세정보가 길면 펼치기 방식 사용
- 로딩 실패 시 무반응이 아니라 오류 메시지 표시
- 앱 빌드 전에 `npm run qa` 통과 필수
- QA 스크립트에서 필수파일, 추천 데이터, 59㎡ 제외, 모바일 safe-area 등을 검사

## 6. APK 빌드

`main` 브랜치의 다음 파일이 바뀌면 Android workflow가 자동 실행된다.

- `public/**`
- `package.json`
- `capacitor.config.json`
- `VERSION`
- `scripts/qa-app.mjs`
- Android workflow 자체

빌드 성공 시:

- `ChungYack-Radar-vX.Y.Z-debug.apk` 생성
- GitHub Actions artifact 업로드
- `apk-vX.Y.Z` Release에 APK 업로드
- `ops/android-latest-run.json`에 마지막 빌드 정보 기록

## 7. Private 저장소 주의

현재 ChungYack 저장소는 private이므로 개인 신청상태를 담아도 외부 공개를 전제로 하지 않는다.

Market Radar처럼 `GitHub Pages에서 최신 데이터만 실시간 읽기` 구조로 바꾸려면 별도의 공개 데이터 엔드포인트 또는 접근제어가 필요하다.

따라서 v0.1은 **APK에 데이터를 번들하는 안전한 구조**로 시작한다. 데이터 변경 시 자동으로 새 APK가 생성된다.

추후 목표:

- 민감정보와 공개 가능한 공고 데이터를 분리
- 공개 데이터만 별도 endpoint에서 자동갱신
- APK 재설치 없이 공고/경쟁률/추천 데이터 갱신
- 사용자의 개인 신청상태는 로컬 저장 또는 private sync로 분리

## 8. 다음 확장

- 일정 그룹별 지도
- 공고별 공식링크/PDF/신청버튼
- SH 대형공고 단지·타입 세부 펼치기
- 공가/예비/경쟁률 필터
- 관심/패스 상태를 앱에서 로컬 조작
- 결과발표일 D-day
- 서류/계약 체크리스트
- 알림 기능
- 버전별 known-good 화면 백업

# Android Build Blocker

최종 확인: 2026-08-31 KST

## 현재 상태

청약 레이더 앱 소스/UI 변경은 GitHub main에 반영되어 있으나 GitHub Actions의 Android APK 빌드가 실제 step 실행 전에 실패하고 있다.

관찰된 특징:

- workflow run은 생성됨
- `build` job도 생성됨
- job status는 수 초 내 `completed / failure`
- connector/API에서 job step 목록은 빈 배열
- job log blob도 생성되지 않아 로그 다운로드가 404/BlobNotFound
- workflow 첫 step에서 생성해야 하는 `ops/android-latest-run.json`도 생성되지 않음

따라서 현재 장애는 npm, Capacitor, Gradle, Android 소스, UI JS syntax가 실행된 뒤 발생하는 빌드 오류가 아니라 **GitHub-hosted runner가 실제 job step을 시작하기 이전 단계의 Actions 실행 차단/할당 문제**로 판단한다.

가능성:

- private repository GitHub Actions 사용량/결제 한도
- Actions 사용 정책/계정 제한
- GitHub-hosted runner 할당 문제
- GitHub 측 일시 장애

현재 연결된 GitHub API에서는 계정 Billing/Actions quota 설정을 직접 조회할 수 없으므로 원인을 더 좁힐 때는 GitHub 웹의 repository `Actions` 및 account `Billing / Actions usage` 상태를 확인해야 한다.

## 최근 확인 실행

- run 33381904564 — failure, job steps 0
- retry attempt — failure, job steps 0
- run 33394016372 — failure, job steps 0
- run 33394955861 — v0.3.2 workflow 정리 후 재실행, failure, job steps 0

## 적용 완료된 소스 변경

- 기존 참고/자격 영역을 사용한 사용자 조건 판정 강조
- impossible: 빨간 배경/테두리/왼쪽 강조선 + 명확한 불가 이유
- conditional/review: 주황/노랑 계열
- possible: 녹색 계열
- 마장 행복마을: `❌ 사실상 신청 불가` + 사회적경제조직 종사자 필수요건 불일치 설명
- VERSION / package version: 0.3.2

## workflow 스팸 방지 변경

Android workflow는 더 이상 `public/**` 전체 변경에 반응하지 않는다.

시간별 보고 JSON이나 앱 사용자상태 JSON처럼 APK 재빌드가 필요 없는 데이터 갱신은 빌드를 트리거하지 않고, 다음 앱 번들 관련 변경만 빌드를 트리거한다.

- public/index.html
- public/manifest.webmanifest
- public/assets/**
- public/data/app.json
- public/data/sh-2026.csv
- public/data/report-overrides.json
- package.json
- capacitor.config.json
- VERSION
- scripts/qa-app.mjs
- scripts/apply-android-branding.mjs
- workflow 자체
- 수동 rebuild request

## 다음 작업

GitHub Actions runner가 다시 실제 step을 시작할 수 있게 된 뒤:

1. v0.3.2 workflow 재실행
2. UI and data QA 통과 확인
3. Gradle assembleDebug 성공 확인
4. APK artifact 생성 확인
5. release asset 업로드 확인
6. 실제 APK에서 빨강/주황/초록 사용자 자격판정 표시 확인

# ChungYack — 청약 프로젝트

서울·경기 주거/청약 공고를 많이 찾고, 공식 자료로 검증한 뒤 **실제 신청 가능한 후보와 신청 후 결과까지 끝까지 추적**하는 프로젝트입니다.

## 2026-11-01 최신 공개 공고·임대료 기준
- 활성 공개 공고 `stock/chungyack-apk/public/data/current-opportunities.json`은 실제 **접수 중·향후 접수·수시(확인 필요)** 건만 유지한다. 접수 마감 공고는 활성 목록에서 제거하고, 이전 저장소 이력을 현재 추천·신청·결과 추적으로 되살리지 않는다.
- **공고 게시종료일은 신청 마감일이 아니다.** 접수일 불명확한 항목은 직접 신청 가능한 공고로 단정하지 않는다.
- 보증금과 월세는 `rentDetails.offers[]`에 **같은 주택형·호실·전환비율의 정확한 한 쌍**(`depositWon`, `monthlyRentWon`)으로 저장한다. 금액 범위를 서로 다른 타입끼리 조합해 보여주지 않는다. 관리비·보증료/기숙사비는 구분한다.
- 1차 공식 PDF와 공급표로 확인한 가격은 `verification=official`, 공식 원문 접근 제한으로 2차 공개표 교차확인만 한 경우 `verification=secondary-crosscheck`로 명시한다. 추정·불완전한 숫자 파싱으로 가격을 채우지 않는다. LH 청년 전세임대처럼 계약 주택별로 달라지는 제도에는 임의 고정 월세를 넣지 않는다.
- 공개 3종 `current-opportunities.json`, `hourly-report.json`, `app.json`의 갱신시각·공고 수를 맞춘다. 만료 공고를 다음 6시간 갱신에서 다시 추가하지 않는다. 고가 민간 청년안심주택과 특수자격 주택은 일반 추천에서 제외하고 확인용으로만 둔다.
- 2026-11-01 정리 시 기존 공개 공고 98건에서 지난 접수 82건을 빼고 현재/예정·수시/잔여 확인 16건으로 전환했다. 16건 중 13건은 공식 자료 기반 가격/모집 검증, SH 도전숙·신림 사회주택 3건의 가격은 2차 공급표 대조이므로 공식 원문 검증을 우선한다. 기존 개인 신청 추적 공개 초기값 `[]` 유지.

## 2026-10-27 신청 이력 초기화
- 이전 신청 전체는 비공개 보관본으로 이전하고 현재 신청·결과 추적은 빈 상태에서 시작한다.
- 과거 신청은 양식·처리절차 참고 전용이며, 앞으로 새로 신청한 공고만 활성 추적에 등록한다.

## 현재 구조
- 프로젝트 기준 저장소: `kimjae134679/ChungYack` (public, 개인 신청 상태는 비공개 Supabase에 보관)
- 실제 라이브 HTML/APK shell 코드: `kimjae134679/stock/chungyack-apk/`
- 라이브 사이트: `https://kimjae134679.github.io/stock/chungyack/`
- 현재 live service-worker cache 확인값: `chungyack-live-v0.10.0-r1`
- 2026-09-09에도 `stock` repo에서 공고/시간별 보고/홈 필터 변경이 계속 반영되고 있습니다.

즉 이 저장소의 오래된 v0.8.x 문서보다 **`stock/chungyack-apk/public/**`가 실제 화면/배포 상태의 최신 기준**입니다.

## 앱 방식
APK는 한 번 설치하는 **원격 HTML shell**입니다.

- 일반 UI·공고 데이터 변경 → `stock/chungyack-apk/public/**` 수정 + GitHub Pages 배포
- remote URL/package/native bridge 같은 shell 자체 변경 → 그때만 APK 재빌드
- HTML만 바뀌었는데 APK를 매번 다시 만드는 방식은 사용하지 않습니다.

## 현재 사용자 흐름
- 홈: 현재 신청/검토할 공고 중심, 만료 공고 기본 제거
- 결과: `확인 필요 / 합격·예비 / 탈락` 분류 및 결과 처리
- 신청: 진행 중인 신청/후속 추적
- 저장/숨김/추적 상태는 새로고침 후에도 유지해야 함
- 같은 공고의 `id`는 사용자 기록 연결키이므로 임의 변경 금지

## 공고 판단 원칙
- 민간 사이트·SNS·유튜브·블로그는 **후보 발견용**
- 최종 자격/공급수/보증금/월세/정확주소는 공식 공고·PDF·공급표·임대조건표로 재검증
- 공식 주소가 없으면 지도에 추정 핀을 찍지 않음
- 패스한 공고는 상세 추천을 반복하지 않음
- 이미 신청한 공고는 결과 → 서류 → 계약 → 입주까지 추적

## 주요 기술·서비스
- HTML / CSS / JavaScript / PWA service worker
- Capacitor 8 Android shell
- GitHub Pages
- GitHub Actions + Gradle APK build/release
- Supabase sync
  - Actions 공유 상태: `assistant_state`
  - 개인 client 상태: `client_state`
  - GitHub Actions secret: `SUPABASE_SECRET_KEY`

실제 secret 값은 저장소 문서에 적지 않습니다.

## APK/Capacitor 작업
`stock/chungyack-apk`에서 shell을 실제로 바꿀 때 사용하는 기본 명령:
```bash
npm install
npm run android:add
npm run android:sync
npm run android:brand
```
일반 HTML/데이터 수정만이라면 APK 재빌드보다 Pages 배포만 확인합니다.

## 내가 준비해야 하는 것
- GitHub/Pages 배포 권한
- Supabase 연결 및 필요한 GitHub Actions secret
- APK shell 변경 시 Node/npm, Capacitor, Android/Gradle 빌드 환경
- 서명 key 자체는 별도 안전 보관; 문서에는 secret/private key를 넣지 않음

## 주의할 점
- 과거 v0.7.1과 v0.8.0 shell의 서명 인증서가 달라 Android 덮어쓰기가 거부된 이력이 있습니다.
- 구버전 기록이 중요하면 JSON 백업 → 기존 앱 삭제 → 새 앱 설치 → 복원 순서가 필요할 수 있습니다.
- origin 변경 시 옛 `https://localhost` localStorage는 자동 이동하지 않습니다.
- 공개 Pages data에는 개인 신청/결과 상태를 넣지 않습니다.
- UI에 검증 원자료를 잔뜩 펼쳐 놓지 않고, 기본 카드에는 실제 판단에 필요한 핵심 정보만 둡니다.

## 다음 확인
1. live 사이트에서 active-only 홈과 결과 분류/이동이 실제 동작하는지 확인
2. 저장/숨김/추적/결과 상태가 새로고침 후 유지되는지 확인
3. 모바일·데스크톱 카드 가독성과 버튼 중복/잘림 확인
4. Supabase 공개/개인 상태 경계 확인
5. 공고 데이터는 계속 공식 자료로 재검증하고 후속 결과까지 추적

AI가 이어서 작업할 때 필요한 정확한 repo 분리, persistence key, Capacitor/Supabase/서명 주의점은 루트 [`AGENTS.md`](AGENTS.md)를 봅니다. 앞으로 새 status/handoff 문서를 계속 늘리지 않고 이 `README.md`와 `AGENTS.md`를 우선 최신 상태로 유지합니다.

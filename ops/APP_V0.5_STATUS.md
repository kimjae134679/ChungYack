# ChungYack Radar v0.5.0 — Final Integration Status

최종 정리: 2026-09-01 KST

## 결론

현재 GitHub `main`은 청약2 프로젝트의 2026-09-01 대화 결정을 기준으로 정리됐다.

- SH 국민임대: 이번 회차 패스
- SH 2차 행복주택: 현재 메인 검토 공고
- LH 경기남부 / 인천·부천 청년 매입임대: 다음 검토축
- SH 2차 장기미임대: 후속 검토축
- 미리내집 / 마장 / 충신동: 하드자격 불일치 기록
- Zibble / 집지켜 / SNS: 후보 발견용, 공식자료 재검증 원칙
- 이미 신청한 5건: 결과/서류/예비 추적 유지

## 사용자 제공 자료 반영

### SH 2026년 2차 행복주택 공고문 캡처

이번 회차 공고문 표의 값을 그대로 보존:

- `1인 가구(+20%p)`
- `가구원수별 가구당 월평균소득 100%`
- `4,576,036원`

범용 포털의 일반 안내표와 수치가 다를 수 있으므로 이번 회차 판정에서는 사용자 제공 공고문 표를 우선한다.

### 집지켜 행복주택 후보 화면

발견후보 8곳:

1. 래미안장위퍼스트하이
2. 장위자이레디언트(장위4)
3. 보문파크뷰자이
4. 창경궁롯데캐슬시그니처
5. DMC SK VIEW
6. 힐스테이트녹번역
7. 은뜨락
8. 래미안베라힐즈

민간 화면의 `월세`, `내가 준비할 금액`, 평수 표시는 발견자료로 저장했다. 공식 청년 공급 여부, 공급/예비 수, 임대조건, 전환조건은 SH 공식 공급표/임대조건표 확인 전 확정하지 않는다.

### Zibble / SNS

- Zibble 주간 청약 일정은 무순위·임의공급·오피스텔·일반분양 등이 섞인 후보발견용 자료.
- 미리내집 SNS 예시는 발견기록으로 보존하지만 신혼/예비신혼 하드요건으로 현재 행동후보에서는 제외.

## 앱 v0.5.0

현재 실제 로드 순서:

```text
app.js
app-v2-fixes.js
app-v3.js
app-v4.js
app-v5.js
```

스타일:

```text
app.css
app-v2.css
app-v3.css
app-v4.css
app-v5.css
```

### v5 추가 기능

- 행복주택을 `🔥 현재 메인 검토`로 강조
- 이번 회차 소득표 근거를 앱 카드 안에서 확인 가능
- 사용자 제공 행복주택 후보 8곳 접이식 상세
- 각 후보의 민간 화면 가격과 `공식 재확인` 경고 표시
- `possible` 판정은 기존 사용자 UI 규칙대로 녹색
- 미리내집 하드불가는 빨간 판정영역
- Zibble/집지켜 자료를 `후보 발견용 자료`로 별도 접기 표시
- 실제 신청 전에는 추적 자동등록 없음

## 버전 정합성

- `VERSION` = 0.5.0
- `package.json` = 0.5.0
- `public/data/app.json` = 0.5.0
- `app-v5.js` display = 0.5.0
- Service Worker cache = `chungyack-radar-v0.5.0`

## 동기화된 프로젝트 문서

- `README.md`
- `STATUS.md`
- `HANDOFF.md`
- `data/tracking_registry.md`
- `logs/CHANGELOG.md`
- `reports/current_dashboard.html`
- `public/data/current-opportunities.json`

국민임대는 과거 상세 자료로 저장소에 남아 있지만 현재 행동판에서 재추천하지 않는다.

## APK 빌드

소스와 workflow는 v0.5.0 기준으로 준비됐지만 APK 생성은 완료되지 않았다.

최신 확인:

- run `33425904982`
- job `99599273931`
- conclusion `failure`
- job steps `null`
- logs `null`

checkout조차 시작되지 않은 GitHub Actions runner 단계 실패다. 앱 코드/Gradle 실행 결과가 아니다.

자세한 원인은 `ops/ANDROID_BUILD_BLOCKER.md` 참조.

## 다음 실질 작업

1. SH 2차 행복주택 공식 PDF/공급표 확보
2. `청년` 공급행 전체 추출
3. 8개 발견후보가 이번 회차 청년 공급인지 확인
4. 각 후보의 공식 공급/예비 수, 전용면적, 정확주소, 보증금, 월세, 보증금 전환조건 입력
5. 강남/판교 통근 및 실제 월주거비 비교
6. LH 경기남부/인천부천 공급주택 XLSX 펼치기
7. 이미 신청한 공고 결과/서류 후속 갱신
8. GitHub Actions runner 정상화 후 v0.5.0 APK 생성 및 실기기 QA

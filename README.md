# ChungYack — 청약2 Project Hub

최종 갱신: 2026-08-30 KST

이 저장소는 청약2 프로젝트의 **단일 기준점(Single Source of Truth)** 이다.
새 대화·새 작업자·자동화·인수인계 시 최상단 문서부터 읽고 현재 상태를 확인한다.

## 1. 지금 바로 볼 것

- **최상위 규칙** → [`docs/MASTER_RULES.md`](docs/MASTER_RULES.md)
- **현재 진행상황 / 신청·관심·결과확인 상태** → [`STATUS.md`](STATUS.md)
- **인수인계** → [`HANDOFF.md`](HANDOFF.md)
- **탐색 소스/전수확인 체크리스트** → [`docs/SOURCES_AND_COVERAGE.md`](docs/SOURCES_AND_COVERAGE.md)
- **공고 검증/보고 템플릿** → [`templates/REPORT_TEMPLATE.md`](templates/REPORT_TEMPLATE.md)
- **상태 데이터 원장** → [`data/tracking_registry.md`](data/tracking_registry.md)

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

## 3. 저장소 운영 원칙

- 최상단은 `README.md`, `STATUS.md`, `HANDOFF.md`만 봐도 전체 상황을 파악할 수 있게 유지한다.
- 규칙은 `docs/MASTER_RULES.md`를 최우선으로 한다.
- 공고 상태가 바뀔 때마다 `STATUS.md`와 `data/tracking_registry.md`를 함께 갱신한다.
- 사용자가 직접 알려준 신청/결과 상태는 공개 웹검색보다 우선한다.
- 패스 공고는 상세 분석을 반복하지 않는다.
- 보류는 패스와 다르며 새 정보가 생기면 재평가한다.
- 공식자료가 없는 가격·주소·개인 결과는 추정하지 않는다.

## 4. 권장 폴더 구조

```text
/
├─ README.md                  # 한눈에 보는 프로젝트 허브
├─ STATUS.md                  # 현재 상태 대시보드
├─ HANDOFF.md                 # 새 작업자용 인수인계
├─ docs/
│  ├─ MASTER_RULES.md         # 최상위 규칙
│  └─ SOURCES_AND_COVERAGE.md # 탐색 범위와 체크리스트
├─ data/
│  └─ tracking_registry.md    # 공고별 상태 원장
├─ templates/
│  └─ REPORT_TEMPLATE.md      # 오늘 보고 출력 양식
└─ archive/                   # 종료/과거 스냅샷 필요 시 사용
```

## 5. 최종 목표

**많이 찾고 → 공식자료로 걸러내고 → 실제 신청 가능한 것만 남기고 → 입지·가격·당첨가능성까지 비교하고 → 신청 후 결과까지 끝까지 추적한다.**

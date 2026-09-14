# 청약2 개인 클라우드 상태 선조회 규칙

최종 갱신: 2026-09-14 KST

이 문서는 청약2 자동/수동 실행에서 **공개 공고 일정만 보고 사용자 행동을 잘못 판단하지 않기 위한 강제 선행 절차**다.

## 1. 매 실행 첫 단계

공개 공고 검색·마감 알림·추천 판단보다 먼저 Supabase 개인 상태를 조회한다.

- Supabase project ref: `mgnjwkpmxjepdgincyxo`
- client table: `public.chungyack_client_state`
- assistant table: `public.chungyack_assistant_state`
- 확인 필드: `state.tracking`, `state.savedOpportunities`, `state.hiddenOpportunities`, `state.filters`, `state.updatedAt`, row `updated_at`

앱의 localStorage는 오프라인 폴백이고, 폰에서 변경된 개인 상태는 `chungyack_client_state`로 동기화된다.

## 2. 현재 사용자 행 판정

익명 인증 특성상 여러 행이 존재할 수 있으므로 단순히 아무 행이나 사용하지 않는다.

1. `updated_at desc`로 최근 행들을 조회한다.
2. `state.tracking`이 실제로 존재하고 최근 갱신된 행을 실사용 행으로 우선한다.
3. 빈 tracking의 테스트/새 설치 행은 실사용 행보다 우선하지 않는다.
4. 둘 이상의 실사용 후보가 동시에 최근 갱신됐다면 tracking 내용과 현재 대화에서 사용자가 직접 확인한 상태를 대조한다.
5. 행을 확정할 수 없으면 개인 행동을 단정하지 않고 `개인 클라우드 상태 확인 필요`로 처리한다.

## 3. 행동 판정 우선순위

충돌 시 다음 순서로 적용한다.

`현재 대화의 사용자 직접 확인 > 최신 Supabase client_state > data/tracking_registry.md / STATUS.md 스냅샷 > 공개 공고 일정`

예:
- 공식 공고가 오늘 마감이어도 Supabase tracking이 `신청완료`면 `지금 신청하세요` 알림 금지.
- `신청완료`는 이후 `결과 → 서류 → 계약 → 입주` 일정만 추적한다.
- `예비`이면 접수 마감이 아니라 예비순번 소진·추가계약 연락을 추적한다.
- `서류`이면 서류 제출 마감을 최우선으로 본다.
- `계약`이면 계약 마감/원본서류/입주 일정을 추적한다.
- `보류`/`숨김`은 일반 적극 추천에서 제외하되 공식 중대 변경이 있으면 재검토 가능하다.
- `찜`은 관심도가 높은 후보로 보되 신청완료로 간주하지 않는다.

## 4. 공개 데이터와 개인 데이터 분리

개인 상태를 아래 공개 파일에 복사하지 않는다.

- `kimjae134679/stock/chungyack-apk/public/data/hourly-report.json`
- `kimjae134679/stock/chungyack-apk/public/data/current-opportunities.json`
- `kimjae134679/stock/chungyack-apk/public/data/app.json`

공개 파일에는 공고 자체의 일정·조건만 유지한다. `app.json`의 `trackingSeed: []`도 유지한다.

개인 상태와 공개 공고를 결합한 판단은 **런타임/대화에서만** 한다.

## 5. 실행 순서 — 고정

1. KST 현재시각 확인
2. Supabase `chungyack_client_state` 최신 실사용 행 조회
3. tracking / saved / hidden / filters 상태 캐시
4. `tracking_registry.md`와 대조하고 오래된 스냅샷은 최신 개인 상태로 보정
5. 공식기관·지자체 신규/변경 공고 전수 확인
6. 공식 PDF/공급표/임대조건표로 검증
7. 공개 라이브 JSON 갱신 및 필요 시 `stock` 커밋
8. 개인 상태와 공개 일정을 결합해 사용자에게 필요한 행동만 판정
9. 이미 신청한 공고는 신규 신청 독촉 금지
10. 즉시 행동이 필요한 결과·서류·계약 변화만 짧게 알림

## 6. 앱 동기화 구조

현재 앱은 개인 상태 저장 시 다음을 수행한다.

`폰 localStorage → Supabase chungyack_client_state`

동기화 대상:
- 신청/추적
- 찜
- 숨김
- 필터

앱은 시작 시 초기 동기화하고, 포커스 복귀/가시성 복귀 및 주기적 pull로 원격 상태를 다시 확인한다.

반대 방향의 보조 상태는 `chungyack_assistant_state`를 통해 앱으로 내려갈 수 있다. 단, 사용자가 폰에서 직접 지정한 상태를 임의로 덮어쓰지 않는다.

## 7. 2026-09-14 확인 예시

현재 실사용 클라우드 행에서 다음이 실제 `신청완료`로 확인되었다.

- 상봉역 상봉생활 청년안심주택 추가모집
- SH 2026년 2차 행복주택 입주자 모집
- SH 2026년 2차 행복주택 - 고덕온빛채 36㎡
- 천호역 천호한강청년주택 추가모집
- LH 경기남부 26년 3차 청년 매입임대
- 신논현역 List 강남 추가모집

또한 세이지움 개봉은 `예비 46번`, 백악관타워는 `예비 42번`으로 개인 클라우드에 기록되어 있다.

이 목록 자체를 영구 고정값으로 쓰지 않는다. **매 실행마다 Supabase를 다시 조회한 최신 상태가 원본이다.**

# ChungYack Radar APK Architecture

Latest architecture: 2026-08-31 / app v0.4.0

## Product rule

The APK is not a static SH 국민임대 viewer. It is the mobile view of the ChungYack project report.

Home priority:
1. Current normal/hidden notices from the latest report.
2. Schedule urgency and next action.
3. Exact address and map when officially verified.
4. Supply/price/eligibility/detail/source.
5. Local-only tracking for notices actually applied to.

Hundreds/thousands-scale integrated announcements are deliberately separated from ordinary notices.

## Navigation

- 홈: current normal/hidden notices first, then local applied tracking.
- 일정: public latest report grouped by today/tomorrow, 2-3 days, 4-7 days, later; local applied follow-up appears separately.
- 대형공고: large integrated announcements only. SH 국민임대 keeps the 79 type/complex rows, exact addresses, free 29/39/46/49/59 filters and historical/estimated competition analysis.
- 추적: only items actually added as applied. User can edit status/next action/note/address, pause/cancel tracking, remove and undo.
- 설정: refresh, local backup/restore and version/source information.

## Data separation

Private SSOT: `kimjae134679/ChungYack`.

Public APK build host: `kimjae134679/stock/chungyack-apk`.

The public repository may contain only public notice/catalog information. It must not contain personal applicant identity, birth date, application rank, private waitlist number or the association that a specific notice was applied to.

Personal tracking remains Android WebView localStorage and can be imported/exported using `chungyack-local-backup-v1` JSON.

## Live schedule feed

The APK bundles `public/data/hourly-report.json` as an offline fallback. It also attempts to load the public sanitized feed from the stock main branch first, so ordinary notice schedules can be refreshed without reinstalling the APK once the public feed is updated.

The project report generator should therefore update both:
- private project report/SSOT as normal;
- sanitized public APK feed when a public notice changes materially.

Do not publish personal applied/result state into the public feed.

## Mega announcement rule

Examples: SH 국민임대 1,973, SH 행복주택 1,484, LH 경기남부 청년 매입임대 549, SH 장기미임대 476.

Large announcements must not flood Home with every row. Home shows one compact mega teaser; the dedicated Mega tab contains the announcement summary and decomposed rows when available.

Competition presentation:
- current official competition, when released;
- historical competition separately;
- inferred/estimated competition must be explicitly labelled as estimate and never mixed with the official current value.

## QA gate

GitHub Actions must verify:
- SH catalog has 79 rows and all 29/39/46/49/59 area types;
- latest public report has non-empty groups and mega notices;
- no known private strings in public build inputs;
- all JS syntax checks pass;
- v0.4 schedule/mega/remote scripts are present in the Android assets;
- launcher icon and native back handling are present;
- Gradle APK build and artifact packaging succeed.

## UX rule

Design/UI/QA quality is a product requirement, not decoration. Deliverables should be immediately readable on mobile, provide clear hierarchy and controls, avoid raw CSV-like presentation, and expose exact addresses/maps/details without forcing the user to parse source documents manually.

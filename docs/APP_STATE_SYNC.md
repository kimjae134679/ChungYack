# ChungYack APK User State Sync

`data/app_user_state.json` is the private SSOT for user actions made inside the ChungYack Radar Android app when optional GitHub sync is enabled.

## What is synchronized

- `noticeSort`: general-notice view mode (`time` or `recommend`) and its update timestamp.
- `noticeDecisions`: per-notice `skipped` state plus the notice name, current time label, location and known official/apply links. A checked skip is reversible in the app.
- `tracking`: the user's app-side application tracking list.
- `trackingUpdatedAt`: last tracking-list modification timestamp.
- `reportUpdatedAt`: public report version the app was displaying when it synchronized.

## Read rule for ChatGPT / future workers

Before recommending or repeating currently visible public notices, read `data/app_user_state.json` when it has a non-null `updatedAt`.

- If `noticeDecisions[noticeId].skipped == true`, treat it as user-passed: do not restore full details, recommendation emphasis or map in the normal report unless the user explicitly asks to reconsider it. It may be shown only in the compact passed/excluded form required by project rules.
- If `skipped == false`, the user has explicitly restored that notice and it may be shown normally again.
- Use the most recent per-item `updatedAt` when resolving conflicts.
- Do not infer a real housing application cancellation from app skip/removal actions. They are display/tracking decisions only.

## Security

The GitHub token is never written to this repository or browser localStorage. The Android APK stores it encrypted with Android Keystore and uses it only to read/write this private repository path through the GitHub Contents API.

Recommended token scope: fine-grained token restricted to `kimjae134679/ChungYack`, repository permission `Contents: Read and write` only. The token should be entered only inside the APK settings screen, not pasted into project documents or chat.

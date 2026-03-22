## 2025-03-22 - [External Links Security Enhancement]
**Vulnerability:** External links were missing `target="_blank"` and `rel="noopener noreferrer"`.
**Learning:** This is a classic security enhancement that prevents reverse tabnabbing attacks (where the newly opened page can hijack the original page via the `window.opener` object).
**Prevention:** Always add `target="_blank"` and `rel="noopener noreferrer"` to external links.

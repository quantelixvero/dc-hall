# Module 01: Security, Authentication & Data Privacy (সিকিউরিটি ও ডাটা সুরক্ষা)

> **File Path:** `dc-hall/docs/01_SECURITY_AND_AUTH.md`  
> **Last Updated:** November 8, 2026 (v8.7)  
> **Status:** 🟢 All Critical Vulnerabilities Resolved (Zero Leaks, Hardened Search, Sanitized Offline Fallbacks)

---

## 1. Resolved Security Vulnerabilities (সমাধানকৃত নিরাপত্তাত্রুটি)

### 1.1 Google Cloud Service Account Protection
- **Status:** Resolved in v8.2.
- Moved `service_account.json` to `dc-hall/scripts/credentials/`.
- Configured `netlify.toml` with `[[redirects]] from = "/scripts/*" to = "/404.html" status = 404` to completely block direct web access.

### 1.2 Elimination of Plaintext Passwords in Source Code
- **Status:** Resolved in v8.2.
- Purged hardcoded plaintext passwords (`102103104`, `dc27hall`, etc.) from `app.js`.
- Implemented zero-dependency pure SHA-256 cryptographic verification (`computeSha256`) with deterministic hash maps.

### 1.3 Sanity GROQ Query Projection Sanitization
- **Status:** Resolved in v8.2.
- Updated `js/sanity-client.js` GROQ projections to project only public fields for `adminSettings`, `batchConfigs`, and `siteSettings`.
- Sensitive fields (`master_password`, `batch_passwords`, `batch_admin_emails`, `moderator_emails`) are explicitly nullified in public queries.

### 1.4 Search Bar Data Leakage (Client-Side Privacy Bypass)
- **Status:** Resolved in v8.7.
- **Problem:** When an unauthorized visitor typed a phone number, guardian number, or private email into the student search bar, `studentMatches()` searched raw private fields and returned the student card—revealing who the number belonged to even though the card showed a locked badge!
- **Fix:** `studentMatches()` now checks `isProfileFieldUnlocked(field, student)`. If a field is locked, it is **completely excluded** from search indexing. Unauthorized visitors can never match or uncover students using locked private fields.

### 1.5 Static JSON File Password Purge & Offline Privacy Masking
- **Status:** Resolved in v8.7.
- **Problem:** `data/settings.json` and `data/site_db.json` contained `"password": "102103104"` committed in plain text. Furthermore, offline fallback student records contained unmasked personal phone numbers and emails.
- **Fix:** Completely purged `password` from all `data/*.json` files. Updated `scripts/build-data.mjs` to automatically scrub passwords on every build and mask fallback phone numbers/emails (`01625******`). Real personal information is served solely through authorized live Sanity Content Lake queries.

---

## 2. Security Verification Checklist (নিরাপত্তা যাচাই চেকলিস্ট)

- [x] **Check 1:** No plaintext passwords exist in `app.js`, `settings.json`, or `site_db.json`.
- [x] **Check 2:** Service account keys blocked from HTTP access via server redirects.
- [x] **Check 3:** Public GROQ queries never return master passwords or admin email lists.
- [x] **Check 4:** Search bar never reveals student identity via locked phone numbers or emails.
- [x] **Check 5:** Offline JSON fallback files contain only masked phone numbers and zero credentials.

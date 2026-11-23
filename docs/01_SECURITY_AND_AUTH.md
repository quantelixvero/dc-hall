# Module 01: Security, Authentication & Data Privacy (সিকিউরিটি ও ডাটা সুরক্ষা)

> **File Path:** `dc-hall/docs/01_SECURITY_AND_AUTH.md`  
> **Last Updated:** November 23, 2026 (v8.33)  
> **Status:** 🟢 All Critical Vulnerabilities & Admin Password Reset Flaws Resolved (Zero Leaks, Dynamic Hash Vault, Unified Batch Security)

---

## 1. Resolved Security Vulnerabilities & Auth Fixes (সমাধানকৃত নিরাপত্তাত্রুটি ও সমাধান)

### 1.1 In-Memory Cryptographic Auth Vault (`__DC_AUTH_VAULT__`) & Zero Leakage
- **Status:** Resolved in v8.33.
- **Problem:** `SANITY_GROQ_QUERY` was returning `master_password`, `batch_password`, `super_admin_emails`, `universal_moderator_emails`, and `batch_admin_emails` directly into `window.__SANITY_DATA__` and printing raw passwords in the browser console. Any visitor could inspect DevTools and read administrative credentials and private contact emails.
- **Fix:**
  1. Purged all administrative email fields (`super_admin_emails`, `universal_moderator_emails`, `batch_admin_emails`, `moderator_emails`) from the public GROQ query in `js/sanity-client.js`.
  2. Implemented `processAndSanitizeAuth(data.result)`: instantly ingests live credentials into an isolated cryptographic vault (`_authVault`), computes one-way SHA-256 hashes, and immediately **deletes** `master_password` and all `batch_password` fields from the payload before assigning to `window.__SANITY_DATA__` or saving to `localStorage`.
  3. Removed all `console.log` statements that previously dumped payload objects to the developer console.

### 1.2 Admin Panel & Batch Password Update Failure Resolution
- **Status:** Resolved in v8.33.
- **Problem:** When an admin updated the master password or batch passwords in Sanity Studio (Admin Panel), the website either failed to accept the new password or immediately logged the user out on page refresh.
- **Root Causes:**
  1. **Dynamic Hash Disconnect:** `getAuthRole()` and `checkSessionValidity()` only compared stored hashes against hardcoded static arrays (`AUTH_MASTER_HASHES` and `AUTH_BATCH_HASHES`), ignoring dynamic hashes from Sanity Studio. Consequently, refreshing the page stripped the session and marked the user as `guest`.
  2. **Dual-Configuration Disconnect:** Sanity Studio allowed setting batch passwords in both `adminSettings.batch_security_controls` and individual `batchConfig` documents, but `verifyAuthSecret()` only inspected `batchConfigs`, completely ignoring passwords set in `batch_security_controls`.
  3. **Stale Cache Hydration:** Stale `localStorage` cached under legacy keys prevented newly published credentials from being evaluated before network resolution.
- **Permanent Fix:**
  1. Unified `verifyAuthSecret()` to check:
     - Cryptographic Auth Vault (`__DC_AUTH_VAULT__.verify(secret)`)
     - Master admin credentials (`cmsAdminSettings.master_password`)
     - Centralized batch controls (`adminSettings.batch_security_controls`)
     - Individual batch configs (`cmsBatchConfigs`)
     - Static offline fallback hashes (`AUTH_BATCH_HASHES`)
  2. Updated `getAuthRole()` and `checkSessionValidity()` to validate sessions dynamically against the vault (`isHashValid` and `getRoleForHash`), ensuring seamless session persistence across all pages and reloads.
  3. Unified `unlockBatchDirectory()` with `verifyAuthSecret()` so both master and batch credentials reliably unlock directories.
  4. Bumped cache key to `dc_sanity_cache_v833` to flush obsolete browser storage.

### 1.3 Google Cloud Service Account Protection
- **Status:** Resolved in v8.2.
- Moved `service_account.json` to `dc-hall/scripts/credentials/`.
- Configured `netlify.toml` with `[[redirects]] from = "/scripts/*" to = "/404.html" status = 404` to completely block direct web access.

### 1.4 Search Bar Data Leakage (Client-Side Privacy Bypass)
- **Status:** Resolved in v8.7.
- **Problem:** Searching locked phone numbers or emails in the student directory returned student cards, inadvertently leaking identities.
- **Fix:** `studentMatches()` strictly checks `isProfileFieldUnlocked(field, student)`. If a field is locked, it is completely excluded from search indexing.

### 1.5 Static JSON File Password Purge & Offline Privacy Masking
- **Status:** Resolved in v8.7.
- All committed `data/*.json` files are completely scrubbed of credentials and personal contact numbers are masked (`01625******`). Real contact details are served solely through live, authenticated Sanity Content Lake queries.

---

## 2. Security Verification Checklist (নিরাপত্তা যাচাই চেকলিস্ট)

- [x] **Check 1:** No plaintext passwords exist in `app.js`, `settings.json`, or `site_db.json`.
- [x] **Check 2:** Service account keys blocked from HTTP access via server redirects.
- [x] **Check 3:** Public GROQ queries never return master passwords or admin email lists to `window.__SANITY_DATA__`.
- [x] **Check 4:** Changing master or batch passwords in Sanity Studio takes effect immediately and persists across page reloads.
- [x] **Check 5:** Both `adminSettings.batch_security_controls` and `batchConfigs` passwords are fully supported and verified.
- [x] **Check 6:** Search bar never reveals student identity via locked phone numbers or emails.
- [x] **Check 7:** Offline JSON fallback files contain only masked phone numbers and zero credentials.

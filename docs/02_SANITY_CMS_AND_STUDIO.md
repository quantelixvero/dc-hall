# Module 02: Sanity CMS, Content Lake & Studio Administration (স্যানিটি সিএমএস ও অ্যাডমিন প্যানেল)

> **File Path:** `dc-hall/docs/02_SANITY_CMS_AND_STUDIO.md`  
> **Last Updated:** November 8, 2026 (v8.6)  
> **Status:** 🟢 Sanity Studio v3 Fully Modernized & Refreshed (Enterprise Grade, Emoji-Free, Bilingual Admin Guidance)

---

## 1. Current Architecture & Setup (বর্তমান অবস্থা ও আর্কিটেকচার)

### 1.1 Sanity Studio v3
- **Studio Directory:** [`dc-hall/studio/`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/studio/)
- **Live Deployment:** `https://dchall.sanity.studio/`
- **Project ID:** `w16kaeyg` | **Dataset:** `production` | **API Version:** `2024-01-01`
- **Desk Structure:** [`studio/structure.js`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/studio/structure.js) provides role-based and batch-scoped navigation (HSC-27 Founder to HSC-35).

### 1.2 Legacy Decap CMS Elimination
- **Legacy Path Removed:** `dc-hall/admin/` and all `config.yml` files were permanently deleted in v8.3.
- All live data flows directly to Sanity Content Lake with zero legacy CMS dependency.

### 1.3 Schema Types Overview (`studio/schemaTypes/`)
All schema types have been completely refreshed in **v8.6** to adhere to international clean UI standards:
1. **Zero Emoji Clutter:** Removed 100% of emojis from titles, group tabs, dropdown lists, and preview badges across all schema files.
2. **Clean English Headings:** All field titles and group tabs use clean, professional English (e.g., `Website Login Password`, `Batch Admin Emails`, `Security & Visibility Controls`).
3. **Concise Bengali Administrative Guidance:** Underneath every heading and field, concise Bengali instructions are embedded in `description:` so hall super, provost office, and student representatives understand exactly what each setting controls without any technical jargon.

| Schema Name | Role & Scope | v8.6 Refresh Status |
| :--- | :--- | :--- |
| `adminSettings.js` | Passwords, Page-level Locks, Seniority Visibility, Menu & Footer | 🟢 Clean English titles, Bengali guidance on every setting |
| `batchConfig.js` | Batch password, Batch admin emails, Moderator emails | 🟢 Clean English titles, clear Bengali admin explanations |
| `student.js` | Student directory, 1st/2nd year room & bedmate assignments, results | 🟢 Clean English titles, calendar DOB guidance in Bengali |
| `room.js` | Room capacity, assigned students, floor configurations | 🟢 Clean English titles, automated sync guidance in Bengali |
| `notice.js` | Official notices, popup modal controls, date-range scheduling | 🟢 Clean English titles, popup duration guidance in Bengali |
| `hallInfo.js` | Hostel history, hall super portrait/message, alumni, success stats | 🟢 Clean English titles, Bengali descriptions for each block |
| `homePage.js` | Homepage preview controls, hero banner, rotating phrases | 🟢 Clean English titles, Bengali section order guidance |
| `developerProfile.js` | Developer portfolio, skill set, project cards, contributors | 🟢 Clean English titles, Bengali portfolio guidelines |
| `galleryItem.js` | Photo collections, drag-and-drop batch albums, captions | 🟢 Clean English titles, bulk upload tips in Bengali |
| `galleryEvent.js` | Hall events, YouTube/Drive video embeds, multi-location maps | 🟢 Clean English titles, video & map guidance in Bengali |
| `hallForm.js` | Google Forms embed, survey links, student login gates | 🟢 Clean English titles, embed instruction in Bengali |
| `editRequest.js` | Moderator change requests, batch admin review workflow | 🟢 Clean English titles, review workflow in Bengali |
| `siteSettings.js` | Legacy settings container, college clubs & social resources | 🟢 Clean English titles, Bengali descriptions throughout |

---

## 2. Realtime Data Fetching & Sync (ডাটা ফেচিং ও লাইভ সিঙ্ক)

- **Client File:** [`dc-hall/js/sanity-client.js`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/js/sanity-client.js)
- **GROQ Queries:** Project only public, non-sensitive fields (passwords and admin emails are filtered at server level).
- **Live Updates:** Uses Server-Sent Events (SSE) listener (`client.listen()`) to trigger real-time UI updates on publish without page reload.

---

## 3. Version History & Milestones (ভার্সন ইতিহাস)

- **v8.2:** Secured GROQ projection in `sanity-client.js` to prevent credential exposure.
- **v8.3:** Removed legacy Decap CMS artifacts (`admin/`, `config.yml`).
- **v8.5:** Eliminated hardcoded mock data in `app.js`, delegating full student & room storage to Sanity Content Lake.
- **v8.6 (Current):** Complete Sanity Studio UI overhaul:
  - Stripped all emojis from `structure.js` and all 13 schema types.
  - Converted all heading labels to clean, elegant English.
  - Authored concise Bengali instructions (`description:`) under all fields for hall administrators.
  - Verified pure ES module syntax compilation with zero errors.

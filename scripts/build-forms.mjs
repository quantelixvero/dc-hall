import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_ID = "w16kaeyg";
const DATASET = "production";
const ASSET_VERSION = "7.4";
const root = process.cwd();
const formDir = path.join(root, "form");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function convertToGoogleFormEmbedUrl(rawInput) {
  if (!rawInput) return "";
  let str = String(rawInput).trim();

  // 1. If user pasted full iframe tag, extract the src attribute
  const iframeMatch = str.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    str = iframeMatch[1].trim();
  }

  // 2. Unescape HTML entities
  str = str.replace(/&amp;/g, "&");

  // 3. Remove leading/trailing quotes or brackets
  str = str.replace(/^["'<]+|["'>]+$/g, "");

  // 4. If it's a Google Form URL
  if (str.includes("docs.google.com/forms")) {
    str = str.replace(/\/edit(\?.*)?$/i, "/viewform");
    str = str.replace(/\/formResponse(\?.*)?$/i, "/viewform");

    try {
      const u = new URL(str);
      u.searchParams.delete("usp");
      u.searchParams.set("embedded", "true");
      return u.toString();
    } catch {
      if (str.includes("?")) {
        return str.includes("embedded=true") ? str : `${str}&embedded=true`;
      }
      return `${str}?embedded=true`;
    }
  }

  if (str.includes("?")) {
    return str.includes("embedded=true") ? str : `${str}&embedded=true`;
  }
  return `${str}?embedded=true`;
}

async function resolveGoogleFormUrl(rawUrl) {
  let target = convertToGoogleFormEmbedUrl(rawUrl);
  if (target && target.includes("forms.gle/")) {
    try {
      const cleanGle = target.split("?")[0];
      const res = await fetch(cleanGle, { redirect: "follow", method: "GET" });
      if (res.url && res.url.includes("docs.google.com/forms")) {
        target = convertToGoogleFormEmbedUrl(res.url);
      }
    } catch (err) {
      console.warn("Could not resolve forms.gle redirect at build time:", err.message);
    }
  }
  return target;
}

try {
  await mkdir(formDir, { recursive: true });

  const query = '*[_type == "hallForm"]{_id, title_en, title_bn, slug, batch, google_form_url, google_form_embed_code, description_en, description_bn, is_active, requires_login}';
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-08-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn("Failed to fetch forms from Sanity:", res.statusText);
  } else {
    const data = await res.json();
    const forms = data.result || [];
    console.log(`Building static form pages for ${forms.length} forms...`);

    const formsListForIndex = [];

    for (const f of forms) {
      const rawSlug = f.slug?.current || f.slug;
      if (!rawSlug) continue;

      const slug = String(rawSlug).trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "");
      if (!slug) continue;

      const rawFormSource = f.google_form_embed_code || f.google_form_url || "";
      const embedUrl = await resolveGoogleFormUrl(rawFormSource);
      const directUrl = f.google_form_url || embedUrl;

      const titleEn = f.title_en || "Hostel Form";
      const titleBn = f.title_bn || titleEn;
      const descEn = f.description_en || "";
      const descBn = f.description_bn || descEn;
      const batchLabel = f.batch || "DC Hall";
      const isActive = f.is_active !== false;
      const requiresLogin = !!f.requires_login;

      formsListForIndex.push({ slug, titleEn, titleBn, batchLabel, isActive });

      const slugDir = path.join(formDir, slug);
      await mkdir(slugDir, { recursive: true });

      const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(titleEn)} | Dhaka College International Hall</title>
  <meta name="description" content="${escapeHtml(descEn || titleEn)}">
  <meta name="author" content="Abdullah Al Adib (SE Adib)">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://dchall.pro.bd/form/${slug}">

  <link rel="icon" type="image/png" sizes="512x512" href="../../favicon-512x512.png">
  <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href="../../favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="../../apple-touch-icon.png">
  <link rel="manifest" href="../../site.webmanifest">
  <meta name="theme-color" content="#10131E">

  <script>
    (function () {
      try {
        if (localStorage.getItem("dc-hostel-theme") === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.dataset.theme = "dark";
        }
      } catch (error) {}
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="../../css/style.css?v=${ASSET_VERSION}">

  <style>
    .form-page-container {
      max-width: 920px;
      margin: 30px auto 60px;
      padding: 0 16px;
    }
    .form-header-card {
      background: var(--surface-strong);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 28px 32px;
      margin-bottom: 24px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
    }
    .form-batch-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
      font-size: 0.8rem;
      font-weight: 700;
      width: fit-content;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .form-main-title {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text);
      line-height: 1.3;
      margin: 0;
    }
    .form-description-text {
      font-size: 0.95rem;
      color: var(--muted);
      line-height: 1.6;
      margin: 0;
    }
    .form-direct-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      margin-top: 6px;
      transition: color 0.2s ease;
      width: fit-content;
    }
    .form-direct-btn:hover {
      color: var(--accent);
    }
    .form-iframe-wrapper {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      position: relative;
      min-height: 750px;
    }
    .form-iframe-element {
      width: 100%;
      height: 950px;
      border: none;
      display: block;
    }
    .form-state-card {
      background: var(--surface-strong);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 50px 30px;
      text-align: center;
      max-width: 580px;
      margin: 60px auto;
      box-shadow: 0 8px 30px rgba(0,0,0,0.04);
    }
    .form-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 10px;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.2s ease;
    }
  </style>
</head>
<body data-page="form">
  <header class="navbar" id="navbar">
    <div class="container nav-inner">
      <a class="logo" href="../../index.html" aria-label="DC Hostel home">
        <img class="logo-img" src="../../images/logo.png" alt="International Hall logo" loading="lazy">
        <span data-i18n="nav.logo">International Hall</span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a href="../../index.html" data-i18n="nav.home">Home</a>
        <a href="../../students.html" data-i18n="nav.students">Students</a>
        <a href="../../roommates.html" data-i18n="nav.roommates">Roommates</a>
        <a href="../../notices.html" data-i18n="nav.notices">Notices</a>
        <a href="../../birthday.html" data-i18n="nav.birthday">Birthdays</a>
        <a href="../../results.html" data-i18n="nav.results">Results</a>
        <a href="../../hostel.html" data-i18n="nav.hostel">Hostel Info</a>
      </nav>
      <div class="nav-actions">
        <div class="language-switch" aria-label="Language selector">
          <button type="button" data-lang-option="en" title="English">EN</button>
          <button type="button" data-lang-option="bn" title="বাংলা">BN</button>
        </div>
        <a href="../../profile.html" class="profile-toggle" id="profileBtn" aria-label="Profile Status / Login">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </a>
        <button class="theme-toggle" id="toggle" type="button" aria-label="Toggle dark mode">
          <span aria-hidden="true">&#9789;</span>
        </button>
      </div>
    </div>
  </header>

  <main class="page-main">
    <div class="form-page-container" id="formContainer">
      ${!isActive ? `
        <div class="form-state-card" data-aos="fade-up">
          <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 8px;">Form Closed / ফর্মটি বন্ধ আছে</h2>
          <p style="font-size: 0.95rem; color: var(--muted); margin-bottom: 24px;">This form is currently not accepting responses.</p>
          <a href="../../index.html" class="form-btn-primary">Return to Home</a>
        </div>
      ` : `
        <div class="form-header-card" data-aos="fade-up">
          <span class="form-batch-badge">${escapeHtml(batchLabel)}</span>
          <h1 class="form-main-title" id="formTitleText">${escapeHtml(titleEn)}</h1>
          ${descEn ? `<p class="form-description-text" id="formDescText">${escapeHtml(descEn)}</p>` : ''}
          <a href="${escapeHtml(directUrl)}" target="_blank" rel="noopener noreferrer" class="form-direct-btn">
            <span>Open in new tab if form does not display properly</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

        <div class="form-iframe-wrapper" data-aos="fade-up">
          <iframe class="form-iframe-element" src="${escapeHtml(embedUrl)}" frameborder="0" marginheight="0" marginwidth="0">Loading form…</iframe>
        </div>
      `}
    </div>
  </main>

  <footer class="footer">
    <div class="container footer-inner"></div>
  </footer>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="../../js/sanity-client.js?v=${ASSET_VERSION}"></script>
  <script src="../../js/app.js?v=${ASSET_VERSION}"></script>
  <script>
    (function () {
      ${requiresLogin ? `
        const authUser = JSON.parse(localStorage.getItem('dc-hostel-auth-user') || 'null');
        if (!authUser) {
          const c = document.getElementById('formContainer');
          if (c) {
            c.innerHTML = '<div class="form-state-card"><h2>Student Login Required</h2><p>Please login to your portal to access this form.</p><a href="../../profile.html" class="form-btn-primary">Login via Student Portal</a></div>';
          }
        }
      ` : ''}

      // Dynamic bilingual switch
      const titleBn = "${escapeHtml(titleBn)}";
      const descBn = "${escapeHtml(descBn)}";
      const titleEn = "${escapeHtml(titleEn)}";
      const descEn = "${escapeHtml(descEn)}";

      function updateFormText() {
        const lang = localStorage.getItem('dc-hostel-lang') || 'en';
        const tEl = document.getElementById('formTitleText');
        const dEl = document.getElementById('formDescText');
        if (tEl) tEl.textContent = (lang === 'bn' && titleBn) ? titleBn : titleEn;
        if (dEl && (descBn || descEn)) dEl.textContent = (lang === 'bn' && descBn) ? descBn : descEn;
      }

      window.addEventListener('storage', updateFormText);
      document.querySelectorAll('[data-lang-option]').forEach(btn => {
        btn.addEventListener('click', () => setTimeout(updateFormText, 100));
      });
      updateFormText();
    })();
  </script>
</body>
</html>`;

      await writeFile(path.join(slugDir, "index.html"), pageHtml, "utf8");
      // Also write form/<slug>.html for direct flat link compatibility
      await writeFile(path.join(formDir, `${slug}.html`), pageHtml, "utf8");
      console.log(`Generated static form page: form/${slug}/index.html and form/${slug}.html`);
    }

    // Build form/index.html (Form Directory)
    const formIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forms & Applications Directory | Dhaka College International Hall</title>
  <link rel="canonical" href="https://dchall.pro.bd/form/">
  <link rel="icon" type="image/png" href="../favicon-512x512.png">
  <link rel="stylesheet" href="../css/style.css?v=${ASSET_VERSION}">
</head>
<body data-page="form">
  <main class="page-main" style="padding: 60px 16px;">
    <div style="max-width: 680px; margin: 0 auto; text-align: center;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 12px; color: var(--text);">Forms & Applications</h1>
      <p style="color: var(--muted); margin-bottom: 30px;">Online submissions, surveys, and applications for Dhaka College International Hall.</p>
      <div style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
        ${formsListForIndex.map(f => `
          <a href="${f.slug}/" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-radius: 12px; background: var(--surface-strong); border: 1px solid var(--border); text-decoration: none; color: var(--text); font-weight: 700;">
            <div>
              <span style="font-size: 0.75rem; color: var(--accent); text-transform: uppercase;">${escapeHtml(f.batchLabel)}</span>
              <div style="font-size: 1.05rem;">${escapeHtml(f.titleEn)}</div>
            </div>
            <span style="color: var(--accent); font-size: 1.2rem;">&rarr;</span>
          </a>
        `).join("")}
      </div>
      <div style="margin-top: 36px;">
        <a href="../index.html" class="btn secondary" style="display: inline-flex; align-items: center; gap: 6px;">&larr; Back to Home</a>
      </div>
    </div>
  </main>
</body>
</html>`;

    await writeFile(path.join(formDir, "index.html"), formIndexHtml, "utf8");
    console.log("Generated form/index.html");
  }
} catch (err) {
  console.error("Error in build-forms:", err);
}

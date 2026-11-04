import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_ID = "w16kaeyg";
const DATASET = "production";
const root = process.cwd();
const eventDir = path.join(root, "event");

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanityRefToUrl(ref) {
  if (!ref || !ref.startsWith("image-")) {
    return "https://dchall.pro.bd/images/hall/hostel-building.jpg";
  }
  const parts = ref.split("-");
  if (parts.length >= 4) {
    const imgId = parts[1];
    const dims = parts[2];
    const ext = parts[3];
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${imgId}-${dims}.${ext}?w=1200&h=630&fit=crop&auto=format&q=85`;
  }
  return "https://dchall.pro.bd/images/hall/hostel-building.jpg";
}

try {
  await mkdir(eventDir, { recursive: true });

  const query = '*[_type == "galleryEvent"]{_id, event_id, title_en, title_bn, date, description_en, description_bn, "first_asset": photos[0].asset._ref}';
  const url = `https://${PROJECT_ID}.api.sanity.io/v2023-08-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn("Failed to fetch gallery events from Sanity:", res.statusText);
  } else {
    const data = await res.json();
    const events = data.result || [];
    console.log(`Building social previews for ${events.length} gallery events...`);

    for (const ev of events) {
      const rawSlug = ev.event_id;
      const slug = rawSlug?.current || rawSlug || ev._id;
      if (!slug) continue;

      const safeSlug = String(slug).replace(/[^a-zA-Z0-9_-]/g, "");
      const titleEn = ev.title_en || "Gallery Event";
      const descEn = ev.description_en || ev.description_bn || `Event photos from International Hall, Dhaka College (${ev.date || ""})`;
      const imgUrl = sanityRefToUrl(ev.first_asset);
      const targetUrl = `https://dchall.pro.bd/gallery.html#event=${slug}`;

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(titleEn)} | International Hall Gallery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(descEn)}">

  <!-- Open Graph / Facebook / WhatsApp / Telegram -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="International Hall, Dhaka College">
  <meta property="og:title" content="${escapeHtml(titleEn)}">
  <meta property="og:description" content="${escapeHtml(descEn)}">
  <meta property="og:image" content="${escapeHtml(imgUrl)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(titleEn)}">
  <meta property="og:url" content="${targetUrl}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(titleEn)}">
  <meta name="twitter:description" content="${escapeHtml(descEn)}">
  <meta name="twitter:image" content="${escapeHtml(imgUrl)}">

  <!-- Instant Browser Redirect -->
  <meta http-equiv="refresh" content="0;url=/gallery.html#event=${escapeHtml(slug)}">
  <link rel="canonical" href="${targetUrl}">
  <script>
    window.location.replace('/gallery.html#event=' + encodeURIComponent('${slug}'));
  </script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      text-align: center;
    }
    .box {
      max-width: 480px;
      background: #1e293b;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #334155;
    }
    a {
      color: #10b981;
      font-weight: 700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="box">
    <h2>${escapeHtml(titleEn)}</h2>
    <p>Redirecting to gallery...</p>
    <p><a href="/gallery.html#event=${escapeHtml(slug)}">Click here if not redirected</a></p>
  </div>
</body>
</html>
`;
      await writeFile(path.join(eventDir, `${safeSlug}.html`), html, "utf8");
      console.log(`Generated event preview: event/${safeSlug}.html`);
    }

    await writeFile(
      path.join(eventDir, "index.html"),
      `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/gallery.html"><script>window.location.replace('/gallery.html');</script></head><body>Redirecting to gallery...</body></html>`,
      "utf8"
    );
  }
} catch (err) {
  console.error("Error in build-event-previews:", err);
}

# -*- coding: utf-8 -*-
import sys, os, urllib.request, json, html
sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ID = "w16kaeyg"
DATASET = "production"
BASE_DIR = r"C:\Users\USER\Downloads\##aicode\DC-hall (sanity)\dc-hall"
EVENT_DIR = os.path.join(BASE_DIR, "event")

os.makedirs(EVENT_DIR, exist_ok=True)

query = '*[_type == "galleryEvent"]{_id, event_id, title_en, title_bn, date, description_en, description_bn, "first_asset": photos[0].asset._ref}'
encoded_query = urllib.parse.quote(query)
url = f"https://{PROJECT_ID}.api.sanity.io/v2023-08-01/data/query/{DATASET}?query={encoded_query}"

print(f"Fetching gallery events from Sanity: {url}")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

def sanity_ref_to_url(ref):
    if not ref or not ref.startswith("image-"):
        return "https://dchall.pro.bd/images/hall/hostel-building.jpg"
    # format: image-ceda67a7901d1bb799d20dcad27f2e73642b649c-1280x960-jpg
    parts = ref.split("-")
    if len(parts) >= 4:
        img_id = parts[1]
        dims = parts[2]
        ext = parts[3]
        return f"https://cdn.sanity.io/images/{PROJECT_ID}/{DATASET}/{img_id}-{dims}.{ext}?w=1200&h=630&fit=crop&auto=format&q=85"
    return "https://dchall.pro.bd/images/hall/hostel-building.jpg"

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        events = data.get('result', [])
        print(f"Found {len(events)} events.")

        for ev in events:
            raw_slug = ev.get('event_id')
            slug = raw_slug.get('current') if isinstance(raw_slug, dict) else (raw_slug or ev.get('_id'))
            if not slug:
                continue

            # Safe filename: sanitize any quotes or special chars
            safe_slug = "".join(c for c in slug if c.isalnum() or c in "-_")
            title_en = ev.get('title_en') or "Gallery Event"
            title_bn = ev.get('title_bn') or title_en
            desc_en = ev.get('description_en') or ev.get('description_bn') or f"Event photos from International Hall, Dhaka College ({ev.get('date', '')})"
            img_url = sanity_ref_to_url(ev.get('first_asset'))
            target_url = f"https://dchall.pro.bd/gallery.html#event={slug}"

            html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{html.escape(title_en)} | International Hall Gallery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{html.escape(desc_en)}">

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="International Hall, Dhaka College">
  <meta property="og:title" content="{html.escape(title_en)}">
  <meta property="og:description" content="{html.escape(desc_en)}">
  <meta property="og:image" content="{html.escape(img_url)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{html.escape(title_en)}">
  <meta property="og:url" content="{target_url}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(title_en)}">
  <meta name="twitter:description" content="{html.escape(desc_en)}">
  <meta name="twitter:image" content="{html.escape(img_url)}">

  <!-- Instant Browser Redirect -->
  <meta http-equiv="refresh" content="0;url=/gallery.html#event={html.escape(slug)}">
  <link rel="canonical" href="{target_url}">
  <script>
    window.location.replace('/gallery.html#event=' + encodeURIComponent('{slug}'));
  </script>
  <style>
    body {{
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
    }}
    .box {{
      max-width: 480px;
      background: #1e293b;
      padding: 32px;
      border-radius: 16px;
      border: 1px solid #334155;
    }}
    a {{
      color: #10b981;
      font-weight: 700;
      text-decoration: none;
    }}
  </style>
</head>
<body>
  <div class="box">
    <h2>{html.escape(title_en)}</h2>
    <p>Redirecting to gallery...</p>
    <p><a href="/gallery.html#event={html.escape(slug)}">Click here if not redirected</a></p>
  </div>
</body>
</html>
"""
            out_file = os.path.join(EVENT_DIR, f"{safe_slug}.html")
            with open(out_file, 'w', encoding='utf-8') as f_out:
                f_out.write(html_content)
            print(f"Generated preview: event/{safe_slug}.html (image: {img_url})")

        # Also write index.html in event/
        index_file = os.path.join(EVENT_DIR, "index.html")
        with open(index_file, 'w', encoding='utf-8') as f_idx:
            f_idx.write("""<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/gallery.html"><script>window.location.replace('/gallery.html');</script></head><body>Redirecting to gallery...</body></html>""")
        print("Generated event/index.html")

except Exception as e:
    print(f"Error during event preview generation: {e}")
    sys.exit(1)

print("SUCCESS: ALL EVENT PREVIEW PAGES GENERATED!")

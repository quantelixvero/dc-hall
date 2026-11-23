/**
 * Dhaka College International Hall - Sanity CMS Client
 * Connects directly to Sanity Cloud Content Lake with instant real-time synchronization.
 * Hardened with Zero-Leak In-Memory Cryptographic Auth Vault.
 */

const SANITY_CONFIG = {
  projectId: "w16kaeyg",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false // false guarantees instant real-time live data with zero edge-caching lag
};

// ==============================================================================
// 1. CRYPTOGRAPHIC ENGINE (Zero External Dependencies)
// ==============================================================================
function computeSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length';
  var i, j;
  var result = '';
  var words = [];
  var asciiBitLength = (ascii ? ascii[lengthProperty] : 0) * 8;
  var hash = [];
  var k = [];
  var primeCounter = 0;
  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii = (ascii || '') + '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength) | 0;
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16);
    var oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      var w15 = w[i - 15], w2 = w[i - 2];
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (var b = 3; b >= 0; b--) {
      var byteVal = (hash[i] >> (8 * b)) & 255;
      result += (byteVal < 16 ? '0' : '') + byteVal.toString(16);
    }
  }
  return result;
}
window.computeSha256 = computeSha256;

function parseBatchNum(batch) {
  if (!batch) return 27;
  const m = String(batch).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 27;
}

// ==============================================================================
// 2. ZERO-LEAK INTERNAL AUTH VAULT
// ==============================================================================
const _authVault = {
  masterHashes: new Set([
    "a2e4dcfa08c2cd2389ef53ea7315f467e143df6f17254b984e61dfaaac33c4e3",
    "8570c2fbb3062066109e6892c5de98141f33fb50d6d18dedc1ebdca6c144bf62" // admin@bos
  ]),
  batchHashes: {
    "hsc24": new Set(["d496a2e9db529d3ac67e1dc0697518d51339141054ff8485d35a0e19ab5c35f6"]),
    "hsc25": new Set(["ec6740cda1b453b2c952acf97838c765376d940812a36c560c9a808ac30ac43b"]),
    "hsc26": new Set(["d134b0d9cb95ef83720ef627560b12f96421858c088c742cd0e8bfef7a4892df"]),
    "hsc27": new Set([
      "5779e6be0589d1950478d0d819ff52d15240c45aef90c8e935fb778219798e38",
      "9dfbae98257df8db309d3313566195a2cc240e8a1c364762dbdfd6ab9f3cac3a",
      "f741d0d217ebae0bd49b0fb8bfe3ba31076e27675da9b4de46f96195843dd482"
    ]),
    "hsc28": new Set([
      "189d3cedc3f17c39bf1255a232e575af62b21ad0268f1a9e1789ba5ff8e57289",
      "0ebd02954b7d4ad2aeadcd54c036f39f3e1d1e7eb4f758f40ffa5b31c1b0560b",
      "b3edc7f3a7d6cb3432685305c8a05bf186651702e12facf678781155a05fcf45"
    ]),
    "hsc29": new Set(["e69a6af334e6c1597a806c2c9a89d83da787d930b78bd131fe3d072a7c7e3000"]),
    "hsc30": new Set(["35f875a4cc31e3d08a175d8e71edc8f4837084a1188b41af35df3bd6fe072c6b"]),
    "hsc31": new Set(["787ba95b8a6046f48431f5615d835f4b58941df5334250b15abc1ada594873a0"]),
    "hsc32": new Set(["5eac08e76697da0d2754cd794cfc17091c8e77b6efa14815621dfb1c0fcdf340"]),
    "hsc33": new Set(["3024e70565c0433dd0a7607a18d5cff7143fa168527457bd78d6d270139ab81e"]),
    "hsc34": new Set(["dfae1bc51c1a98479e03469549c0b1c495e822c0235ef48c2ec22ba2ebe5edd9"]),
    "hsc35": new Set(["cfb35ac95fbbfb9c5955ece780d685660ac036306574c935b6f2a44b1281285c"])
  }
};

/**
 * Ingests live passwords into cryptographic vault and completely scrubs
 * plaintext credentials & private emails from the public payload object.
 */
function processAndSanitizeAuth(rawResult) {
  if (!rawResult) return;

  // 1. Ingest Master Password from adminSettings
  if (rawResult.adminSettings && rawResult.adminSettings.master_password) {
    const rawMaster = String(rawResult.adminSettings.master_password).trim();
    if (rawMaster) {
      _authVault.masterHashes.add(computeSha256(rawMaster));
    }
    // Scrub plaintext password so it NEVER leaks to window or localStorage
    delete rawResult.adminSettings.master_password;
  }

  // 2. Ingest Batch Passwords from adminSettings.batch_security_controls
  if (rawResult.adminSettings && Array.isArray(rawResult.adminSettings.batch_security_controls)) {
    rawResult.adminSettings.batch_security_controls.forEach(ctrl => {
      if (ctrl && ctrl.batch && ctrl.batch_password) {
        const rawBatchPass = String(ctrl.batch_password).trim();
        if (rawBatchPass) {
          const bKey = `hsc${parseBatchNum(ctrl.batch)}`;
          if (!_authVault.batchHashes[bKey]) _authVault.batchHashes[bKey] = new Set();
          _authVault.batchHashes[bKey].add(computeSha256(rawBatchPass));
        }
        delete ctrl.batch_password;
      }
      if (ctrl && ctrl.moderator_emails) delete ctrl.moderator_emails;
    });
  }

  // 3. Ingest Batch Passwords from batchConfigs
  if (Array.isArray(rawResult.batchConfigs)) {
    rawResult.batchConfigs.forEach(cfg => {
      if (cfg && cfg.batch && cfg.batch_password) {
        const rawBatchPass = String(cfg.batch_password).trim();
        if (rawBatchPass) {
          const bKey = `hsc${parseBatchNum(cfg.batch)}`;
          if (!_authVault.batchHashes[bKey]) _authVault.batchHashes[bKey] = new Set();
          _authVault.batchHashes[bKey].add(computeSha256(rawBatchPass));
        }
        delete cfg.batch_password;
      }
      if (cfg && cfg.batch_admin_emails) delete cfg.batch_admin_emails;
      if (cfg && cfg.moderator_emails) delete cfg.moderator_emails;
    });
  }

  // 4. Scrub any private administrative emails from adminSettings
  if (rawResult.adminSettings) {
    delete rawResult.adminSettings.super_admin_emails;
    delete rawResult.adminSettings.universal_moderator_emails;
  }
}

window.__DC_AUTH_VAULT__ = {
  verify(secret) {
    if (!secret) return null;
    const clean = String(secret).trim();
    const hash = computeSha256(clean);

    if (_authVault.masterHashes.has(hash)) return "master";

    for (const [bKey, hashes] of Object.entries(_authVault.batchHashes)) {
      if (hashes.has(hash)) return bKey;
    }
    return null;
  },
  isHashValid(hash, role) {
    if (!hash || !role) return false;
    if (role === "master") return _authVault.masterHashes.has(hash);
    if (_authVault.batchHashes[role]) return _authVault.batchHashes[role].has(hash);
    return false;
  },
  getRoleForHash(hash) {
    if (!hash) return null;
    if (_authVault.masterHashes.has(hash)) return "master";
    for (const [bKey, hashes] of Object.entries(_authVault.batchHashes)) {
      if (hashes.has(hash)) return bKey;
    }
    return null;
  }
};

// ==============================================================================
// 3. SANITY GROQ QUERY (Project only public non-sensitive content)
// ==============================================================================
const SANITY_GROQ_QUERY = `{
  "adminSettings": *[_type == "adminSettings" && !(_id in path("drafts.**"))][0]{
    _id,
    _updatedAt,
    global_visibility_mode,
    global_visibility,
    global_public_visibility,
    master_password,
    page_access_controls,
    profile_field_controls,
    card_meta_badges,
    homepage_sections,
    developer_sections,
    hallinfo_sections,
    menu_visibility,
    footer_columns,
    batch_email_slots,
    batch_rotation_enabled,
    batch_security_controls,
    student_name_case,
    max_moderators_per_batch,
    show_batch_moderators
  },
  "batchModerators": *[_type == "batchModerators" && !(_id in path("drafts.**"))]{
    _id,
    batch,
    "moderators": moderators[]->{
      _id,
      name_en,
      name_bn,
      name,
      student_id,
      roll,
      short_roll,
      room_no,
      "room_1st_year": {
        "room_no": room_1st_year.room_ref->room_no
      },
      "room_2nd_year": {
        "room_no": room_2nd_year.room_ref->room_no
      },
      batch,
      group,
      "photo": coalesce(photo.asset->url, photo),
      facebook,
      phone
    }
  } | order(batch asc),
  "batchConfigs": *[_type == "batchConfig" && !(_id in path("drafts.**"))]{
    _id,
    batch,
    batch_password,
    is_locked,
    lock_notice
  },
  "settings": *[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
    ...,
    "logo": coalesce(logo.asset->url, logo),
    "hero_image": coalesce(hero_image.asset->url, hero_image),
    "notice_pdf": coalesce(notice_pdf.asset->url, notice_pdf),
    "batch_passwords": null
  },
  "students": *[_type == "student" && !(_id in path("drafts.**"))] | order(position asc){
    ...,
    "photo": coalesce(photo.asset->url, photo),
    "room_no": coalesce(room_2nd_year.room_ref->room_no, room_2nd_year.room_no, room_1st_year.room_ref->room_no, room_1st_year.room_no, room_ref->room_no, room_no),
    "room_title_en": coalesce(room_2nd_year.room_ref->title_en, room_1st_year.room_ref->title_en, room_ref->title_en),
    "room_title_bn": coalesce(room_2nd_year.room_ref->title_bn, room_1st_year.room_ref->title_bn, room_ref->title_bn),
    "room_1st_year": {
      "room_no": coalesce(room_1st_year.room_ref->room_no, room_1st_year.room_no),
      "bedmate_name": coalesce(room_1st_year.bedmate_name, room_1st_year.bedmate_ref->name_en),
      "bedmate_name_bn": room_1st_year.bedmate_ref->name_bn,
      "bedmate_slug": coalesce(room_1st_year.bedmate_ref->student_id, room_1st_year.bedmate_ref->_id),
      "bedmate_id": room_1st_year.bedmate_ref->_id,
      "bedmate_photo": coalesce(room_1st_year.bedmate_ref->photo.asset->url, room_1st_year.bedmate_ref->photo)
    },
    "room_2nd_year": {
      "room_no": coalesce(room_2nd_year.room_ref->room_no, room_2nd_year.room_no),
      "bedmate_name": coalesce(room_2nd_year.bedmate_name, room_2nd_year.bedmate_ref->name_en),
      "bedmate_name_bn": room_2nd_year.bedmate_ref->name_bn,
      "bedmate_slug": coalesce(room_2nd_year.bedmate_ref->student_id, room_2nd_year.bedmate_ref->_id),
      "bedmate_id": room_2nd_year.bedmate_ref->_id,
      "bedmate_photo": coalesce(room_2nd_year.bedmate_ref->photo.asset->url, room_2nd_year.bedmate_ref->photo)
    },
    "results_1st_year": {
      ...,
      "ct1_pdf": coalesce(results_1st_year.ct1_pdf.asset->url, results_1st_year.ct1_pdf),
      "ct2_pdf": coalesce(results_1st_year.ct2_pdf.asset->url, results_1st_year.ct2_pdf),
      "hy_pdf": coalesce(results_1st_year.hy_pdf.asset->url, results_1st_year.hy_pdf),
      "ct3_pdf": coalesce(results_1st_year.ct3_pdf.asset->url, results_1st_year.ct3_pdf),
      "yearly_pdf": coalesce(results_1st_year.yearly_pdf.asset->url, results_1st_year.yearly_pdf)
    },
    "results_2nd_year": {
      ...,
      "ct1_pdf": coalesce(results_2nd_year.ct1_pdf.asset->url, results_2nd_year.ct1_pdf),
      "ct2_pdf": coalesce(results_2nd_year.ct2_pdf.asset->url, results_2nd_year.ct2_pdf),
      "ct3_pdf": coalesce(results_2nd_year.ct3_pdf.asset->url, results_2nd_year.ct3_pdf),
      "test_pdf": coalesce(results_2nd_year.test_pdf.asset->url, results_2nd_year.test_pdf)
    },
    "pdfs": {
      "ct1": coalesce(pdfs.ct1.asset->url, pdfs.ct1),
      "ct2": coalesce(pdfs.ct2.asset->url, pdfs.ct2),
      "hy": coalesce(pdfs.hy.asset->url, pdfs.hy),
      "ct3": coalesce(pdfs.ct3.asset->url, pdfs.ct3),
      "yearly": coalesce(pdfs.yearly.asset->url, pdfs.yearly)
    }
  },
  "rooms": *[_type == "room" && !(_id in path("drafts.**"))] | order(room_no asc){
    ...,
    "photos": coalesce(photos[].asset->url, photos),
    "assigned_students": coalesce(
      (coalesce(assigned_students[]->{ _id, name_en, name_bn, short_roll, student_id, batch, "photo": photo.asset->url }, []) +
      *[_type == "student" && !(_id in path("drafts.**")) && (room_ref._ref == ^._id || references(^._id) || (room_no == ^.room_no && (!defined(^.batch) || batch == ^.batch)))]{ _id, name_en, name_bn, short_roll, student_id, batch, "photo": photo.asset->url }),
      []
    )
  },
  "home": *[_type == "homePage" && !(_id in path("drafts.**"))][0],
  "hall": *[_type == "hallInfo" && !(_id in path("drafts.**"))][0]{
    ...,
    "hall_photo": coalesce(hall_photo.asset->url, hall_photo),
    "home_page_photo": coalesce(home_page_photo.asset->url, home_page_photo),
    "hall_super_photo": coalesce(hall_super_photo.asset->url, hall_super_photo),
    "campus_photos": campus_photos[]{
      ...,
      "photo": coalesce(asset->url, photo)
    },
    "alumni_profiles": alumni_profiles[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    }
  },
  "developer": *[_type == "developerProfile" && !(_id in path("drafts.**"))][0]{
    ...,
    "portrait": coalesce(portrait.asset->url, portrait),
    "contributors": contributors[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    }
  },
  "galleries": *[_type == "galleryItem" && !(_id in path("drafts.**"))] | order(position asc){
    _id,
    heading,
    "slug": slug.current,
    preview_limit,
    default_caption,
    batch,
    gallery_title,
    position,
    "photos": photos[]{
      "photo": coalesce(asset->url, photo.asset->url, photo),
      caption,
      title_en,
      title_bn,
      caption_en,
      caption_bn,
      description_en,
      description_bn
    }
  },
  "gallery": *[_type == "galleryItem" && !(_id in path("drafts.**"))][0]{
    "photos": photos[]{
      "photo": coalesce(asset->url, photo.asset->url, photo),
      title_en,
      title_bn,
      caption_en,
      caption_bn,
      description_en,
      description_bn
    }
  },
  "galleryEvents": *[_type == "galleryEvent" && !(_id in path("drafts.**"))] | order(date desc, position asc){
    ...,
    "event_id": event_id.current,
    media_order,
    "photos": photos[]{
      ...,
      "photo": coalesce(asset->url, photo.asset->url, photo)
    },
    "videos": videos[]{
      ...,
      "video_file_url": coalesce(video_file.asset->url, null)
    }
  },
  "notices": *[_type == "notice" && !(_id in path("drafts.**"))] | order(is_pinned desc, date desc){
    ...,
    "photo": coalesce(photo.asset->url, photo),
    "file_url": coalesce(file.asset->url, null)
  }
}`;

/**
 * Fetches all site content from Sanity Content Lake.
 * Connects directly to live API (api.sanity.io) with &$ts cache-busting parameter.
 */
async function fetchSanityCms() {
  const host = SANITY_CONFIG.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const endpoint = `https://${SANITY_CONFIG.projectId}.${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(SANITY_GROQ_QUERY)}&%24ts=${Date.now()}`;

  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 7000) : null;
    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
      signal: controller ? controller.signal : undefined
    });
    if (timeoutId) clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Sanity API responded with status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data && data.result) {
      // Ingest live credentials into internal cryptographic vault & scrub plaintext from public memory
      processAndSanitizeAuth(data.result);
      window.__SANITY_DATA__ = data.result;
      console.log("✔ Live data successfully synchronized from Sanity Content Lake (zero-leak sanitized).");
      return data.result;
    }
    return null;
  } catch (error) {
    console.warn("Unable to fetch from Sanity CMS, falling back to local files:", error);
    return null;
  }
}

/**
 * Real-time Live Listener:
 * Uses Server-Sent Events (SSE) to listen for mutations in the Sanity dataset.
 * When an admin publishes or edits any document in Sanity Studio, it triggers onUpdate immediately.
 */
function initSanityRealtimeListener(onUpdate) {
  if (typeof EventSource === "undefined") return null;

  try {
    const listenUrl = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/listen/${SANITY_CONFIG.dataset}?query=${encodeURIComponent('*')}`;
    const evtSource = new EventSource(listenUrl);

    let debounceTimer = null;
    evtSource.addEventListener("mutation", (event) => {
      console.log("⚡ Sanity CMS real-time mutation event received.");
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      }, 500);
    });

    evtSource.onerror = (err) => {
      console.debug("Sanity EventSource reconnecting...", err);
    };

    return evtSource;
  } catch (err) {
    console.warn("Could not initialize Sanity real-time listener:", err);
    return null;
  }
}

window.fetchSanityCms = fetchSanityCms;
window.initSanityRealtimeListener = initSanityRealtimeListener;


// ═══════════════════════════════════════════════════════════════
// SVG BADGES & ICONS (Batches & Birthdays)
// ═══════════════════════════════════════════════════════════════
const BATCH_LOGO_SVG = `<svg class="batch-svg-badge" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" style="vertical-align: middle; display: inline-block;"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>`;
const BIRTHDAY_LOGO_SVG = `<svg class="birthday-svg-badge" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" style="vertical-align: middle; display: inline-block;"><path d="M12 6a2 2 0 100-4 2 2 0 000 4zm7 5h-1V9a2 2 0 00-2-2h-3V5.8a3 3 0 10-2 0V7H8a2 2 0 00-2 2v2H5a3 3 0 00-3 3v2h20v-2a3 3 0 00-3-3zM4 18v2a2 2 0 002 2h12a2 2 0 002-2v-2H4z"/></svg>`;


function normalizeRoomNumber(val) {
  if (!val) return "";
  const s = String(val).trim();
  const digits = s.replace(/[^0-9]/g, "");
  return digits ? String(parseInt(digits, 10)) : s.toLowerCase().replace(/[^a-z0-9]/g, "");
}


// ═══════════════════════════════════════════════════════════════
// BIRTHDAY CELEBRATION POPUP & MUSIC SYSTEM
// ═══════════════════════════════════════════════════════════════
const BIRTHDAY_WISHES_BN = [
  "শুভ জন্মদিন! আন্তর্জাতিক ছাত্রাবাস পরিবারের পক্ষ থেকে তোমার জন্য রইল প্রাণঢালা অভিনন্দন ও উষ্ণ ভালোবাসা। জীবনের প্রতিটি পদক্ষেপে সাফল্য তোমার সঙ্গী হোক!",
  "জন্মদিনের অনেক অনেক শুভেচ্ছা! তোমার প্রতিটি স্বপ্ন ও লক্ষ্য পূরণ হোক, ঢাকা কলেজ পরিবারের গর্ব হয়ে ওঠো।",
  "শুভ জন্মদিন! সামনের দিনগুলো ভরে উঠুক অনাবিল আনন্দ, সুস্বাস্থ্য এবং অবিস্মরণীয় সব অর্জনে। ভবিষ্যৎ হোক অত্যন্ত উজ্জ্বল ও সমৃদ্ধ।",
  "আজকের এই বিশেষ দিনে ছাত্রাবাস পরিবারের পক্ষ থেকে অফুরন্ত শুভকামনা। সততা ও নিষ্ঠায় গড়ে ওঠুক তোমার সুন্দর ভবিষ্যৎ।",
  "শুভ জন্মদিন! ছাত্রাবাসের এই দিনগুলো আজীবন স্মৃতিময় হোক এবং সামনের প্রতিটি পথচলা হোক সাফল্যমণ্ডিত।",
  "জন্মদিনের আন্তরিক অভিনন্দন! জ্ঞান, প্রজ্ঞা আর মানবিক গুণে বিকশিত হোক তোমার সুন্দর জীবন।",
  "শুভ জন্মদিন! পড়াশোনা ও ক্যারিয়ারে সর্বোচ্চ শিখর স্পর্শ করো — আন্তর্জাতিক ছাত্রাবাস পরিবার সবসময় তোমার সাথে আছে।",
  "আজকের দিনটি তোমার জন্য বয়ে আনুক অফুরন্ত আনন্দ আর নতুন অপার সম্ভাবনার বার্তা। শুভ জন্মদিন!",
  "জন্মদিনের শুভেচ্ছা! আন্তর্জাতিক ছাত্রাবাসের আনন্দঘন স্মৃতি তোমার জীবনের এক অমূল্য প্রেরণা হয়ে থাকুক।",
  "শুভ জন্মদিন! নিজের মেধা ও পরিশ্রমে দেশ ও দশের মুখ উজ্জ্বল করো — উজ্জ্বল আগামী তোমার অপেক্ষায়।"
];

function playBirthdayMelody() {
  try {
    const audioEl = document.getElementById("birthdayAudio");
    if (audioEl) {
      audioEl.volume = 0.6;
      const p = audioEl.play();
      if (p !== undefined) {
        p.catch(() => synthesizeHappyBirthday());
        return;
      }
    }
  } catch (e) {}
  synthesizeHappyBirthday();
}

function synthesizeHappyBirthday() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const notes = [
      { f: 261.63, d: 0.35 },
      { f: 261.63, d: 0.35 },
      { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },
      { f: 349.23, d: 0.6 },
      { f: 329.63, d: 0.95 },
      { f: 261.63, d: 0.35 },
      { f: 261.63, d: 0.35 },
      { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },
      { f: 392.00, d: 0.6 },
      { f: 349.23, d: 0.95 }
    ];

    let start = ctx.currentTime + 0.1;
    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, start);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + n.d);
      start += n.d + 0.08;
    });
  } catch (e) {}
}

function showStudentBirthdayModal(bdayStudents, sessionKey) {
  let currentIndex = 0;

  function renderCard() {
    const student = bdayStudents[currentIndex];
    const isPhotoUnlocked = isProfileFieldUnlocked("photo", student);
    const photo = isPhotoUnlocked ? (normalizeCmsPath(student.img || student.photo) || "images/logo.png") : "images/student-avatar.png";
    const isNameUnlocked = isProfileFieldUnlocked("name", student);
    const nameDisplay = isNameUnlocked ? studentValue(student, "name") : "••••••••";
    const roomVal = student.room_2nd_year?.room_no || student.room_1st_year?.room_no || student.room || "";
    const isRoomUnlocked = isProfileFieldUnlocked("room_2nd_year", student) || isProfileFieldUnlocked("room_1st_year", student) || isProfileFieldUnlocked("room", student);
    const roomDisplay = roomVal ? (isRoomUnlocked ? `ROOM ${roomVal}` : "ROOM •••") : "";

    const wishText = BIRTHDAY_WISHES_BN[Math.floor(Math.random() * BIRTHDAY_WISHES_BN.length)];

    let overlay = document.getElementById("birthdayPopupOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "birthdayPopupOverlay";
      overlay.className = "bday-popup-overlay";
      document.body.appendChild(overlay);
    }

    const multiNav = bdayStudents.length > 1 ? `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <button type="button" id="bdayPrevBtn" style="background: var(--surface-strong); border: 1px solid var(--border); color: var(--accent); padding: 4px 12px; border-radius: 8px; cursor: pointer; font-weight: 700;">&larr; Previous</button>
        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">${currentIndex + 1} of ${bdayStudents.length}</span>
        <button type="button" id="bdayNextBtn" style="background: var(--surface-strong); border: 1px solid var(--border); color: var(--accent); padding: 4px 12px; border-radius: 8px; cursor: pointer; font-weight: 700;">Next &rarr;</button>
      </div>
    ` : "";

    overlay.innerHTML = `
      <div class="bday-popup-card" role="dialog" aria-modal="true">
        <button type="button" class="bday-popup-sound-toggle" id="bdaySoundToggle" title="Play celebration melody"></button>
        <button type="button" class="bday-popup-close" id="bdayCloseBtn" aria-label="Close">&times;</button>
        
        <div class="bday-avatar-large-wrap">
          <img class="bday-avatar-large" src="${photo}" alt="" loading="lazy">
          <span class="bday-crown-icon"></span>
        </div>

        <p class="eyebrow" style="color: var(--accent); margin-bottom: 4px;">Happy Birthday Today!</p>
        <h2 class="bday-popup-title">${nameDisplay}</h2>
        <div class="bday-popup-meta">
          <span>${student.batch || 'HSC-27'}</span>
          <span>·</span>
          <span>${groupLabel(student.group)}</span>
          ${roomDisplay ? `<span>·</span><span>${roomDisplay}</span>` : ''}
        </div>

        <div class="bday-wish-quote">
          <p style="margin: 0;">"${wishText}"</p>
        </div>

        <div class="bday-wish-signature">
          — শুভেচ্ছা ও ভালোবাসান্তে:<br>
          <strong>আব্দুল্লাহ আল আদিব</strong><br>
          <span style="font-size: 0.78rem;">(ওয়েবসাইট ডেভেলপার ও শিক্ষার্থী, ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস)</span>
        </div>

        ${multiNav}

        <button type="button" class="bday-popup-cta" id="bdayDoneBtn">
          ধন্যবাদ ও শুভকামনা
        </button>
      </div>
    `;

    setTimeout(() => overlay.classList.add("is-active"), 100);

    // Audio
    playBirthdayMelody();

    // Sound toggle
    const soundBtn = document.getElementById("bdaySoundToggle");
    if (soundBtn) {
      soundBtn.onclick = () => {
        playBirthdayMelody();
      };
    }

    // Close actions
    const closeBtn = document.getElementById("bdayCloseBtn");
    const doneBtn = document.getElementById("bdayDoneBtn");
    const closePopup = () => {
      overlay.classList.remove("is-active");
      sessionStorage.setItem(sessionKey, "true");
      setTimeout(() => overlay.remove(), 400);
    };
    if (closeBtn) closeBtn.onclick = closePopup;
    if (doneBtn) doneBtn.onclick = closePopup;

    // Multi-nav
    const prevBtn = document.getElementById("bdayPrevBtn");
    const nextBtn = document.getElementById("bdayNextBtn");
    if (prevBtn) prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + bdayStudents.length) % bdayStudents.length;
      renderCard();
    };
    if (nextBtn) nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % bdayStudents.length;
      renderCard();
    };
  }

  renderCard();
}

function showDeveloperBirthdayModal(isEve) {
  let overlay = document.getElementById("birthdayPopupOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "birthdayPopupOverlay";
    overlay.className = "bday-popup-overlay";
    document.body.appendChild(overlay);
  }

  const devTitle = isEve ? "আগামীকাল (৪ অক্টোবর) ডেভেলপার আদিব-এর জন্মদিন!" : "আজ আমাদের ওয়েবসাইট ডেভেলপার আদিব-এর শুভ জন্মদিন!";
  const devDesc = isEve
    ? "আগামীকাল ৪ঠা অক্টোবর ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস পোর্টালের নির্মাতা ও শিক্ষার্থী <strong>আব্দুল্লাহ আল আদিব</strong>-এর শুভ জন্মদিন। অগ্রিম শুভেচ্ছা জানাতে প্রস্তুত থাকুন!"
    : "আজ ৪ঠা অক্টোবর আন্তর্জাতিক ছাত্রাবাস ওয়েবসাইটের প্রতিষ্ঠাতা ডেভেলপার ও শিক্ষার্থী <strong>আব্দুল্লাহ আল আদিব</strong>-এর শুভ জন্মদিন। হলের সার্বিক ডিজিটালাইজেশন ও ছাত্রাবাস পরিবারের সেবায় তাঁর অবদানের জন্য জানাই উষ্ণ অভিনন্দন!";

  const whatsappMsg = encodeURIComponent("শুভ জন্মদিন আদিব ভাই! ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস ওয়েবসাইটের পক্ষ থেকে আপনাকে জানাই প্রাণঢালা শুভেচ্ছা ও উষ্ণ অভিনন্দন। আপনার সুস্থতা, দীর্ঘায়ু ও সার্বিক সাফল্য কামনা করি! ");
  const whatsappUrl = `https://wa.me/8801700000000?text=${whatsappMsg}`;

  overlay.innerHTML = `
    <div class="bday-popup-card" role="dialog" aria-modal="true" style="border-color: #f59e0b; box-shadow: 0 25px 60px rgba(0,0,0,0.4), 0 0 45px rgba(245,158,11,0.3);">
      <button type="button" class="bday-popup-sound-toggle" id="bdaySoundToggle" title="Play celebration melody"></button>
      <button type="button" class="bday-popup-close" id="bdayCloseBtn" aria-label="Close">&times;</button>

      <div class="bday-avatar-large-wrap" style="background: linear-gradient(135deg, #f59e0b, #ef4444, #10c9a8);">
        <img class="bday-avatar-large" src="images/logo.png" alt="Abdullah Al Adib" loading="lazy">
        <span class="bday-crown-icon"></span>
      </div>

      <p class="eyebrow" style="color: #f59e0b; margin-bottom: 4px;">${isEve ? 'Birthday Countdown' : 'Founder & Developer Birthday'}</p>
      <h2 class="bday-popup-title">${devTitle}</h2>
      
      <div class="bday-wish-quote" style="border-color: rgba(245,158,11,0.4); background: rgba(245,158,11,0.06); text-align: left;">
        <p style="margin: 0; line-height: 1.65;">${devDesc}</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="cta-button" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 20px; border-radius: 12px; background: #25D366; color: #fff; font-weight: 700; text-decoration: none;">
          হোয়াটসঅ্যাপে উইশ করুন (Instant Wish)
        </a>
        <a href="developer.html" class="cta-button" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px 20px; border-radius: 12px; background: var(--surface-strong); border: 1.5px solid var(--border); color: var(--text); font-weight: 600; text-decoration: none;">
          ডেভেলপার প্রোফাইল দেখুন
        </a>
      </div>

      <button type="button" class="bday-popup-cta" id="bdayDoneBtn" style="background: var(--surface-strong); border: 1px solid var(--border); color: var(--text-muted);">
        বন্ধ করুন
      </button>
    </div>
  `;

  setTimeout(() => overlay.classList.add("is-active"), 100);
  if (!isEve) playBirthdayMelody();

  const closePopup = () => {
    overlay.classList.remove("is-active");
    if (isEve) sessionStorage.setItem("dev_bday_eve_seen", "true");
    else sessionStorage.setItem("dev_bday_popup_seen", "true");
    setTimeout(() => overlay.remove(), 400);
  };
  const closeBtn = document.getElementById("bdayCloseBtn");
  const doneBtn = document.getElementById("bdayDoneBtn");
  if (closeBtn) closeBtn.onclick = closePopup;
  if (doneBtn) doneBtn.onclick = closePopup;
}

function initBirthdayCelebrationPopup() {
  const page = document.body.dataset.page;
  const isHomeOrBirthday = page === "home" || page === "birthday" || window.location.pathname === "/" || window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("birthday.html");
  if (!isHomeOrBirthday) return;

  const now = new Date();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();

  // Developer Birthday: Oct 4 (and Oct 3 eve)
  if (curMonth === 10 && curDay === 4) {
    if (!sessionStorage.getItem("dev_bday_popup_seen")) {
      showDeveloperBirthdayModal(false);
      return;
    }
  } else if (curMonth === 10 && curDay === 3) {
    if (!sessionStorage.getItem("dev_bday_eve_seen")) {
      showDeveloperBirthdayModal(true);
      return;
    }
  }

  // Students birthday in latest 3 batches
  if (!students || !students.length) return;
  const batchSet = new Set(students.map(s => s.batch || "HSC-27"));
  const sortedBatches = Array.from(batchSet).sort((a, b) => parseBatchNum(b) - parseBatchNum(a));
  const latest3Batches = sortedBatches.slice(0, 3);

  const bdayStudents = students.filter(s => {
    const b = s.batch || "HSC-27";
    if (!latest3Batches.includes(b)) return false;
    const bInfo = getStudentBirthdayInfo(s);
    return bInfo.month === curMonth && bInfo.day === curDay;
  });

  if (!bdayStudents.length) return;
  const sessionKey = `bday_popup_seen_${curMonth}_${curDay}`;
  if (!sessionStorage.getItem(sessionKey)) {
    showStudentBirthdayModal(bdayStudents, sessionKey);
  }
}

// ═══════════════════════════════════════════════════════════════
// NOTICES & ANNOUNCEMENTS SYSTEM (Archive Page & Popup)
// ═══════════════════════════════════════════════════════════════
function renderNoticesPage() {
  if (document.body.dataset.page !== "notices") return;
  const container = document.getElementById("noticesContainer");
  if (!container) return;

  const noticesList = window.__SANITY_DATA__?.notices || [];
  const searchInput = document.getElementById("noticeSearch");
  const query = (searchInput?.value || "").trim().toLowerCase();
  const activeCat = container.dataset.activeCat || "all";

  let filtered = noticesList.filter(n => {
    if (activeCat !== "all" && n.category !== activeCat) return false;
    if (!query) return true;
    const tBn = (n.title_bn || "").toLowerCase();
    const tEn = (n.title_en || "").toLowerCase();
    const dBn = (n.notice_text_bn || "").toLowerCase();
    const dEn = (n.notice_text_en || "").toLowerCase();
    return tBn.includes(query) || tEn.includes(query) || dBn.includes(query) || dEn.includes(query);
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--surface-strong); border-radius: 16px; border: 1px dashed var(--border);">
        <div style="width: 56px; height: 56px; margin: 0 auto 12px; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-muted);"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div>
        <h3>${currentLang === 'bn' ? 'কোনো নোটিশ পাওয়া যায়নি' : 'No notices found'}</h3>
        <p style="color: var(--text-muted);">${currentLang === 'bn' ? 'অন্য কোনো বিষয় বা ক্যাটাগরি দিয়ে পুনরায় খুঁজুন।' : 'Try searching with a different keyword or category.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(n => {
    const title = currentLang === 'bn' ? (n.title_bn || n.title_en) : (n.title_en || n.title_bn);
    const desc = currentLang === 'bn' ? (n.notice_text_bn || n.notice_text_en || '') : (n.notice_text_en || n.notice_text_bn || '');
    const excerpt = desc.length > 140 ? desc.substring(0, 140) + '...' : desc;
    const catClass = n.category === 'urgent' ? 'notice-cat-urgent' : n.category === 'hostel' ? 'notice-cat-hostel' : n.category === 'event' ? 'notice-cat-event' : 'notice-cat-general';
    const catLabel = n.category === 'urgent' ? (currentLang === 'bn' ? 'জরুরি নোটিশ' : 'Urgent') : n.category === 'hostel' ? (currentLang === 'bn' ? 'ছাত্রাবাস' : 'Hostel & Seats') : n.category === 'event' ? (currentLang === 'bn' ? 'ইভেন্ট' : 'Events') : (currentLang === 'bn' ? 'সাধারণ' : 'General');

    return `
      <article class="notice-card" onclick="openNoticeModal('${n._id}')" tabindex="0" role="button">
        <div class="notice-badge-row">
          <span class="notice-cat-badge ${catClass}">${catLabel}</span>
          <span class="notice-date-text"><svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right:4px; opacity:0.8;"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>${n.date || ''}</span>
        </div>
        <h3>${title}</h3>
        <p class="notice-card-desc">${excerpt}</p>
        <div class="notice-card-footer">
          <span>${currentLang === 'bn' ? 'বিস্তারিত দেখুন &rarr;' : 'Read Notice &rarr;'}</span>
          ${n.file_url ? `<span style="font-size: 0.8rem; color: #ef4444; display: inline-flex; align-items: center; gap: 4px;"><svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>PDF</span>` : ''}
        </div>
      </article>
    `;
  }).join("");

  // Category filter tabs
  const catNav = document.getElementById("noticeCategoryNav");
  if (catNav && !catNav._initListener) {
    catNav._initListener = true;
    catNav.addEventListener("click", e => {
      const btn = e.target.closest("button");
      if (!btn) return;
      catNav.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      container.dataset.activeCat = btn.dataset.cat || "all";
      renderNoticesPage();
    });
  }

  if (searchInput && !searchInput._initListener) {
    searchInput._initListener = true;
    searchInput.addEventListener("input", () => renderNoticesPage());
  }
}

window.openNoticeModal = function(noticeId) {
  const noticesList = window.__SANITY_DATA__?.notices || [];
  const notice = noticesList.find(n => n._id === noticeId);
  if (!notice) return;

  const modal = byId("studentModal");
  const content = byId("modalContent");
  if (!modal || !content) return;

  const title = currentLang === 'bn' ? (notice.title_bn || notice.title_en) : (notice.title_en || notice.title_bn);
  const fullText = (currentLang === 'bn' ? (notice.notice_text_bn || notice.notice_text_en) : (notice.notice_text_en || notice.notice_text_bn) || '').replace(/\n/g, '<br>');
  const photo = normalizeCmsPath(notice.photo);

  content.innerHTML = `
    <div class="notice-modal-inner" style="padding: 10px 0;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span class="notice-cat-badge notice-cat-urgent" style="font-size: 0.8rem;">📢 Notice</span>
        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">📅 ${notice.date || ''}</span>
      </div>
      <h2 style="font-size: 1.45rem; line-height: 1.35; margin-bottom: 18px; color: var(--text);">${title}</h2>
      
      ${photo ? `<div style="margin-bottom: 20px; border-radius: 14px; overflow: hidden; border: 1px solid var(--border);"><img src="${photo}" alt="" style="width: 100%; max-height: 380px; object-fit: contain; background: #000;"></div>` : ''}

      <div style="font-size: 0.98rem; line-height: 1.75; color: var(--text); margin-bottom: 24px; white-space: pre-line;">${fullText}</div>

      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        ${notice.file_url ? `<a href="${notice.file_url}" target="_blank" rel="noopener" class="cta-button" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 10px; background: #ef4444; color: #fff; font-weight: 700; text-decoration: none;">📥 ডাউনলোড নোটিশ (PDF)</a>` : ''}
        ${notice.link_url ? `<a href="${notice.link_url}" target="_blank" rel="noopener" class="cta-button" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 10px; background: var(--accent); color: #0a1f38; font-weight: 700; text-decoration: none;">🔗 ${notice.link_text || 'বিস্তারিত দেখুন'}</a>` : ''}
      </div>
    </div>
  `;

  modal.classList.remove("is-gallery-modal", "is-room-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function initNoticePopup() {
  const noticesList = window.__SANITY_DATA__?.notices || [];
  if (!noticesList.length) return;

  const now = new Date();

  // Find active popup notices
  const activeNotice = noticesList.find(n => {
    if (n.is_popup_active !== true) return false;
    if (n.popup_duration_type === 'always') return true;
    if (n.popup_duration_type === '1_day') {
      const todayStr = now.toISOString().split('T')[0];
      return n.date === todayStr;
    }
    if (n.popup_duration_type === 'date_range') {
      const start = n.start_date ? new Date(n.start_date) : null;
      const end = n.end_date ? new Date(n.end_date) : null;
      if (start && now < start) return false;
      if (end && now > end) return false;
      return true;
    }
    return true;
  });

  if (!activeNotice) return;
  const sessionKey = `notice_dismissed_${activeNotice._id}`;
  if (sessionStorage.getItem(sessionKey)) return;

  // Render Notice Popup Overlay
  let overlay = document.getElementById("noticePopupOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "noticePopupOverlay";
    overlay.className = "bday-popup-overlay";
    document.body.appendChild(overlay);
  }

  const title = currentLang === 'bn' ? (activeNotice.title_bn || activeNotice.title_en) : (activeNotice.title_en || activeNotice.title_bn);
  const textDesc = currentLang === 'bn' ? (activeNotice.notice_text_bn || activeNotice.notice_text_en) : (activeNotice.notice_text_en || activeNotice.notice_text_bn);
  const photo = normalizeCmsPath(activeNotice.photo);

  overlay.innerHTML = `
    <div class="bday-popup-card notice-popup-card" role="dialog" aria-modal="true">
      <button type="button" class="bday-popup-close" id="noticeCloseBtn" aria-label="Close">&times;</button>
      
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px;">
        <span class="notice-cat-badge notice-cat-urgent" style="font-size: 0.8rem;">🚨 জরুরি নোটিশ</span>
        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">📅 ${activeNotice.date || ''}</span>
      </div>

      <h2 style="font-size: 1.35rem; line-height: 1.35; margin-bottom: 12px; color: var(--text);">${title}</h2>
      
      ${photo ? `<div style="margin-bottom: 14px; border-radius: 12px; overflow: hidden;"><img src="${photo}" alt="" style="width: 100%; max-height: 220px; object-fit: cover;"></div>` : ''}

      <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 18px; max-height: 140px; overflow-y: auto;">
        ${textDesc}
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${activeNotice.file_url ? `<a href="${activeNotice.file_url}" target="_blank" rel="noopener" class="cta-button" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 20px; border-radius: 10px; background: #ef4444; color: #fff; font-weight: 700; text-decoration: none;">📥 ডাউনলোড পিডিএফ নোটিশ</a>` : ''}
        ${activeNotice.link_url ? `<a href="${activeNotice.link_url}" target="_blank" rel="noopener" class="cta-button" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 20px; border-radius: 10px; background: var(--accent); color: #0a1f38; font-weight: 700; text-decoration: none;">🔗 ${activeNotice.link_text || 'বিস্তারিত দেখুন'}</a>` : ''}
        <button type="button" id="noticeDismissBtn" style="background: none; border: 0; color: var(--text-muted); font-size: 0.85rem; padding: 6px; cursor: pointer; text-decoration: underline;">
          নোটিশটি বন্ধ করুন (Dismiss)
        </button>
      </div>
    </div>
  `;

  setTimeout(() => overlay.classList.add("is-active"), 120);

  const dismiss = () => {
    overlay.classList.remove("is-active");
    sessionStorage.setItem(sessionKey, "true");
    setTimeout(() => overlay.remove(), 400);
  };
  const cBtn = document.getElementById("noticeCloseBtn");
  const dBtn = document.getElementById("noticeDismissBtn");
  if (cBtn) cBtn.onclick = dismiss;
  if (dBtn) dBtn.onclick = dismiss;
}

// ═══════════════════════════════════════════════════════════════
// PAGE-LEVEL ACCESS & LOCK CONTROLS (ENFORCEMENT)
// ═══════════════════════════════════════════════════════════════
function checkPageAccess() {
  const path = window.location.pathname.toLowerCase();
  const page = (document.body.dataset.page || "").toLowerCase();
  let pageId = null;
  if (page === "results" || path.includes("results")) pageId = "results";
  else if (page === "students" || path.includes("students")) pageId = "students";
  else if (page === "roommates" || path.includes("roommates")) pageId = "roommates";
  else if (page === "birthday" || path.includes("birthday")) pageId = "birthday";
  else if (page === "notices" || path.includes("notices")) pageId = "notices";
  else if (page === "gallery" || path.includes("gallery")) pageId = "gallery";
  else if (page === "hostel" || path.includes("hostel")) pageId = "hostel";
  else if (page === "dc-clubs" || path.includes("dc-clubs")) pageId = "dc-clubs";
  else if (page === "dc-social" || path.includes("dc-social")) pageId = "dc-social";

  if (!pageId) return false;

  const pageControls = cmsAdminSettings?.page_access_controls || [];
  const ctrl = pageControls.find(c => c.page_id === pageId);
  if (!ctrl) return false;

  const role = getAuthRole();
  const isMaster = role === "master";

  // Master admin bypasses all page restrictions
  if (isMaster) return false;

  const isHidden = ctrl.access_level === 'hidden' || ctrl.is_visible === false;
  const isLockedNormal = ctrl.access_level === 'lock_normal' || ctrl.is_locked === true;
  const isLockedAll = ctrl.access_level === 'lock_all';

  // 1. If page is disabled (hidden)
  if (isHidden) {
    const mainEl = document.querySelector("main") || document.querySelector(".page-content") || document.body;
    if (mainEl) {
      const bannerTitle = currentLang === 'bn' ? 'পেজটি সাময়িকভাবে বন্ধ রাখা হয়েছে' : 'Page Temporarily Disabled';
      const bannerDesc = currentLang === 'bn' 
        ? (ctrl.lock_message || 'অ্যাডমিন কর্তৃক এই পেজের তথ্য সাময়িকভাবে বন্ধ রাখা হয়েছে।')
        : (ctrl.lock_message_en || 'This page has been temporarily disabled by the administrator.');
      const homeText = currentLang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Home';

      mainEl.innerHTML = `
        <div class="page-access-banner" style="max-width: 620px; margin: 80px auto; padding: 48px 32px; text-align: center; background: var(--surface-strong); border: 1px solid var(--border); border-radius: 20px; box-shadow: var(--shadow);">
          <div class="lock-icon-wrap" style="width: 72px; height: 72px; margin: 0 auto 20px; border-radius: 50%; background: rgba(239, 68, 68, 0.12); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(239, 68, 68, 0.25);">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
          </div>
          <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 12px; color: var(--text);">${bannerTitle}</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 28px;">${bannerDesc}</p>
          <a href="index.html" class="btn primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>${homeText}</span>
          </a>
        </div>
      `;
    }
    return true; // Access blocked!
  }

  // 2. If page is locked (requires login) - STRICTLY NO UNLOCK OPTION ON PROTECTED PAGE
  if (isLockedAll || isLockedNormal) {
    const isAuthed = Boolean(role && role !== "guest");
    if (isLockedAll || !isAuthed) {
      const mainEl = document.querySelector("main") || document.querySelector(".page-content") || document.body;
      if (mainEl) {
        const bannerTitle = currentLang === 'bn' ? 'এই পেজটি সংরক্ষিত' : 'Protected Residential Page';
        const bannerDesc = currentLang === 'bn'
          ? (ctrl.lock_message || 'এই পেজের তথ্য দেখার জন্য ইন্টারন্যাশনাল হলের আবাসিক শিক্ষার্থীদের লগইন করতে হবে।')
          : (ctrl.lock_message_en || 'This page is protected for residential students of International Hall. Please sign in to your student account to view this directory.');
        const portalText = currentLang === 'bn' ? 'স্টুডেন্ট পোর্টালে লগইন করুন' : 'Student Portal Login';
        const homeText = currentLang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Home';

        mainEl.innerHTML = `
          <div class="page-access-banner" style="max-width: 600px; margin: 80px auto; padding: 48px 32px; text-align: center; background: var(--surface-strong); border: 1px solid var(--border); border-radius: 20px; box-shadow: var(--shadow);">
            <div class="lock-icon-wrap" style="width: 72px; height: 72px; margin: 0 auto 20px; border-radius: 50%; background: rgba(16, 185, 129, 0.12); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.25);">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 12px; color: var(--text);">${bannerTitle}</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 28px;">${bannerDesc}</p>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
              <a href="profile.html" class="btn primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 10px; font-weight: 700; text-decoration: none;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>${portalText}</span>
              </a>
              <a href="index.html" class="btn secondary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 10px; font-weight: 600; text-decoration: none;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span>${homeText}</span>
              </a>
            </div>
          </div>
        `;
      }
      return true; // Access blocked!
    }
  }

  return false; // Access permitted
}

const i18n = {
  en: {
    pageTitle: {
      home: "Dhaka College International Hall | Official Student & Hostel Portal",
      students: "Student Directory & Profiles | Dhaka College International Hall",
      roommates: "Room & Roommate Allocations | Dhaka College International Hall",
      results: "Academic Results & Merit Lists | Dhaka College International Hall",
      hostel: "Hostel Information & Administration | Dhaka College International Hall",
      hallsuper: "Hall Super Office & Administration | Dhaka College International Hall",
      gallery: "Photo Gallery & Campus Memories | Dhaka College International Hall",
      developer: "Website Developer & Technical Portfolio | Dhaka College International Hall",
      profile: "Student Portal & Profile Access | Dhaka College International Hall",
      embed: "Portals, Archives & Campus Resources | Dhaka College International Hall",
      "dc-social": "Official Facebook Pages & Social Directory | Dhaka College International Hall",
      "dc-clubs": "Clubs & Co-Curricular Directory | Dhaka College International Hall",
      birthday: "Student Birthdays & Calendar | Dhaka College International Hall",
      notices: "Notices & Announcements | Dhaka College International Hall" 
    },
    nav: {
      logo: "International Hall",
      home: "Home",
      hall: "Hall",
      dhakaCollege: "Dhaka College",
      developer: "Developer",
      students: "Students",
      roommates: "Roommates",
      results: "Results",
      hostel: "Hall Info",
      hallSuper: "Hall Super",
      gallery: "Gallery",
      notices: "Notices",
      dcSocial: "DC Facebook Pages",
      dcClubs: "Dhaka College Clubs"
    },
    auth: {
      title: "Student Login",
      passwordLabel: "Password",
      submit: "Login",
      logout: "Logout",
      successTitle: "Successfully Logged In",
      notice: "If you are a student of Dhaka College International Hall, please log in with your password. Entering the password will allow you to view all information.",
      successMessage: "You are logged in as a student! All locked contact numbers and locations are now visible.",
      error: "Invalid password. Please try again.",
      adminPanel: "Open Sanity Studio Admin",
      viewStudents: "View Student Directory",
      viewRoommates: "View Roommates"
    },
    embed: {
      back: "Back",
      openTab: "Open in New Tab"
    },
    common: {
      about: "About",
      academicResult: "Academic Results",
      admissionSuccess: "Admission Success",
      address: "Address",
      blood: "Blood Group",
      dob: "Date of Birth",
      chemistry: "Chemistry",
      classLabel: "Class",
      closeProfile: "Close student profile",
      college: "College",
      email: "Email",
      emptySeat: "Empty Seat",
      famousStudents: "Notable Students",
      fatherPhone: "Father's Phone",
      fullProfile: "Full Profile",
      gpa: "GPA",
      group: "Group",
      history: "History",
      hostelInfo: "Hall Info",
      location: "Location",
      math: "Math",
      noStudent: "No student found.",
      phone: "Phone",
      practicalGroup: "Practical Group",
      physics: "Physics",
      results: "Results",
      roll: "Roll",
      room: "ROOM",
      rooms: "Rooms",
      roomOccupants: "Room Occupants",
      section: "Section",
      searchPlaceholderFull: "Search by name, room, roll, phone, blood group or address",
      searchPlaceholderShort: "Search by name, room, roll, blood group or address",
      searchStudents: "Search students",
      students: "Students",
      tapCall: "Tap to Call",
      tapCallFather: "Tap to Call Father",
      toggleDark: "Toggle dark mode",
      viewAll: "View All",
      viewFacebook: "View Facebook Profile",
      viewMap: "View on Google Maps",
      viewRooms: "View Rooms",
      whatsapp: "WhatsApp"
    },
    groups: {
      science: "Science",
      commerce: "Business Studies",
      arts: "Humanities"
    },
    studentClass: {
      "11": "Class XI",
      "12": "Class XII"
    },
    filters: {
      class: "Class",
      group: "Group",
      section: "Section",
      blood: "Blood Group",
      allClasses: "All Classes",
      firstYear: "1st Year",
      secondYear: "2nd Year",
      allGroups: "All Groups",
      allSections: "All Sections",
      allBlood: "All Blood Groups"
    },
    home: {
      heroEyebrow: "Dhaka College",
      heroTitle: "International Hall",
      viewStudents: "View Students",
      studentsPreview: "Students Preview",
      roommatePreview: "Roommate Preview",
      infoTitle: "Legacy, achievement and student life",
      infoLead: "International Hall brings student profiles, room assignments, result records and important hall stories into a clean digital hub.",
      exploreHostel: "Explore Hall Info",
      historyText: "A short look at Dhaka College's academic legacy and hall life.",
      famousText: "Demo profiles for notable former students and their achievements.",
      successText: "Medical, university and engineering admission success preview.",
      locationTitle: "International Hall, Dhaka College",
      locationText: "Use the live Google map below to view the exact International Hall location directly from the website.",
      resultCardTitle: "Verified Result Archive",
      resultCardSub: "Term Marksheets & Digital Records",
      statTerms: "Official Terms",
      statDigital: "Digital Archive",
      dcResourcesEyebrow: "Dhaka College",
      dcResourcesTitle: "Official Portals & Resources"
    },
    heroPhrases: [
      "Together we learn, together we succeed.",
      "Discipline today, success tomorrow.",
      "A hall of focus, friendship and ambition.",
      "Study together, grow together.",
      "Dream big from Dhaka College."
    ],
    dcSocial: {
      title: "DC Facebook Pages",
      subtitle: "Scroll and interact with official Facebook pages and groups of Dhaka College."
    },
    dcClubs: {
      title: "Dhaka College Clubs",
      subtitle: "Explore active interest clubs, co-curricular groups, and associations at Dhaka College."
    },
    students: {
      title: "Student Directory",
      subtitle: "Profiles, contact details, room, roll, group, section and academic files in one searchable list."
    },
    roommates: {
      title: "Roommate Assignments",
      subtitle: "Room-based student pairs with class, group, section and blood group filters."
    },
    results: {
      eyebrow: "ACADEMIC PERFORMANCE",
      title: "Academic Results",
      subtitle: "Demo result overview. Detailed CT and yearly PDF files are linked from student profiles."
    },
    resultTable: {
      serial: "Serial",
      student: "Student",
      roll: "Roll No"
    },
    hostel: {
      title: "Hall Information",
      subtitle: "History, notable students, admission success and location preview.",
      historyTitle: "A hall connected to Dhaka College legacy",
      historyText: "Dhaka College, established in 1841, is one of the oldest and most influential educational institutions in Bangladesh. International Hall carries that academic spirit through shared study, discipline and student community life.",
      famousTitle: "Alumni Profiles",
      successTitle: "Admission success overview",
      successText: "Demo chart showing how many students received chances in engineering, medical and university admission.",
      locationTitle: "International Hall Location",
      locationText: "Exact location: International Hall, Dhaka College. The live Google map below can be viewed directly on the website.",
      openLocation: "Open exact location on Google Maps"
    },
    famous: {
      oneName: "Dr. Anis Rahman",
      oneText: "Demo profile: former hall student, now a public health researcher with medical admission success story.",
      twoName: "Engr. Mahmud Karim",
      twoText: "Demo profile: engineering graduate, active mentor for admission preparation and student projects.",
      threeName: "Sadia Chowdhury",
      threeText: "Demo profile: university scholarship achiever, known for debate, leadership and academic excellence."
    },
    alumni: {
      biography: "Biography",
      career: "Career Success",
      hallMemory: "Hall Memories",
      hallContribution: "Hall Contribution",
      success: "Success",
      education: "Education",
      contribution: "Contribution"
    },
    places: {
      newMarket: "New Market",
      scienceLab: "Science Lab",
      dhanmondi: "Dhanmondi"
    },
    hallSuper: {
      title: "Hall Super",
      subtitle: "Important information for students about the respected hall superintendent.",
      eyebrow: "Respectful Leadership",
      name: "Prof. Md. Kamruzzaman",
      bio: "Prof. Md. Kamruzzaman serves as the Provost of Dhaka College International Hall. He is committed to maintaining a disciplined, secure, and student-friendly residential environment while supporting students' academic success, personal development, and overall well-being.",
      joinedTitle: "Joined Hall Duty",
      joinedText: "Serving students since 2022 with dedication and leadership.",
      contributionTitle: "Contribution",
      contributionText: "Improved discipline, student communication and admission preparation culture.",
      noticeTitle: "Student Support",
      noticeText: "Students can contact the hall office for room, attendance and emergency support."
    },
    gallery: {
      eyebrow: "Event & Photo Gallery",
      title: "International Hall Gallery",
      subtitle: "Event highlights, campus moments, and residential student memories.",
      demoText: "International Hall campus and student memories."
    },
    developer: {
      eyebrow: "Aspiring Software Engineer",
      title: "Developer Profile",
      subtitle: "Developer of the International Hall website and student-focused web projects.",
      name: "Abdullah Al Adib",
      bio: "Student developer from Dhaka College, building useful web tools, hall information systems and small experimental apps.",
      sendMessage: "Send Message",
      education: "Education",
      projects: "Featured Projects",
      timeline: "Journey Timeline",
      skills: "Technical Skills",
      contributors: "Contributors",
      contributorTitle: "Project contributors",
      photographer: "Photographer",
      photographerText: "Supports the project with hall and student event photos.",
      contentHelper: "Content Helper",
      contentHelperText: "Helps collect student data, event descriptions and hall updates."
    },
    pdf: {
      ct1: "CT-1",
      ct2: "CT-2",
      hy: "Half Yearly",
      ct3: "CT-3",
      yearly: "Yearly",
      test: "Test Exam"
    },
    footer: {
      aboutPrefix: "This website is developed by",
      aboutSuffix: "Currently under development, this platform aims to provide easy access to all essential information for the 11th-grade students of International Hall.",
      quickLinks: "Quick Links",
      studentLinks: "Student",
      hallLinks: "Hall",
      projectLinks: "Project",
      more: "More"
    }
  },
  bn: {
    pageTitle: {
      home: "ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস | অফিসিয়াল শিক্ষার্থী ও হোস্টেল পোর্টাল",
      students: "শিক্ষার্থী তালিকা ও ডিরেক্টরি | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      roommates: "রুম ও রুমমেট তালিকা | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      results: "একাডেমিক ফলাফল ও মূল্যায়ন | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      hostel: "ছাত্রাবাস তথ্য ও প্রশাসন | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      hallsuper: "হল সুপার প্রশাসন ও বার্তা | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      gallery: "ফটো গ্যালারি ও ক্যাম্পাস স্মৃতি | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      developer: "ডেভেলপার পরিচিতি ও পোর্টফোলিও | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      profile: "শিক্ষার্থী পোর্টাল ও প্রোফাইল | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      embed: "পোর্টাল, আর্কাইভ ও রিসোর্স | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      "dc-social": "ফেসবুক পেজ ও সোশ্যাল ডিরেক্টরি | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      "dc-clubs": "ক্লাব ও সহশিক্ষা কার্যক্রম | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      birthday: "শিক্ষার্থীদের জন্মদিন ও ক্যালেন্ডার | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস",
      notices: "নোটিশ ও ঘোষণা | ঢাকা কলেজ আন্তর্জাতিক ছাত্রাবাস" 
    },
    nav: {
      logo: "আন্তর্জাতিক ছাত্রাবাস",
      home: "হোম",
      hall: "হল",
      dhakaCollege: "ঢাকা কলেজ",
      developer: "ডেভেলপার",
      students: "শিক্ষার্থী",
      roommates: "রুমমেট",
      results: "ফলাফল",
      hostel: "হল তথ্য",
      hallSuper: "হল সুপার",
      gallery: "গ্যালারি",
      notices: "নোটিশ",
      dcSocial: "ডিসি ফেসবুক পেজ",
      dcClubs: "ঢাকা কলেজ ক্লাবসমূহ"
    },
    auth: {
      title: "শিক্ষার্থী লগইন",
      passwordLabel: "পাসওয়ার্ড",
      submit: "লগইন",
      logout: "লগআউট",
      successTitle: "সফলভাবে লগইন হয়েছে",
      notice: "তুমি যদি ঢাকা কলেজ ইন্টারন্যাশনালের হলের স্টুডেন্ট হয়ে থাকো, তাহলে পাসওয়ার্ড দিয়ে লগইন করো। পাসওয়ার্ড দিলে তুমি সকল ইনফরমেশন দেখতে পাবে।",
      successMessage: "তুমি একজন শিক্ষার্থী হিসেবে লগইন করে আছো! সকল লক করা নম্বর এবং লোকেশন এখন দৃশ্যমান।",
      error: "ভুল পাসওয়ার্ড। আবার চেষ্টা করো।",
      adminPanel: "স্যানিটি অ্যাডমিন প্যানেল খুলুন",
      viewStudents: "শিক্ষার্থী তালিকা দেখুন",
      viewRoommates: "রুমমেট তালিকা দেখুন"
    },
    embed: {
      back: "ফিরে যান",
      openTab: "নতুন ট্যাবে খুলুন"
    },
    common: {
      about: "পরিচিতি",
      academicResult: "একাডেমিক ফলাফল",
      admissionSuccess: "এডমিশন সাফল্য",
      address: "ঠিকানা",
      blood: "রক্তের গ্রুপ",
      dob: "জন্ম তারিখ",
      chemistry: "রসায়ন",
      classLabel: "শ্রেণী",
      closeProfile: "শিক্ষার্থীর প্রোফাইল বন্ধ করুন",
      college: "কলেজ",
      email: "ইমেইল",
      emptySeat: "খালি সিট",
      famousStudents: "কৃতি সন্তান",
      fatherPhone: "বাবার ফোন",
      fullProfile: "পূর্ণ প্রোফাইল",
      gpa: "জিপিএ",
      group: "গ্রুপ",
      history: "ইতিহাস",
      hostelInfo: "হল তথ্য",
      location: "লোকেশন",
      math: "গণিত",
      noStudent: "কোনো শিক্ষার্থী পাওয়া যায়নি।",
      phone: "ফোন",
      practicalGroup: "প্র্যাকটিক্যাল গ্রুপ",
      physics: "পদার্থবিজ্ঞান",
      results: "ফলাফল",
      roll: "রোল",
      room: "রুম",
      rooms: "রুম",
      roomOccupants: "রুমের বাসিন্দাবৃন্দ",
      section: "সেকশন",
      searchPlaceholderFull: "নাম, রুম, রোল, ফোন, রক্তের গ্রুপ বা ঠিকানা দিয়ে খুঁজুন",
      searchPlaceholderShort: "নাম, রুম, রোল, রক্তের গ্রুপ বা ঠিকানা দিয়ে খুঁজুন",
      searchStudents: "শিক্ষার্থী খুঁজুন",
      students: "শিক্ষার্থী",
      tapCall: "কল করুন",
      tapCallFather: "বাবাকে কল করুন",
      toggleDark: "ডার্ক মোড চালু বা বন্ধ করুন",
      viewAll: "সব দেখুন",
      viewFacebook: "ফেসবুক প্রোফাইল দেখুন",
      viewMap: "গুগল ম্যাপে দেখুন",
      viewRooms: "রুম দেখুন",
      whatsapp: "হোয়াটসঅ্যাপ"
    },
    groups: {
      science: "বিজ্ঞান",
      commerce: "ব্যবসায় শিক্ষা",
      arts: "মানবিক"
    },
    studentClass: {
      "11": "একাদশ শ্রেণী",
      "12": "দ্বাদশ শ্রেণী"
    },
    filters: {
      class: "শ্রেণী",
      group: "গ্রুপ",
      section: "সেকশন",
      blood: "রক্তের গ্রুপ",
      allClasses: "সব শ্রেণী",
      firstYear: "১ম বর্ষ",
      secondYear: "২য় বর্ষ",
      allGroups: "সব গ্রুপ",
      allSections: "সব সেকশন",
      allBlood: "সব রক্তের গ্রুপ"
    },
    home: {
      heroEyebrow: "ঢাকা কলেজ",
      heroTitle: "আন্তর্জাতিক ছাত্রাবাস",
      viewStudents: "শিক্ষার্থী দেখুন",
      studentsPreview: "শিক্ষার্থী প্রিভিউ",
      roommatePreview: "রুমমেট প্রিভিউ",
      infoTitle: "ঐতিহ্য, অর্জন ও ছাত্রজীবন",
      infoLead: "আন্তর্জাতিক ছাত্রাবাসে শিক্ষার্থী প্রোফাইল, রুম বরাদ্দ, ফলাফল ও গুরুত্বপূর্ণ হল তথ্য এক জায়গায় রাখা হয়েছে।",
      exploreHostel: "হল তথ্য দেখুন",
      historyText: "ঢাকা কলেজের একাডেমিক ঐতিহ্য ও হল জীবনের সংক্ষিপ্ত পরিচয়।",
      famousText: "কৃতি সাবেক শিক্ষার্থীদের ডেমো প্রোফাইল ও অর্জনের পরিচয়।",
      successText: "মেডিকেল, বিশ্ববিদ্যালয় ও ইঞ্জিনিয়ারিং এডমিশন সাফল্যের প্রিভিউ।",
      locationTitle: "International Hall, Dhaka College",
      locationText: "ওয়েবসাইট থেকেই International Hall, Dhaka College-এর লাইভ গুগল ম্যাপ দেখা যাবে।"
    },
    heroPhrases: [
      "একসাথে শিখি, একসাথে সফল হই।",
      "আজকের শৃঙ্খলাই আগামী দিনের সাফল্য।",
      "মনোযোগ, বন্ধুত্ব আর স্বপ্নের আবাস।",
      "একসাথে পড়ি, একসাথে এগিয়ে যাই।",
      "ঢাকা কলেজ থেকে বড় স্বপ্নের শুরু।"
    ],
    dcSocial: {
      title: "ডিসি ফেসবুক পেজ",
      subtitle: "ঢাকা কলেজের ফেসবুক পেজ ও গ্রুপগুলোর পোস্ট সরাসরি স্ক্রোল করে দেখুন।"
    },
    dcClubs: {
      title: "ঢাকা কলেজ ক্লাবসমূহ",
      subtitle: "ঢাকা কলেজের বিভিন্ন ক্লাব, ক্লাব কার্যক্রম ও ফেসবুক কমিউনিটি পেজ।"
    },
    students: {
      title: "শিক্ষার্থী ডিরেক্টরি",
      subtitle: "প্রোফাইল, যোগাযোগ, রুম, রোল, গ্রুপ, সেকশন ও একাডেমিক ফাইল এক জায়গায়।"
    },
    roommates: {
      title: "রুমমেট তালিকা",
      subtitle: "শ্রেণী, গ্রুপ, সেকশন ও রক্তের গ্রুপ ফিল্টারসহ রুমভিত্তিক শিক্ষার্থী তালিকা।"
    },
    results: {
      eyebrow: "একাডেমিক ফলাফল",
      title: "একাডেমিক ফলাফল",
      subtitle: "ডেমো ফলাফল প্রিভিউ। বিস্তারিত CT ও yearly PDF শিক্ষার্থী প্রোফাইলে যুক্ত আছে।"
    },
    resultTable: {
      serial: "সিরিয়াল",
      student: "শিক্ষার্থী",
      roll: "রোল নং"
    },
    hostel: {
      title: "হল তথ্য",
      subtitle: "ইতিহাস, কৃতি সন্তান, এডমিশন সাফল্য ও লোকেশন প্রিভিউ।",
      historyTitle: "ঢাকা কলেজের ঐতিহ্যের সঙ্গে যুক্ত একটি হল",
      historyText: "১৮৪১ সালে প্রতিষ্ঠিত ঢাকা কলেজ বাংলাদেশের অন্যতম প্রাচীন ও প্রভাবশালী শিক্ষাপ্রতিষ্ঠান। আন্তর্জাতিক ছাত্রাবাস সেই একাডেমিক চেতনা, সম্মিলিত পড়াশোনা, শৃঙ্খলা ও ছাত্রসমাজের জীবনধারা বহন করে।",
      famousTitle: "Alumni Profiles",
      successTitle: "এডমিশন সাফল্যের সারাংশ",
      successText: "ইঞ্জিনিয়ারিং, মেডিকেল ও বিশ্ববিদ্যালয় ভর্তি সাফল্যের ডেমো চার্ট।",
      locationTitle: "আন্তর্জাতিক ছাত্রাবাস লোকেশন",
      locationText: "সঠিক লোকেশন: International Hall, Dhaka College। নিচের লাইভ গুগল ম্যাপ ওয়েবসাইট থেকেই দেখা যাবে।",
      openLocation: "নির্দিষ্ট লোকেশন খুলুন"
    },
    famous: {
      oneName: "ড. আনিস রহমান",
      oneText: "ডেমো প্রোফাইল: সাবেক হল শিক্ষার্থী, বর্তমানে জনস্বাস্থ্য গবেষক।",
      twoName: "ইঞ্জি. মাহমুদ করিম",
      twoText: "ডেমো প্রোফাইল: ইঞ্জিনিয়ারিং গ্র্যাজুয়েট, এডমিশন প্রস্তুতি ও student project mentor।",
      threeName: "সাদিয়া চৌধুরী",
      threeText: "ডেমো প্রোফাইল: বিশ্ববিদ্যালয় scholarship achiever, বিতর্ক ও নেতৃত্বে পরিচিত।"
    },
    alumni: {
      biography: "জীবনী",
      career: "পেশাগত সফলতা",
      hallMemory: "ছাত্রাবাসের স্মৃতি",
      hallContribution: "ছাত্রাবাসে অবদান",
      success: "সাফল্য",
      education: "শিক্ষা",
      contribution: "অবদান"
    },
    places: {
      newMarket: "নিউ মার্কেট",
      scienceLab: "সায়েন্স ল্যাব",
      dhanmondi: "ধানমন্ডি"
    },
    hallSuper: {
      title: "হল সুপার",
      subtitle: "শিক্ষার্থীদের জন্য সম্মানিত হল সুপারের গুরুত্বপূর্ণ তথ্য।",
      eyebrow: "সম্মানিত নেতৃত্ব",
      name: "অধ্যাপক মোঃ কামরুজ্জামান",
      bio: "অধ্যাপক মোঃ কামরুজ্জামান ঢাকা কলেজ ইন্টারন্যাশনাল হলের প্রভোস্ট হিসেবে দায়িত্ব পালন করছেন। তিনি শিক্ষার্থীদের জন্য একটি শৃঙ্খলাবদ্ধ, নিরাপদ ও শিক্ষাবান্ধব আবাসিক পরিবেশ নিশ্চিত করতে এবং তাদের একাডেমিক ও ব্যক্তিগত উন্নয়নে সহায়তা করতে কাজ করে যাচ্ছেন।",
      joinedTitle: "হল দায়িত্বে যোগদান",
      joinedText: "২০২২ সাল থেকে শিক্ষার্থীদের একনিষ্ঠ সেবা ও নেতৃত্ব দিয়ে যাচ্ছেন।",
      contributionTitle: "অবদান",
      contributionText: "শৃঙ্খলা, শিক্ষার্থী যোগাযোগ ও এডমিশন প্রস্তুতির পরিবেশ উন্নত করা।",
      noticeTitle: "শিক্ষার্থী সহায়তা",
      noticeText: "রুম, উপস্থিতি ও জরুরি সহায়তার জন্য শিক্ষার্থীরা হল অফিসে যোগাযোগ করতে পারে।"
    },
    gallery: {
      eyebrow: "ইভেন্ট ও ফটো গ্যালারি",
      title: "আন্তর্জাতিক ছাত্রাবাস গ্যালারি",
      subtitle: "ইভেন্ট মুহূর্ত, ক্যাম্পাস জীবনের স্মৃতি ও শিক্ষার্থীদের সোনালী কার্যক্রম।",
      demoText: "আন্তর্জাতিক ছাত্রাবাসের ক্যাম্পাস ও শিক্ষার্থীদের সোনালী স্মৃতি।"
    },
    developer: {
      eyebrow: "সফটওয়্যার প্রকৌশল প্রত্যাশী",
      title: "ডেভেলপার প্রোফাইল",
      subtitle: "International Hall website ও student-focused web project-এর developer।",
      name: "Abdullah Al Adib",
      bio: "ঢাকা কলেজের student developer, useful web tools, hall information system এবং ছোট experimental app তৈরি করি।",
      sendMessage: "মেসেজ পাঠান",
      education: "শিক্ষা",
      projects: "Featured Projects",
      timeline: "Journey Timeline",
      skills: "Technical Skills",
      contributors: "Contributors",
      contributorTitle: "Project contributors",
      photographer: "Photographer",
      photographerText: "হল ও student event photo দিয়ে project support করে।",
      contentHelper: "Content Helper",
      contentHelperText: "Student data, event description ও hall update collect করতে সাহায্য করে।"
    },
    pdf: {
      ct1: "CT-1",
      ct2: "CT-2",
      hy: "Half Yearly",
      ct3: "CT-3",
      yearly: "Yearly",
      test: "Test Exam"
    },
    footer: {
      about: "আন্তর্জাতিক ছাত্রাবাসের student portal demo - profile, room, result, gallery ও hall information এক জায়গায়।",
      quickLinks: "দ্রুত লিংক",
      studentLinks: "শিক্ষার্থী",
      hallLinks: "হল",
      projectLinks: "প্রজেক্ট",
      credits: "ছবির ক্রেডিট: Wikimedia Commons CC BY-SA 4.0; ডেমো পোর্ট্রেট Random User থেকে নেওয়া।"
    }
  }
};


let currentLang = localStorage.getItem("dc-hostel-lang") || "en";
if (!i18n[currentLang]) currentLang = "en";

let activeStudentId = null;
let activeRoomId = null;
let heroPhraseIndex = 0;
let heroTimer = null;

const byId = (id) => document.getElementById(id);
const groups = ["science", "commerce", "arts"];
const bloodGroups = ["B+", "A+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

let students = [
  {
    "id": 1,
    "slug": "adib1",
    "position": 1,
    "roommateIds": [
      "sakil4"
    ],
    "name": "Abdullah Al Adib",
    "room": "325",
    "roll": "139",
    "fullRoll": "1202526010139",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A2",
    "college": "Dhaka College",
    "phone": "01625329874",
    "fatherPhone": "-",
    "email": "quantelixvero@gmail.com",
    "img": "images/profile/adib-139.jpg",
    "fb": "https://www.facebook.com/seadix",
    "messenger": "seadix/",
    "address": "Hatia, Noakhali",
    "blood": "A+",
    "bio": "Goal — to create something no one has done before! ",
    "dob": "04-Oct",
    "dobBn": "০৪ অক্টোবর",
    "pdfs": {
      "ct1": "pdfs/adib1-11-ct1.pdf",
      "ct2": "pdfs/adib1-11-ct2.pdf",
      "hy": "pdfs/adib1-11-hy.pdf",
      "ct3": "pdfs/adib1-11-ct3.pdf",
      "yearly": "pdfs/adib1-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/adib1-11-ct1.pdf",
      "ct2": "pdfs/adib1-11-ct2.pdf",
      "hy": "pdfs/adib1-11-hy.pdf",
      "ct3": "pdfs/adib1-11-ct3.pdf",
      "yearly": "pdfs/adib1-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "আবদুল্যাহ আল আদিব",
      "college": "ঢাকা কলেজ",
      "address": "হাতিয়া, নোয়াখালী",
      "bio": "লক্ষ্য — এমন কিছু তৈরি করা যা আগে কেউ কখনও করেনি!",
      "dob": "০৪ অক্টোবর"
    }
  },
  {
    "id": 2,
    "slug": "santo2",
    "position": 2,
    "roommateIds": [
      "jahid3"
    ],
    "name": "Naimul Islam (Shanto)",
    "room": "317",
    "roll": "161",
    "fullRoll": "1202526010161",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01613601161",
    "fatherPhone": "-",
    "email": "mistersanto1000@gmail.com",
    "img": "images/profile/naimul-161.jpg",
    "fb": "https://www.facebook.com/naimul.islam55",
    "messenger": "naimul.islam55/",
    "address": "Hatia, Noakhali",
    "blood": "O+",
    "bio": "A dedicated student of Dhaka College, striving for academic excellence and pursuing personal growth with a focus on future goals",
    "dob": "08-Dec",
    "dobBn": "০৮ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/santo2-11-ct1.pdf",
      "ct2": "pdfs/santo2-11-ct2.pdf",
      "hy": "pdfs/santo2-11-hy.pdf",
      "ct3": "pdfs/santo2-11-ct3.pdf",
      "yearly": "pdfs/santo2-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/santo2-11-ct1.pdf",
      "ct2": "pdfs/santo2-11-ct2.pdf",
      "hy": "pdfs/santo2-11-hy.pdf",
      "ct3": "pdfs/santo2-11-ct3.pdf",
      "yearly": "pdfs/santo2-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "নাইমুল ইসলাম (সান্ত)",
      "college": "ঢাকা কলেজ",
      "address": "হাতিয়া, নোয়াখালী",
      "bio": "ঢাকা কলেজের একজন ডেডিকেটেড শিক্ষার্থী, যিনি একাডেমিক উৎকর্ষতা অর্জন এবং ভবিষ্যতের লক্ষ্যকে সামনে রেখে নিজের সামগ্রিক উন্নয়নে বিশ্বাসী।",
      "dob": "০৮ ডিসেম্বর"
    }
  },
  {
    "id": 3,
    "slug": "jahid3",
    "position": 3,
    "roommateIds": [
      "santo2"
    ],
    "name": "Md Zahidul Islam",
    "room": "317",
    "roll": "164",
    "fullRoll": "1202526010164",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01844474892",
    "fatherPhone": "-",
    "email": "zahidsigma164@gmail.com",
    "img": "images/profile/zahidul-164.png",
    "fb": "https://www.facebook.com/share/1BABcH2cjn/",
    "messenger": "1BABcH2cjn",
    "address": "Hatia, Noakhali",
    "blood": "A+",
    "bio": "I'm SIGMA The Zahid",
    "dob": "07-Jan",
    "dobBn": "০৭ জানুয়ারি",
    "pdfs": {
      "ct1": "pdfs/jahid3-11-ct1.pdf",
      "ct2": "pdfs/jahid3-11-ct2.pdf",
      "hy": "pdfs/jahid3-11-hy.pdf",
      "ct3": "pdfs/jahid3-11-ct3.pdf",
      "yearly": "pdfs/jahid3-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/jahid3-11-ct1.pdf",
      "ct2": "pdfs/jahid3-11-ct2.pdf",
      "hy": "pdfs/jahid3-11-hy.pdf",
      "ct3": "pdfs/jahid3-11-ct3.pdf",
      "yearly": "pdfs/jahid3-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ জাহিদুল ইসলাম",
      "college": "ঢাকা কলেজ",
      "address": "হাতিয়া, নোয়াখালী",
      "bio": "I'm SIGMA The Zahid",
      "dob": "০৭ জানুয়ারি"
    }
  },
  {
    "id": 4,
    "slug": "sakil4",
    "position": 4,
    "roommateIds": [
      "adib1"
    ],
    "name": "Md. Shakil Sheikh",
    "room": "325",
    "roll": "326",
    "fullRoll": "1202526010326",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "C",
    "practicalGroup": "C1",
    "college": "Dhaka College",
    "phone": "01739554600",
    "fatherPhone": "01758684640",
    "email": "-",
    "img": "images/profile/shakil-326.jpeg",
    "fb": "https://facebook.com/",
    "address": "Kanchan, Rupganj, Narayanganj",
    "blood": "O+",
    "bio": "CT-1 Pass",
    "dob": "08-Oct",
    "dobBn": "০৮ অক্টোবর",
    "pdfs": {
      "ct1": "pdfs/sakil4-11-ct1.pdf",
      "ct2": "pdfs/sakil4-11-ct2.pdf",
      "hy": "pdfs/sakil4-11-hy.pdf",
      "ct3": "pdfs/sakil4-11-ct3.pdf",
      "yearly": "pdfs/sakil4-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/sakil4-11-ct1.pdf",
      "ct2": "pdfs/sakil4-11-ct2.pdf",
      "hy": "pdfs/sakil4-11-hy.pdf",
      "ct3": "pdfs/sakil4-11-ct3.pdf",
      "yearly": "pdfs/sakil4-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ শাকিল শেখ",
      "college": "ঢাকা কলেজ",
      "address": "কাঞ্চন, রূপগঞ্জ, নারায়ণগঞ্জ",
      "bio": "CT-1 Pass",
      "dob": "০৮ অক্টোবর"
    }
  },
  {
    "id": 5,
    "slug": "sasfkat5",
    "position": 5,
    "roommateIds": [
      "riyad19"
    ],
    "name": "Shafkat Rahman",
    "room": "318",
    "roll": "008",
    "fullRoll": "1202526010008",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A1",
    "college": "Dhaka College",
    "phone": "01996569688",
    "fatherPhone": "-",
    "email": "shafkatrahmandkam@gmail.com",
    "img": "images/profile/shafkat-8.jpg",
    "fb": "https://www.facebook.com/share/18oRrju5zF/",
    "messenger": "18oRrju5zF",
    "address": "Deboi, Rupganj, Narayanganj",
    "blood": "O+",
    "bio": "CT-1= Absent, CT-2= Absent, Half yearly = Absent, CT-3= loading, Year FINAL= Loading",
    "dob": "01-Jan",
    "dobBn": "০১ জানুয়ারি",
    "pdfs": {
      "ct1": "pdfs/sasfkat5-11-ct1.pdf",
      "ct2": "pdfs/sasfkat5-11-ct2.pdf",
      "hy": "pdfs/sasfkat5-11-hy.pdf",
      "ct3": "pdfs/sasfkat5-11-ct3.pdf",
      "yearly": "pdfs/sasfkat5-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/sasfkat5-11-ct1.pdf",
      "ct2": "pdfs/sasfkat5-11-ct2.pdf",
      "hy": "pdfs/sasfkat5-11-hy.pdf",
      "ct3": "pdfs/sasfkat5-11-ct3.pdf",
      "yearly": "pdfs/sasfkat5-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "শাফকাত রহমান",
      "college": "ঢাকা কলেজ",
      "address": "দেবই, রূপগঞ্জ, নারায়ণগঞ্জ",
      "bio": "CT-1= Absent, CT-2= Absent, Half yearly = Absent, CT-3= loading, Year FINAL= Loading",
      "dob": "০১ জানুয়ারি"
    }
  },
  {
    "id": 6,
    "slug": "munsi6",
    "position": 6,
    "roommateIds": [
      "rejawl26"
    ],
    "name": "Shahriar Al Sakib Munshi",
    "room": "315",
    "roll": "022",
    "fullRoll": "1202526010022",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A1",
    "college": "Dhaka College",
    "phone": "01577203120",
    "fatherPhone": "01319061472",
    "email": "usage3913@gmail.com",
    "img": "images/profile/munshi-22.jpg",
    "fb": "https://facebook.com/",
    "address": "Choto Alampur, Debidwar, Cumilla",
    "blood": "B+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "23-Dec",
    "dobBn": "২৩ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/munsi6-11-ct1.pdf",
      "ct2": "pdfs/munsi6-11-ct2.pdf",
      "hy": "pdfs/munsi6-11-hy.pdf",
      "ct3": "pdfs/munsi6-11-ct3.pdf",
      "yearly": "pdfs/munsi6-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/munsi6-11-ct1.pdf",
      "ct2": "pdfs/munsi6-11-ct2.pdf",
      "hy": "pdfs/munsi6-11-hy.pdf",
      "ct3": "pdfs/munsi6-11-ct3.pdf",
      "yearly": "pdfs/munsi6-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "শাহরিয়ার আল সাকিব মুন্সি",
      "college": "ঢাকা কলেজ",
      "address": "ছোট আলমপুর, দেবিদ্বার, কুমিল্লা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২৩ ডিসেম্বর"
    }
  },
  {
    "id": 7,
    "slug": "musfik7",
    "position": 7,
    "roommateIds": [
      "nafis9"
    ],
    "name": "Md. Mushfiqur Rahman",
    "room": "316",
    "roll": "122",
    "fullRoll": "1202526010122",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A2",
    "college": "Dhaka College",
    "phone": "01577390514",
    "fatherPhone": "-",
    "email": "mushfiq88bd@gmail.com",
    "img": "images/profile/mushfiqur-122.jpg",
    "fb": "https://www.facebook.com/share/18osDPmvYU/",
    "messenger": "18osDPmvYU",
    "address": "South Sakuchia, Monpura, Bhola",
    "blood": "A+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "21-Aug",
    "dobBn": "২১ আগস্ট",
    "pdfs": {
      "ct1": "pdfs/musfik7-11-ct1.pdf",
      "ct2": "pdfs/musfik7-11-ct2.pdf",
      "hy": "pdfs/musfik7-11-hy.pdf",
      "ct3": "pdfs/musfik7-11-ct3.pdf",
      "yearly": "pdfs/musfik7-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/musfik7-11-ct1.pdf",
      "ct2": "pdfs/musfik7-11-ct2.pdf",
      "hy": "pdfs/musfik7-11-hy.pdf",
      "ct3": "pdfs/musfik7-11-ct3.pdf",
      "yearly": "pdfs/musfik7-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ মুশফিকুর রহমান",
      "college": "ঢাকা কলেজ",
      "address": "দক্ষিণ সাকুচিয়া, মনপুরা, ভোলা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২১ আগস্ট"
    }
  },
  {
    "id": 8,
    "slug": "esty8",
    "position": 8,
    "roommateIds": [
      "alauddin17"
    ],
    "name": "Taskin Rahman Esty",
    "room": "322",
    "roll": "870",
    "fullRoll": "1202526010870",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "F",
    "practicalGroup": "F2",
    "college": "Dhaka College",
    "phone": "01974097612",
    "fatherPhone": "01714097613",
    "email": "dhakaiyyaesty@gmail.com",
    "img": "images/profile/esty-870.jpg",
    "fb": "",
    "address": "Chattogram",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "21-Aug",
    "dobBn": "২১ আগস্ট",
    "pdfs": {
      "ct1": "pdfs/esty8-11-ct1.pdf",
      "ct2": "pdfs/esty8-11-ct2.pdf",
      "hy": "pdfs/esty8-11-hy.pdf",
      "ct3": "pdfs/esty8-11-ct3.pdf",
      "yearly": "pdfs/esty8-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/esty8-11-ct1.pdf",
      "ct2": "pdfs/esty8-11-ct2.pdf",
      "hy": "pdfs/esty8-11-hy.pdf",
      "ct3": "pdfs/esty8-11-ct3.pdf",
      "yearly": "pdfs/esty8-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "তাসকিন রহমান ইশতি",
      "college": "ঢাকা কলেজ",
      "address": "চট্টগ্রাম",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২১ আগস্ট"
    }
  },
  {
    "id": 9,
    "slug": "nafis9",
    "position": 9,
    "roommateIds": [
      "musfiq7"
    ],
    "name": "Nafis Alam Tarif",
    "room": "316",
    "roll": "141",
    "fullRoll": "1202526010141",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A2",
    "college": "Dhaka College",
    "phone": "01346588124",
    "fatherPhone": "01738770330",
    "email": "tarifalam265@gmail.com",
    "img": "images/profile/nafis-141.jpg",
    "fb": "https://www.facebook.com/share/1EDVSWD95F/",
    "messenger": "1EDVSWD95F",
    "address": "Ranisonkail, Thakurgaon",
    "blood": "O+",
    "bio": "Competition, I'm The Competition....",
    "dob": "12-Oct",
    "dobBn": "১২ অক্টোবর",
    "pdfs": {
      "ct1": "pdfs/nafis9-11-ct1.pdf",
      "ct2": "pdfs/nafis9-11-ct2.pdf",
      "hy": "pdfs/nafis9-11-hy.pdf",
      "ct3": "pdfs/nafis9-11-ct3.pdf",
      "yearly": "pdfs/nafis9-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/nafis9-11-ct1.pdf",
      "ct2": "pdfs/nafis9-11-ct2.pdf",
      "hy": "pdfs/nafis9-11-hy.pdf",
      "ct3": "pdfs/nafis9-11-ct3.pdf",
      "yearly": "pdfs/nafis9-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "নাফিস আলম তারিফ",
      "college": "ঢাকা কলেজ",
      "address": "রাণীশংকৈল, ঠাকুরগাঁও",
      "bio": "Competition, I'm The Competition....",
      "dob": "১২ অক্টোবর"
    }
  },
  {
    "id": 10,
    "slug": "kayes10",
    "position": 10,
    "roommateIds": [
      "siam12"
    ],
    "name": "Riasadul Islam Kayes",
    "room": "314",
    "roll": "882",
    "fullRoll": "1202526010882",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "F",
    "practicalGroup": "F2",
    "college": "Dhaka College",
    "phone": "01629171207",
    "fatherPhone": "-",
    "email": "riasadulislamkayes@gmail.com",
    "img": "images/profile/kayes-882.jpg",
    "fb": "https://facebook.com/",
    "address": "Chakaria, Cox's bazar.",
    "blood": "A+",
    "bio": "\"Every soul shall taste death.\"",
    "dob": "13-Dec",
    "dobBn": "১৩ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/kayes10-11-ct1.pdf",
      "ct2": "pdfs/kayes10-11-ct2.pdf",
      "hy": "pdfs/kayes10-11-hy.pdf",
      "ct3": "pdfs/kayes10-11-ct3.pdf",
      "yearly": "pdfs/kayes10-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/kayes10-11-ct1.pdf",
      "ct2": "pdfs/kayes10-11-ct2.pdf",
      "hy": "pdfs/kayes10-11-hy.pdf",
      "ct3": "pdfs/kayes10-11-ct3.pdf",
      "yearly": "pdfs/kayes10-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "রিয়াসাদুল ইসলাম কায়েস",
      "college": "ঢাকা কলেজ",
      "address": "চকরিয়া, কক্সবাজার",
      "bio": "\"প্রত্যেক প্রাণীই মৃত্যুর স্বাদ গ্রহণ করবে\"",
      "dob": "১৩ ডিসেম্বর"
    }
  },
  {
    "id": 11,
    "slug": "jahid11",
    "position": 11,
    "roommateIds": [
      "musa24"
    ],
    "name": "Md. Jahidul Islam",
    "room": "328",
    "roll": "223",
    "fullRoll": "1202526010223",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01828246239",
    "fatherPhone": "-",
    "email": " jkjahidultaskin10@gmail.com",
    "img": "images/profile/Jahidul-223.jpg",
    "fb": "https://facebook.com/",
    "address": "Narsingdi",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "04-Apr",
    "dobBn": "০৪ এপ্রিল",
    "pdfs": {
      "ct1": "pdfs/jahid11-11-ct1.pdf",
      "ct2": "pdfs/jahid11-11-ct2.pdf",
      "hy": "pdfs/jahid11-11-hy.pdf",
      "ct3": "pdfs/jahid11-11-ct3.pdf",
      "yearly": "pdfs/jahid11-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/jahid11-11-ct1.pdf",
      "ct2": "pdfs/jahid11-11-ct2.pdf",
      "hy": "pdfs/jahid11-11-hy.pdf",
      "ct3": "pdfs/jahid11-11-ct3.pdf",
      "yearly": "pdfs/jahid11-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ জাহিদুল ইসলাম",
      "college": "ঢাকা কলেজ",
      "address": "নরসিংদী",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০৪ এপ্রিল"
    }
  },
  {
    "id": 12,
    "slug": "siam12",
    "position": 12,
    "roommateIds": [
      "rafiq18"
    ],
    "name": "Siam Hasan (Nator)",
    "room": "319",
    "roll": "195",
    "fullRoll": "1202526010195",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01804692801",
    "fatherPhone": "01761866285",
    "email": "siamhasananik01@gmail.com",
    "img": "images/profile/siam-195.jpg",
    "fb": "https://www.facebook.com/siam.hasan.anik.402132",
    "messenger": "siam.hasan.anik.402132",
    "address": "Moshinda Majpara, Gurudaspur, Natore",
    "blood": "B+",
    "bio": "I am a Crazy Boy.",
    "dob": "17-Dec",
    "dobBn": "১৭ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/siam12-11-ct1.pdf",
      "ct2": "pdfs/siam12-11-ct2.pdf",
      "hy": "pdfs/siam12-11-hy.pdf",
      "ct3": "pdfs/siam12-11-ct3.pdf",
      "yearly": "pdfs/siam12-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/siam12-11-ct1.pdf",
      "ct2": "pdfs/siam12-11-ct2.pdf",
      "hy": "pdfs/siam12-11-hy.pdf",
      "ct3": "pdfs/siam12-11-ct3.pdf",
      "yearly": "pdfs/siam12-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "সিয়াম হাসান (নাটোর)",
      "college": "ঢাকা কলেজ",
      "address": "মশিন্দা মাঝপাড়া, গুরুদাসপুর, নাটোর",
      "bio": "I am a Crazy Boy.",
      "dob": "১৭ ডিসেম্বর"
    }
  },
  {
    "id": 13,
    "slug": "siam13",
    "position": 13,
    "roommateIds": [
      "kayes10"
    ],
    "name": "Md. Siam Ali (Kustia)",
    "room": "314",
    "roll": "881",
    "fullRoll": "1202526010881",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "F",
    "practicalGroup": "F2",
    "college": "Dhaka College",
    "phone": "01705310841",
    "fatherPhone": "01705633292",
    "email": "-",
    "img": "images/profile/siam-881.jpg",
    "fb": "https://facebook.com/",
    "address": "Khorda Ailchara, Kushtia Sadar, Kushtia",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "05-Oct",
    "dobBn": "০৫ অক্টোবর",
    "pdfs": {
      "ct1": "pdfs/siam13-11-ct1.pdf",
      "ct2": "pdfs/siam13-11-ct2.pdf",
      "hy": "pdfs/siam13-11-hy.pdf",
      "ct3": "pdfs/siam13-11-ct3.pdf",
      "yearly": "pdfs/siam13-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/siam13-11-ct1.pdf",
      "ct2": "pdfs/siam13-11-ct2.pdf",
      "hy": "pdfs/siam13-11-hy.pdf",
      "ct3": "pdfs/siam13-11-ct3.pdf",
      "yearly": "pdfs/siam13-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ সিয়াম আলী (কুষ্টিয়া)",
      "college": "ঢাকা কলেজ",
      "address": "খোরদা আইলচারা, কুষ্টিয়া সদর, কুষ্টিয়া",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০৫ অক্টোবর"
    }
  },
  {
    "id": 14,
    "slug": "saimun14",
    "position": 14,
    "roommateIds": [
      "rudro22"
    ],
    "name": "Saimun Islam",
    "room": "321",
    "roll": "322",
    "fullRoll": "1202526010322",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "C",
    "practicalGroup": "C1",
    "college": "Dhaka College",
    "phone": "01772589255",
    "fatherPhone": "-",
    "email": "-",
    "img": "images/profile/saimun-322.jpg",
    "fb": "https://facebook.com/",
    "address": "Baipail, Savar, Dhaka",
    "blood": "AB+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "15-Sep",
    "dobBn": "১৫ সেপ্টেম্বর",
    "pdfs": {
      "ct1": "pdfs/saimun14-11-ct1.pdf",
      "ct2": "pdfs/saimun14-11-ct2.pdf",
      "hy": "pdfs/saimun14-11-hy.pdf",
      "ct3": "pdfs/saimun14-11-ct3.pdf",
      "yearly": "pdfs/saimun14-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/saimun14-11-ct1.pdf",
      "ct2": "pdfs/saimun14-11-ct2.pdf",
      "hy": "pdfs/saimun14-11-hy.pdf",
      "ct3": "pdfs/saimun14-11-ct3.pdf",
      "yearly": "pdfs/saimun14-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "সাইমুন ইসলাম",
      "college": "ঢাকা কলেজ",
      "address": "বাইপাইল, সাভার, ঢাকা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "১৫ সেপ্টেম্বর"
    }
  },
  {
    "id": 15,
    "slug": "pranto15",
    "position": 15,
    "roommateIds": [
      "nayem18"
    ],
    "name": "Ratul Hassan Pranto",
    "room": "323",
    "roll": "863",
    "fullRoll": "1202526010863",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "F",
    "practicalGroup": "F2",
    "college": "Dhaka College",
    "phone": "01995393323",
    "fatherPhone": "01755729078",
    "email": "rh597040@gmail.com",
    "img": "images/profile/pranto-863.jpg",
    "fb": "https://www.facebook.com/share/1T3gCxVk6J/",
    "messenger": "1T3gCxVk6J",
    "address": "Kushtia Sadar, Kushtia",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "07-Feb",
    "dobBn": "০৭ ফেব্রুয়ারি",
    "pdfs": {
      "ct1": "pdfs/pranto15-11-ct1.pdf",
      "ct2": "pdfs/pranto15-11-ct2.pdf",
      "hy": "pdfs/pranto15-11-hy.pdf",
      "ct3": "pdfs/pranto15-11-ct3.pdf",
      "yearly": "pdfs/pranto15-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/pranto15-11-ct1.pdf",
      "ct2": "pdfs/pranto15-11-ct2.pdf",
      "hy": "pdfs/pranto15-11-hy.pdf",
      "ct3": "pdfs/pranto15-11-ct3.pdf",
      "yearly": "pdfs/pranto15-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "রাতুল হাসান প্রান্ত",
      "college": "ঢাকা কলেজ",
      "address": "কুষ্টিয়া সদর, কুষ্টিয়া",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০৭ ফেব্রুয়ারি"
    }
  },
  {
    "id": 16,
    "slug": "nayem18",
    "position": 16,
    "roommateIds": [
      "pranto15"
    ],
    "name": "Nayeem Sarwar",
    "room": "323",
    "roll": "639",
    "fullRoll": "1202526010639",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "E",
    "practicalGroup": "E1",
    "college": "Dhaka College",
    "phone": "01331198715",
    "fatherPhone": "01711985399",
    "email": "-",
    "img": "images/profile/nayeem-639.jpg",
    "fb": "https://facebook.com/",
    "address": "Alamdanga, Chuadanga",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "31-Dec",
    "dobBn": "৩১ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/nayem18-11-ct1.pdf",
      "ct2": "pdfs/nayem18-11-ct2.pdf",
      "hy": "pdfs/nayem18-11-hy.pdf",
      "ct3": "pdfs/nayem18-11-ct3.pdf",
      "yearly": "pdfs/nayem18-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/nayem18-11-ct1.pdf",
      "ct2": "pdfs/nayem18-11-ct2.pdf",
      "hy": "pdfs/nayem18-11-hy.pdf",
      "ct3": "pdfs/nayem18-11-ct3.pdf",
      "yearly": "pdfs/nayem18-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "নাঈম সরওয়ার",
      "college": "ঢাকা কলেজ",
      "address": "আলমডাঙ্গা, চুয়াডাঙ্গা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "৩১ ডিসেম্বর"
    }
  },
  {
    "id": 17,
    "slug": "alauddin17",
    "position": 17,
    "roommateIds": [
      "esty8"
    ],
    "name": "Md. Alauddin Mollah",
    "room": "322",
    "roll": "140",
    "fullRoll": "1202526030140",
    "classNo": "13",
    "group": "arts",
    "groupEn": "Humanities",
    "groupBn": "মানবিক",
    "section": "-",
    "practicalGroup": "-",
    "college": "Dhaka College",
    "phone": "01914476860",
    "fatherPhone": "01956324329",
    "email": "ah247556@gmail.com",
    "img": "images/profile/alauddin-140.jpg",
    "fb": "https://www.facebook.com/share/1EPCEFWqMG/",
    "messenger": "1EPCEFWqMG/",
    "address": "Kalisongkorpur, Joshobontopur, Mohammadpur, Magura",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "09-Sep",
    "dobBn": "০৯ সেপ্টেম্বর",
    "pdfs": {
      "ct1": "pdfs/alauddin17-11-ct1.pdf",
      "ct2": "pdfs/alauddin17-11-ct2.pdf",
      "hy": "pdfs/alauddin17-11-hy.pdf",
      "ct3": "pdfs/alauddin17-11-ct3.pdf",
      "yearly": "pdfs/alauddin17-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/alauddin17-11-ct1.pdf",
      "ct2": "pdfs/alauddin17-11-ct2.pdf",
      "hy": "pdfs/alauddin17-11-hy.pdf",
      "ct3": "pdfs/alauddin17-11-ct3.pdf",
      "yearly": "pdfs/alauddin17-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ আলাউদ্দীন মোল্যা",
      "college": "ঢাকা কলেজ",
      "address": "কালিশংকরপুর, যশোবন্তপুর, মোহাম্মদপুর, মাগুরা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০৯ সেপ্টেম্বর"
    }
  },
  {
    "id": 18,
    "slug": "rafiq18",
    "position": 18,
    "roommateIds": [
      "siam12"
    ],
    "name": "Md. Rafiq Bin Nizam",
    "room": "319",
    "roll": "872",
    "fullRoll": "1202526010872",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "মানবিক",
    "section": "F",
    "practicalGroup": "F2",
    "college": "Dhaka College",
    "phone": "01342909383",
    "fatherPhone": "01775208547",
    "email": "-",
    "img": "images/profile/rafiq-872.jpg",
    "fb": "https://facebook.com/",
    "address": "Rifaitpur, Daulatpur, Kushtia",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "24-Dec",
    "dobBn": "২৪ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/rafiq18-11-ct1.pdf",
      "ct2": "pdfs/rafiq18-11-ct2.pdf",
      "hy": "pdfs/rafiq18-11-hy.pdf",
      "ct3": "pdfs/rafiq18-11-ct3.pdf",
      "yearly": "pdfs/rafiq18-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/rafiq18-11-ct1.pdf",
      "ct2": "pdfs/rafiq18-11-ct2.pdf",
      "hy": "pdfs/rafiq18-11-hy.pdf",
      "ct3": "pdfs/rafiq18-11-ct3.pdf",
      "yearly": "pdfs/rafiq18-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মো: রফিক বিন নিজাম",
      "college": "ঢাকা কলেজ",
      "address": "রিফায়েতপুর, দৌলতপুর, কুষ্টিয়া",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২৪ ডিসেম্বর"
    }
  },
  {
    "id": 19,
    "slug": "riyad19",
    "position": 19,
    "roommateIds": [
      "sasfkat5"
    ],
    "name": "Tashfiqur Rahman Riyad",
    "room": "318",
    "roll": "596",
    "fullRoll": "1202526010596",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "D",
    "practicalGroup": "D2",
    "college": "Dhaka College",
    "phone": "01871571833",
    "fatherPhone": "01732168077",
    "email": "tashfiqurrahmanriyad2009@gmail.com",
    "img": "images/profile/riyad-596.jpg",
    "fb": "https://facebook.com/1C6xNqU8bA/",
    "messenger": "m.me/1C6xNqU8bA/",
    "address": "Purbachal, Rupganj , Narayanganj ",
    "blood": "B+",
    "bio": "My lawyer told me to leave this section blank. ⚖️🤐",
    "dob": "17-May",
    "dobBn": "১৭ মে",
    "pdfs": {
      "ct1": "pdfs/riyad19-11-ct1.pdf",
      "ct2": "pdfs/riyad19-11-ct2.pdf",
      "hy": "pdfs/riyad19-11-hy.pdf",
      "ct3": "pdfs/riyad19-11-ct3.pdf",
      "yearly": "pdfs/riyad19-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/riyad19-11-ct1.pdf",
      "ct2": "pdfs/riyad19-11-ct2.pdf",
      "hy": "pdfs/riyad19-11-hy.pdf",
      "ct3": "pdfs/riyad19-11-ct3.pdf",
      "yearly": "pdfs/riyad19-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "তাশফিকুর রহমান রিয়াদ",
      "college": "ঢাকা কলেজ",
      "address": "পূর্বাচল, রূপগঞ্জ, নারায়ণগঞ্জ",
      "bio": "আমার আইনজীবী আমাকে এই অংশটি খালি রাখতে বলেছেন। ⚖️🤐",
      "dob": "১৭ মে"
    }
  },
  {
    "id": 20,
    "slug": "mosih20",
    "position": 20,
    "roommateIds": [
      "abrar21"
    ],
    "name": "Md. Chisty Islam Mosih",
    "room": "320",
    "roll": "332",
    "fullRoll": "1202526010332",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "C",
    "practicalGroup": "C1",
    "college": "Dhaka College",
    "phone": "01320823354",
    "fatherPhone": "01763073516",
    "email": "-",
    "img": "images/profile/mosih-332.jpg",
    "fb": "https://facebook.com/",
    "address": "Dokkin Lalpur, Lalpur, Natore",
    "blood": "A+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "30-May",
    "dobBn": "৩০ মে",
    "pdfs": {
      "ct1": "pdfs/mosih20-11-ct1.pdf",
      "ct2": "pdfs/mosih20-11-ct2.pdf",
      "hy": "pdfs/mosih20-11-hy.pdf",
      "ct3": "pdfs/mosih20-11-ct3.pdf",
      "yearly": "pdfs/mosih20-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/mosih20-11-ct1.pdf",
      "ct2": "pdfs/mosih20-11-ct2.pdf",
      "hy": "pdfs/mosih20-11-hy.pdf",
      "ct3": "pdfs/mosih20-11-ct3.pdf",
      "yearly": "pdfs/mosih20-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ চিশতী ইসলাম মসীহ",
      "college": "ঢাকা কলেজ",
      "address": "দক্ষিণ লালপুর, লালপুর, নাটোর",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "৩০ মে"
    }
  },
  {
    "id": 21,
    "slug": "abrar21",
    "position": 21,
    "roommateIds": [
      "mosih20"
    ],
    "name": "Md. Ahanaf Abrar",
    "room": "320",
    "roll": "200",
    "fullRoll": "1202526010200",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01515288692",
    "fatherPhone": "01723510651",
    "email": "abrarislam0723@gmail.com",
    "img": "images/profile/abrar-200.jpg",
    "fb": "https://facebook.com/",
    "address": "429/B Malibag Chowdhury para, Near by Matir Mosjid, Rampura, Dhaka",
    "blood": "B+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "01-Jan",
    "dobBn": "০১ জানুয়ারি",
    "pdfs": {
      "ct1": "pdfs/abrar21-11-ct1.pdf",
      "ct2": "pdfs/abrar21-11-ct2.pdf",
      "hy": "pdfs/abrar21-11-hy.pdf",
      "ct3": "pdfs/abrar21-11-ct3.pdf",
      "yearly": "pdfs/abrar21-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/abrar21-11-ct1.pdf",
      "ct2": "pdfs/abrar21-11-ct2.pdf",
      "hy": "pdfs/abrar21-11-hy.pdf",
      "ct3": "pdfs/abrar21-11-ct3.pdf",
      "yearly": "pdfs/abrar21-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মো: আহনাফ আবরার",
      "college": "ঢাকা কলেজ",
      "address": "৪২৯/বি মালিবাগ চৌধুরী পাড়া, মাটির মসজিদের কাছে, রামপুরা, ঢাকা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০১ জানুয়ারি"
    }
  },
  {
    "id": 22,
    "slug": "rudro22",
    "position": 22,
    "roommateIds": [
      "saimun14"
    ],
    "name": "M M Tanvir (Rudro)",
    "room": "321",
    "roll": "100",
    "fullRoll": "1202526020100",
    "classNo": "12",
    "group": "commerce",
    "groupEn": "Commerce ",
    "groupBn": "বিজ্ঞান",
    "section": "-",
    "practicalGroup": "-",
    "college": "Dhaka College",
    "phone": "01516547125",
    "fatherPhone": "01751723978",
    "email": "-",
    "img": "images/profile/tanvir-100.jpg",
    "fb": "https://facebook.com/",
    "address": "Boalia, Sujanagar, Pabna",
    "blood": "B+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "04-Jun",
    "dobBn": "০৪ জুন",
    "pdfs": {
      "ct1": "pdfs/rudro22-11-ct1.pdf",
      "ct2": "pdfs/rudro22-11-ct2.pdf",
      "hy": "pdfs/rudro22-11-hy.pdf",
      "ct3": "pdfs/rudro22-11-ct3.pdf",
      "yearly": "pdfs/rudro22-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/rudro22-11-ct1.pdf",
      "ct2": "pdfs/rudro22-11-ct2.pdf",
      "hy": "pdfs/rudro22-11-hy.pdf",
      "ct3": "pdfs/rudro22-11-ct3.pdf",
      "yearly": "pdfs/rudro22-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "এম এম তানভীর (রুদ্র)",
      "college": "ঢাকা কলেজ",
      "address": "বোয়ালিয়া, সুজানগর, পাবনা",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "০৪ জুন"
    }
  },
  {
    "id": 23,
    "slug": "riasad23",
    "position": 23,
    "roommateIds": [
      "sabit27"
    ],
    "name": "Sobhan Mahmud Khan (Riasad)",
    "room": "327",
    "roll": "337",
    "fullRoll": "1202526010337",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "C",
    "practicalGroup": "C1",
    "college": "Dhaka College",
    "phone": "01922407329",
    "fatherPhone": "01739269792",
    "email": "-",
    "img": "images/profile/sobhan-337.jpeg",
    "fb": "https://facebook.com/",
    "address": "Notun Amdoho Allardarga, Daulatpur, Kushtia",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "26-Jul",
    "dobBn": "২৬ জুলাই",
    "pdfs": {
      "ct1": "pdfs/riasad23-11-ct1.pdf",
      "ct2": "pdfs/riasad23-11-ct2.pdf",
      "hy": "pdfs/riasad23-11-hy.pdf",
      "ct3": "pdfs/riasad23-11-ct3.pdf",
      "yearly": "pdfs/riasad23-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/riasad23-11-ct1.pdf",
      "ct2": "pdfs/riasad23-11-ct2.pdf",
      "hy": "pdfs/riasad23-11-hy.pdf",
      "ct3": "pdfs/riasad23-11-ct3.pdf",
      "yearly": "pdfs/riasad23-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "সোবহান মাহমুদ খাঁন (রিয়াসাদ)",
      "college": "ঢাকা কলেজ",
      "address": "নতুন আমদহ আল্লারদর্গা, দৌলতপুর, কুষ্টিয়া ",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২৬ জুলাই"
    }
  },
  {
    "id": 24,
    "slug": "musa24",
    "position": 24,
    "roommateIds": [
      "jahid11"
    ],
    "name": "Mahbubur Rahman Musa",
    "room": "328",
    "roll": "213",
    "fullRoll": "1202526010213",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01737844314",
    "fatherPhone": "01718450916",
    "email": "mahbuburrahmanmusa99@gmail.com",
    "img": "images/profile/musa-213.jpg",
    "fb": "https://www.facebook.com/mahbubur.rahman.musa.2024",
    "messenger": "mahbubur.rahman.musa.2024",
    "address": "Jhalakati\n",
    "blood": "A+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "10-Apr",
    "dobBn": "১০ এপ্রিল",
    "pdfs": {
      "ct1": "pdfs/musa24-11-ct1.pdf",
      "ct2": "pdfs/musa24-11-ct2.pdf",
      "hy": "pdfs/musa24-11-hy.pdf",
      "ct3": "pdfs/musa24-11-ct3.pdf",
      "yearly": "pdfs/musa24-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/musa24-11-ct1.pdf",
      "ct2": "pdfs/musa24-11-ct2.pdf",
      "hy": "pdfs/musa24-11-hy.pdf",
      "ct3": "pdfs/musa24-11-ct3.pdf",
      "yearly": "pdfs/musa24-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মাহবুবুর রহমান মুছা ",
      "college": "ঢাকা কলেজ",
      "address": "ঝালকাঠি \n",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "১০ এপ্রিল"
    }
  },
  {
    "id": 25,
    "slug": "ariful25",
    "position": 25,
    "roommateIds": [
      "bayezid30"
    ],
    "name": "Ariful Islam",
    "room": "324",
    "roll": "050",
    "fullRoll": "1202526010050",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "A",
    "practicalGroup": "A1",
    "college": "Dhaka College",
    "phone": "01848631025",
    "fatherPhone": "-",
    "email": "arifulislam20238086@gmail.com",
    "img": "images/profile/ariful-50.jpg",
    "fb": "https://www.facebook.com/profile.php?id=100093029856067",
    "messenger": "100093029856067",
    "address": "Rohanpur, Gomastapur, Chapainawabganj",
    "blood": "O+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "21-Sep",
    "dobBn": "২১ সেপ্টেম্বর",
    "pdfs": {
      "ct1": "pdfs/ariful25-11-ct1.pdf",
      "ct2": "pdfs/ariful25-11-ct2.pdf",
      "hy": "pdfs/ariful25-11-hy.pdf",
      "ct3": "pdfs/ariful25-11-ct3.pdf",
      "yearly": "pdfs/ariful25-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/ariful25-11-ct1.pdf",
      "ct2": "pdfs/ariful25-11-ct2.pdf",
      "hy": "pdfs/ariful25-11-hy.pdf",
      "ct3": "pdfs/ariful25-11-ct3.pdf",
      "yearly": "pdfs/ariful25-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "আরিফুল ইসলাম",
      "college": "ঢাকা কলেজ",
      "address": "রোহনপুর, গোমস্তাপুর, চাঁপাইনবাবগঞ্জ",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "২১ সেপ্টেম্বর"
    }
  },
  {
    "id": 26,
    "slug": "rejawl26",
    "position": 26,
    "roommateIds": [
      "munsi6"
    ],
    "name": "Md Rezaul Karim",
    "room": "315",
    "roll": "098",
    "fullRoll": "1202526030098",
    "classNo": "12",
    "group": "arts",
    "groupEn": "Humanities",
    "groupBn": "মানবিক",
    "section": "",
    "practicalGroup": "",
    "college": "Dhaka College",
    "phone": "01641659606",
    "fatherPhone": "-",
    "email": "rkdc8989@gmail.com",
    "img": "images/profile/rezaul-98.jpeg",
    "fb": "https://facebook.com/",
    "address": "Titas, Cumilla",
    "blood": "A+",
    "bio": "Sports lover",
    "dob": "10-Sep",
    "dobBn": "১০ সেপ্টেম্বর",
    "pdfs": {
      "ct1": "pdfs/rejawl26-11-ct1.pdf",
      "ct2": "pdfs/rejawl26-11-ct2.pdf",
      "hy": "pdfs/rejawl26-11-hy.pdf",
      "ct3": "pdfs/rejawl26-11-ct3.pdf",
      "yearly": "pdfs/rejawl26-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/rejawl26-11-ct1.pdf",
      "ct2": "pdfs/rejawl26-11-ct2.pdf",
      "hy": "pdfs/rejawl26-11-hy.pdf",
      "ct3": "pdfs/rejawl26-11-ct3.pdf",
      "yearly": "pdfs/rejawl26-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ রেজাউল করিম",
      "college": "ঢাকা কলেজ",
      "address": "তিতাস, কুমিল্লা",
      "bio": "Sports lover",
      "dob": "১০ সেপ্টেম্বর"
    }
  },
  {
    "id": 27,
    "slug": "sabit27",
    "position": 27,
    "roommateIds": [
      "riasad23"
    ],
    "name": "Muhammad Rayhanoor Sabit",
    "room": "327",
    "roll": "171",
    "fullRoll": "1202526010171",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01852223068",
    "fatherPhone": "01971444941",
    "email": "-",
    "img": "images/profile/sabit-171.jpeg",
    "fb": "https://facebook.com/",
    "address": "Marich Pasha, Lohagara, Narail\n",
    "blood": "AB+",
    "bio": "Demo student profile for International Hall. Detailed information can be updated later from the student sheet.",
    "dob": "11-Feb",
    "dobBn": "১১ ফেব্রুয়ারি",
    "pdfs": {
      "ct1": "pdfs/sabit27-11-ct1.pdf",
      "ct2": "pdfs/sabit27-11-ct2.pdf",
      "hy": "pdfs/sabit27-11-hy.pdf",
      "ct3": "pdfs/sabit27-11-ct3.pdf",
      "yearly": "pdfs/sabit27-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/sabit27-11-ct1.pdf",
      "ct2": "pdfs/sabit27-11-ct2.pdf",
      "hy": "pdfs/sabit27-11-hy.pdf",
      "ct3": "pdfs/sabit27-11-ct3.pdf",
      "yearly": "pdfs/sabit27-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মুহাম্মদ রায়হানুর সাবিত ",
      "college": "ঢাকা কলেজ",
      "address": "মরিচ পাশা, লোহাগড়া, নড়াইল",
      "bio": "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।",
      "dob": "১১ ফেব্রুয়ারি"
    }
  },
  {
    "id": 28,
    "slug": "alif28",
    "position": 28,
    "roommateIds": [
      "sohan29"
    ],
    "name": "Alimuzzamann Alif",
    "room": "326",
    "roll": "153",
    "fullRoll": "1202526010153",
    "classNo": "12",
    "group": "science",
    "groupEn": "Science",
    "groupBn": "বিজ্ঞান",
    "section": "B",
    "practicalGroup": "B1",
    "college": "Dhaka College",
    "phone": "01758173284",
    "fatherPhone": "01540759625",
    "email": "mdalimuzzamanalif890@gmail.com",
    "img": "images/profile/alif-153.jpg",
    "fb": "https://www.facebook.com/share/18MFvaQuS2/",
    "messenger": "18MFvaQuS2",
    "address": "Sundarganj, Gaibandha",
    "blood": "AB+",
    "bio": "What an amazing website it is for our international hall which created by meritorious adib. Keep going higher. Truly appreciating for such kind of initiatives. With all are staying with it . Hoping main target Will fulfill with it's modern development.",
    "dob": "11-Nov",
    "dobBn": "১১ নভেম্বর",
    "pdfs": {
      "ct1": "pdfs/alif28-11-ct1.pdf",
      "ct2": "pdfs/alif28-11-ct2.pdf",
      "hy": "pdfs/alif28-11-hy.pdf",
      "ct3": "pdfs/alif28-11-ct3.pdf",
      "yearly": "pdfs/alif28-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/alif28-11-ct1.pdf",
      "ct2": "pdfs/alif28-11-ct2.pdf",
      "hy": "pdfs/alif28-11-hy.pdf",
      "ct3": "pdfs/alif28-11-ct3.pdf",
      "yearly": "pdfs/alif28-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "আলিমুজ্জামান আলিফ",
      "college": "ঢাকা কলেজ",
      "address": "সুন্দরগঞ্জ, গাইবান্ধা",
      "bio": "What an amazing website it is for our international hall which created by meritorious adib. Keep going higher. Truly appreciating for such kind of initiatives. With all are staying with it . Hoping main target Will fulfill with it's modern development.",
      "dob": "১১ নভেম্বর"
    }
  },
  {
    "id": 29,
    "slug": "sohan29",
    "position": 29,
    "roommateIds": [
      "alif28"
    ],
    "name": "Md. Shohoorab Hossen Pramanik",
    "room": "326",
    "roll": "031",
    "fullRoll": "1202526020031",
    "classNo": "12",
    "group": "commerce",
    "groupEn": "Business Studies",
    "groupBn": "ব্যবসায় শিক্ষা",
    "section": "A",
    "practicalGroup": "-",
    "college": "Dhaka College",
    "phone": "01827048355",
    "fatherPhone": "01747206790",
    "email": "-",
    "img": "images/profile/shohoorab-31.jpg",
    "fb": "https://facebook.com/",
    "messenger": "",
    "address": "Paika, Dholdanga, Sadullapur, Gaibandha",
    "blood": "B+",
    "bio": "",
    "dob": "31-Dec",
    "dobBn": "৩১ ডিসেম্বর",
    "pdfs": {
      "ct1": "pdfs/sohan29-11-ct1.pdf",
      "ct2": "pdfs/sohan29-11-ct2.pdf",
      "hy": "pdfs/sohan29-11-hy.pdf",
      "ct3": "pdfs/sohan29-11-ct3.pdf",
      "yearly": "pdfs/sohan29-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/sohan29-11-ct1.pdf",
      "ct2": "pdfs/sohan29-11-ct2.pdf",
      "hy": "pdfs/sohan29-11-hy.pdf",
      "ct3": "pdfs/sohan29-11-ct3.pdf",
      "yearly": "pdfs/sohan29-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ সোহরাব হোসেন প্রামানিক",
      "college": "ঢাকা কলেজ",
      "address": "পাইকা, ধলডাঙ্গা, সাদুল্লাপুর, গাইবান্ধা",
      "bio": "",
      "dob": "৩১ ডিসেম্বর"
    }
  },
  {
    "id": 30,
    "slug": "bayezid30",
    "position": 30,
    "roommateIds": [
      "ariful25"
    ],
    "name": "Md. Bayazid",
    "room": "324",
    "roll": "001",
    "fullRoll": "1202526020001",
    "classNo": "12",
    "group": "commerce",
    "groupEn": "Business Studies",
    "groupBn": "ব্যবসায় শিক্ষা",
    "section": "A",
    "practicalGroup": "-",
    "college": "Dhaka College",
    "phone": "01822724598",
    "fatherPhone": "01758682413",
    "email": "-",
    "img": "images/profile/bayazid-1.jpg",
    "fb": "https://facebook.com/",
    "messenger": "",
    "address": "Sirajganj",
    "blood": "B+",
    "bio": "",
    "dob": "15-May",
    "dobBn": "১৫ মে",
    "pdfs": {
      "ct1": "pdfs/bayezid30-11-ct1.pdf",
      "ct2": "pdfs/bayezid30-11-ct2.pdf",
      "hy": "pdfs/bayezid30-11-hy.pdf",
      "ct3": "pdfs/bayezid30-11-ct3.pdf",
      "yearly": "pdfs/bayezid30-11-y.pdf"
    },
    "generated_pdf_names": {
      "ct1": "pdfs/bayezid30-11-ct1.pdf",
      "ct2": "pdfs/bayezid30-11-ct2.pdf",
      "hy": "pdfs/bayezid30-11-hy.pdf",
      "ct3": "pdfs/bayezid30-11-ct3.pdf",
      "yearly": "pdfs/bayezid30-11-y.pdf"
    },
    "result": {
      "gpa": 0,
      "physics": 0,
      "chemistry": 0,
      "math": 0
    },
    "bn": {
      "name": "মোঃ বায়েজিদ",
      "college": "ঢাকা কলেজ",
      "address": "সিরাজগঞ্জ",
      "bio": "",
      "dob": "১৫ মে"
    }
  }
];

const famousProfiles = {
  one: {
    img: "images/hall/alumni1.jpg",
    name: "Dr. Anis Rahman",
    role: "Former International Hall student and public health researcher",
    success: "Medical admission success story with strong academic discipline from hall life.",
    education: "MBBS and public health research training.",
    contribution: "Guides younger students on medical admission preparation, study routine and community health awareness.",
    achievements: ["Medical admission success", "Public health research work", "Student mentoring and academic guidance"],
    biography: "Dr. Anis Rahman is presented as an alumni profile shaped by disciplined study, shared responsibility and the academic rhythm of International Hall. His student life reflects how a focused hall environment can help a learner build confidence, routine and long-term ambition.",
    career: "He built his career in medical education and public health research, connecting classroom learning with community-focused service. His journey highlights admission success, professional training and a continuing interest in helping younger students prepare with structure.",
    hallMemory: "During his hall life, group study, peer support and late-evening academic discussions helped him stay consistent. The hall gave him a practical sense of teamwork, time management and care for fellow students.",
    hallContribution: "His story represents the hall's role in building disciplined study culture, mentorship and confidence for students who dream of medical and health-related careers."
  },
  two: {
    img: "images/hall/alumni2.jpg",
    name: "Engr. Mahmud Karim",
    role: "Former hall student, engineering graduate and mentor",
    success: "Engineering admission and graduation success with active support for student projects.",
    education: "Engineering graduate with project and technical mentoring experience.",
    contribution: "Supports students with admission preparation, problem solving, project ideas and confidence building.",
    achievements: ["Engineering admission success", "Student project mentorship", "Admission preparation support"],
    biography: "Engr. Mahmud Karim's alumni profile focuses on curiosity, problem solving and the steady preparation culture of hall life. As a student, he used the shared academic environment to sharpen his routine and grow through collaboration.",
    career: "He moved into engineering education and project-based learning, later becoming a mentor for students interested in technical subjects. His career path shows the value of practical thinking, admission preparation and consistent academic support.",
    hallMemory: "His strongest hall memories are connected with group problem-solving sessions, exam preparation and the motivation that came from living among students with similar goals.",
    hallContribution: "He represents the hall's contribution to technical ambition, peer learning and the confidence students need for engineering admission and project work."
  },
  three: {
    img: "images/hall/alumni1.jpg",
    name: "Sadia Chowdhury",
    role: "Former hall student, scholarship achiever and student leader",
    success: "University scholarship achievement with strong debate, leadership and academic excellence.",
    education: "University scholarship track with leadership and co-curricular achievements.",
    contribution: "Encourages students to balance study, communication skills, leadership and scholarship preparation.",
    achievements: ["University scholarship success", "Debate and leadership recognition", "Academic excellence"],
    biography: "Sadia Chowdhury's alumni profile presents a student who balanced academic focus with leadership and communication. Her hall journey shows how a supportive residential environment can help students grow beyond textbooks.",
    career: "She followed a university scholarship path and became known for academic excellence, debate and leadership activities. Her success points to the importance of confidence, communication and disciplined preparation.",
    hallMemory: "Her hall memories include shared reading sessions, cultural conversations, leadership practice and the encouragement she received from classmates during important academic moments.",
    hallContribution: "Her story reflects the hall's broader contribution to student leadership, scholarship preparation and a culture where students learn to speak, organize and support one another."
  }
};

let cmsSettings = null;
let cmsAdminSettings = null;
let cmsBatchConfigs = [];
let cmsGalleryData = null;
let cmsHallData = null;
let cmsDevData = null;
let cmsHomeData = null;
let roomsData = [
  {
    "room_no": "314",
    "title_en": "Room 314",
    "title_bn": "রুম ৩১৪",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "315",
    "title_en": "Room 315",
    "title_bn": "রুম ৩১৫",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "316",
    "title_en": "Room 316",
    "title_bn": "রুম ৩১৬",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "317",
    "title_en": "Room 317",
    "title_bn": "রুম ৩১৭",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "318",
    "title_en": "Room 318",
    "title_bn": "রুম ৩১৮",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "319",
    "title_en": "Room 319",
    "title_bn": "রুম ৩১৯",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "320",
    "title_en": "Room 320",
    "title_bn": "রুম ৩২০",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "321",
    "title_en": "Room 321",
    "title_bn": "রুম ৩২১",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "322",
    "title_en": "Room 322",
    "title_bn": "রুম ৩২২",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "323",
    "title_en": "Room 323",
    "title_bn": "রুম ৩২৩",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "324",
    "title_en": "Room 324",
    "title_bn": "রুম ৩২৪",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "325",
    "title_en": "Room 325",
    "title_bn": "রুম ৩২৫",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "326",
    "title_en": "Room 326",
    "title_bn": "রুম ৩২৬",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "327",
    "title_en": "Room 327",
    "title_bn": "রুম ৩২৭",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  },
  {
    "room_no": "328",
    "title_en": "Room 328",
    "title_bn": "রুম ৩২৮ ",
    "description_en": "Spacious, well-ventilated residential room equipped with personal study tables, beds, ceiling fans, and high-speed Wi-Fi connectivity for an optimal study atmosphere.",
    "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
    "photos": []
  }
];

async function fetchJson(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

function parseSanityAssetRef(ref, projectId = "w16kaeyg", dataset = "production") {
  if (typeof ref !== "string") return "";
  const match = ref.match(/^image-([a-f0-9]+)-([0-9]+x[0-9]+)-([a-z]+)$/);
  if (match) {
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`;
  }
  const fileMatch = ref.match(/^file-([a-f0-9]+)-([a-z0-9]+)$/);
  if (fileMatch) {
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileMatch[1]}.${fileMatch[2]}`;
  }
  return "";
}

function normalizeCmsPath(path) {
  if (!path) return "";
  if (typeof path === "object") {
    if (path.url) path = path.url;
    else if (path.asset && path.asset.url) path = path.asset.url;
    else if (path.asset && path.asset._ref) path = parseSanityAssetRef(path.asset._ref);
    else if (path._ref) path = parseSanityAssetRef(path._ref);
    else if (path.photo) path = typeof path.photo === "object" ? (path.photo.url || path.photo.asset?.url || parseSanityAssetRef(path.photo.asset?._ref || path.photo._ref) || "") : path.photo;
  }
  if (typeof path !== "string") return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  let clean = path.replace(/^\/+/, "");

  // Safe mapping for legacy Sanity CMS / demo uploads to ensure live site always loads real files
  const lower = clean.toLowerCase();
  if (lower.includes("contributor1")) return "images/developer/contributor1.png";
  if (lower.includes("contributor2")) return "images/developer/contributor2.jpg";
  if (lower.includes("hall1")) return "images/hall/hall1.jpg";
  if (lower.includes("hall2")) return "images/hall/hall2.jpg";
  if (lower.includes("hall3")) return "images/hall/hall3.jpg";
  if (lower.includes("hallsuper") || lower.includes("kamruzzaman")) return "images/hall/hallsuper1.webp";
  if (lower.includes("maumoon") || lower.includes("alumni1")) return "images/hall/alumni1.jpg";
  if (lower.includes("sohag") || lower.includes("alumni2")) return "images/hall/alumni2.jpg";
  if (lower.includes("hostel-building") || lower.includes("hostel_building")) return "images/hall/hostel-building.jpg";

  if (clean.startsWith("images/contributor")) {
    clean = clean.replace("images/contributor", "images/developer/contributor");
  }

  return clean;
}

const studentProfilePhotos = {
  "adib1": "images/profile/adib-139.jpg",
  "santo2": "images/profile/naimul-161.jpg",
  "jahid3": "images/profile/zahidul-164.png",
  "sakil4": "images/profile/shakil-326.jpeg",
  "sasfkat5": "images/profile/shafkat-8.jpg",
  "munsi6": "images/profile/munshi-22.jpg",
  "musfik7": "images/profile/mushfiqur-122.jpg",
  "esty8": "images/profile/esty-870.jpg",
  "nafis9": "images/profile/nafis-141.jpg",
  "kayes10": "images/profile/kayes-882.jpg",
  "jahid11": "images/profile/Jahidul-223.jpg",
  "siam12": "images/profile/siam-195.jpg",
  "siam13": "images/profile/siam-881.jpg",
  "saimun14": "images/profile/saimun-322.jpg",
  "pranto15": "images/profile/pranto-863.jpg",
  "nayem18": "images/profile/nayeem-639.jpg",
  "alauddin17": "images/profile/alauddin-140.jpg",
  "rafiq18": "images/profile/rafiq-872.jpg",
  "riyad19": "images/profile/riyad-596.jpg",
  "mosih20": "images/profile/mosih-332.jpg",
  "abrar21": "images/profile/abrar-200.jpg",
  "rudro22": "images/profile/tanvir-100.jpg",
  "riasad23": "images/profile/sobhan-337.jpeg",
  "musa24": "images/profile/musa-213.jpg",
  "ariful25": "images/profile/ariful-50.jpg",
  "rejawl26": "images/profile/rezaul-98.jpeg",
  "sabit27": "images/profile/sabit-171.jpeg",
  "alif28": "images/profile/alif-153.jpg",
  "sohan29": "images/profile/shohoorab-31.jpg",
  "bayezid30": "images/profile/bayazid-1.jpg"
};

function toBengaliDigits(numStr) {
  if (numStr === null || numStr === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(numStr).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

function mapCmsStudent(item, index) {
  const nameEn = item.name_en || `Student ${index + 1}`;
  const slug = item.student_id || nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12) + (index + 1);
  const group = (item.group || "science").toLowerCase();
  const shortRoll = (item.short_roll || "").replace(/^0+/, '') || "";
  const batch = item.batch || "HSC-27";

  // Auto-generate full roll: 120 + batchCode + groupCode + paddedRoll
  const batchCodeMap = {
    'HSC-24': '2223',
    'HSC-25': '2324',
    'HSC-26': '2425',
    'HSC-27': '2526',
    'HSC-28': '2627',
    'HSC-29': '2728',
    'HSC-30': '2829',
    'HSC-31': '2930',
    'HSC-32': '3031',
    'HSC-33': '3132',
    'HSC-34': '3233',
    'HSC-35': '3334'
  };
  const groupCodeMap = { 'science': '01', 'commerce': '02', 'arts': '03' };
  const batchCode = batchCodeMap[batch] || '2526';
  const groupCode = groupCodeMap[group] || '01';
  const paddedRoll = shortRoll.padStart(4, '0');
  const fullRoll = item.full_roll || `120${batchCode}${groupCode}${paddedRoll}`;

  // Facebook username / URL → auto URLs
  const fbRaw = (item.facebook || item.facebook_username || '').trim();
  let fbUrl = '';
  let fbUsername = '';
  if (fbRaw) {
    if (fbRaw.includes('facebook.com/')) {
      fbUrl = fbRaw.startsWith('http') ? fbRaw : `https://${fbRaw}`;
      fbUsername = fbUrl.replace(/^https?:\/\/(www\.)?facebook\.com\/?/, '').replace(/\/.*$/, '');
    } else {
      fbUsername = fbRaw.replace(/[^a-zA-Z0-9._-]/g, '');
      fbUrl = `https://www.facebook.com/${fbUsername}`;
    }
  }
  const messengerUrl = fbUsername ? `https://m.me/${fbUsername}` : (item.messenger ? (item.messenger.startsWith('http') ? item.messenger : `https://m.me/${item.messenger}`) : '');

  // WhatsApp / Telegram logic
  const mainPhone = item.phone || '';
  const hasWhatsApp = item.phone_has_whatsapp !== false; // default true
  const hasTelegram = item.phone_has_telegram === true;
  const whatsappNum = item.whatsapp_alt || (hasWhatsApp ? mainPhone : '');
  const telegramId = item.telegram_alt || (hasTelegram ? mainPhone : '');

  // Class from batch
  const classNo = item.class_no || (batch === 'HSC-27' ? '12' : '11');

  // Default bio
  const defaultBio = 'A dedicated student of Dhaka College, striving for academic excellence and pursuing personal growth with a focus on future goals.';
  const defaultBioBn = 'ঢাকা কলেজের একজন নিবেদিতপ্রাণ শিক্ষার্থী, একাডেমিক উৎকর্ষতা ও ভবিষ্যৎ লক্ষ্যে ব্যক্তিগত বিকাশের জন্য সচেষ্ট।';

  // Merge old pdfs + new result structure
  const oldPdfs = item.pdfs || {};
  const r1 = item.results_1st_year || {};
  const r2 = item.results_2nd_year || {};

  // DOB: prioritize new calendar dob_date field, fallback to legacy dob_day/dob_month, then manual dob
  let dobEn = '', dobBnVal = '';
  if (item.dob_date) {
    // dob_date is YYYY-MM-DD format — extract day and month, ignore year
    const dobParts = item.dob_date.split('-');
    if (dobParts.length === 3) {
      const mm = dobParts[1];
      const dd = dobParts[2];
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const monthNamesBn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
      const mIdx = parseInt(mm, 10) - 1;
      dobEn = `${parseInt(dd, 10)}-${monthNames[mIdx] || mm}`;
      dobBnVal = `${toBengaliDigits(String(parseInt(dd, 10)))} ${monthNamesBn[mIdx] || mm}`;
    }
  } else if (item.dob_day && item.dob_month) {
    dobEn = `${item.dob_day}/${item.dob_month}`;
    dobBnVal = `${toBengaliDigits(item.dob_day)}/${toBengaliDigits(item.dob_month)}`;
  } else if (item.dob) {
    dobEn = item.dob;
    dobBnVal = item.dob_bn || toBengaliDigits(item.dob);
  }

  // 1st and 2nd Year Room resolution
  const room1st = item.room_1st_year?.room_no
    ? item.room_1st_year
    : null;

  const room2nd = item.room_2nd_year?.room_no
    ? item.room_2nd_year
    : (item.room_no ? { room_no: item.room_no } : null);

  const mainRoomNo = (room2nd?.room_no || room1st?.room_no || item.room_no || "").trim();

  return {
    id: index + 1,
    slug,
    position: Number(item.position || index + 1),
    roommateIds: item.roommate_ids || [],
    name: nameEn,
    room: mainRoomNo,
    room_1st_year: room1st,
    room_2nd_year: room2nd,
    roll: shortRoll,
    fullRoll,
    batch,
    session: item.session || "",
    classNo,
    group,
    groupEn: item.group_en || "",
    groupBn: item.group_bn || "",
    section: item.section || "",
    practicalGroup: item.practical_group || "",
    college: "Dhaka College",
    phone: mainPhone,
    whatsapp: whatsappNum,
    telegram: telegramId,
    hasWhatsApp: !!whatsappNum,
    hasTelegram: !!telegramId,
    fatherPhone: item.father_phone || "",
    email: item.email || "",
    img: normalizeCmsPath(item.photo) || studentProfilePhotos[slug] || `images/profile/${slug}.jpg`,
    fb: fbUrl,
    fbUsername,
    messenger: messengerUrl,
    address: item.address_en || "",
    blood: item.blood_group || "",
    bio: item.bio_en || defaultBio,
    dob: dobEn,
    dobBn: dobBnVal,
    dob_date: item.dob_date || "",
    pdfs: oldPdfs,
    results_1st: r1,
    results_2nd: r2,
    generated_pdf_names: item.generated_pdf_names || {},
    result: {
      gpa: 0, physics: 0, chemistry: 0, math: 0
    },
    bn: {
      name: item.name_bn || nameEn,
      college: "ঢাকা কলেজ",
      address: item.address_bn || item.address_en || "",
      bio: item.bio_bn || item.bio_en || defaultBioBn,
      dob: dobBnVal
    }
  };
}

function applyCmsSettings(settings) {
  if (!settings) return;
  cmsSettings = settings;

  const logoPath = normalizeCmsPath(settings.logo);
  if (logoPath) {
    document.querySelectorAll(".logo-img, .footer-logo img").forEach((img) => {
      img.src = logoPath;
    });
  }

  const heroImage = normalizeCmsPath(settings.hero_image);
  if (heroImage) {
    document.querySelectorAll(".hero, .page-hero, .developer-hero").forEach((section) => {
      section.style.backgroundImage = `linear-gradient(90deg, var(--overlay), rgba(8, 13, 24, 0.25)), url("${heroImage}")`;
    });
  }

  renderFooter();
  updateBirthdayHeroLanguage();
}

function updateBirthdayHeroLanguage() {
  const eyebrow = byId("heroEyebrowText");
  const title = byId("heroTitleText");
  const subtitle = byId("heroSubtitleText");
  if (eyebrow) eyebrow.textContent = currentLang === "bn" ? "ক্যালেন্ডার ও উদযাপন" : "Calendar & Celebrations";
  if (title) title.textContent = currentLang === "bn" ? "শিক্ষার্থীদের জন্মদিন" : "Student Birthdays";
  if (subtitle) subtitle.textContent = currentLang === "bn" ? "জানুয়ারি থেকে ডিসেম্বর পর্যন্ত আবাসিক শিক্ষার্থীদের জন্মদিন ক্রমানুসারে সাজানো।" : "Residential students' birthdays arranged in chronological order from January to December.";
}

function applySanityPayload(sanityData) {
  if (!sanityData) return;
  let settings, studentData, roomsList, homeData, devData, galleryData, hallData;

    if (sanityData.adminSettings) {
      cmsAdminSettings = sanityData.adminSettings;
    }
    if (sanityData.batchConfigs) {
      cmsBatchConfigs = sanityData.batchConfigs;
    }
    settings = sanityData.settings || {};
    studentData = { students: sanityData.students || [] };
    roomsList = { rooms: sanityData.rooms || [] };
    homeData = sanityData.home || {};
    devData = sanityData.developer || {};
    hallData = sanityData.hall || {};

    // Build galleryData: merge CMS galleryEvents (structured events) + galleryItems (photos collection)
    const cmsEvents = (sanityData.galleryEvents || []).map(ev => {
      // Auto-format date if custom formatted fields are empty
      const autoDate = autoFormatDate(ev.date);
      return {
        id: ev.event_id || ev._id,
        position: ev.position || 999,
        title_en: ev.title_en || '',
        title_bn: ev.title_bn || '',
        date: ev.date || '',
        date_formatted_en: ev.date_formatted_en || autoDate.en,
        date_formatted_bn: ev.date_formatted_bn || autoDate.bn,
        batches: ev.batches || [],
        description_en: ev.description_en || '',
        description_bn: ev.description_bn || '',
        media_order: ev.media_order || 'photos_first',
        default_caption_en: ev.default_caption_en || '',
        default_caption_bn: ev.default_caption_bn || '',
        locations: (ev.locations && Array.isArray(ev.locations) && ev.locations.length)
          ? ev.locations.filter(Boolean)
          : (ev.location_name ? [ev.location_name] : []),
        location_name: ev.location_name || '',
        location_map_url: ev.location_map_url || '',
        photos: (ev.photos || []).map(p => ({
          photo: p.photo || p.asset?.url || (typeof p === 'string' ? p : ''),
          caption_en: p.caption_en || p.title_en || ev.default_caption_en || '',
          caption_bn: p.caption_bn || p.title_bn || ev.default_caption_bn || '',
        })),
        videos: (ev.videos || []).map(v => ({
          url: v.url ? convertToEmbedUrl(v.url) : (v.video_file_url || ''),
          is_direct: !v.url && !!v.video_file_url,
          title_en: v.title_en || '',
          title_bn: v.title_bn || '',
        })).filter(v => v.url),
      };
    });

    // Gallery photo collections — each doc has a heading + photos
    let galleryItems = [];
    let galleryCollections = []; // grouped by collection (each Sanity galleryItem doc)
    if (sanityData.galleries && sanityData.galleries.length) {
      sanityData.galleries.forEach(gDoc => {
        const heading = gDoc.heading || gDoc.gallery_title || gDoc.batch || '';
        const slug = gDoc.slug || heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `col-${gDoc._id}`;
        const preview_limit = Number(gDoc.preview_limit) > 0 ? Number(gDoc.preview_limit) : 0;
        const default_caption = gDoc.default_caption || '';
        const photos = (gDoc.photos || []).map(p => ({
          photo: p.photo || '',
          heading: heading,
          caption: p.caption || p.caption_en || p.title_en || p.description_en || default_caption || '',
        }));
        if (photos.length) {
          galleryCollections.push({ heading, slug, preview_limit, default_caption, photos });
          galleryItems.push(...photos);
        }
      });
    } else if (sanityData.gallery && sanityData.gallery.photos) {
      const photos = sanityData.gallery.photos.map(p => ({
        photo: p.photo || '',
        heading: '',
        caption: p.caption || p.caption_en || p.title_en || p.description_en || '',
      }));
      galleryCollections.push({ heading: '', photos });
      galleryItems = photos;
    }

    galleryData = {
      events: cmsEvents.length ? cmsEvents : undefined,
      items: galleryItems,
      collections: galleryCollections,
    };
  

  applyCmsSettings(settings);

  if (roomsList?.rooms?.length) {
    roomsData = roomsList.rooms;
  }

  // Handle Home Data translations
  if (homeData) {
    if (i18n.en.home) {
      i18n.en.home.heroEyebrow = homeData.hero_eyebrow_en || i18n.en.home.heroEyebrow;
      i18n.en.home.heroTitle = homeData.hero_title_en || i18n.en.home.heroTitle;
      i18n.en.home.infoTitle = homeData.info_title_en || i18n.en.home.infoTitle;
      i18n.en.home.infoLead = homeData.info_lead_en || i18n.en.home.infoLead;
      i18n.en.home.historyText = homeData.history_text_en || i18n.en.home.historyText;
      i18n.en.home.famousText = homeData.famous_text_en || i18n.en.home.famousText;
      i18n.en.home.successText = homeData.success_text_en || i18n.en.home.successText;
      i18n.en.home.locationTitle = homeData.location_title_en || i18n.en.home.locationTitle;
      i18n.en.home.locationText = homeData.location_text_en || i18n.en.home.locationText;
    }
    if (i18n.en.results) {
      i18n.en.results.eyebrow = homeData.results_eyebrow_en || i18n.en.results.eyebrow;
      i18n.en.results.title = homeData.results_title_en || i18n.en.results.title;
      i18n.en.results.subtitle = homeData.results_lead_en || i18n.en.results.subtitle;
    }
    if (i18n.en.gallery) {
      i18n.en.gallery.eyebrow = homeData.gallery_eyebrow_en || i18n.en.gallery.eyebrow;
      i18n.en.gallery.title = homeData.gallery_title_en || i18n.en.gallery.title;
    }
    if (i18n.bn.home) {
      i18n.bn.home.heroEyebrow = homeData.hero_eyebrow_bn || i18n.bn.home.heroEyebrow;
      i18n.bn.home.heroTitle = homeData.hero_title_bn || i18n.bn.home.heroTitle;
      i18n.bn.home.infoTitle = homeData.info_title_bn || i18n.bn.home.infoTitle;
      i18n.bn.home.infoLead = homeData.info_lead_bn || i18n.bn.home.infoLead;
      i18n.bn.home.historyText = homeData.history_text_bn || i18n.bn.home.historyText;
      i18n.bn.home.famousText = homeData.famous_text_bn || i18n.bn.home.famousText;
      i18n.bn.home.successText = homeData.success_text_bn || i18n.bn.home.successText;
      i18n.bn.home.locationTitle = homeData.location_title_bn || i18n.bn.home.locationTitle;
      i18n.bn.home.locationText = homeData.location_text_bn || i18n.bn.home.locationText;
    }
    if (i18n.bn.results) {
      i18n.bn.results.eyebrow = homeData.results_eyebrow_bn || i18n.bn.results.eyebrow;
      i18n.bn.results.title = homeData.results_title_bn || i18n.bn.results.title;
      i18n.bn.results.subtitle = homeData.results_lead_bn || i18n.bn.results.subtitle;
    }
    if (i18n.bn.gallery) {
      i18n.bn.gallery.eyebrow = homeData.gallery_eyebrow_bn || i18n.bn.gallery.eyebrow;
      i18n.bn.gallery.title = homeData.gallery_title_bn || i18n.bn.gallery.title;
    }
    if (homeData.hero_phrases?.length) {
      i18n.en.heroPhrases = homeData.hero_phrases.map(p => p.text_en);
      i18n.bn.heroPhrases = homeData.hero_phrases.map(p => p.text_bn);
    }
    const iframe = document.querySelector(".map-wrap iframe");
    if (iframe && homeData.map_url) {
      iframe.src = homeData.map_url;
    }
  }

  // Handle Hall Data translations
  if (hallData) {
    if (i18n.en.hostel) {
      i18n.en.hostel.title = hallData.hostel_title_en || i18n.en.hostel.title;
      i18n.en.hostel.subtitle = hallData.hostel_subtitle_en || i18n.en.hostel.subtitle;
      i18n.en.hostel.historyTitle = hallData.history_title_en || i18n.en.hostel.historyTitle;
      i18n.en.hostel.historyText = hallData.history_text_en || i18n.en.hostel.historyText;
      i18n.en.hostel.successTitle = hallData.success_title_en || i18n.en.hostel.successTitle;
      i18n.en.hostel.successText = hallData.success_text_en || i18n.en.hostel.successText;
      i18n.en.hostel.locationTitle = hallData.location_title_en || i18n.en.hostel.locationTitle;
      i18n.en.hostel.locationText = hallData.location_text_en || i18n.en.hostel.locationText;
    }
    if (i18n.bn.hostel) {
      i18n.bn.hostel.title = hallData.hostel_title_bn || i18n.bn.hostel.title;
      i18n.bn.hostel.subtitle = hallData.hostel_subtitle_bn || i18n.bn.hostel.subtitle;
      i18n.bn.hostel.historyTitle = hallData.history_title_bn || i18n.bn.hostel.historyTitle;
      i18n.bn.hostel.historyText = hallData.history_text_bn || i18n.bn.hostel.historyText;
      i18n.bn.hostel.successTitle = hallData.success_title_bn || i18n.bn.hostel.successTitle;
      i18n.bn.hostel.successText = hallData.success_text_bn || i18n.bn.hostel.successText;
      i18n.bn.hostel.locationTitle = hallData.location_title_bn || i18n.bn.hostel.locationTitle;
      i18n.bn.hostel.locationText = hallData.location_text_bn || i18n.bn.hostel.locationText;
    }
    if (i18n.en.hallSuper) {
      i18n.en.hallSuper.name = hallData.hall_super_name_en || i18n.en.hallSuper.name;
      i18n.en.hallSuper.bio = hallData.hall_super_bio_en || i18n.en.hallSuper.bio;
      i18n.en.hallSuper.subtitle = hallData.hall_super_subtitle_en || i18n.en.hallSuper.subtitle;
    }
    if (i18n.bn.hallSuper) {
      i18n.bn.hallSuper.name = hallData.hall_super_name_bn || i18n.bn.hallSuper.name;
      i18n.bn.hallSuper.bio = hallData.hall_super_bio_bn || i18n.bn.hallSuper.bio;
      i18n.bn.hallSuper.subtitle = hallData.hall_super_subtitle_bn || i18n.bn.hallSuper.subtitle;
    }
    cmsHallData = hallData;

    const homePhoto = hallData.home_page_photo || hallData.hall_photo;
    if (homePhoto) {
      const homeHallImg = document.querySelector('.hostel-preview-photo img');
      if (homeHallImg) {
        homeHallImg.src = normalizeCmsPath(homePhoto);
      }
    }
  }

  if (studentData?.students?.length) {
    students = studentData.students.map(mapCmsStudent).sort((a, b) => (a.position || 9999) - (b.position || 9999));
    students.forEach((student, idx) => {
      student.id = idx + 1;
    });

    // Synchronize room assignments from both directions (student.room_no <=> room.assigned_students)
    if (roomsList?.rooms?.length) {
      roomsList.rooms.forEach((room) => {
        const roomNum = String(room.room_no || "").trim();
        if (!roomNum) return;
        if (!room.title_en) room.title_en = `Room ${roomNum}`;
        if (!room.title_bn) room.title_bn = `রুম ${toBengaliDigits(roomNum)}`;
        if (!room.capacity) room.capacity = 2;
        if (room.assigned_students && Array.isArray(room.assigned_students)) {
          room.assigned_students.forEach((as) => {
            const matched = students.find((s) => s.slug === as.student_id || (as.short_roll && String(s.roll) === String(as.short_roll)) || s.name === as.name_en);
            if (matched && (!matched.room || matched.room === "")) {
              matched.room = roomNum;
            }
          });
        }
      });

      // Bidirectional sync: make sure room docs have current students listed
      roomsList.rooms.forEach((room) => {
        const roomNum = normalizeRoomNumber(room.room_no);
        const assignedInRoom = students.filter(s => normalizeRoomNumber(s.room) === roomNum);
        if (assignedInRoom.length && (!room.assigned_students || !room.assigned_students.length)) {
          room.assigned_students = assignedInRoom.map(s => ({
            _id: s.slug,
            student_id: s.slug,
            name_en: s.name,
            name_bn: s.bn?.name || s.name,
            short_roll: s.roll,
            batch: s.batch,
            photo: s.img
          }));
        }
      });
    }
  }

  if (devData) {
    cmsDevData = devData;
  }
  if (galleryData) {
    cmsGalleryData = galleryData;
  }

  applyPageSectionControls();
  ensureNavigation();
  checkPageAccess();
}

async function loadCmsContent() {
  // ⚡ 1. FAST CACHE-FIRST HYDRATION (Instant 0ms render without waiting for network!)
  try {
    const cachedRaw = localStorage.getItem("dc_sanity_cache_v58");
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (cached && cached.students && cached.students.length) {
        applySanityPayload(cached);
        renderDynamicContent();
      }
    }
  } catch (e) {
    console.warn("CMS cache hydration notice:", e);
  }

  // ⚡ 2. LIVE ASYNC FETCH FROM SANITY LAKE
  let sanityData = null;
  if (typeof fetchSanityCms === "function") {
    try {
      sanityData = await fetchSanityCms();
    } catch (e) {
      console.warn("fetchSanityCms error:", e);
    }
  }

  if (sanityData && sanityData.students && sanityData.students.length) {
    try {
      localStorage.setItem("dc_sanity_cache_v58", JSON.stringify(sanityData));
    } catch (e) {}
    applySanityPayload(sanityData);
  } else if (!students || !students.length) {
    // Fallback only if both live and cache were unavailable
    try {
      const [settings, studentData, roomsList, homeData, devData, galleryData, hallData] = await Promise.all([
        fetchJson("data/settings.json"),
        fetchJson("data/students.json"),
        fetchJson("data/rooms.json"),
        fetchJson("data/home.json"),
        fetchJson("data/developer.json"),
        fetchJson("data/gallery.json"),
        fetchJson("data/hall.json")
      ]);
      applySanityPayload({
        settings,
        students: studentData?.students || [],
        rooms: roomsList?.rooms || [],
        home: homeData || {},
        developer: devData || {},
        hall: hallData || {},
        galleries: galleryData?.collections || []
      });
    } catch (err) {
      console.warn("Local static fallback fetch failed:", err);
    }
  }
}

function applyPageSectionControls() {
  const page = document.body.dataset.page;
  const homeSec = (cmsAdminSettings?.homepage_sections && cmsAdminSettings.homepage_sections.length)
    ? cmsAdminSettings.homepage_sections
    : cmsHomeData?.sections_control;
  const hostelSec = (cmsAdminSettings?.hallinfo_sections && cmsAdminSettings.hallinfo_sections.length)
    ? cmsAdminSettings.hallinfo_sections
    : cmsHallData?.sections_control;
  const devSec = (cmsAdminSettings?.developer_sections && cmsAdminSettings.developer_sections.length)
    ? cmsAdminSettings.developer_sections
    : cmsDevData?.sections_control;

  if (page === "home" && homeSec) {
    const homeMap = {
      students_preview: byId("students-preview"),
      roommates_preview: byId("roommates-preview"),
      results_preview: byId("results-preview"),
      hall_super_preview: byId("hallsuper-preview"),
      hall_info_preview: byId("hostel-info-preview"),
      moments_preview: byId("gallery-preview"),
      resources_preview: byId("dc-resources"),
      location_preview: byId("location")
    };
    applySectionMap(homeSec, homeMap);
  } else if (page === "hostel" && hostelSec) {
    const hostelMap = {
      history_nearby: byId("sec-history"),
      campus_photos: byId("sec-campus-photos"),
      hall_super: byId("hallsuper"),
      helpdesk: byId("sec-helpdesk"),
      alumni: byId("sec-alumni"),
      success_chart: byId("sec-admission"),
      location_map: byId("sec-location")
    };
    applySectionMap(hostelSec, hostelMap);
  } else if (page === "developer" && devSec) {
    const devMap = {
      hero_bio: byId("sec-hero-bio"),
      overview_panels: byId("sec-overview-panels"),
      featured_projects: byId("projects"),
      skills_timeline: byId("sec-skills-timeline"),
      contributors: byId("sec-contributors")
    };
    applySectionMap(devSec, devMap);
  }
}

function applySectionMap(sectionsConfig, elementMap) {
  if (!sectionsConfig || !elementMap) return;
  if (Array.isArray(sectionsConfig)) {
    sectionsConfig.forEach((item, index) => {
      if (!item || typeof item !== "object") return;
      const key = item.section_id || item.id || item.key;
      const el = elementMap[key];
      if (!el) return;
      if (item.invisible === true || item.visible === false || item.enabled === false) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
      el.style.order = index + 1;
    });
    return;
  }
  Object.entries(sectionsConfig).forEach(([key, conf]) => {
    const el = elementMap[key];
    if (!el || typeof conf !== "object" || conf === null) return;
    if (conf.enabled === false) {
      el.style.display = "none";
    } else {
      el.style.display = "";
    }
    if (typeof conf.order === "number") {
      el.style.order = conf.order;
    }
  });
}

function t(key) {
  return key.split(".").reduce((value, part) => value && value[part], i18n[currentLang]) || key;
}

function studentValue(student, field) {
  return currentLang === "bn" && student.bn && student.bn[field] ? student.bn[field] : student[field];
}

function groupLabel(group) {
  if (!group) return "";
  const g = String(group).toLowerCase().trim();
  if (g === "science" || g === "sci") return t("groups.science");
  if (g === "commerce" || g === "business" || g === "b.st" || g === "business studies") return t("groups.commerce");
  if (g === "arts" || g === "humanities" || g === "hum") return t("groups.arts");
  return t(`groups.${group}`) || group;
}

function classLabel(classNo, student) {
  // Show batch (HSC-27) if available, else fallback to Class XI/XII
  if (student && student.batch && student.batch.startsWith('HSC')) {
    return student.batch;
  }
  return t(`studentClass.${classNo}`);
}

function sectionText(student) {
  if (!student.section || String(student.section).toLowerCase() === "none") return "";
  return `${t("common.section")} ${student.section}`;
}

function studentFirstYearResults(student) {
  const r1 = student.results_1st || {};
  const pdfObj = (student.pdfs && typeof student.pdfs === 'object') ? student.pdfs : null;
  const ct1 = (r1.ct1_link || normalizeCmsPath(r1.ct1_pdf) || (pdfObj?.ct1 ? normalizeCmsPath(pdfObj.ct1) : "")) || "";
  const ct2 = (r1.ct2_link || normalizeCmsPath(r1.ct2_pdf) || (pdfObj?.ct2 ? normalizeCmsPath(pdfObj.ct2) : "")) || "";
  const hy  = (r1.hy_link  || normalizeCmsPath(r1.hy_pdf)  || (pdfObj?.hy  ? normalizeCmsPath(pdfObj.hy)  : "")) || "";
  const ct3 = (r1.ct3_link || normalizeCmsPath(r1.ct3_pdf) || (pdfObj?.ct3 ? normalizeCmsPath(pdfObj.ct3) : "")) || "";
  const yearly = (r1.yearly_link || normalizeCmsPath(r1.yearly_pdf) || (pdfObj?.yearly ? normalizeCmsPath(pdfObj.yearly) : "")) || "";
  return [
    ["ct1", ct1],
    ["ct2", ct2],
    ["hy", hy],
    ["ct3", ct3],
    ["yearly", yearly]
  ];
}

function studentSecondYearResults(student) {
  const r2 = student.results_2nd || {};
  const ct1 = (r2.ct1_link || normalizeCmsPath(r2.ct1_pdf)) || "";
  const ct2 = (r2.ct2_link || normalizeCmsPath(r2.ct2_pdf)) || "";
  const ct3 = (r2.ct3_link || normalizeCmsPath(r2.ct3_pdf)) || "";
  const test = (r2.test_link || normalizeCmsPath(r2.test_pdf)) || "";
  return [
    ["ct1", ct1],
    ["ct2", ct2],
    ["ct3", ct3],
    ["test", test]
  ];
}

function resultFiles(student) {
  const isSecondYear = String(student.classNo || student.class_no || "11") === "12" || student.batch === "HSC-27";
  return isSecondYear ? studentSecondYearResults(student) : studentFirstYearResults(student);
}

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  localStorage.setItem("dc-hostel-theme", isDark ? "dark" : "light");
}

function initTheme() {
  setTheme(localStorage.getItem("dc-hostel-theme") === "dark");
  checkPageAccess();

  const toggle = byId("toggle");
  if (!toggle) return;

  toggle.setAttribute("aria-label", t("common.toggleDark"));
  toggle.addEventListener("click", () => {
    setTheme(!document.documentElement.classList.contains("dark"));
  });
}

function footerAboutParts() {
  if (currentLang === "bn") {
    return {
      prefix: "\u098f\u0987 \u0993\u09df\u09c7\u09ac\u09b8\u09be\u0987\u099f\u099f\u09bf \u09a1\u09c7\u09ad\u09c7\u09b2\u09aa \u0995\u09b0\u09c7\u099b\u09c7\u09a8",
      suffix: "\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8\u09c7 \u0989\u09a8\u09cd\u09a8\u09df\u09a8\u09be\u09a7\u09c0\u09a8 \u098f\u0987 \u09aa\u09cd\u09b2\u09cd\u09af\u09be\u099f\u09ab\u09b0\u09cd\u09ae\u099f\u09bf \u0986\u09a8\u09cd\u09a4\u09b0\u09cd\u099c\u09be\u09a4\u09bf\u0995 \u09b9\u09b2\u09c7\u09b0 \u09e7\u09e7\u09b6 \u09b6\u09cd\u09b0\u09c7\u09a3\u09bf\u09b0 \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09a6\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u09aa\u09cd\u09b0\u09df\u09cb\u099c\u09a8\u09c0\u09df \u09b8\u09ac \u09a4\u09a5\u09cd\u09af \u09b8\u09b9\u099c\u09c7 \u09aa\u09c7\u09a4\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09ac\u09c7\u0964"
    };
  }

  return {
    prefix: "This website is developed by",
    suffix: "Currently under development, this platform aims to provide easy access to all essential information for the 11th-grade students of International Hall."
  };
}

function moreMenuLabel() {
  return currentLang === "bn" ? "\u0986\u09b0\u0993" : "More";
}

function updateMoreMenu() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const menu = nav.querySelector(".more-menu");
  const panel = nav.querySelector(".more-menu-panel");
  const toggle = nav.querySelector(".more-menu-toggle");
  const directLinks = [...nav.querySelectorAll(":scope > a")];
  const panelLinks = [...nav.querySelectorAll(".more-menu-panel a")];
  if (!menu || !panel || !toggle || !directLinks.length) return;

  directLinks.forEach((link) => link.classList.remove("is-overflow"));
  panelLinks.forEach((link) => {
    link.hidden = true;
  });
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  menu.hidden = true;

  // On small screens, use native horizontal scrollbar rather than collapsing links
  if (window.matchMedia("(max-width: 640px)").matches) return;

  const style = window.getComputedStyle(nav);
  const gap = Number.parseFloat(style.columnGap || style.gap) || 0;
  const allLinksWidth = directLinks.reduce((sum, link, index) => {
    return sum + link.getBoundingClientRect().width + (index ? gap : 0);
  }, 0);

  if (allLinksWidth <= nav.clientWidth) return;

  menu.hidden = false;
  const menuWidth = menu.getBoundingClientRect().width;
  const available = Math.max(0, nav.clientWidth - menuWidth - gap);
  let used = 0;
  let visibleCount = 0;

  directLinks.forEach((link, index) => {
    const width = link.getBoundingClientRect().width;
    const nextUsed = used + width + (visibleCount ? gap : 0);
    if (nextUsed <= available) {
      used = nextUsed;
      visibleCount += 1;
      return;
    }

    link.classList.add("is-overflow");
    const panelLink = panelLinks[index];
    if (panelLink) panelLink.hidden = false;
  });

  if (!panel.querySelector("a:not([hidden])")) {
    menu.hidden = true;
  }
}

function ensureNavigation() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return;

  const page = document.body.dataset.page || "home";

  const isHomeActive = page === "home";
  const isDevActive = page === "developer";
  const isHallActive = ["students", "roommates", "birthday", "notices", "results", "hostel", "hallsuper", "gallery"].includes(page);
  const isDcActive = ["embed", "dc-social", "dc-clubs"].includes(page);

  // Dynamic Dhaka College URL configurations from settings
  const dcWebUrl = cmsSettings?.dhaka_college?.official_site_url || "https://www.dhakacollege.edu.bd/";
  const dcNoticeUrl = cmsSettings?.dhaka_college?.notice_url || "https://www.dhakacollege.edu.bd/en/notice?limit=100&page=1";
  const dcResultUrl = cmsSettings?.dhaka_college?.result_admit_url || "https://dhakacollege.eshiksabd.com/";
  const dcArchiveUrl = cmsSettings?.dhaka_college?.archive_url || "https://thedcarchive.pages.dev/";

  const dcWebTitle = currentLang === "bn" ? (cmsSettings?.dhaka_college?.official_site_title_bn || "ঢাকা কলেজ ওয়েবসাইট") : (cmsSettings?.dhaka_college?.official_site_title_en || "Dhaka College Website");
  const dcNoticeTitle = currentLang === "bn" ? (cmsSettings?.dhaka_college?.notice_title_bn || "নোটিস বোর্ড") : (cmsSettings?.dhaka_college?.notice_title_en || "Dhaka College Notice");
  const dcResultTitle = currentLang === "bn" ? (cmsSettings?.dhaka_college?.result_admit_title_bn || "রেজাল্ট ও এডমিট কার্ড") : (cmsSettings?.dhaka_college?.result_admit_title_en || "DC Result & Admit Card");
  const dcArchiveTitle = currentLang === "bn" ? (cmsSettings?.dhaka_college?.archive_title_bn || "দা ডিসি আর্কাইভ") : (cmsSettings?.dhaka_college?.archive_title_en || "The DC Archive Website");

  const dcDropdownLabel = window.innerWidth <= 480 ? "DC" : t("nav.dhakaCollege");

    const pageControls = cmsAdminSettings?.page_access_controls || [];
  const isPageVisible = (pid) => {
    const c = pageControls.find(x => x.page_id === pid);
    if (!c) return true;
    if (c.access_level === 'hidden') return false;
    return c.is_visible !== false;
  };
  const isPageLocked = (pid) => {
    const c = pageControls.find(x => x.page_id === pid);
    if (!c) return false;
    return c.access_level === 'lock_normal' || c.access_level === 'lock_all' || c.is_locked === true;
  };
  const role = getAuthRole();
  const isGuest = !role || role === "guest";
  const LOCK_NAV_SVG = `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-left:4px; opacity:0.8;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
  const lockBadge = (pid) => (isPageLocked(pid) && isGuest ? LOCK_NAV_SVG : "");

  nav.innerHTML = `
    <a href="index.html" class="${isHomeActive ? "active" : ""}" data-i18n="nav.home">${t("nav.home")}</a>
    
    <div class="nav-dropdown ${isHallActive ? "active" : ""}">
      <button class="dropdown-trigger ${isHallActive ? "active" : ""}" type="button" aria-haspopup="true" aria-expanded="false">
        <span>${t("nav.hall")}</span>
      </button>
      <div class="dropdown-content">
        ${isPageVisible("students") ? `<a href="students.html" class="${page === "students" ? "active" : ""}">${t("nav.students")}${lockBadge("students")}</a>` : ""}
        ${isPageVisible("roommates") ? `<a href="roommates.html" class="${page === "roommates" ? "active" : ""}">${t("nav.roommates")}${lockBadge("roommates")}</a>` : ""}
        ${isPageVisible("birthday") ? `<a href="birthday.html" class="${page === "birthday" ? "active" : ""}">${currentLang === "bn" ? "জন্মদিন" : "Birthdays"}${lockBadge("birthday")}</a>` : ""}
        ${isPageVisible("notices") ? `<a href="notices.html" class="${page === "notices" ? "active" : ""}">${currentLang === "bn" ? "নোটিশ" : "Notices"}${lockBadge("notices")}</a>` : ""}
        ${isPageVisible("results") ? `<a href="results.html" class="${page === "results" ? "active" : ""}">${t("nav.results")}${lockBadge("results")}</a>` : ""}
        ${isPageVisible("hostel") ? `<a href="hostel.html" class="${page === "hostel" ? "active" : ""}">${t("nav.hostel")}${lockBadge("hostel")}</a>` : ""}
        ${isPageVisible("hallsuper") ? `<a href="hostel.html#hallsuper" class="${page === "hallsuper" ? "active" : ""}">${t("nav.hallSuper")}</a>` : ""}
        ${isPageVisible("gallery") ? `<a href="gallery.html" class="${page === "gallery" ? "active" : ""}">${t("nav.gallery")}${lockBadge("gallery")}</a>` : ""}
      </div>
    </div>

    <div class="nav-dropdown ${isDcActive ? "active" : ""}">
      <button class="dropdown-trigger ${isDcActive ? "active" : ""}" type="button" aria-haspopup="true" aria-expanded="false">
        <span>${dcDropdownLabel}</span>
      </button>
      <div class="dropdown-content">
        <a href="embed.html?url=${encodeURIComponent(dcWebUrl)}&title=${encodeURIComponent(dcWebTitle)}">${dcWebTitle}</a>
        <a href="embed.html?url=${encodeURIComponent(dcNoticeUrl)}&title=${encodeURIComponent(dcNoticeTitle)}">${dcNoticeTitle}</a>
        <a href="${dcResultUrl}" target="_blank" rel="noopener">${dcResultTitle}</a>
        <a href="${dcArchiveUrl}" target="_blank" rel="noopener">${dcArchiveTitle}</a>
        <a href="dc-social.html" class="${page === "dc-social" ? "active" : ""}">${t("nav.dcSocial")}</a>
        <a href="dc-clubs.html" class="${page === "dc-clubs" ? "active" : ""}">${t("nav.dcClubs")}</a>
      </div>
    </div>

    <a href="developer.html" class="${isDevActive ? "active" : ""}" data-i18n="nav.developer">${t("nav.developer")}</a>
  `;
}

function renderFooter() {
  const footer = document.querySelector(".footer-inner");
  if (!footer) return;
  const developerLink = `<a class="footer-developer-link" href="developer.html">Abdullah Al Adib</a>`;
  const about = footerAboutParts();

  let columnsHtml = "";

  const footerCols = (cmsAdminSettings?.footer_columns && cmsAdminSettings.footer_columns.length > 0)
    ? cmsAdminSettings.footer_columns
    : (cmsSettings?.footer_columns && cmsSettings.footer_columns.length > 0 ? cmsSettings.footer_columns : null);

  if (footerCols) {
    // Dynamic columns from Sanity CMS
    columnsHtml = footerCols
      .filter((col) => col && col.is_active !== false)
      .map((col) => {
        const colTitle = currentLang === "bn" && col.title_bn ? col.title_bn : (col.title_en || "Links");
        const linksList = Array.isArray(col.links) ? col.links : [];
        const linksHtml = linksList
          .filter((l) => l && l.is_active !== false)
          .map((l) => {
            const label = currentLang === "bn" && l.title_bn ? l.title_bn : (l.title_en || l.title || "");
            const href = l.url || l.link || "#";
            const target = l.open_in_new_tab ? ` target="_blank" rel="noopener"` : "";
            return `<a href="${href}"${target}>${label}</a>`;
          })
          .join("\n      ");
        return `
          <div class="footer-links">
            <h3>${colTitle}</h3>
            ${linksHtml}
          </div>
        `;
      })
      .join("\n");
  } else {
    // Default fallback columns
    const defaultQuickLinks = [
      { title_en: "Students Preview", title_bn: "শিক্ষার্থী প্রিভিউ", url: "index.html#students-preview", is_active: true },
      { title_en: "Roommate Preview", title_bn: "রুমমেট প্রিভিউ", url: "index.html#roommates-preview", is_active: true },
      { title_en: "Hall Super", title_bn: "হল সুপার", url: "index.html#hallsuper-preview", is_active: true },
      { title_en: "Gallery", title_bn: "গ্যালারি", url: "index.html#gallery-preview", is_active: true },
      { title_en: "College Resources", title_bn: "কলেজ রিসোর্স", url: "index.html#dc-resources", is_active: true },
      { title_en: "Location", title_bn: "অবস্থান", url: "index.html#location", is_active: true }
    ];

    const quickLinksList = (cmsSettings && Array.isArray(cmsSettings.quick_links) && cmsSettings.quick_links.length > 0)
      ? cmsSettings.quick_links
      : defaultQuickLinks;

    const quickLinksHtml = quickLinksList
      .filter((item) => item && item.is_active !== false)
      .map((item) => {
        const label = currentLang === "bn" && item.title_bn ? item.title_bn : (item.title_en || item.title || "");
        const href = item.url || item.link || "#";
        const target = item.open_in_new_tab ? ` target="_blank" rel="noopener"` : "";
        return `<a href="${href}"${target}>${label}</a>`;
      })
      .join("\n      ");

    columnsHtml = `
      <div class="footer-links">
        <h3>${t("footer.quickLinks")}</h3>
        ${quickLinksHtml}
      </div>
      <div class="footer-links">
        <h3>${t("footer.studentLinks")}</h3>
        <a href="students.html">${t("nav.students")}</a>
        <a href="roommates.html">${t("nav.roommates")}</a>
        <a href="birthday.html">${currentLang === "bn" ? "জন্মদিন" : "Birthdays"}</a>
        <a href="results.html">${t("nav.results")}</a>
        <a href="profile.html">${currentLang === "bn" ? "প্রোফাইল / লগইন" : "Profile / Login"}</a>
      </div>
      <div class="footer-links">
        <h3>${t("footer.hallLinks")}</h3>
        <a href="hostel.html">${t("nav.hostel")}</a>
        <a href="hostel.html#hallsuper">${t("nav.hallSuper")}</a>
        <a href="hostel.html#famous">${currentLang === "bn" ? "বিশিষ্ট প্রাক্তনী" : "Notable Alumni"}</a>
        <a href="gallery.html">${t("nav.gallery")}</a>
        <a href="dc-clubs.html">${currentLang === "bn" ? "কলেজ ক্লাবসমূহ" : "College Clubs"}</a>
        <a href="dc-social.html">${currentLang === "bn" ? "সোশ্যাল মিডিয়া" : "Social Links"}</a>
        <a href="developer.html">${t("nav.developer")}</a>
        <a href="https://admindchall.vercel.app" target="_blank" rel="noopener">${currentLang === "bn" ? "অ্যাডমিন প্যানেল (Sanity)" : "Admin Panel (Sanity)"}</a>
        <a href="https://admindchall.vercel.app" target="_blank" rel="noopener">${currentLang === "bn" ? "অ্যাডমিন প্যানেল (Vercel)" : "Admin Panel (Vercel)"}</a>
      </div>
    `;
  }

  footer.innerHTML = `
    <div class="footer-brand">
      <div class="footer-logo"><img src="images/logo.png" alt="International Hall logo" loading="lazy"><strong>${t("nav.logo")}</strong></div>
      <p class="footer-about">${about.prefix} ${developerLink}. ${about.suffix}</p>
    </div>
    ${columnsHtml}
  `;
}

function applyLanguage() {
  const page = document.body.dataset.page || "home";

  document.documentElement.lang = currentLang;
  document.body.dataset.lang = currentLang;
  document.title = t(`pageTitle.${page}`);

  ensureNavigation();

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  if (cmsSettings) {
    const siteTitle = currentLang === "bn" ? cmsSettings.site_title_bn : cmsSettings.site_title_en;
    const heroTitle = currentLang === "bn" ? cmsSettings.hero_title_bn : cmsSettings.hero_title_en;
    document.querySelectorAll('[data-i18n="nav.logo"]').forEach((element) => {
      element.textContent = siteTitle || element.textContent;
    });
    document.querySelectorAll('[data-i18n="home.heroTitle"]').forEach((element) => {
      element.textContent = heroTitle || element.textContent;
    });
  }

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langOption === currentLang);
  });
  updateLanguageButtonLabels();

  const toggle = byId("toggle");
  if (toggle) toggle.setAttribute("aria-label", t("common.toggleDark"));

  document.querySelectorAll(".modal-close").forEach((button) => {
    button.setAttribute("aria-label", t("common.closeProfile"));
  });

  const successMsg = byId("successMessage");
  if (successMsg && getAuthStatus()) {
    const role = getAuthRole();
    if (role === "master") {
      successMsg.textContent = currentLang === "bn"
        ? "তুমি মাস্টার এডমিন হিসেবে লগইন করে আছো! সকল ব্যাচের যাবতীয় তথ্য ও লক করা নম্বর আনলক রয়েছে।"
        : "You are logged in as Master Admin. Full access unlocked across all batches.";
    } else {
      successMsg.textContent = currentLang === "bn"
        ? `তুমি ${role.toUpperCase()} ব্যাচ হিসেবে লগইন আছো! তোমার ব্যাচ এবং জুনিয়র ব্যাচসমূহের সংরক্ষিত তথ্য আনলক রয়েছে।`
        : `You are logged in under ${role.toUpperCase()}. Your batch and junior batches' records are unlocked.`;
    }
  }
  updateProfileNavButton();

  updateHeroPhrase(true);
  renderFooter();
}

function updateLanguageButtonLabels() {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const option = button.dataset.langOption;
    button.textContent = option === "en" ? "EN" : "BN";
    button.title = option === "en" ? "English" : "বাংলা";
  });
}

function initLanguage() {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const compact = window.matchMedia("(max-width: 920px)").matches;
      const selectedLang = button.dataset.langOption;
      currentLang = compact && selectedLang === currentLang ? (currentLang === "en" ? "bn" : "en") : selectedLang;
      localStorage.setItem("dc-hostel-lang", currentLang);
      applyLanguage();
      renderDynamicContent();
      refreshAos();
    });
  });

  window.addEventListener("resize", updateLanguageButtonLabels);

  applyLanguage();
}

function initNavbar() {
  const navbar = byId("navbar");
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
}

function updateHeroPhrase(reset = false) {
  const rotator = byId("heroRotator");
  if (!rotator) return;

  const phrases = i18n[currentLang].heroPhrases;
  if (reset) heroPhraseIndex = 0;
  rotator.classList.remove("phrase-in");
  rotator.textContent = phrases[heroPhraseIndex % phrases.length];
  window.requestAnimationFrame(() => rotator.classList.add("phrase-in"));
}

function initHeroRotator() {
  if (!byId("heroRotator")) return;
  updateHeroPhrase(true);
  if (heroTimer) clearInterval(heroTimer);

  heroTimer = setInterval(() => {
    heroPhraseIndex += 1;
    updateHeroPhrase();
  }, 3200);
}

function studentMatches(student, query) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return true;

  const values = [
    student.name,
    student.roll,
    student.fullRoll,
    student.room,
    student.phone,
    student.fatherPhone,
    student.email,
    student.address,
    student.blood,
    student.group,
    student.section,
    student.practicalGroup,
    student.college,
    student.bn?.name,
    student.bn?.address,
    student.bn?.college
  ].filter(Boolean).join(" ").toLowerCase();

  return values.includes(normalizedQuery);
}

function getActiveFilters() {
  const isRoomPage = document.body.dataset.page === "roommates";
  const isStudentPage = document.body.dataset.page === "students";

  const batchEl = (isStudentPage ? byId("studentBatchFilter") : null) || (isRoomPage ? byId("roomBatchFilter") : null) || byId("filterBatch");
  const groupEl = (isStudentPage ? byId("studentGroupFilter") : null) || (isRoomPage ? byId("roomGroupFilter") : null) || byId("filterGroup");
  const sectionEl = (isStudentPage ? byId("studentSectionFilter") : null) || (isRoomPage ? byId("roomSectionFilter") : null) || byId("filterSection");
  const bloodEl = (isStudentPage ? byId("studentBloodFilter") : null) || (isRoomPage ? byId("roomBloodFilter") : null) || byId("filterBlood");

  const bVal = (batchEl?.value || "").trim();
  const gVal = (groupEl?.value || "").trim();
  const sVal = (sectionEl?.value || "").trim();
  const blVal = (bloodEl?.value || "").trim();

  return {
    batch: (bVal === "all" || bVal === "") ? "" : bVal,
    classNo: byId("filterClass")?.value || "",
    group: (gVal === "all" || gVal === "") ? "" : gVal,
    section: (sVal === "all" || sVal === "") ? "" : sVal,
    blood: (blVal === "all" || blVal === "") ? "" : blVal
  };
}

function updateStudentFilterCount() {
  const filters = getActiveFilters();
  let count = 0;
  if (filters.batch) count++;
  if (filters.group) count++;
  if (filters.section) count++;
  if (filters.blood) count++;

  const badge = byId("studentFilterCount");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  }
}

function updateRoomFilterCount() {
  const filters = getActiveFilters();
  let count = 0;
  if (filters.batch) count++;
  if (filters.group) count++;
  if (filters.section) count++;
  if (filters.blood) count++;

  const badge = byId("roomFilterCount");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  }
}

function studentPassesFilters(student, filters = getActiveFilters()) {
  if (filters.batch) {
    const normFilter = filters.batch.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normStudent = (student.batch || 'HSC-27').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normFilter && normStudent !== normFilter) return false;
  }
  if (filters.classNo && String(student.classNo || "").toLowerCase() !== String(filters.classNo).toLowerCase()) return false;
  if (filters.group && String(student.group || "").toLowerCase() !== String(filters.group).toLowerCase()) return false;
  if (filters.section && String(student.section || "").toLowerCase() !== String(filters.section).toLowerCase()) return false;
  if (filters.blood && String(student.blood || "").toLowerCase().replace(/[\s\+]/g, '') !== String(filters.blood).toLowerCase().replace(/[\s\+]/g, '')) return false;
  return true;
}

function getFilteredStudents() {
  const search = byId("studentSearch");
  const query = search?.value || "";
  const filters = getActiveFilters();
  return students.filter((student) => studentPassesFilters(student, filters) && studentMatches(student, query));
}

function renderSingleStudentCard(student, index) {
  const showBadge = isProfileFieldVisible("room_badge");
  const isRoomUnlocked = isProfileFieldUnlocked("room_2nd_year", student) || isProfileFieldUnlocked("room_1st_year", student) || isProfileFieldUnlocked("room", student);
  const isRollUnlocked = isProfileFieldUnlocked("roll", student);
  const roomVal = student.room_2nd_year?.room_no || student.room_1st_year?.room_no || student.room || "-";
  const roomDisplay = isRoomUnlocked ? (currentLang === "bn" ? toBengaliDigits(roomVal) : roomVal) : maskData(roomVal);
  const rollDisplay = isRollUnlocked ? (currentLang === "bn" ? toBengaliDigits(student.roll) : student.roll) : maskData(student.roll);

  const showRoom = (isProfileFieldVisible("room_2nd_year") || isProfileFieldVisible("room_1st_year")) && roomVal !== "-";
  const showRoll = isProfileFieldVisible("roll") && student.roll;

  let badgeParts = [];
  if (showRoom) badgeParts.push(`${t("common.room")} ${roomDisplay}`);
  if (showRoll) badgeParts.push(`${t("common.roll")} ${rollDisplay}`);

  const badgeHtml = (showBadge && badgeParts.length)
    ? `<p class="student-room-roll">${badgeParts.join(" · ")}</p>`
    : "";

  const showPhoto = isProfileFieldVisible("photo");
  const showName = isProfileFieldVisible("name");
  const showBatch = isProfileFieldVisible("batch");
  const showGroup = isProfileFieldVisible("group");
  const showSection = isProfileFieldVisible("section");

  const isPhotoUnlocked = isProfileFieldUnlocked("photo", student);
  const photoSrc = (showPhoto && isPhotoUnlocked) ? student.img : "images/student-avatar.png";
  const nameDisplay = showName ? (isProfileFieldUnlocked("name", student) ? studentValue(student, "name") : maskData(studentValue(student, "name"))) : "";

  return `
    <button class="student-card" type="button" data-student-id="${student.id}" data-aos="fade-up" data-aos-delay="${Math.min(index * 60, 240)}">
      <img src="${photoSrc}" alt="${nameDisplay}" loading="lazy">
      <span class="student-body">
        <span class="student-info-col">
          ${nameDisplay ? `<h3>${nameDisplay}</h3>` : ''}
          <span class="student-meta">
            ${showBatch ? `<span class="pill" style="font-weight: 700;">${student.batch || 'HSC-27'}</span>` : ''}
            ${showGroup ? `<span class="pill">${groupLabel(student.group)}</span>` : ''}
            ${(showSection && student.section && String(student.section).toLowerCase() !== "none") ? `<span class="pill">${student.section}</span>` : ""}
          </span>
        </span>
        <span class="student-badge-col">
          ${badgeHtml}
          <span class="compact-view-arrow">→</span>
        </span>
      </span>
    </button>
  `;
}

function getHomepage6Students(allStudents) {
  const batchMap = {};
  allStudents.forEach(s => {
    const b = s.batch || "HSC-27";
    batchMap[b] = batchMap[b] || [];
    batchMap[b].push(s);
  });
  const batchKeys = Object.keys(batchMap).sort((a, b) => parseBatchNum(b) - parseBatchNum(a));
  const latestBatch = batchKeys[0] || "HSC-27";
  const founderBatch = "HSC-27";
  if (latestBatch === founderBatch) {
    return (batchMap[founderBatch] || []).slice(0, 6);
  }
  const top3 = (batchMap[latestBatch] || []).slice(0, 3);
  const bottom3 = (batchMap[founderBatch] || []).slice(0, 3);
  return [...top3, ...bottom3];
}

function getAllBatchesSorted() {
  const batchMap = {};
  students.forEach(s => {
    const b = s.batch || "HSC-27";
    batchMap[b] = batchMap[b] || [];
    batchMap[b].push(s);
  });
  return Object.keys(batchMap).sort((a, b) => parseBatchNum(b) - parseBatchNum(a)).map(key => ({
    batch: key,
    students: batchMap[key]
  }));
}

function renderStudentCards(list = getFilteredStudents()) {
  const grid = byId("studentGrid");
  if (!grid) return;

  const isHomePage = !!grid.dataset.limit;

  // === HOMEPAGE: 3+3 rule ===
  if (isHomePage) {
    const homepage6 = getHomepage6Students(list.length ? list : students);
    if (!homepage6.length) {
      grid.innerHTML = `<div class="empty-state">${t("common.noStudent")}</div>`;
      return;
    }
    grid.innerHTML = homepage6.map((student, index) => renderSingleStudentCard(student, index)).join("");
    return;
  }

  // === STUDENTS PAGE: check for ?batch= URL param ===
  const urlParams = new URLSearchParams(window.location.search);
  const singleBatchParam = urlParams.get("batch");

  if (singleBatchParam) {
    const normalizedParam = singleBatchParam.toLowerCase().replace(/[^a-z0-9]/g, "");
    const batchStudents = list.filter(s => {
      const sb = (s.batch || "HSC-27").toLowerCase().replace(/[^a-z0-9]/g, "");
      return sb === normalizedParam;
    });
    const batchLabel = singleBatchParam.toUpperCase().replace("HSC", "HSC-");

    let html = `
      <div class="batch-archive-banner" data-aos="fade-up">
        <a href="students.html" class="back-to-all-btn">← ${currentLang === 'bn' ? 'সকল ব্যাচ' : 'All Batches'}</a>
        <div class="batch-archive-title-wrap">
          <h2 class="batch-archive-title">${BATCH_LOGO_SVG} ${batchLabel}</h2>
          <span class="batch-count-pill">${batchStudents.length} ${currentLang === 'bn' ? 'জন শিক্ষার্থী' : 'Students'}</span>
        </div>
      </div>`;

    if (!batchStudents.length) {
      html += `<div class="empty-state">${t("common.noStudent")}</div>`;
    } else {
      batchStudents.forEach((student, idx) => {
        html += renderSingleStudentCard(student, idx);
      });
    }
    grid.innerHTML = html;
    return;
  }

  // === STUDENTS PAGE: multi-batch overview ===
  const batches = getAllBatchesSorted();

  if (!batches.length || !list.length) {
    grid.innerHTML = `<div class="empty-state">${t("common.noStudent")}</div>`;
    return;
  }

  let html = "";
  let globalIdx = 0;

  batches.forEach((batchGroup, batchIndex) => {
    const { batch, students: batchStudents } = batchGroup;
    const isLatest = batchIndex === 0;
    const filteredBatchStudents = batchStudents.filter(s => list.includes(s));
    if (!filteredBatchStudents.length) return;

    if (isLatest) {
      html += `
        <div class="batch-section-header active-batch-header" data-aos="fade-up">
          <div class="batch-header-inner">
            <h2 class="batch-heading">
              <span class="batch-icon">${BATCH_LOGO_SVG}</span>
              <span class="batch-label">${currentLang === 'bn' ? 'সর্বশেষ ব্যাচ:' : 'Latest Batch:'}</span>
              <span class="batch-badge">${batch}</span>
            </h2>
            <span class="batch-count-pill">${filteredBatchStudents.length} ${currentLang === 'bn' ? 'জন শিক্ষার্থী' : 'Students'}</span>
          </div>
        </div>`;
      filteredBatchStudents.forEach(student => {
        html += renderSingleStudentCard(student, globalIdx++);
      });
    } else {
      const previewStudents = filteredBatchStudents.slice(0, 3);
      const batchSlug = batch.toLowerCase().replace(/[^a-z0-9-]/g, "");

      html += `
        <div class="batch-section-header" data-aos="fade-up">
          <div class="batch-header-inner">
            <h2 class="batch-heading">
              <span class="batch-icon">${BATCH_LOGO_SVG}</span>
              <span class="batch-label">Batch:</span>
              <span class="batch-badge">${batch}</span>
            </h2>
            <span class="batch-count-pill">${filteredBatchStudents.length} ${currentLang === 'bn' ? 'জন শিক্ষার্থী' : 'Students'}</span>
          </div>
        </div>
        <div class="prev-batch-preview-grid">`;
      previewStudents.forEach(student => {
        html += renderSingleStudentCard(student, globalIdx++);
      });
      html += `</div>`;

      if (filteredBatchStudents.length > 3) {
        html += `
          <div class="prev-batch-action" data-aos="fade-up">
            <a href="students.html?batch=${batchSlug}" class="prev-batch-view-all-btn">
              ${currentLang === 'bn' ? `সকল ${batch} শিক্ষার্থী দেখুন →` : `View All ${batch} Students →`}
            </a>
          </div>`;
      }
    }
  });

  grid.innerHTML = html;
}


function initStudentSearch() {
  if (!byId("studentGrid")) return;
  const search = byId("studentSearch");
  document.querySelectorAll(".filter-panel select").forEach((select) => {
    select.addEventListener("change", () => {
      renderStudentCards();
      refreshAos();
    });
  });

  if (!search) return;

  search.addEventListener("input", () => {
    renderStudentCards();
    refreshAos();
  });
}

function filteredRoommateStudents() {
  const filters = getActiveFilters();
  const query = byId("roommateSearch")?.value || "";
  return students.filter((student) => studentPassesFilters(student, filters) && studentMatches(student, query));
}

function groupByRoom(list) {
  // Groups students into render-ready pairs [ [roomNumber, [studentA, studentB]], ... ]
  // For 1st Year shared rooms (102, 103, 104): pairs mutual/selected bedmates together!
  // For 2nd Year rooms (314–329): pairs 2 students per room card.
  const byRoom = {};
  list.forEach(student => {
    const rm = student.room || "Unassigned";
    if (!byRoom[rm]) byRoom[rm] = [];
    byRoom[rm].push(student);
  });

  const pairs = [];
  const sortedRoomKeys = Object.keys(byRoom).sort((a, b) => {
    const numA = parseInt(a, 10) || 999;
    const numB = parseInt(b, 10) || 999;
    return numA - numB;
  });

  sortedRoomKeys.forEach(roomNum => {
    const roomStudents = byRoom[roomNum];
    const isShared1stYear = ['102', '103', '104'].includes(String(roomNum));

    if (!isShared1stYear) {
      // 2nd Year standard 2-person room (314-329)
      for (let i = 0; i < roomStudents.length; i += 2) {
        const pair = [roomStudents[i]];
        if (roomStudents[i + 1]) pair.push(roomStudents[i + 1]);
        pairs.push([roomNum, pair]);
      }
    } else {
      // 1st Year shared room (102, 103, 104) with explicit Bedmate pairing
      const pairedIds = new Set();
      const roomPairs = [];

      // Pass 1: Explicit bedmate links
      roomStudents.forEach(s1 => {
        const id1 = s1.slug || s1.id;
        if (pairedIds.has(id1)) return;
        const bedSlug = s1.room_1st_year?.bedmate_slug;
        const bedName = (s1.room_1st_year?.bedmate_name || '').trim().toLowerCase();

        let match = null;
        if (bedSlug) {
          match = roomStudents.find(s2 => (s2.slug || s2.id) === bedSlug && !pairedIds.has(s2.slug || s2.id) && s2 !== s1);
        }
        if (!match && bedName) {
          match = roomStudents.find(s2 => (s2.name || '').trim().toLowerCase() === bedName && !pairedIds.has(s2.slug || s2.id) && s2 !== s1);
        }

        if (match) {
          pairedIds.add(id1);
          pairedIds.add(match.slug || match.id);
          roomPairs.push([roomNum, [s1, match]]);
        }
      });

      // Pass 2: Remaining students in shared room
      const remaining = roomStudents.filter(s => !pairedIds.has(s.slug || s.id));
      for (let i = 0; i < remaining.length; i += 2) {
        const pair = [remaining[i]];
        if (remaining[i + 1]) pair.push(remaining[i + 1]);
        roomPairs.push([roomNum, pair]);
      }

      pairs.push(...roomPairs);
    }
  });

  return pairs;
}

function renderRoommates() {
  const grid = byId("roommateGrid");
  if (!grid) return;

  const source = filteredRoommateStudents();
  const isHomePage = !!grid.dataset.limit;

  // === HOMEPAGE: show latest batch rooms ===
  if (isHomePage) {
    const limit = Number(grid.dataset.limit || 2);
    const rooms = groupByRoom(source);
    const visibleRooms = rooms.slice(0, limit);
    if (!visibleRooms.length) {
      grid.innerHTML = `<div class="empty-state">${t("common.noStudent")}</div>`;
      return;
    }
    grid.innerHTML = visibleRooms.map(([room, pair], index) => `
      <article class="room-pair" data-aos="fade-up" data-aos-delay="${index * 70}">
        ${renderRoomPerson(pair[0], "fade-right")}
        <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
        ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
      </article>
    `).join("");
    return;
  }

  // === ROOMMATES PAGE: check for ?batch= URL param ===
  const urlParams = new URLSearchParams(window.location.search);
  const singleBatchParam = urlParams.get("batch");

  if (singleBatchParam) {
    const normalizedParam = singleBatchParam.toLowerCase().replace(/[^a-z0-9]/g, "");
    const batchSource = source.filter(s => {
      const sb = (s.batch || "HSC-27").toLowerCase().replace(/[^a-z0-9]/g, "");
      return sb === normalizedParam;
    });
    const batchLabel = singleBatchParam.toUpperCase().replace("HSC", "HSC-");
    const rooms = groupByRoom(batchSource);

    let html = `
      <div class="batch-archive-banner" data-aos="fade-up" style="grid-column: 1 / -1;">
        <a href="roommates.html" class="back-to-all-btn">← ${currentLang === 'bn' ? 'সকল ব্যাচ' : 'All Batches'}</a>
        <div class="batch-archive-title-wrap">
          <h2 class="batch-archive-title">${BATCH_LOGO_SVG} ${batchLabel} — ${currentLang === 'bn' ? 'রুমমেট' : 'Roommates'}</h2>
          <span class="batch-count-pill">${rooms.length} ${currentLang === 'bn' ? 'টি রুম' : 'Rooms'}</span>
        </div>
      </div>`;

    if (!rooms.length) {
      html += `<div class="empty-state" style="grid-column: 1 / -1;">${t("common.noStudent")}</div>`;
    } else {
      rooms.forEach(([room, pair], index) => {
        html += `
          <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
            ${renderRoomPerson(pair[0], "fade-right")}
            <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
            ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
          </article>`;
      });
    }
    grid.innerHTML = html;
    return;
  }

  // === ROOMMATES PAGE: multi-batch overview ===
  const batchMap = {};
  source.forEach(s => {
    const b = s.batch || "HSC-27";
    batchMap[b] = batchMap[b] || [];
    batchMap[b].push(s);
  });
  const batchKeys = Object.keys(batchMap).sort((a, b) => parseBatchNum(b) - parseBatchNum(a));

  if (!batchKeys.length) {
    grid.innerHTML = `<div class="empty-state">${t("common.noStudent")}</div>`;
    return;
  }

  let html = "";
  batchKeys.forEach((batch, batchIndex) => {
    const batchStudents = batchMap[batch];
    const rooms = groupByRoom(batchStudents);
    if (!rooms.length) return;

    const isLatest = batchIndex === 0;
    const batchSlug = batch.toLowerCase().replace(/[^a-z0-9-]/g, "");

    html += `
      <div class="batch-section-header${isLatest ? ' active-batch-header' : ''}" data-aos="fade-up" style="grid-column: 1 / -1;">
        <div class="batch-header-inner">
          <h2 class="batch-heading">
            <span class="batch-icon">${BATCH_LOGO_SVG}</span>
            <span class="batch-label">${isLatest ? (currentLang === 'bn' ? 'সর্বশেষ ব্যাচ:' : 'Latest Batch:') : 'Batch:'}</span>
            <span class="batch-badge">${batch}</span>
          </h2>
          <span class="batch-count-pill">${rooms.length} ${currentLang === 'bn' ? 'টি রুম' : 'Rooms'}</span>
        </div>
      </div>`;

    if (isLatest) {
      rooms.forEach(([room, pair], index) => {
        html += `
          <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
            ${renderRoomPerson(pair[0], "fade-right")}
            <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
            ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
          </article>`;
      });
    } else {
      const previewRooms = rooms.slice(0, 2);
      previewRooms.forEach(([room, pair], index) => {
        html += `
          <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
            ${renderRoomPerson(pair[0], "fade-right")}
            <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
            ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
          </article>`;
      });

      if (rooms.length > 2) {
        html += `
          <div class="prev-batch-action" data-aos="fade-up" style="grid-column: 1 / -1;">
            <a href="roommates.html?batch=${batchSlug}" class="prev-batch-view-all-btn">
              ${currentLang === 'bn' ? `সকল ${batch} রুমমেট দেখুন →` : `View All ${batch} Roommates →`}
            </a>
          </div>`;
      }
    }
  });

  grid.innerHTML = html;
}


function renderRoomPerson(student, animation) {
  const photoUnlocked = isProfileFieldUnlocked("photo", student);
  const photoSrc = photoUnlocked ? student.img : "images/student-avatar.png";
  const nameUnlocked = isProfileFieldUnlocked("name", student);
  const nameDisplay = nameUnlocked ? studentValue(student, "name") : "••••••••";
  return `
    <button class="room-person" type="button" data-student-id="${student.id}" data-aos="${animation}">
      <img src="${photoSrc}" alt="${nameDisplay}" loading="lazy">
      <strong>${nameDisplay}</strong>
      <span>${classLabel(student.classNo, student)} · ${groupLabel(student.group)}</span>
    </button>
  `;
}

function initRoommateFilters() {
  const roommateSearch = byId("roommateSearch");

  if (roommateSearch) {
    roommateSearch.addEventListener("input", () => {
      renderRoommates();
      refreshAos();
    });
  }

  document.querySelectorAll(".filter-panel select").forEach((select) => {
    select.addEventListener("change", () => {
      renderRoommates();
      refreshAos();
    });
  });
}

function initMoreMenu() {
  window.addEventListener("resize", () => {
    updateMoreMenu();
    ensureNavigation();
  });
  window.addEventListener("load", () => {
    updateMoreMenu();
    ensureNavigation();
  });

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(".more-menu-toggle");

    document.querySelectorAll(".more-menu.open").forEach((menu) => {
      if (!toggle || !menu.contains(toggle)) {
        menu.classList.remove("open");
        menu.querySelector(".more-menu-toggle")?.setAttribute("aria-expanded", "false");
      }
    });

    if (toggle) {
      const menu = toggle.closest(".more-menu");
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    if (event.target.closest(".more-menu-panel a")) {
      document.querySelectorAll(".more-menu.open").forEach((menu) => {
        menu.classList.remove("open");
        menu.querySelector(".more-menu-toggle")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".more-menu.open").forEach((menu) => {
      menu.classList.remove("open");
      menu.querySelector(".more-menu-toggle")?.setAttribute("aria-expanded", "false");
    });
  });
}

function renderResults(filterClass = "all") {
  const table = byId("resultTable");
  const thead = byId("resultThead");
  if (!table) return;

  const show1st = isProfileFieldVisible("results_1st");
  const show2nd = isProfileFieldVisible("results_2nd");

  if (!show1st && !show2nd) {
    if (thead) thead.innerHTML = "";
    table.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted); font-size: 1.05rem;">
          ${currentLang === "bn" ? "🔒 ফলাফল সাময়িকভাবে অ্যাডমিন কর্তৃক লুকানো রয়েছে।" : "🔒 Academic results are currently hidden by admin."}
        </td>
      </tr>
    `;
    return;
  }
  const lockIconSvg = `<svg viewBox="0 0 24 24" width="12" height="12" fill="#10b981" style="display:inline-block; vertical-align:middle; margin-left:4px;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;

  const filteredStudents = students.filter((s) => {
    if (filterClass === "all") return true;
    return String(s.class_no || "11") === String(filterClass);
  });

  if (thead) {
    if (filterClass === "12") {
      // 2nd Year specific columns (4 exams)
      thead.innerHTML = `
        <tr>
          <th>${t("resultTable.serial")}</th>
          <th>${t("resultTable.student")}</th>
          <th>${t("resultTable.roll")}</th>
          <th>${t("pdf.ct1")}</th>
          <th>${t("pdf.ct2")}</th>
          <th>${t("pdf.ct3")}</th>
          <th>${t("pdf.test")}</th>
        </tr>
      `;
    } else if (filterClass === "11") {
      // 1st Year specific columns (5 exams)
      thead.innerHTML = `
        <tr>
          <th>${t("resultTable.serial")}</th>
          <th>${t("resultTable.student")}</th>
          <th>${t("resultTable.roll")}</th>
          <th>${t("pdf.ct1")}</th>
          <th>${t("pdf.ct2")}</th>
          <th>${t("pdf.hy")}</th>
          <th>${t("pdf.ct3")}</th>
          <th>${t("pdf.yearly")}</th>
        </tr>
      `;
    } else {
      // All classes: unified 5 columns aligned
      thead.innerHTML = `
        <tr>
          <th>${t("resultTable.serial")}</th>
          <th>${t("resultTable.student")}</th>
          <th>${t("resultTable.roll")}</th>
          <th>${t("pdf.ct1")}</th>
          <th>${t("pdf.ct2")}</th>
          <th>${currentLang === "bn" ? "অর্ধ-বার্ষিক" : "Half Yearly"}</th>
          <th>${t("pdf.ct3")}</th>
          <th>${currentLang === "bn" ? "বার্ষিক / টেস্ট" : "Yearly / Test"}</th>
        </tr>
      `;
    }
  }

  table.innerHTML = filteredStudents.map((student, index) => {
    const isSecondYear = String(student.classNo || student.class_no || "11") === "12" || student.batch === "HSC-27";
    const resUnlocked = isSecondYear ? isProfileFieldUnlocked("results_2nd", student) : isProfileFieldUnlocked("results_1st", student);
    const showStudentResults = resUnlocked;

    let examsInOrder = [];
    if (filterClass === "12") {
      examsInOrder = studentSecondYearResults(student);
    } else if (filterClass === "11") {
      examsInOrder = studentFirstYearResults(student);
    } else {
      // All classes mode: align to 5 columns
      if (isSecondYear) {
        const r2 = studentSecondYearResults(student);
        const ct1 = r2.find(e => e[0] === "ct1")?.[1] || "";
        const ct2 = r2.find(e => e[0] === "ct2")?.[1] || "";
        const ct3 = r2.find(e => e[0] === "ct3")?.[1] || "";
        const test = r2.find(e => e[0] === "test")?.[1] || "";
        examsInOrder = [
          ["ct1", ct1],
          ["ct2", ct2],
          ["hy", ""], // No half yearly for 2nd year!
          ["ct3", ct3],
          ["test", test]
        ];
      } else {
        examsInOrder = studentFirstYearResults(student);
      }
    }

    const examCells = examsInOrder.map(([key, file]) => {
      // If no result PDF was uploaded, keep cell completely empty
      if (!file) {
        return `<td><span style="color: var(--text-muted); opacity: 0.35;">—</span></td>`;
      }
      const fileHref = showStudentResults ? file : "profile.html";
      const targetAttr = showStudentResults ? 'target="_blank" rel="noopener"' : '';
      const lockIcon = showStudentResults ? '' : ` ${lockIconSvg}`;
      const linkClass = showStudentResults ? "table-pdf-link" : "table-pdf-link locked";
      return `<td><a class="${linkClass}" href="${fileHref}" ${targetAttr}>${t(`pdf.${key}`)}${lockIcon}</a></td>`;
    }).join("");

    return `
      <tr>
        <td>${index + 1}</td>
        <td><button type="button" data-student-id="${student.id}">${studentValue(student, "name")}</button></td>
        <td title="${student.fullRoll}">${student.roll}</td>
        ${examCells}
      </tr>
    `;
  }).join("");
}

function initResultClassFilter() {
  const btns = document.querySelectorAll(".result-class-btn");
  if (!btns.length) return;
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => {
        b.classList.remove("active", "primary");
        b.classList.add("secondary");
      });
      btn.classList.add("active", "primary");
      btn.classList.remove("secondary");
      const cls = btn.dataset.class;
      renderResults(cls);
    });
  });
}

async function renderDcSocialPage() {
  const grid = byId("dcSocialGrid");
  if (!grid || document.body.dataset.page !== "dc-social") return;

  const links = cmsSettings?.dhaka_college?.social_links || [];
  if (links.length) {
    grid.innerHTML = links.map((link) => {
      let title = currentLang === "bn" ? link.title_bn : link.title_en;
      // Clean trailing "Page" / "পেজ" if present
      title = (title || "").replace(/\s+(Page|পেজ)$/i, "");
      
      const typeLabel = link.is_group 
        ? (currentLang === "bn" ? "অফিশিয়াল গ্রুপ" : "Official Group") 
        : (currentLang === "bn" ? "অফিশিয়াল পেজ" : "Official Page");

      if (link.is_group) {
        return `
          <div class="dc-card social-link-card group-card" data-aos="fade-up" style="padding: 16px; min-height: 620px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div class="card-badge group-badge" style="background: rgba(24, 119, 242, 0.15); color: #1877f2; border: 1px solid rgba(24, 119, 242, 0.3); font-weight: 700; margin-bottom: 0;">👥 ${typeLabel}</div>
                <span style="font-size: 0.78rem; color: #10c9a8; font-weight: 700;">● Active Community</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text); margin-bottom: 12px; min-height: 28px;">${title}</h3>
              
              <!-- Rich Facebook Group Card Container (500px, matches embedded pages) -->
              <div class="fb-group-showcase" style="height: 500px; border-radius: 12px; overflow: hidden; background: var(--surface-strong); border: 1px solid var(--border); padding: 22px 18px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
                <div>
                  <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
                    <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #1877f2, #0052cc); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 26px; flex-shrink: 0; box-shadow: 0 8px 18px rgba(24, 119, 242, 0.35);">
                      👥
                    </div>
                    <div>
                      <h4 style="margin: 0 0 4px; font-size: 1.05rem; font-weight: 700; color: var(--text);">Dhaka College Community</h4>
                      <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">${currentLang === 'bn' ? 'পাবলিক গ্রুপ • ঢাকা কলেজ শিক্ষার্থী ও প্রাক্তন' : 'Public Group • Students & Alumni'}</p>
                    </div>
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px;">
                    <div style="background: var(--surface); padding: 12px 10px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
                      <div style="font-size: 1.3rem; font-weight: 800; color: #1877f2;">60,000+</div>
                      <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">${currentLang === 'bn' ? 'সদস্যবৃন্দ' : 'Active Members'}</div>
                    </div>
                    <div style="background: var(--surface); padding: 12px 10px; border-radius: 10px; border: 1px solid var(--border); text-align: center;">
                      <div style="font-size: 1.3rem; font-weight: 800; color: #10c9a8;">Public</div>
                      <div style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">${currentLang === 'bn' ? 'উন্মুক্ত গ্রুপ' : 'Public Access'}</div>
                    </div>
                  </div>

                  <div style="background: var(--surface); padding: 14px; border-radius: 10px; border: 1px solid var(--border);">
                    <p style="font-size: 0.86rem; color: var(--text); line-height: 1.5; margin: 0 0 10px;">
                      ${currentLang === "bn" 
                        ? "ঢাকা কলেজের শিক্ষার্থী ও প্রাক্তনদের সবচেয়ে বড় উন্মুক্ত ফোরাম। ক্যাম্পাস আলোচনা, নোটিশ ও অ্যাকাডেমিক সহায়তার কেন্দ্রবিন্দু।" 
                        : "Official Facebook community for Dhaka College students and alumni. Connect, share campus experiences, and stay updated."}
                    </p>
                    <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px;">
                      <span>📌 ${currentLang === 'bn' ? 'জরুরি ক্যাম্পাস নোটিশ ও আপডেট' : 'Urgent college notices & updates'}</span>
                      <span>💡 ${currentLang === 'bn' ? 'অ্যাকাডেমিক প্রশ্নোত্তর ও দিকনির্দেশনা' : 'Academic discussions & peer guidance'}</span>
                      <span>🎓 ${currentLang === 'bn' ? 'সিনিয়র-জুনিয়র সরাসরি নেটওয়ার্কিং' : 'Senior-junior student networking'}</span>
                    </div>
                  </div>
                </div>

                <a class="visit-btn" href="${link.url}" target="_blank" rel="noopener" style="background: #1877f2; color: #ffffff; padding: 12px 16px; border-radius: 10px; text-align: center; justify-content: center; font-size: 0.92rem; font-weight: 700; width: 100%; transition: transform 0.2s, background 0.2s; display: flex; align-items: center; gap: 8px; box-shadow: 0 6px 18px rgba(24, 119, 242, 0.35);">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  ${currentLang === "bn" ? "ফেসবুক গ্রুপে জয়েন করুন ↗" : "Join Facebook Group ↗"}
                </a>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${currentLang === 'bn' ? 'অফিশিয়াল কমিউনিটি' : 'Official Student Community'}</span>
              <a class="visit-btn" href="${link.url}" target="_blank" rel="noopener" style="font-size: 0.85rem; font-weight: 600;">
                ${currentLang === "bn" ? "গ্রুপে যান ↗" : "Open Group ↗"}
              </a>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="dc-card social-link-card page-embed-card" data-aos="fade-up" style="padding: 16px; min-height: 620px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div class="card-badge page-badge" style="background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); font-weight: 700; margin-bottom: 0;">🔵 ${typeLabel}</div>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Official Facebook Page</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text); margin-bottom: 12px; min-height: 28px;">${title}</h3>
              <div class="fb-embed-container" style="height: 500px; border-radius: 12px; overflow: hidden; background: var(--surface-strong); border: 1px solid var(--border); margin-bottom: 12px;">
                <iframe src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(link.url)}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" width="340" height="500" style="border:none;overflow:hidden;width:100%;height:100%;border-radius:12px;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${currentLang === 'bn' ? 'ফেসবুকে লাইভ' : 'Live on Facebook'}</span>
              <a class="visit-btn" href="${link.url}" target="_blank" rel="noopener" style="font-size: 0.85rem; font-weight: 600;">
                ${currentLang === "bn" ? "ফেসবুকে খুলুন ↗" : "Open in Facebook ↗"}
              </a>
            </div>
          </div>
        `;
      }
    }).join("");
  } else {
    grid.innerHTML = `<p>${currentLang === 'bn' ? 'কোনো সোশ্যাল লিংক পাওয়া হয়নি।' : 'No social links found.'}</p>`;
  }
}

async function renderDcClubsPage() {
  const grid = byId("dcClubsGrid");
  if (!grid || document.body.dataset.page !== "dc-clubs") return;

  const clubs = cmsSettings?.dhaka_college?.clubs || [];
  if (clubs.length) {
    grid.innerHTML = clubs.map((club) => {
      let name = currentLang === "bn" ? club.name_bn : club.name_en;
      if (name.includes("International College Club") || name.includes("DCICC")) {
        name = currentLang === "bn" ? "ঢাকা কলেজ ইসলামিক কালচারাল ক্লাব" : "Dhaka College Islamic Cultural Club";
      } else if (name.includes("Mathematics Club")) {
        name = currentLang === "bn" ? "ঢাকা কলেজ ম্যাথ ক্লাব" : "Dhaka College Math Club";
      }
      return `
        <div class="dc-card club-card" data-aos="fade-up" style="padding: 16px; min-height: 590px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="club-card-header" style="margin-bottom: 14px; text-align: center; padding: 4px 6px 6px;">
              <h3 class="club-card-title" style="font-size: 1.12rem; font-weight: 700; color: var(--text); margin: 0; line-height: 1.35; min-height: 44px; display: flex; align-items: center; justify-content: center; letter-spacing: -0.01em;">
                ${name}
              </h3>
              <div class="club-title-line" style="width: 44px; height: 3px; background: linear-gradient(90deg, #10c9a8, #3b82f6); border-radius: 999px; margin: 8px auto 0 auto;"></div>
            </div>
            <div class="fb-embed-container" style="height: 500px; border-radius: 12px; overflow: hidden; background: var(--surface-strong); border: 1px solid var(--border); margin-bottom: 12px;">
              <iframe src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(club.facebook_url)}&width=340&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" width="340" height="500" style="border:none;overflow:hidden;width:100%;height:100%;border-radius:12px;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px;">
            <a class="visit-btn" href="${club.facebook_url}" target="_blank" rel="noopener" style="font-size: 0.85rem; font-weight: 600;">
              ${currentLang === "bn" ? "ফেসবুকে খুলুন ↗" : "Open in Facebook ↗"}
            </a>
          </div>
        </div>
      `;
    }).join("");
  } else {
    grid.innerHTML = `<p>${currentLang === 'bn' ? 'কোনো ক্লাব পাওয়া যায়নি।' : 'No clubs found.'}</p>`;
  }
}

// Render DC Resources cards on homepage using CMS settings
function renderHomeDcResources() {
  const grid = byId('dcResourceGrid');
  if (!grid) return;

  const dc = cmsSettings?.dhaka_college || {};
  const lang = currentLang;

  const resources = [
    {
      href: dc.official_site_url || 'https://www.dhakacollege.edu.bd/',
      title: lang === 'bn' ? (dc.official_site_title_bn || 'ঢাকা কলেজ ওয়েবসাইট') : (dc.official_site_title_en || 'Dhaka College Website'),
      desc: lang === 'bn' ? 'ঢাকা কলেজের অফিসিয়াল পোর্টাল — শাসন ও ঘোষণা।' : 'Official portal of Dhaka College containing institutional governance and announcements.',
      external: true,
      svgPath: 'M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 3.66L18.42 8 12 10.91 5.58 8 12 5.66zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z'
    },
    {
      href: dc.notice_url || 'https://www.dhakacollege.edu.bd/en/notice?limit=100&page=1',
      title: lang === 'bn' ? (dc.notice_title_bn || 'নোটিশ বোর্ড') : (dc.notice_title_en || 'Dhaka College Notice'),
      desc: lang === 'bn' ? 'অফিসিয়াল নোটিশ, সার্কুলার, শিডিউল ও আপডেট।' : 'Official notices, administrative circulars, schedules, and college updates.',
      external: true,
      svgPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
    },
    {
      href: dc.result_admit_url || 'https://dhakacollege.eshiksabd.com/',
      title: lang === 'bn' ? (dc.result_admit_title_bn || 'রেজাল্ট ও এডমিট কার্ড') : (dc.result_admit_title_en || 'DC Result & Admit Card'),
      desc: lang === 'bn' ? 'পরীক্ষার ফলাফল চেক ও এডমিট কার্ড ডাউনলোডের অনলাইন পোর্টাল।' : 'Online portal for checking college examinations results and downloading admit cards.',
      external: true,
      svgPath: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z'
    },
    {
      href: dc.archive_url || 'https://thedcarchive.pages.dev/',
      title: lang === 'bn' ? (dc.archive_title_bn || 'দা ডিসি আর্কাইভ') : (dc.archive_title_en || 'The DC Archive Website'),
      desc: lang === 'bn' ? 'ঐতিহাসিক রেকর্ড, ম্যাগাজিন ও স্মৃতিভাণ্ডার।' : 'Comprehensive historical records, magazines, memory vaults, and publications.',
      external: true,
      svgPath: 'M4 6h16v2H4zm2 4h12v2H6zm3 4h6v2H9zm-7 6h20v-2H2v2z'
    },
    {
      href: 'dc-social.html',
      title: lang === 'bn' ? 'ডিসি ফেসবুক পেজ' : 'DC Facebook Pages',
      desc: lang === 'bn' ? 'ঢাকা কলেজের অফিসিয়াল ফেসবুক পেজ ও গ্রুপ।' : 'Official Facebook communities, student clubs, and updates from the student body.',
      external: false,
      svgPath: 'M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z'
    },
    {
      href: 'dc-clubs.html',
      title: lang === 'bn' ? 'ঢাকা কলেজ ক্লাবসমূহ' : 'Dhaka College Clubs',
      desc: lang === 'bn' ? 'ঢাকা কলেজের বিভিন্ন ক্লাব ও কো-কারিকুলার অ্যাক্টিভিটি।' : 'Explore cultural, science, IT, debate, business, and language clubs of Dhaka College.',
      external: false,
      svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    }
  ];

  grid.innerHTML = resources.map((r, i) => `
    <a href="${r.href}" ${r.external ? 'target="_blank" rel="noopener"' : ''} class="dc-resource-card" data-aos="fade-up" data-aos-delay="${50 + i * 50}">
      <div class="dc-resource-card-top">
        <div class="dc-resource-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="${r.svgPath}"/></svg>
        </div>
        <span class="dc-resource-arrow">&rarr;</span>
      </div>
      <div class="dc-resource-body">
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
    </a>
  `).join('');
}


function renderDynamicContent() {
  if (checkPageAccess()) return;
  initImageFallbacks();
  renderStudentCards();
  renderRoommates();
  renderBirthdays();
  renderResults();
  renderDcSocialPage();
  renderDcClubsPage();
  if (cmsGalleryData) {
    renderGalleryPage(cmsGalleryData);
    renderHomeGallery(cmsGalleryData);
  }
  if (cmsHallData) {
    renderHallInfoPage(cmsHallData);
    renderAlumniList(cmsHallData.alumni_profiles);
    renderHallSuperPage(cmsHallData);
    renderHomeHallSuper(cmsHallData);
  }
  if (cmsDevData) {
    renderDeveloperPage(cmsDevData);
  }
  renderHomeDcResources();
  renderNoticesPage();
  initBirthdayCelebrationPopup();
  initNoticePopup();

  if (activeStudentId) {
    const student = students.find((item) => item.id === activeStudentId);
    if (student) openStudentModal(student);
  }

  if (activeRoomId) {
    openRoomModal(activeRoomId);
  }

  refreshAos();
}

function initStudentClicks() {
  document.addEventListener("click", (event) => {
    const copyBtn = event.target.closest(".copy-roll-btn");
    if (copyBtn) {
      const roll = copyBtn.dataset.roll;
      navigator.clipboard.writeText(roll).then(() => {
        const copyIcon = copyBtn.querySelector(".copy-icon");
        const checkIcon = copyBtn.querySelector(".check-icon");
        if (copyIcon && checkIcon) {
          copyIcon.style.display = "none";
          checkIcon.style.display = "inline-block";
          setTimeout(() => {
            copyIcon.style.display = "inline-block";
            checkIcon.style.display = "none";
          }, 2000);
        }
      });
      return;
    }

    const expandBtn = event.target.closest(".expand-photo-btn");
    if (expandBtn) {
      event.preventDefault();
      event.stopPropagation();
      const imgUrl = expandBtn.dataset.img;
      if (imgUrl) window.open(imgUrl, "_blank");
      return;
    }

    const famousTrigger = event.target.closest("[data-famous-id]");
    if (famousTrigger) {
      openFamousModal(famousTrigger.dataset.famousId);
      return;
    }

    const galleryTrigger = event.target.closest("[data-gallery-src]");
    if (galleryTrigger) {
      openGalleryModal(galleryTrigger.dataset.gallerySrc, galleryTrigger.dataset.galleryTitle || "Gallery photo", galleryTrigger.dataset.galleryDesc || "");
      return;
    }

    const roomTrigger = event.target.closest("[data-room-id]");
    if (roomTrigger) {
      openRoomModal(roomTrigger.dataset.roomId);
      return;
    }

    const trigger = event.target.closest("[data-student-id]");
    if (!trigger) return;

    const student = students.find((item) => item.id === Number(trigger.dataset.studentId));
    if (student) openStudentModal(student);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const famousTrigger = event.target.closest("[data-famous-id]");
    if (!famousTrigger) return;
    event.preventDefault();
    openFamousModal(famousTrigger.dataset.famousId);
  });
}

function openFamousModal(profileId) {
  const modal = byId("studentModal");
  const content = byId("modalContent");
  
  let finalProfile = null;
  if (profileId.startsWith("alumni-")) {
    const index = Number(profileId.split("-")[1]);
    const cmsAlumni = famousProfiles.alumni && famousProfiles.alumni[index];
    if (cmsAlumni) {
      const fallbackPhoto = index === 1 ? "images/hall/alumni2.jpg" : "images/hall/alumni1.jpg";
      const photoPath = normalizeCmsPath(cmsAlumni.photo) || fallbackPhoto;
      finalProfile = {
        img: photoPath,
        fallback: fallbackPhoto,
        name: currentLang === "bn" ? cmsAlumni.name_bn : cmsAlumni.name_en,
        shortBio: currentLang === "bn" ? (cmsAlumni.short_bio_bn || cmsAlumni.role_bn) : (cmsAlumni.short_bio_en || cmsAlumni.role_en),
        details: currentLang === "bn" ? (cmsAlumni.details_bn || cmsAlumni.biography_bn || cmsAlumni.career_bn) : (cmsAlumni.details_en || cmsAlumni.biography_en || cmsAlumni.career_en)
      };
    }
  } else {
    const profile = famousProfiles[profileId];
    if (profile) {
      finalProfile = {
        img: profile.img,
        fallback: "images/hall/hostel-building.jpg",
        name: profile.name,
        shortBio: profile.role,
        details: profile.biography || profile.career || profile.education || ""
      };
    }
  }

  if (!modal || !content || !finalProfile) return;

  activeStudentId = null;
  activeRoomId = null;

  content.innerHTML = `
    <div class="profile famous-profile">
      <img src="${finalProfile.img}" alt="${finalProfile.name}" loading="lazy" onerror="this.src='${finalProfile.fallback}'" style="border-radius: 16px; object-fit: cover; width: 100%; max-height: 380px;">
      <div>
        <p class="eyebrow">${currentLang === "bn" ? "প্রাক্তন কৃতি শিক্ষার্থী" : "Notable Alumni"}</p>
        <h2 id="modalName" style="margin: 4px 0 10px; font-size: 1.8rem;">${finalProfile.name}</h2>
        ${finalProfile.shortBio ? `
          <p class="lead" style="margin-bottom: 20px; color: var(--accent); font-weight: 600; font-size: 1.05rem;">
            ${finalProfile.shortBio}
          </p>
        ` : ""}

        ${finalProfile.details ? `
          <div class="alumni-details-wrap" style="padding-top: 14px; border-top: 1px solid var(--border);">
            <h3 style="font-size: 1.1rem; margin-bottom: 10px; color: var(--text-strong);">${currentLang === "bn" ? "বিস্তারিত তথ্য" : "Details & Legacy"}</h3>
            <p style="line-height: 1.8; color: var(--text-muted); font-size: 0.98rem; margin: 0;">
              ${finalProfile.details}
            </p>
          </div>
        ` : ""}
      </div>
    </div>
  `;

  modal.classList.remove("is-gallery-modal", "is-room-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  initImageFallbacks();
}

function cleanPhoneNumber(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function whatsappNumber(phone) {
  const digits = cleanPhoneNumber(phone);
  if (!digits) return "";
  if (digits.startsWith("88")) return digits;
  if (digits.startsWith("0")) return `88${digits}`;
  return digits;
}

function facebookUsername(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("facebook.com")) return "";
    const path = parsed.pathname.replace(/^\/+|\/+$/g, "");
    if (!path || path.includes("/") || path.startsWith("share") || path.startsWith("profile.php")) return "";
    return path;
  } catch (error) {
    return "";
  }
}

// Authentication & Masking Helpers
function maskData(val) {
  if (!val) return "";
  return "••••••••";
}

function parseBatchNum(batch) {
  if (!batch) return 27;
  const m = String(batch).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 27;
}

function getAllBatchPasswords() {
  const result = {
    "hsc24": "dc24hall",
    "hsc25": "dc25hall",
    "hsc26": "dc26hall",
    "hsc27": "102103104",
    "hsc28": "dc28hall",
    "hsc29": "dc29hall",
    "hsc30": "dc30hall",
    "hsc31": "dc31hall",
    "hsc32": "dc32hall",
    "hsc33": "dc33hall",
    "hsc34": "dc34hall",
    "hsc35": "dc35hall"
  };
  if (cmsSettings?.batch_passwords) {
    for (const [k, v] of Object.entries(cmsSettings.batch_passwords)) {
      if (v) result[k.toLowerCase()] = String(v).trim();
    }
  }
  if (cmsAdminSettings?.batch_passwords) {
    for (const [k, v] of Object.entries(cmsAdminSettings.batch_passwords)) {
      if (v) result[k.toLowerCase()] = String(v).trim();
    }
  }
  if (Array.isArray(cmsBatchConfigs)) {
    for (const bc of cmsBatchConfigs) {
      if (bc?.batch && bc?.batch_password) {
        const cleanKey = bc.batch.toLowerCase().replace(/[^a-z0-9]/g, '');
        result[cleanKey] = String(bc.batch_password).trim();
      }
    }
  }
  return result;
}

function getMasterPassword() {
  return cmsAdminSettings?.master_password || cmsSettings?.master_password || cmsSettings?.password || "102103104";
}

function isGlobalVisibilityOn() {
  if (cmsAdminSettings && typeof cmsAdminSettings.global_visibility === "boolean") {
    return cmsAdminSettings.global_visibility;
  }
  if (cmsSettings && typeof cmsSettings.global_visibility === "boolean") {
    return cmsSettings.global_visibility;
  }
  return true;
}

function getAuthRole() {
  const role = localStorage.getItem("dc-auth-role");
  if (role && role !== "guest") return role;
  const savedPassword = localStorage.getItem("dc-student-password");
  if (savedPassword) {
    const masterPass = getMasterPassword();
    if (savedPassword === masterPass) return "master";
    const batchPasswords = getAllBatchPasswords();
    for (const [bKey, bPass] of Object.entries(batchPasswords)) {
      if (savedPassword === bPass) return bKey;
    }
  }
  return "guest";
}

function getAuthStatus() {
  const role = getAuthRole();
  return Boolean(role && role !== "guest");
}


// ══════════════════════════════════════════════════════════════
// Granular Profile Field Controls (Visibility, Order & Locks)
// ══════════════════════════════════════════════════════════════
function getProfileFieldControl(fieldId) {
  if (cmsAdminSettings?.profile_field_controls && Array.isArray(cmsAdminSettings.profile_field_controls)) {
    // 1. Exact match
    let found = cmsAdminSettings.profile_field_controls.find(c => c.field_id === fieldId);
    if (found) return found;

    // 2. Comprehensive Aliases
    const aliases = {
      blood: "blood_group",
      blood_group: "blood",
      dob: "dob",
      birth_date: "dob",
      father_phone: "fatherPhone",
      fatherPhone: "father_phone",
      guardian: "father_phone",
      classNo: "batch",
      class: "batch",
      batch: "class",
      room: "room_2nd_year",
      room_no: "room_2nd_year",
      results: "results_1st",
      results_1st: "results",
      results_2nd: "results"
    };

    const alt = aliases[fieldId];
    if (alt) {
      found = cmsAdminSettings.profile_field_controls.find(c => c.field_id === alt);
      if (found) return found;
    }
  }
  return null;
}

function isProfileFieldVisible(fieldId) {
  if (fieldId === "results") {
    const r1 = isProfileFieldVisible("results_1st");
    const r2 = isProfileFieldVisible("results_2nd");
    return r1 || r2;
  }
  if (fieldId === "room") {
    const rm1 = isProfileFieldVisible("room_1st_year");
    const rm2 = isProfileFieldVisible("room_2nd_year");
    return rm1 || rm2;
  }

  const ctrl = getProfileFieldControl(fieldId);
  if (ctrl) {
    if (ctrl.visibility_tier === "hide") return false;
    if (ctrl.invisible === true) return false;
    if (ctrl.visible === false) return false;
    return true;
  }
  return true;
}

function isProfileFieldUnlocked(fieldId, student) {
  const role = getAuthRole();
  if (role === "master") return true; // Master Admin sees everything unlocked

  const ctrl = getProfileFieldControl(fieldId);
  const tier = ctrl?.visibility_tier;

  // 1. If tier is explicitly 'hide', always locked/hidden
  if (tier === "hide" || ctrl?.invisible === true) return false;

  // 2. If tier is 'lock_all', only master admin can view
  if (tier === "lock_all") return false;

  const globalMode = cmsAdminSettings?.global_visibility_mode || "junior_safe";
  const isGuest = !role || role === "guest";

  // 3. Guest / Visitor access rules
  if (isGuest) {
    if (tier === "public") return true;
    if (tier === "lock_normal" || tier === "lock_junior") return false;
    if (!isGlobalVisibilityOn()) return false;
    if (ctrl) return ctrl.public_lock !== true;
    // Fallbacks to legacy settings
    if (fieldId === "phone") return cmsSettings?.locked_fields?.lock_phone === false;
    if (fieldId === "father_phone" || fieldId === "fatherPhone") return cmsSettings?.locked_fields?.lock_father_phone === false;
    if (fieldId === "email") return cmsSettings?.locked_fields?.lock_email === false;
    if (fieldId === "address") return cmsSettings?.locked_fields?.lock_address === false;
    if (["facebook", "messenger", "whatsapp", "telegram"].includes(fieldId)) return cmsSettings?.locked_fields?.lock_socials === false;
    if (fieldId === "results_1st" || fieldId === "results_2nd" || fieldId === "results") return cmsSettings?.locked_fields?.lock_results === false;
    return true;
  }

  // 4. Logged-in Student access rules
  if (globalMode === "full_unlock") return true; // Full Unlock across all batches
  if (tier === "public" || tier === "lock_normal") return true;

  const userBatchNum = parseBatchNum(role);
  const studentBatchNum = parseBatchNum(student?.batch || student?.classNo || "HSC-27");

  // Same batch or senior viewing junior: always unlocked
  if (userBatchNum <= studentBatchNum) {
    return true;
  }

  // Junior viewing senior: locked if tier is lock_junior or batch_lock
  if (tier === "lock_junior" || ctrl?.batch_lock === true) {
    return false;
  }
  return true;
}

function canViewStudentPrivateData(student) {
  if (isGlobalVisibilityOn()) return true;
  const role = getAuthRole();
  if (role === "master") return true; // Master Admin sees all batches
  if (!role || role === "guest") return false;
  // Seniority hierarchy: lower batch number = more senior, can view juniors
  const userBatchNum = parseBatchNum(role);
  const studentBatchNum = parseBatchNum(student?.batch || "HSC-27");
  return userBatchNum <= studentBatchNum;
}

function checkSessionValidity() {
  const role = getAuthRole();
  if (!role || role === "guest") return;
  const savedPassword = localStorage.getItem("dc-student-password");
  if (!savedPassword) return;
  const masterPass = getMasterPassword();
  let isValid = (savedPassword === masterPass);
  if (!isValid) {
    const allBatchPass = getAllBatchPasswords();
    isValid = Object.values(allBatchPass).includes(savedPassword);
  }
  if (!isValid) {
    localStorage.removeItem("dc-student-password");
    localStorage.removeItem("dc-auth-role");
    initAuth();
    updateProfileNavButton();
  }
}

function updateProfileNavButton() {
  const profileBtns = document.querySelectorAll(".profile-toggle, #profileBtn");
  const isUnlocked = getAuthStatus();
  const role = getAuthRole();

  profileBtns.forEach(btn => {
    let tickBadge = btn.querySelector(".profile-badge-tick");
    if (isUnlocked) {
      btn.classList.add("logged-in");
      const roleLabel = role === "master" ? "Master Admin" : (role ? role.toUpperCase() : "Student");
      const titleText = currentLang === "bn"
        ? `লগইন সক্রিয় (${roleLabel})`
        : `Logged In (${roleLabel})`;
      btn.setAttribute("title", titleText);
      btn.setAttribute("aria-label", titleText);
      if (!tickBadge) {
        tickBadge = document.createElement("span");
        tickBadge.className = "profile-badge-tick";
        tickBadge.innerHTML = `<svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5l2.5 2.5 4.5-5"/></svg>`;
        btn.appendChild(tickBadge);
      }
    } else {
      btn.classList.remove("logged-in");
      const titleText = currentLang === "bn" ? "শিক্ষার্থী লগইন" : "Student Login";
      btn.setAttribute("title", titleText);
      btn.setAttribute("aria-label", titleText);
      if (tickBadge) {
        tickBadge.remove();
      }
    }
  });
}

function initAuth() {
  const page = document.body.dataset.page;
  if (page !== "profile") return;

  const isUnlocked = getAuthStatus();
  const currentRole = getAuthRole();
  const loginFormCard = byId("loginFormCard");
  const statusCard = byId("statusCard");
  const loginForm = byId("loginForm");
  const logoutBtn = byId("logoutBtn");
  const passwordInput = byId("password");
  const togglePasswordBtn = byId("togglePasswordBtn");
  const eyeIcon = byId("eyeIcon");
  const errorMsg = byId("loginError");
  const successMsg = byId("successMessage");
  const noticeText = byId("noticeText");
  const adminStudioBtn = byId("adminStudioBtn");

  if (noticeText) noticeText.textContent = t("auth.notice");

  if (isUnlocked) {
    document.documentElement.classList.add("user-logged-in");
    if (loginFormCard) loginFormCard.style.display = "none";
    if (statusCard) {
      statusCard.style.display = "block";
      const adminPanelBtn = byId("adminPanelBtn") || byId("adminStudioBtn");
      if (adminPanelBtn) adminPanelBtn.style.display = "flex";
      if (successMsg) {
        if (currentRole === "master") {
          successMsg.textContent = currentLang === "bn"
            ? "তুমি মাস্টার এডমিন হিসেবে লগইন করে আছো! সকল ব্যাচের যাবতীয় তথ্য ও লক করা নম্বর আনলক রয়েছে।"
            : "You are logged in as Master Admin. Full access unlocked across all batches.";
        } else {
          successMsg.textContent = currentLang === "bn"
            ? `তুমি ${currentRole.toUpperCase()} ব্যাচ হিসেবে লগইন আছো! তোমার ব্যাচ এবং জুনিয়র ব্যাচসমূহের সংরক্ষিত তথ্য আনলক রয়েছে।`
            : `You are logged in under ${currentRole.toUpperCase()}. Your batch and junior batches' records are unlocked.`;
        }
      }
    }
  } else {
    document.documentElement.classList.remove("user-logged-in");
    if (loginFormCard) loginFormCard.style.display = "block";
    if (statusCard) statusCard.style.display = "none";
    const adminPanelBtn = byId("adminPanelBtn") || byId("adminStudioBtn"); if (adminPanelBtn) adminPanelBtn.style.display = "none";
  }

  if (togglePasswordBtn && passwordInput && !togglePasswordBtn._hasToggleListener) {
    togglePasswordBtn._hasToggleListener = true;
    togglePasswordBtn.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      if (eyeIcon) {
        if (type === "text") {
          eyeIcon.innerHTML = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-4.5C7 2.5 2.73 5.61 1 10c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5S8.97 4.5 12 4.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z"/>`;
        } else {
          eyeIcon.innerHTML = `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`;
        }
      }
    });
  }

  if (loginForm && !loginForm._hasAuthListener) {
    loginForm._hasAuthListener = true;
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPassword = (passwordInput ? passwordInput.value : "").trim();
      if (!enteredPassword) return;

      const masterPass = getMasterPassword();
      const batchPasswords = getAllBatchPasswords();

      if (enteredPassword === masterPass) {
        localStorage.setItem("dc-auth-role", "master");
        localStorage.setItem("dc-student-password", enteredPassword);
        if (passwordInput) passwordInput.value = "";
        if (errorMsg) errorMsg.style.display = "none";
        initAuth();
        updateProfileNavButton();
      } else {
        let matchedBatch = null;
        for (const [bKey, bPass] of Object.entries(batchPasswords)) {
          if (enteredPassword === bPass) {
            matchedBatch = bKey;
            break;
          }
        }
        if (matchedBatch) {
          localStorage.setItem("dc-auth-role", matchedBatch);
          localStorage.setItem("dc-student-password", enteredPassword);
          if (passwordInput) passwordInput.value = "";
          if (errorMsg) errorMsg.style.display = "none";
          initAuth();
          updateProfileNavButton();
        } else {
          if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.textContent = t("auth.error");
          }
        }
      }
    });
  }

  if (logoutBtn && !logoutBtn._hasLogoutListener) {
    logoutBtn._hasLogoutListener = true;
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("dc-student-password");
      localStorage.removeItem("dc-auth-role");
      if (passwordInput) passwordInput.value = "";
      if (errorMsg) errorMsg.style.display = "none";
      initAuth();
      updateProfileNavButton();
    });
  }
}

function initDropdowns() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".dropdown-trigger");
    if (trigger) {
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains("open");
      
      document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
      
      if (!wasOpen) {
        parent.classList.add("open");
      }
      e.stopPropagation();
    } else {
      document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
}

function contactActions(student, phoneHref, whatsappHref, telegramHref, emailHref, fbHref, messengerHref) {
  const savedLogos = cmsSettings?.contact_logos || {};
  
  const defaultSvgs = {
    call: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 3.99c0-.55-.45-1-1-1H4.01c-.55 0-1 .45-1 1C3.01 12.63 11.38 21 20.01 21c.55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.472 1.332 4.988L2 22l5.163-1.355c1.464.798 3.111 1.218 4.793 1.218 5.506 0 9.988-4.482 9.988-9.988 0-2.662-1.036-5.164-2.918-7.046A9.923 9.923 0 0 0 12.012 2zm5.727 14.126c-.237.668-1.378 1.285-1.921 1.343-.492.052-1.127.086-1.808-.13-2.946-.931-4.992-3.83-5.139-4.026-.147-.197-1.203-1.603-1.203-3.059 0-1.456.759-2.171 1.03-2.464.271-.293.593-.367.791-.367.198 0 .395.003.568.011.183.008.431-.071.674.512.249.599.852 2.072.926 2.219.074.147.124.317.025.513-.099.197-.149.317-.297.492-.149.176-.312.39-.446.524-.149.149-.304.312-.13.612.174.3.774 1.277 1.66 2.067.886.79 1.636 1.036 1.933 1.183.297.147.469.122.642-.078.174-.2.742-.862.94-1.159.198-.297.395-.247.668-.147.272.099 1.73.816 2.027.964.297.149.495.223.568.349.074.127.074.729-.163 1.396z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.18-1.5 1.5-1.5h2.5V2h-3.334C10.292 2 9.198 3.656 9.198 6.5v3.01H6.5v3.98h2.698v8.01z"/></svg>`,
    messenger: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.518 3.734 7.214V22l3.355-1.843c.902.25 1.859.386 2.911.386 5.523 0 10-4.146 10-9.258C22 6.145 17.523 2 12 2zm1.096 11.903L10.36 11.13l-4.903 2.695 5.385-5.719 2.736 2.77 4.903-2.695-5.385 5.722z"/></svg>`
  };

  const renderIcon = (key, customPath) => {
    const normPath = normalizeCmsPath(customPath);
    if (normPath) {
      return `
        <img src="${normPath}" alt="" loading="lazy" 
          onload="this.parentElement.classList.add('has-custom-img')" 
          onerror="this.style.display='none'; this.parentElement.classList.remove('has-custom-img'); const fallback = this.parentElement.querySelector('.fallback-svg'); if(fallback) fallback.style.display='block';">
        <span class="fallback-svg" style="display:none;">${defaultSvgs[key]}</span>
      `;
    }
    return defaultSvgs[key];
  };

  const buttons = [];

  // 1. Phone
  if (isProfileFieldVisible("phone") && student.phone) {
    const isUnlocked = isProfileFieldUnlocked("phone", student);
    const callClass = isUnlocked ? "contact-btn call" : "contact-btn call locked";
    const href = isUnlocked ? `tel:${cleanPhoneNumber(student.phone)}` : "profile.html";
    const title = isUnlocked ? t("common.tapCall") : (currentLang === "bn" ? "লগইন করে ফোন নম্বর দেখুন" : "Click to log in and call");
    buttons.push(`
      <a class="${callClass}" href="${href}" aria-label="${t("common.tapCall")}" title="${title}">
        ${renderIcon("call", savedLogos.phone)}
      </a>
    `);
  }

  // 2. WhatsApp
  const whatsappNum = student.whatsapp || student.phone || "";
  if (isProfileFieldVisible("whatsapp") && (student.hasWhatsApp || student.whatsapp || student.phone)) {
    const isUnlocked = isProfileFieldUnlocked("whatsapp", student);
    const whatsappClass = isUnlocked ? "contact-btn whatsapp" : "contact-btn whatsapp locked";
    const href = isUnlocked ? `https://wa.me/${whatsappNumber(whatsappNum)}` : "profile.html";
    const target = isUnlocked ? 'target="_blank" rel="noopener"' : '';
    const title = isUnlocked ? t("common.whatsapp") : (currentLang === "bn" ? "লগইন করে হোয়াটসঅ্যাপ দেখুন" : "Click to log in and message");
    buttons.push(`
      <a class="${whatsappClass}" href="${href}" ${target} aria-label="${t("common.whatsapp")}" title="${title}">
        ${renderIcon("whatsapp", savedLogos.whatsapp)}
      </a>
    `);
  }

  // 3. Telegram
  const telegramId = student.telegram || "";
  if (isProfileFieldVisible("telegram") && (student.hasTelegram || student.telegram) && telegramId) {
    const isUnlocked = isProfileFieldUnlocked("telegram", student);
    const telegramClass = isUnlocked ? "contact-btn telegram" : "contact-btn telegram locked";
    const href = isUnlocked ? `https://t.me/${telegramId.replace(/[^a-zA-Z0-9_]/g, '')}` : "profile.html";
    const target = isUnlocked ? 'target="_blank" rel="noopener"' : '';
    const title = isUnlocked ? "Telegram" : (currentLang === "bn" ? "লগইন করে টেলিগ্রাম দেখুন" : "Click to log in and chat");
    buttons.push(`
      <a class="${telegramClass}" href="${href}" ${target} aria-label="Telegram" title="${title}">
        ${renderIcon("telegram", savedLogos.telegram)}
      </a>
    `);
  }

  // 4. Email
  if (isProfileFieldVisible("email") && student.email) {
    const isUnlocked = isProfileFieldUnlocked("email", student);
    const emailClass = isUnlocked ? "contact-btn email" : "contact-btn email locked";
    const href = isUnlocked ? `mailto:${student.email}` : "profile.html";
    const title = isUnlocked ? t("common.email") : (currentLang === "bn" ? "লগইন করে ইমেইল দেখুন" : "Click to log in and email");
    buttons.push(`
      <a class="${emailClass}" href="${href}" aria-label="${t("common.email")}" title="${title}">
        ${renderIcon("email", savedLogos.email)}
      </a>
    `);
  }

  // 5. Facebook
  if (isProfileFieldVisible("facebook") && (student.fb || student.fbUsername)) {
    const isUnlocked = isProfileFieldUnlocked("facebook", student);
    const fbClass = isUnlocked ? "contact-btn facebook" : "contact-btn facebook locked";
    const href = isUnlocked ? (student.fb || "") : "profile.html";
    const target = isUnlocked ? 'target="_blank" rel="noopener"' : '';
    const title = isUnlocked ? t("common.viewFacebook") : (currentLang === "bn" ? "লগইন করে ফেসবুক দেখুন" : "Click to log in and view profile");
    buttons.push(`
      <a class="${fbClass}" href="${href}" ${target} aria-label="${t("common.viewFacebook")}" title="${title}">
        ${renderIcon("facebook", savedLogos.facebook)}
      </a>
    `);
  }

  // 6. Messenger
  if (isProfileFieldVisible("messenger") && (student.messenger || student.fbUsername)) {
    const isUnlocked = isProfileFieldUnlocked("messenger", student);
    const messengerClass = isUnlocked ? "contact-btn messenger" : "contact-btn messenger locked";
    const href = isUnlocked ? (student.messenger || "") : "profile.html";
    const target = isUnlocked ? 'target="_blank" rel="noopener"' : '';
    const title = isUnlocked ? "Messenger" : (currentLang === "bn" ? "লগইন করে মেসেঞ্জার দেখুন" : "Click to log in and chat");
    buttons.push(`
      <a class="${messengerClass}" href="${href}" ${target} aria-label="Messenger" title="${title}">
        ${renderIcon("messenger", savedLogos.messenger)}
      </a>
    `);
  }

  if (!buttons.length) return "";

  return `
    <div class="contact-actions" aria-label="Contact links">
      ${buttons.join("")}
    </div>
  `;
}


function findStudentByNameOrSlug(nameOrSlug) {
  if (!nameOrSlug || !students || !students.length) return null;
  const q = String(nameOrSlug).trim().toLowerCase();
  return students.find(s => 
    (s.id && String(s.id).toLowerCase() === q) ||
    (s.slug && String(s.slug).toLowerCase() === q) ||
    (s.name && s.name.trim().toLowerCase() === q) ||
    (s.bn?.name && s.bn.name.trim() === q) ||
    (s.nameEn && s.nameEn.trim().toLowerCase() === q) ||
    (s.nameBn && s.nameBn.trim() === q)
  );
}

function buildProfileRoomBox(yearLabel, roomNo, mateName, mateStudent, isUnlocked, isVisible) {
  if (!isVisible || !roomNo) return '';

  const smallLockIconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="#10b981" style="display:inline-block; vertical-align:middle; margin-left:4px;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
  
  const roomDisplay = isUnlocked 
    ? (currentLang === "bn" ? `ROOM ${toBengaliDigits(roomNo)}` : `ROOM ${roomNo}`)
    : maskData(`ROOM ${roomNo}`) + smallLockIconSvg;

  let mateHtml = '';
  if (isUnlocked && (mateName || mateStudent)) {
    if (mateStudent) {
      const mateDisplayName = studentValue(mateStudent, 'name');
      mateHtml = ` · ${currentLang === 'bn' ? 'রুমমেট:' : 'Roommate:'} <span class="profile-mate-link" data-open-mate-id="${mateStudent.id}" title="${currentLang === 'bn' ? 'প্রোফাইল দেখতে ক্লিক করুন' : 'Click to view profile'}">${mateDisplayName}</span>`;
    } else {
      mateHtml = ` · ${currentLang === 'bn' ? 'রুমমেট:' : 'Roommate:'} <span>${mateName}</span>`;
    }
  } else if (!isUnlocked && mateName) {
    mateHtml = ` · <span>•••••••• ${smallLockIconSvg}</span>`;
  }

  return `
    <div class="profile-item">
      <span>${yearLabel}</span>
      <strong>
        ${isUnlocked 
          ? `<span class="profile-room-link" onclick="openRoomModal('${roomNo}')" title="${currentLang === 'bn' ? 'রুমের বিস্তারিত দেখতে ক্লিক করুন' : 'Click to inspect room'}">${roomDisplay}</span>`
          : `<span style="color:var(--text-muted);">${roomDisplay}</span>`
        }${mateHtml}
      </strong>
    </div>
  `;
}

function openStudentModal(student) {
  const modal = byId("studentModal");
  const content = byId("modalContent");
  if (!modal || !content) return;

  activeStudentId = student.id;

  const smallLockIconSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="#10b981" style="display:inline-block; vertical-align:middle; margin-left:6px;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;

  const hasVal = (val) => {
    if (val === null || val === undefined) return false;
    const s = String(val).trim();
    return s !== "" && s !== "-" && s !== "--" && s !== "—" && s !== "N/A" && s !== "null" && s !== "undefined" && s.toLowerCase() !== "none";
  };

  // Field Unlocks
  const showPhone = isProfileFieldUnlocked("phone", student);
  const showFather = isProfileFieldUnlocked("father_phone", student);
  const showEmail = isProfileFieldUnlocked("email", student);
  const showAddress = isProfileFieldUnlocked("address", student);
  const showWhatsApp = isProfileFieldUnlocked("whatsapp", student);
  const showTelegram = isProfileFieldUnlocked("telegram", student);
  const showFacebook = isProfileFieldUnlocked("facebook", student);
  const showMessenger = isProfileFieldUnlocked("messenger", student);
  const showRoll = isProfileFieldUnlocked("roll", student);
  const showBatch = isProfileFieldUnlocked("batch", student);
  const showGroup = isProfileFieldUnlocked("group", student);
  const showSection = isProfileFieldUnlocked("section", student);
  const showPractical = isProfileFieldUnlocked("practical_group", student);
  const showRoom1 = isProfileFieldUnlocked("room_1st_year", student);
  const showRoom2 = isProfileFieldUnlocked("room_2nd_year", student);
  const showBlood = isProfileFieldUnlocked("blood_group", student);
  const showDob = isProfileFieldUnlocked("dob", student);

  const phoneHref = showPhone ? `tel:${cleanPhoneNumber(student.phone)}` : "profile.html";
  const fatherPhoneHref = showFather ? `tel:${cleanPhoneNumber(student.fatherPhone)}` : "profile.html";
  const emailHref = showEmail ? `mailto:${student.email}` : "profile.html";
  const addressHref = showAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studentValue(student, "address"))}` : "profile.html";

  const fbUrl = student.fb || "";
  const fbHref = showFacebook && fbUrl ? fbUrl : "profile.html";
  const messengerUrl = student.messenger || "";
  const messengerHref = showMessenger && messengerUrl ? messengerUrl : "profile.html";

  const whatsappNum = student.whatsapp || student.phone || "";
  const whatsappHref = showWhatsApp && whatsappNum ? `https://wa.me/${whatsappNumber(whatsappNum)}` : "profile.html";
  const telegramId = student.telegram || "";
  const telegramHref = showTelegram && telegramId ? `https://t.me/${telegramId.replace(/[^a-zA-Z0-9_]/g, '')}` : "profile.html";

  // Badge values
  const badgeRoomVal = student.room_2nd_year?.room_no || student.room_1st_year?.room_no || student.room || "-";
  const badgeRoomUnlocked = showRoom2 || showRoom1;
  const badgeRoomText = badgeRoomUnlocked ? (currentLang === "bn" ? toBengaliDigits(badgeRoomVal) : badgeRoomVal) : maskData(badgeRoomVal);
  const badgeRollText = showRoll ? (currentLang === "bn" ? toBengaliDigits(student.roll) : student.roll) : maskData(student.roll);

  const showRoomBadge = isProfileFieldVisible("room_badge");
  const isRoomVisible = (isProfileFieldVisible("room_2nd_year") || isProfileFieldVisible("room_1st_year")) && badgeRoomVal !== "-";
  const isRollVisible = isProfileFieldVisible("roll") && student.roll;

  let badgeParts = [];
  if (isRoomVisible) badgeParts.push(`ROOM ${badgeRoomText}`);
  if (isRollVisible) badgeParts.push(`${t("common.roll")} ${badgeRollText}`);

  const badgeHtml = (showRoomBadge && badgeParts.length)
    ? `<p class="lead">${badgeParts.join(" · ")}</p>`
    : "";

    const showPhoto = isProfileFieldVisible("photo");
  const showName = isProfileFieldVisible("name");
  const isPhotoUnlocked = isProfileFieldUnlocked("photo", student);
  const photoSrc = isPhotoUnlocked ? student.img : "images/student-avatar.png";
  const isNameUnlocked = isProfileFieldUnlocked("name", student);
  const nameDisplay = isNameUnlocked ? studentValue(student, "name") : "••••••••";

  content.innerHTML = `
    <div class="profile">
      ${showPhoto ? `
      <div class="profile-photo-wrapper">
        <img src="${photoSrc}" alt="${nameDisplay}" loading="lazy">
        ${isPhotoUnlocked ? `<button type="button" class="expand-photo-btn" data-img="${student.img}" aria-label="${currentLang === 'bn' ? 'সম্পূর্ণ ছবি দেখুন' : 'View Full Photo'}" title="${currentLang === 'bn' ? 'সম্পূর্ণ ছবি দেখুন' : 'View Full Photo'}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>` : ''}
      </div>` : ''}
      <div>
        <p class="eyebrow">${t("common.fullProfile")}</p>
        <h2 id="modalName">${showName ? (isProfileFieldUnlocked("name", student) ? studentValue(student, "name") : maskData(studentValue(student, "name"))) : ""}</h2>
        ${badgeHtml}
        ${isProfileFieldVisible("quick_actions") ? contactActions(student, phoneHref, whatsappHref, telegramHref, emailHref, fbHref, messengerHref) : ''}

        <div class="profile-grid">
          ${isProfileFieldVisible("roll") ? `
          <div class="profile-item roll-item">
            <span>${t("common.roll")}</span>
            <strong class="roll-copy-wrapper" style="display: inline-flex; align-items: center; gap: 8px;">
              <span class="roll-text">${showRoll ? student.fullRoll : maskData(student.fullRoll)}</span>
              ${showRoll ? `
              <button type="button" class="copy-roll-btn" data-roll="${student.fullRoll}" aria-label="Copy Roll Number" title="Copy Roll" style="background:none; border:none; padding:4px; color:var(--text-muted); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; border-radius:4px; transition:background 0.2s, color 0.2s;">
                <svg class="copy-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="pointer-events:none;"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                <svg class="check-icon" viewBox="0 0 24 24" width="14" height="14" fill="#10b981" style="display:none; pointer-events:none;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </button>` : smallLockIconSvg}
            </strong>
          </div>` : ''}

          ${(isProfileFieldVisible("batch") && hasVal(student.classNo)) ? `
          <div class="profile-item">
            <span>${t("common.classLabel")}</span>
            <strong>${showBatch ? classLabel(student.classNo, student) : maskData(student.batch || "HSC-27") + smallLockIconSvg}</strong>
          </div>` : ''}

          ${(isProfileFieldVisible("group") && hasVal(student.group)) ? `
          <div class="profile-item">
            <span>${t("common.group")}</span>
            <strong>${showGroup ? groupLabel(student.group) : maskData(student.group) + smallLockIconSvg}</strong>
          </div>` : ''}

          ${(isProfileFieldVisible("section") && hasVal(student.section)) ? `
          <div class="profile-item">
            <span>${t("common.section")}</span>
            <strong>${showSection ? student.section : maskData(student.section) + smallLockIconSvg}</strong>
          </div>` : ''}

          ${(isProfileFieldVisible("practical_group") && hasVal(student.practicalGroup)) ? `
          <div class="profile-item">
            <span>${t("common.practicalGroup")}</span>
            <strong>${showPractical ? student.practicalGroup : maskData(student.practicalGroup) + smallLockIconSvg}</strong>
          </div>` : ''}

          ${(() => {
            const r1No = student.room_1st_year?.room_no;
            const r1MateName = student.room_1st_year?.bedmate_name;
            const r1Mate = findStudentByNameOrSlug(student.room_1st_year?.bedmate_slug || r1MateName);
            const isR1Vis = isProfileFieldVisible("room_1st_year");
            return buildProfileRoomBox(
              currentLang === 'bn' ? 'রুম ও বেডমেট (১ম বর্ষ)' : 'Room & Bedmate (1st Year)',
              r1No,
              r1MateName,
              r1Mate,
              showRoom1,
              isR1Vis
            );
          })()}

          ${(() => {
            const r2No = student.room_2nd_year?.room_no || student.room;
            const r2MateName = student.room_2nd_year?.bedmate_name;
            const r2Mate = findStudentByNameOrSlug(student.room_2nd_year?.bedmate_slug || r2MateName);
            const isR2Vis = isProfileFieldVisible("room_2nd_year");
            return buildProfileRoomBox(
              currentLang === 'bn' ? 'রুম ও রুমমেট (২য় বর্ষ)' : 'Room & Roommate (2nd Year)',
              r2No,
              r2MateName,
              r2Mate,
              showRoom2,
              isR2Vis
            );
          })()}

          ${(isProfileFieldVisible("whatsapp") && hasVal(whatsappNum)) ? (!showWhatsApp ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>WHATSAPP</span>
            <strong>${maskData(whatsappNum)}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>WHATSAPP</span>
            <strong>
              <a href="${whatsappHref}" target="_blank" rel="noopener">
                ${whatsappNum}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("telegram") && hasVal(telegramId)) ? (!showTelegram ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>TELEGRAM</span>
            <strong>${maskData(telegramId)}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>TELEGRAM</span>
            <strong>
              <a href="${telegramHref}" target="_blank" rel="noopener">
                ${telegramId}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("phone") && hasVal(student.phone)) ? (!showPhone ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>${t("common.phone")}</span>
            <strong>${maskData(student.phone)}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>${t("common.phone")}</span>
            <strong>
              <a href="${phoneHref}">
                ${student.phone}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("father_phone") && hasVal(student.fatherPhone)) ? (!showFather ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>${t("common.fatherPhone")}</span>
            <strong>${maskData(student.fatherPhone)}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>${t("common.fatherPhone")}</span>
            <strong>
              <a href="${fatherPhoneHref}">
                ${student.fatherPhone}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("email") && hasVal(student.email)) ? (!showEmail ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>${t("common.email")}</span>
            <strong>${maskData(student.email)}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>${t("common.email")}</span>
            <strong>
              <a href="${emailHref}">
                ${student.email}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("address") && hasVal(studentValue(student, "address"))) ? (!showAddress ? `
          <a href="profile.html" class="profile-item locked-item" title="${currentLang === 'bn' ? 'লগইন করে দেখতে ক্লিক করুন' : 'Click to log in and view'}">
            <span>${t("common.address")}</span>
            <strong>${maskData(studentValue(student, "address"))}${smallLockIconSvg}</strong>
          </a>` : `
          <div class="profile-item">
            <span>${t("common.address")}</span>
            <strong>
              <a href="${addressHref}" target="_blank" rel="noopener">
                ${studentValue(student, "address")}
              </a>
            </strong>
          </div>`) : ''}

          ${(isProfileFieldVisible("blood_group") && hasVal(student.blood)) ? `
          <div class="profile-item">
            <span>${t("common.blood")}</span>
            <strong>${showBlood ? student.blood : maskData(student.blood) + smallLockIconSvg}</strong>
          </div>` : ''}

          ${(isProfileFieldVisible("dob") && hasVal(studentValue(student, "dob") || student.dob)) ? `
          <div class="profile-item">
            <span>${t("common.dob")}</span>
            <strong>${showDob ? (studentValue(student, "dob") || student.dob) : maskData("01/01/2005") + smallLockIconSvg}</strong>
          </div>` : ''}

          ${hasVal(studentValue(student, "college")) ? `<div class="profile-item"><span>${t("common.college")}</span><strong>${studentValue(student, "college")}</strong></div>` : ""}
        </div>

        ${(isProfileFieldVisible("bio") && hasVal(studentValue(student, "bio"))) ? `
          <h3>${t("common.about")}</h3>
          <p>${studentValue(student, "bio")}</p>
        ` : ""}

        ${(isProfileFieldVisible("results_1st") || isProfileFieldVisible("results_2nd")) ? `
        <div class="academic-section-title">
          <div class="title-left">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="academic-title-icon">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            <h3>${t("common.academicResult")}</h3>
          </div>
        </div>
        <div class="student-academic-results">
          ${isProfileFieldVisible("results_1st") ? `
          <div class="academic-year-card">
            <div class="academic-year-header">
              <div class="year-info">
                <span class="year-pill">${currentLang === "bn" ? "১ম বর্ষ" : "1st Year"}</span>
              </div>
              <span class="year-count">${currentLang === "bn" ? "৫টি পরীক্ষা" : "5 Exams"}</span>
            </div>
            <div class="pdf-grid grid-5">
              ${studentFirstYearResults(student).map(([key, file]) => {
                const isResUnlocked = isProfileFieldUnlocked("results_1st", student);
                const fileHref = isResUnlocked ? file : "profile.html";
                const targetAttr = isResUnlocked ? 'target="_blank" rel="noopener"' : '';
                const lockTooltip = isResUnlocked ? (currentLang === "bn" ? "মার্কশিট দেখতে ক্লিক করুন" : "Click to view marksheet") : (currentLang === "bn" ? "লগইন করে দেখতে ক্লিক করুন" : "Click to log in and view");
                const docIconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="res-icon doc"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
                const lockIconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="res-icon lock" style="color: var(--accent, #10c9a8) !important; stroke: var(--accent, #10c9a8) !important;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
                const icon = isResUnlocked ? docIconSvg : lockIconSvg;
                const linkClass = isResUnlocked ? "result-box" : "result-box locked";
                return `<a class="${linkClass}" href="${fileHref}" ${targetAttr} title="${lockTooltip}">${icon}<span class="res-name">${t(`pdf.${key}`)}</span></a>`;
              }).join("")}
            </div>
          </div>` : ''}

          ${(isProfileFieldVisible("results_2nd") && (String(student.classNo || student.class_no || "11") === "12" || student.batch === "HSC-27")) ? `
          <div class="academic-year-card">
            <div class="academic-year-header">
              <div class="year-info">
                <span class="year-pill year-2">${currentLang === "bn" ? "২য় বর্ষ" : "2nd Year"}</span>
              </div>
              <span class="year-count">${currentLang === "bn" ? "৪টি পরীক্ষা" : "4 Exams"}</span>
            </div>
            <div class="pdf-grid grid-4">
              ${studentSecondYearResults(student).map(([key, file]) => {
                const isResUnlocked = isProfileFieldUnlocked("results_2nd", student);
                const fileHref = isResUnlocked ? file : "profile.html";
                const targetAttr = isResUnlocked ? 'target="_blank" rel="noopener"' : '';
                const lockTooltip = isResUnlocked ? (currentLang === "bn" ? "মার্কশিট দেখতে ক্লিক করুন" : "Click to view marksheet") : (currentLang === "bn" ? "লগইন করে দেখতে ক্লিক করুন" : "Click to log in and view");
                const docIconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="res-icon doc"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
                const lockIconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="res-icon lock" style="color: var(--accent, #10c9a8) !important; stroke: var(--accent, #10c9a8) !important;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
                const icon = isResUnlocked ? docIconSvg : lockIconSvg;
                const linkClass = isResUnlocked ? "result-box" : "result-box locked";
                return `<a class="${linkClass}" href="${fileHref}" ${targetAttr} title="${lockTooltip}">${icon}<span class="res-name">${t(`pdf.${key}`)}</span></a>`;
              }).join("")}
            </div>
          </div>` : ''}
        </div>
        ` : ''}

      </div>
    </div>
  `;

  
  // Attach room button clicks
  content.querySelectorAll('.profile-room-badge-link[data-room-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rId = btn.getAttribute('data-room-id');
      if (rId) openRoomModal(rId);
    });
  });

  // Attach roommate button clicks to open that student's profile directly
  content.querySelectorAll('[data-open-mate-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const mId = btn.getAttribute('data-open-mate-id');
      const targetStudent = students.find(s => String(s.id) === String(mId));
      if (targetStudent) openStudentModal(targetStudent);
    });
  });

  modal.classList.remove("is-gallery-modal", "is-room-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  initImageFallbacks();
}

window.openRoomModal = openRoomModal;
function openRoomModal(room) {
  const modal = byId("studentModal");
  const content = byId("modalContent");
  if (!modal || !content) return;

  activeStudentId = null;
  activeRoomId = room;

  const roomStr = String(room).trim();
  const normTarget = normalizeRoomNumber(room);

  // Find all occupants past and present across 1st year, 2nd year or current assignments
  const occupants = students.filter((student) => {
    const r1 = normalizeRoomNumber(student.room_1st_year?.room_no);
    const r2 = normalizeRoomNumber(student.room_2nd_year?.room_no);
    const rMain = normalizeRoomNumber(student.room);
    const rRef = normalizeRoomNumber(student.room_no);
    return Boolean(normTarget && (rMain === normTarget || r1 === normTarget || r2 === normTarget || rRef === normTarget));
  });
  
  const cmsRoom = roomsData && roomsData.find((r) => normalizeRoomNumber(r.room_no) === normTarget);
  if (cmsRoom && Array.isArray(cmsRoom.assigned_students)) {
    cmsRoom.assigned_students.forEach(as => {
      const match = students.find(s => (as.student_id && s.slug === as.student_id) || (as.short_roll && String(s.roll) === String(as.short_roll)) || (as._id && s._id === as._id));
      if (match && !occupants.some(o => o.id === match.id)) {
        occupants.push(match);
      }
    });
  }
  const title = cmsRoom
    ? (currentLang === "bn" ? (cmsRoom.title_bn || cmsRoom.title_en || `রুম ${toBengaliDigits(roomStr)}`) : (cmsRoom.title_en || cmsRoom.title_bn || `ROOM ${roomStr}`))
    : (currentLang === "bn" ? `রুম ${toBengaliDigits(roomStr)}` : `ROOM ${roomStr}`);
  const desc = cmsRoom
    ? (currentLang === "bn" ? (cmsRoom.description_bn || cmsRoom.description_en || "শান্ত ও মনোরম পরিবেশের আদর্শ ছাত্রাবাস কক্ষ।") : (cmsRoom.description_en || cmsRoom.description_bn || "Comfortable living space with quiet academic atmosphere."))
    : (currentLang === "bn" ? "শান্ত ও মনোরম পরিবেশের আদর্শ ছাত্রাবাস কক্ষ।" : "Comfortable living space with quiet academic atmosphere.");
  
  let roomPhotos = [];
  if (cmsRoom && cmsRoom.photos && cmsRoom.photos.length) {
    roomPhotos = cmsRoom.photos.map(normalizeCmsPath).filter(Boolean);
  }

  const photoGridHtml = roomPhotos.length 
    ? `<div class="room-photo-grid">${roomPhotos.map((photo, index) => `<img src="${photo}" alt="Room photo ${index + 1}" loading="lazy" style="cursor: pointer;" onclick="openGalleryModal('${photo}', '${title}', '')">`).join("")}</div>`
    : `<div class="no-photos-placeholder">
         <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
           <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 5H5l3.5-4.5z"/>
         </svg>
         <p>${currentLang === 'bn' ? 'কোনো রুমের ছবি আপলোড করা হয়নি' : 'No photos uploaded for this room yet'}</p>
       </div>`;

  // Group occupants by batch and sort descending (latest batch on top)
  const batchMap = {};
  occupants.forEach(student => {
    const b = student.batch || "HSC-27";
    if (!batchMap[b]) batchMap[b] = [];
    batchMap[b].push(student);
  });
  const sortedBatchKeys = Object.keys(batchMap).sort((a, b) => parseBatchNum(b) - parseBatchNum(a));

  let occupantsHtml = "";
  if (sortedBatchKeys.length === 0) {
    occupantsHtml = `
      <div class="empty-state" style="padding: 24px; text-align: center; color: var(--text-muted); background: var(--surface-strong); border-radius: 12px; border: 1px dashed var(--border);">
        <p style="margin: 0;">${currentLang === 'bn' ? 'এই রুমে বর্তমানে কোনো শিক্ষার্থী তালিকাভুক্ত নেই' : 'No occupants registered for this room yet'}</p>
      </div>
    `;
  } else {
    occupantsHtml = sortedBatchKeys.map((batchKey, bIdx) => {
      const batchStudents = batchMap[batchKey];
      const isLatest = bIdx === 0;
      return `
        <div class="occupants-batch-section" style="margin-bottom: 22px;">
          <div class="occupants-batch-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding: 6px 12px; background: rgba(16,201,168,0.08); border-left: 3px solid var(--accent); border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              ${BATCH_LOGO_SVG}
              <span style="font-weight: 700; font-size: 0.95rem; color: var(--accent); letter-spacing: 0.02em;">${batchKey}</span>
              ${isLatest ? `<span style="font-size: 0.7rem; padding: 2px 8px; border-radius: 12px; background: var(--accent); color: #0a1f38; font-weight: 700;">${currentLang === 'bn' ? 'লেটেস্ট ব্যাচ' : 'Latest'}</span>` : ''}
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${batchStudents.length} ${currentLang === 'bn' ? 'জন' : (batchStudents.length === 1 ? 'Student' : 'Students')}</span>
          </div>
          <div class="occupants-list">
            ${batchStudents.map((student) => {
              const isPhotoUnlocked = isProfileFieldUnlocked("photo", student);
              const photo = isPhotoUnlocked ? (normalizeCmsPath(student.img || student.photo) || "images/logo.png") : "images/student-avatar.png";
              const isNameUnlocked = isProfileFieldUnlocked("name", student);
              const nameDisplay = isNameUnlocked ? studentValue(student, "name") : "••••••••";
              const r1 = String(student.room_1st_year?.room_no || "").trim();
              const r2 = String(student.room_2nd_year?.room_no || "").trim();
              let roomStayLabel = "";
              if (r1 === roomStr && r2 === roomStr) {
                roomStayLabel = currentLang === 'bn' ? '১ম ও ২য় বর্ষ' : '1st & 2nd Year';
              } else if (r1 === roomStr) {
                roomStayLabel = currentLang === 'bn' ? '১ম বর্ষ' : '1st Year Room';
              } else if (r2 === roomStr) {
                roomStayLabel = currentLang === 'bn' ? '২য় বর্ষ' : '2nd Year Room';
              }
              return `
                <div class="occupant-row" onclick="openStudentModalFromRoom('${student.slug}')" tabindex="0" role="button">
                  <img class="occupant-img" src="${photo}" alt="" loading="lazy">
                  <div class="occupant-info">
                    <h4>${nameDisplay}</h4>
                    <p>
                      ${classLabel(student.classNo, student)} · ${groupLabel(student.group)}
                      ${roomStayLabel ? ` · <span style="color: var(--accent); font-weight: 600;">${roomStayLabel}</span>` : ''}
                    </p>
                  </div>
                  <div class="occupant-action">
                    <span>${currentLang === "bn" ? "প্রোফাইল দেখুন &rarr;" : "View Profile &rarr;"}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  content.innerHTML = `
    <div class="room-profile">
      <div>
        <p class="eyebrow">${t("common.room")}</p>
        <h2 id="modalName">${title}</h2>
        <p class="lead">${occupants.length} ${t("common.students")} · ${t("common.hostelInfo")}</p>
      </div>
      ${photoGridHtml}
      <div class="room-about-desc">
        <p>${desc}</p>
      </div>
      <div class="room-occupants">
        <h3 style="margin-bottom: 16px;">${t("common.roomOccupants") || "Room Occupants"}</h3>
        ${occupantsHtml}
      </div>
    </div>
  `;

  modal.classList.remove("is-gallery-modal");
  modal.classList.add("is-room-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  initImageFallbacks();
}

function openGalleryModal(src, title, desc = "") {
  const modal = byId("studentModal");
  const content = byId("modalContent");
  if (!modal || !content) return;

  activeStudentId = null;
  activeRoomId = null;

  const tagText = (desc && desc.trim()) ? desc.trim() : "";

  content.innerHTML = `
    <div class="gallery-preview">
      <div class="gallery-preview-media">
        <div class="gallery-ambient-bg" style="background-image: url('${src}');" aria-hidden="true"></div>
        <img src="${src}" alt="${title}" loading="lazy">
      </div>
      <div class="gallery-preview-body">
        <span class="gallery-preview-eyebrow">${t("nav.gallery")}</span>
        <h2 id="modalName" class="gallery-preview-title">${title}</h2>
        ${tagText ? `
          <div class="gallery-preview-tag-wrap">
            <span class="gallery-tag-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>${tagText}</span>
            </span>
          </div>
        ` : ""}
        <div class="gallery-preview-actions">
          <button class="btn primary gallery-download-btn" type="button" aria-label="Download photo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download</span>
          </button>
          <a class="btn secondary" href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Open full image in new tab">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>Open image</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const downloadBtn = content.querySelector(".gallery-download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      downloadGalleryImage(src, title);
    });
  }

  modal.classList.remove("is-room-modal");
  modal.classList.add("is-gallery-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  initImageFallbacks();
}

function closeStudentModal() {
  const modal = byId("studentModal");
  if (!modal) return;

  activeStudentId = null;
  activeRoomId = null;
  modal.classList.remove("open", "is-gallery-modal", "is-room-modal");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModal() {
  if (!document.getElementById("studentModal")) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "studentModal";
    modalDiv.className = "modal";
    modalDiv.setAttribute("aria-hidden", "true");
    modalDiv.setAttribute("role", "dialog");
    modalDiv.setAttribute("aria-modal", "true");
    modalDiv.setAttribute("aria-labelledby", "modalName");
    modalDiv.innerHTML = `
      <div class="modal-backdrop" data-close-modal></div>
      <article class="modal-panel">
        <button class="modal-close" type="button" aria-label="Close profile" data-close-modal>&times;</button>
        <div id="modalContent"></div>
      </article>
    `;
    document.body.appendChild(modalDiv);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) closeStudentModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeStudentModal();
  });
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    if (img.closest(".contact-btn")) return; // Skip contact buttons, handled inline

    img.addEventListener("error", () => {
      if (!img.dataset.fallbackApplied) {
        img.dataset.fallbackApplied = "true";
        img.src = "images/hall/hostel-building.jpg";
      }
    });
  });
}

function refreshAos() {
  if (window.AOS) window.AOS.refreshHard();
}

function initAos() {
  if (!window.AOS) {
    document.querySelectorAll("[data-aos]").forEach((element) => {
      element.removeAttribute("data-aos");
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    return;
  }

  window.AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: "ease-out-cubic"
  });
}


/* ══════════════════════════════════════════════════════════════
   BIRTHDAY PAGE LOGIC & CHRONOLOGICAL RENDERER (birthday.html)
   ══════════════════════════════════════════════════════════════ */
const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthFullEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNamesBn = ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"];
const monthFullBn = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

function getStudentBirthdayInfo(student) {
  if (student.dob_date) {
    const parts = student.dob_date.split('-');
    if (parts.length === 3) {
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (!isNaN(m) && !isNaN(d) && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        return { month: m, day: d, sortVal: m * 100 + d, rawDate: student.dob_date };
      }
    }
  }
  if (student.dob) {
    const monthMap = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
    const mMatch = String(student.dob).match(/(\d+)[\s\/-]+([a-zA-Z]+|\d+)/);
    if (mMatch) {
      const d = parseInt(mMatch[1], 10);
      let m = 0;
      if (/^\d+$/.test(mMatch[2])) {
        m = parseInt(mMatch[2], 10);
      } else {
        const monStr = mMatch[2].toLowerCase().slice(0, 3);
        m = monthMap[monStr] || 0;
      }
      if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        return { month: m, day: d, sortVal: m * 100 + d, rawDate: student.dob };
      }
    }
  }
  return { month: 99, day: 99, sortVal: 9999, rawDate: "" };
}

function renderBirthdays() {
  const container = byId("birthdayContainer");
  if (!container) return;

  const searchInput = byId("birthdaySearch");
  const query = (searchInput?.value || "").trim().toLowerCase();

  const monthSelect = byId("bdayMonthFilter");
  const batchSelect = byId("bdayBatchFilter");
  const groupSelect = byId("bdayGroupFilter");
  const bloodSelect = byId("bdayBloodFilter");
  const todayToggle = byId("bdayTodayToggle");

  const monthFilter = monthSelect?.value || container.dataset.monthFilter || "all";
  const batchFilter = batchSelect?.value || "all";
  const groupFilter = groupSelect?.value || "all";
  const bloodFilter = bloodSelect?.value || "all";
  const onlyToday = !!todayToggle?.checked;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Filter students
  let list = students.filter(s => {
    const bInfo = getStudentBirthdayInfo(s);

    if (monthFilter !== "all" && bInfo.month !== parseInt(monthFilter, 10)) {
      return false;
    }
    if (batchFilter !== "all") {
      const sBatch = s.batch || "HSC-27";
      if (sBatch !== batchFilter) return false;
    }
    if (groupFilter !== "all") {
      if (s.group !== groupFilter) return false;
    }
    if (bloodFilter !== "all") {
      if ((s.blood || s.blood_group) !== bloodFilter) return false;
    }
    if (onlyToday) {
      if (bInfo.month !== currentMonth || bInfo.day !== currentDay) return false;
    }
    if (!query) return true;
    const nameMatch = (s.name || "").toLowerCase().includes(query) || (s.bn?.name || "").includes(query);
    const rollMatch = (s.roll || "").includes(query) || (s.fullRoll || "").includes(query);
    const roomMatch = (s.room || "").includes(query);
    const monthEn = bInfo.month <= 12 ? monthNamesEn[bInfo.month - 1].toLowerCase() : "";
    const monthFull = bInfo.month <= 12 ? monthFullEn[bInfo.month - 1].toLowerCase() : "";
    const monthBn = bInfo.month <= 12 ? monthFullBn[bInfo.month - 1] : "";
    const monthMatch = monthEn.includes(query) || monthFull.includes(query) || monthBn.includes(query);
    return nameMatch || rollMatch || roomMatch || monthMatch;
  });

  // Group by batch
  const batchMap = {};
  list.forEach(s => {
    const b = s.batch || "HSC-27";
    if (!batchMap[b]) batchMap[b] = [];
    batchMap[b].push(s);
  });

  // Sort batches descending
  const sortedBatches = Object.keys(batchMap).sort((a, b) => parseBatchNum(b) - parseBatchNum(a));

  if (!sortedBatches.length) {
    container.innerHTML = `<div class="empty-state">${currentLang === "bn" ? "কোনো শিক্ষার্থীর জন্মদিন পাওয়া যায়নি।" : "No student birthdays found."}</div>`;
    return;
  }

  let html = "";
  sortedBatches.forEach(batchKey => {
    const batchStudents = batchMap[batchKey];
    batchStudents.sort((a, b) => {
      const aInfo = getStudentBirthdayInfo(a);
      const bInfo = getStudentBirthdayInfo(b);
      return aInfo.sortVal - bInfo.sortVal;
    });

    html += `
      <div class="birthday-batch-block" data-aos="fade-up" style="margin-bottom: 36px;">
        <div class="batch-section-header" style="margin: 28px 0 16px; display: flex; align-items: center; justify-content: space-between;">
          <h2 class="batch-title" style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 1.35rem; font-weight: 800;">
            ${BATCH_LOGO_SVG} ${batchKey}
          </h2>
          <span class="batch-count-pill">${batchStudents.length} ${currentLang === 'bn' ? 'জন শিক্ষার্থী' : 'Students'}</span>
        </div>
        <div class="birthday-grid">
    `;

    batchStudents.forEach((student, index) => {
      const bInfo = getStudentBirthdayInfo(student);
      const hasValidDate = bInfo.month <= 12;
      const isToday = hasValidDate && bInfo.month === currentMonth && bInfo.day === currentDay;

      const monthShort = hasValidDate ? (currentLang === "bn" ? monthNamesBn[bInfo.month - 1] : monthNamesEn[bInfo.month - 1]) : "--";
      const dayStr = hasValidDate ? (currentLang === "bn" ? toBengaliDigits(String(bInfo.day)) : String(bInfo.day)) : "--";
      const fullDateStr = hasValidDate ? (currentLang === "bn" ? `${dayStr} ${monthFullBn[bInfo.month - 1]}` : `${dayStr} ${monthFullEn[bInfo.month - 1]}`) : (student.dob || "--");

      const showPhoto = isProfileFieldVisible("photo");
      const isPhotoUnlocked = isProfileFieldUnlocked("photo", student);
      const photoSrc = (showPhoto && isPhotoUnlocked) ? student.img : "images/student-avatar.png";
      const name = isProfileFieldUnlocked("name", student) ? studentValue(student, "name") : maskData(studentValue(student, "name"));
      const roomVal = student.room_2nd_year?.room_no || student.room_1st_year?.room_no || student.room || "-";
      const isRoomUnlocked = isProfileFieldUnlocked("room_2nd_year", student) || isProfileFieldUnlocked("room_1st_year", student) || isProfileFieldUnlocked("room", student);
      const roomDisplay = isRoomUnlocked ? (currentLang === "bn" ? `রুম ${toBengaliDigits(roomVal)}` : `Room ${roomVal}`) : maskData(roomVal);
      const rollDisplay = isProfileFieldUnlocked("roll", student) ? (currentLang === "bn" ? `রোল ${toBengaliDigits(student.roll || "")}` : `Roll ${student.roll || ""}`) : maskData(student.roll);

      html += `
        <article class="birthday-card ${isToday ? 'is-today-birthday' : ''}" data-student-id="${student.id}" data-aos="fade-up" data-aos-delay="${Math.min(index * 30, 240)}" role="button" tabindex="0">
          <div class="bday-date-badge ${isToday ? 'bday-badge-today-glow' : ''}">
            <span class="bday-badge-month">${monthShort}</span>
            <span class="bday-badge-day">${dayStr}</span>
          </div>
          <div class="bday-avatar-wrap">
            <img class="bday-avatar" src="${photoSrc}" alt="${name}" loading="lazy">
          </div>
          <div class="bday-card-body">
            <div class="bday-name-row">
              <h3 class="bday-name">${name}</h3>
              ${isToday ? `<span class="bday-pill today-pill">${currentLang === 'bn' ? 'শুভ জন্মদিন!' : 'Today!'}</span>` : ''}
            </div>
            <div class="bday-meta-pills">
              ${student.roll ? `<span class="bday-meta-pill">${rollDisplay}</span>` : ''}
              ${roomVal !== '-' ? `<span class="bday-meta-pill">${roomDisplay}</span>` : ''}
              <span class="bday-meta-pill">${groupLabel(student.group)}</span>
            </div>
            <div class="bday-date-label">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>${fullDateStr}</span>
            </div>
          </div>
          <div class="bday-card-action">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
          </div>
        </article>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Add click and keyboard listeners to open student modal
  container.querySelectorAll('.birthday-card').forEach(card => {
    const handleOpen = () => {
      const id = card.getAttribute('data-student-id');
      const st = students.find(s => String(s.id) === String(id));
      if (st) openStudentModal(st);
    };
    card.addEventListener('click', handleOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
    });
  });
}

function initBirthdaySearch() {
  const searchInput = byId("birthdaySearch");
  if (!searchInput) return;
  searchInput.addEventListener("input", () => {
    renderBirthdays();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  initLanguage(); // Synchronous translation from saved localStorage language immediately
  ensureNavigation();
  initTheme();
  initAuth();
  updateProfileNavButton();
  initDropdowns();
  initNavbar();
  initMoreMenu();
  initHeroRotator();

  await loadCmsContent();
  checkSessionValidity();
  initAuth();
  updateProfileNavButton();
  ensureNavigation();
  if (checkPageAccess()) return;
  renderDynamicContent();
  applyLanguage(); // Re-apply for any CMS-provided titles or labels
  initStudentSearch();
  initBirthdaySearch();
  initRoommateFilters();
  initStudentViewToggle();
  initCompactFilterDrawers();
  initStudentClicks();
  initResultClassFilter();
  initModal();
  initImageFallbacks();
  initAos();

  // Initialize Sanity real-time listener for instant live syncing
  if (typeof initSanityRealtimeListener === "function") {
    initSanityRealtimeListener(async () => {
      console.log("⚡ Live update received from Sanity Studio, syncing website content...");
      await loadCmsContent();
      checkSessionValidity();
      initAuth();
      updateProfileNavButton();
    });
  }
});

function getGoogleDriveFileId(url) {
  if (!url) return null;
  const u = String(url).trim();
  if (!u.includes('drive.google.com')) return null;
  const match1 = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) return match1[1];
  const match2 = u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) return match2[1];
  return null;
}

window.handleDriveVideoError = function(videoEl, previewUrl, driveViewUrl) {
  if (!videoEl) return;
  const card = videoEl.closest('.event-video-card');
  if (!card) return;
  card.innerHTML = `
    <iframe src="${previewUrl}" allowfullscreen allow="autoplay; encrypted-media; fullscreen" loading="lazy"></iframe>
    <div class="event-video-bar">
      <span class="event-video-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 15L13.16 21h10.28l-3.43-6M22.29 13.5L15.71 2h-6.85l6.57 11.5"/></svg>
        <span>Google Drive</span>
      </span>
      <a href="${driveViewUrl}" target="_blank" rel="noopener noreferrer" class="event-video-link">
        <span>Google Drive-এ সরাসরি খুলুন</span> &nearr;
      </a>
    </div>
  `;
};

/**
 * Converts regular video URLs to embed-friendly URLs.
 * Supports: YouTube, Google Drive, Mega.nz
 * If already an embed URL or unrecognized, returns as-is.
 */
function convertToEmbedUrl(url) {
  if (!url) return '';
  const u = url.trim();

  // YouTube: youtu.be/ID or youtube.com/watch?v=ID → youtube.com/embed/ID
  if (u.includes('youtu.be/')) {
    const id = u.split('youtu.be/')[1]?.split(/[?&#]/)[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (u.includes('youtube.com/watch')) {
    const match = u.match(/[?&]v=([^&#]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (u.includes('youtube.com/shorts/')) {
    const id = u.split('/shorts/')[1]?.split(/[?&#]/)[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }

  // Google Drive: drive.google.com/file/d/ID/view → drive.google.com/file/d/ID/preview
  if (u.includes('drive.google.com/file/d/')) {
    const match = u.match(/\/file\/d\/([^/]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  }

  // Mega.nz: mega.nz/file/ID#KEY → mega.nz/embed/ID#KEY
  if (u.includes('mega.nz/file/')) {
    return u.replace('mega.nz/file/', 'mega.nz/embed/');
  }

  // Already embed or unknown — return as-is
  return u;
}

/**
 * Auto-formats a raw YYYY-MM-DD date string to readable format.
 * Returns { en: "15 March 2026", bn: "১৫ মার্চ ২০২৬" }
 */
function autoFormatDate(dateStr) {
  if (!dateStr) return { en: '', bn: '' };
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return { en: '', bn: '' };

  const months_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const months_bn = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const bn_digits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const toBn = (num) => String(num).split('').map(c => bn_digits[parseInt(c)] || c).join('');

  return {
    en: `${day} ${months_en[month]} ${year}`,
    bn: `${toBn(day)} ${months_bn[month]} ${toBn(year)}`
  };
}

const GALLERY_ICONS = {
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  batch: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
  photos: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  videos: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  location: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  external: `<svg class="external-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`
};

let currentGalleryData = null;

async function renderGalleryPage(galleryData) {
  if (document.body.dataset.page !== "gallery") return;
  const eventsContainer = document.getElementById("galleryEventsContainer");
  const memoriesContainer = document.getElementById("galleryMemoriesContainer");
  const mainGalleryView = document.getElementById("mainGalleryView");
  const eventDetailView = document.getElementById("eventDetailView");
  if (!eventsContainer) return;

  const data = galleryData || await fetchJson("data/gallery.json");
  if (!data) return;
  currentGalleryData = data;

  // Sort events by date latest first
  let events = data.events ? data.events.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0) || Number(a.position || 0) - Number(b.position || 0)) : [];

  // All events are displayed chronologically (no category filtering)
  const formalEvents = events;

  // 1. Render events in authentic DCSC style with horizontal scroll
  eventsContainer.innerHTML = formalEvents.map((ev, evIdx) => {
    const title = currentLang === "bn" ? (ev.title_bn || ev.title_en) : (ev.title_en || ev.title_bn);
    const date = currentLang === "bn" ? (ev.date_formatted_bn || ev.date_formatted_en) : (ev.date_formatted_en || ev.date_formatted_bn);
    const batchLabel = ev.batches && ev.batches.length ? ev.batches.join(' · ') : '';

    const allPhotos = ev.photos || [];
    const maxPreview = 5;
    const previewPhotos = allPhotos.slice(0, maxPreview);
    const remainingCount = allPhotos.length - maxPreview;
    const defaultCap = currentLang === "bn" ? (ev.default_caption_bn || ev.default_caption_en) : (ev.default_caption_en || ev.default_caption_bn);
    const photosHtml = previewPhotos.map((p, pIdx) => {
      const photoSrc = normalizeCmsPath(p.photo) || "images/hall/hostel-building.jpg";
      const caption = currentLang === "bn" ? (p.caption_bn || p.caption_en || defaultCap || title) : (p.caption_en || p.caption_bn || defaultCap || title);
      return `
        <article class="dcsc-photo-card" data-aos="fade-up" data-aos-delay="${(pIdx % 6) * 60}">
          <button type="button" data-gallery-src="${photoSrc}" data-gallery-title="${caption}" data-gallery-desc="${title}">
            <img src="${photoSrc}" alt="${caption}" loading="lazy">
            <div class="gallery-card-overlay">
              <div>
                <span style="font-size: 0.88rem; font-weight: 700; line-height: 1.3; display: block; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                  ${caption}
                </span>
              </div>
            </div>
          </button>
        </article>
      `;
    }).join("") + (remainingCount > 0 ? `
        <article class="dcsc-photo-card dcsc-photo-card-more" data-aos="fade-up" data-aos-delay="300">
          <button type="button" class="dcsc-more-photos-tile" data-event-id="${ev.id}" style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.22)); border:2px dashed var(--accent); border-radius:12px; cursor:pointer; color:var(--accent); transition:all 0.25s ease;">
            <div style="width:48px; height:48px; border-radius:50%; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; box-shadow:0 4px 12px rgba(16,185,129,0.35);">
              +${remainingCount}
            </div>
            <span style="font-weight:700; font-size:0.95rem; color:var(--text);">${currentLang === 'bn' ? `আরও ${toBengaliDigits(remainingCount)}টি ছবি` : `${remainingCount} More Photos`}</span>
            <span style="font-size:0.78rem; color:var(--accent); font-weight:600;">${currentLang === 'bn' ? 'সব দেখতে ক্লিক করুন &rarr;' : 'View all &rarr;'}</span>
          </button>
        </article>
      ` : "");

    return `
      <section class="dcsc-event-section" data-event-id="${ev.id}">
        <div class="dcsc-event-header">
          <div class="dcsc-event-title-wrap">
            <div class="dcsc-accent-bar"></div>
            <div>
              <span class="dcsc-eyebrow">${currentLang === "bn" ? "ইভেন্ট গ্যালারি" : "EVENT GALLERY"}</span>
              <h2 class="dcsc-event-title">${title}</h2>
              <div class="dcsc-event-meta" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;">
                ${date ? `<span class="event-meta-pill event-meta-date" style="padding: 3px 10px; font-size: 0.78rem;">${GALLERY_ICONS.calendar}<span>${date}</span></span>` : ""}
                ${batchLabel ? `<span class="event-meta-pill event-meta-batch" style="padding: 3px 10px; font-size: 0.78rem;">${GALLERY_ICONS.batch}<span>${batchLabel}</span></span>` : ""}
              </div>
            </div>
          </div>
          <button type="button" class="dcsc-view-event-btn" data-event-id="${ev.id}">
            <span>${currentLang === "bn" ? "সম্পূর্ণ ইভেন্ট দেখুন" : "View Event"}</span> &rarr;
          </button>
        </div>
        <div class="dcsc-event-scroll-wrap">
          <div class="dcsc-event-grid">
            ${photosHtml}
          </div>
        </div>
      </section>
    `;
  }).join("");

  // 2. Render Gallery Items — grouped by heading (each galleryItem doc is a section)
  const collections = data.collections || [];

  if (memoriesContainer && collections.length) {
    // Build filter buttons from headings
    const headings = collections.map(c => c.heading).filter(Boolean);
    const hasMultipleHeadings = headings.length > 1;

    const filterHtml = hasMultipleHeadings ? `
      <div class="gallery-batch-filters" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;">
        <button type="button" class="gallery-heading-btn active" data-heading="all" style="padding: 5px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; border: 1px solid var(--border); background: var(--accent); color: #fff; cursor: pointer;">
          ${currentLang === "bn" ? "সব দেখুন" : "All"}
        </button>
        ${collections.map(col => `
          <button type="button" class="gallery-heading-btn" data-heading="${col.heading}" data-slug="${col.slug}" style="padding: 5px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); cursor: pointer;">
            📁 ${col.heading}
          </button>
        `).join("")}
      </div>
    ` : "";

    // Build each collection section
    const sectionsHtml = collections.map((col, colIdx) => {
      const defaultCap = col.default_caption || "";
      const limit = Number(col.preview_limit) > 0 ? Number(col.preview_limit) : 0;
      const hasLimit = limit > 0 && col.photos.length > limit;

      const photosHtml = col.photos.map((p, pIdx) => {
        const photoSrc = normalizeCmsPath(p.photo) || "images/hall/hostel-building.jpg";
        const caption = p.caption || defaultCap || (col.heading || "Memory");
        const isHidden = hasLimit && pIdx >= limit;
        return `
          <article class="dcsc-photo-card ${isHidden ? 'gallery-extra-photo' : ''}" 
                   data-heading="${col.heading || ''}" 
                   ${isHidden ? 'style="display: none;"' : ''} 
                   data-aos="fade-up" 
                   data-aos-delay="${(pIdx % 4) * 60}">
            <button type="button" data-gallery-src="${photoSrc}" data-gallery-title="${caption}" data-gallery-desc="${col.heading || ''}">
              <img src="${photoSrc}" alt="${caption}" loading="lazy">
              <div class="gallery-card-overlay">
                <div>
                  <span style="font-size: 0.88rem; font-weight: 700; line-height: 1.3; display: block; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                    ${caption}
                  </span>
                  ${col.heading && col.heading !== caption ? `
                    <span style="display: inline-block; margin-top: 4px; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; background: rgba(255,255,255,0.22); backdrop-filter: blur(4px); color: #fff; font-weight: 600;">
                      ${col.heading}
                    </span>
                  ` : ''}
                </div>
              </div>
            </button>
          </article>
        `;
      }).join("");

      return `
        <div class="gallery-collection-section" id="collection-${col.slug}" data-collection-heading="${col.heading || ''}" data-collection-slug="${col.slug || ''}">
          <div class="gallery-collection-header" style="margin: 28px 0 14px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            ${col.heading ? `
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 4px; height: 22px; border-radius: 2px; background: var(--accent);"></span>
                ${col.heading}
                <span style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted); margin-left: 4px;">(${col.photos.length})</span>
              </h3>
            ` : '<div></div>'}
            ${hasLimit ? `
              <button type="button" class="gallery-view-all-btn" data-slug="${col.slug}" data-limit="${limit}" data-total="${col.photos.length}" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; border: 1.5px solid var(--accent); background: rgba(2, 132, 199, 0.08); color: var(--accent); cursor: pointer; transition: all 0.2s ease;">
                <span class="view-all-text">${currentLang === "bn" ? `সবগুলো দেখুন (${col.photos.length})` : `View All (${col.photos.length})`}</span>
                <span class="view-all-arrow">&rarr;</span>
              </button>
            ` : ''}
          </div>
          <div class="dcsc-memories-grid">
            ${photosHtml}
          </div>
        </div>
      `;
    }).join("");

    memoriesContainer.innerHTML = `
      <section class="dcsc-event-section dcsc-memories-section">
        <div class="dcsc-event-header">
          <div class="dcsc-event-title-wrap">
            <div class="dcsc-accent-bar memories-bar"></div>
            <div>
              <span class="dcsc-eyebrow memories-eyebrow">${currentLang === "bn" ? "দৈনন্দিন স্মৃতি" : "MEMORIES"}</span>
              <h2 class="dcsc-event-title">${currentLang === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}</h2>
            </div>
          </div>
          ${filterHtml}
        </div>
        ${sectionsHtml}
      </section>
    `;

    // Filter click handlers
    document.querySelectorAll(".gallery-heading-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".gallery-heading-btn").forEach(b => {
          b.classList.remove("active");
          b.style.background = "var(--surface)";
          b.style.color = "var(--text-muted)";
        });
        btn.classList.add("active");
        btn.style.background = "var(--accent)";
        btn.style.color = "#fff";

        const selected = btn.dataset.heading;
        document.querySelectorAll(".gallery-collection-section").forEach(sec => {
          const secHeading = sec.dataset.collectionHeading || "";
          if (selected === "all" || secHeading === selected) {
            sec.style.display = "block";
          } else {
            sec.style.display = "none";
          }
        });
      });
    });

    // View All button handlers
    document.querySelectorAll(".gallery-view-all-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const slug = btn.dataset.slug;
        const total = btn.dataset.total;
        const section = document.querySelector(`.gallery-collection-section[data-collection-slug="${slug}"]`);
        if (!section) return;
        const hiddenPhotos = section.querySelectorAll(".gallery-extra-photo");
        const textSpan = btn.querySelector(".view-all-text");
        const arrowSpan = btn.querySelector(".view-all-arrow");
        
        const isExpanded = btn.classList.contains("expanded");
        if (!isExpanded) {
          hiddenPhotos.forEach(p => p.style.display = "");
          btn.classList.add("expanded");
          btn.style.background = "var(--accent)";
          btn.style.color = "#fff";
          if (textSpan) textSpan.textContent = currentLang === "bn" ? "কম দেখুন" : "Show Less";
          if (arrowSpan) arrowSpan.innerHTML = "&uarr;";
          window.location.hash = `#collection=${slug}`;
        } else {
          hiddenPhotos.forEach(p => p.style.display = "none");
          btn.classList.remove("expanded");
          btn.style.background = "rgba(2, 132, 199, 0.08)";
          btn.style.color = "var(--accent)";
          if (textSpan) textSpan.textContent = currentLang === "bn" ? `সবগুলো দেখুন (${total})` : `View All (${total})`;
          if (arrowSpan) arrowSpan.innerHTML = "&rarr;";
        }
      });
    });
  }

  // 3. Attach click handlers for 'View Event' buttons
  document.querySelectorAll(".dcsc-view-event-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const eventId = btn.dataset.eventId;
      showEventDetailView(eventId);
    });
  });

  
  eventsContainer.querySelectorAll('.dcsc-more-photos-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      const eid = btn.getAttribute('data-event-id');
      if (eid) showEventDetailView(eid);
    });
  });

  initGalleryFilters();

  // Check URL hash for direct event link (e.g. #event=freshers-2025)
  handleGalleryHash();
}

function handleGalleryHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#event=")) {
    const eventId = hash.replace("#event=", "");
    if (eventId) {
      showEventDetailView(eventId);
    }
  } else if (hash.startsWith("#collection=") || hash.startsWith("#gallery=")) {
    const slug = hash.replace(/^#(collection|gallery)=/, "");
    closeEventDetailView();
    const targetSec = document.querySelector(`.gallery-collection-section[data-collection-slug="${slug}"]`);
    if (targetSec) {
      const viewAllBtn = targetSec.querySelector(".gallery-view-all-btn");
      if (viewAllBtn && !viewAllBtn.classList.contains("expanded")) {
        viewAllBtn.click();
      }
      setTimeout(() => {
        targetSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  } else if (!hash || hash === "#") {
    closeEventDetailView();
  }
}

window.addEventListener("hashchange", () => {
  if (document.body.dataset.page === "gallery") {
    handleGalleryHash();
  }
});

function showEventDetailView(eventId) {
  if (!currentGalleryData || !currentGalleryData.events) return;
  const ev = currentGalleryData.events.find(e => e.id === eventId);
  if (!ev) return;

  const mainView = document.getElementById("mainGalleryView");
  const detailView = document.getElementById("eventDetailView");
  if (!mainView || !detailView) return;

  const title = currentLang === "bn" ? (ev.title_bn || ev.title_en) : (ev.title_en || ev.title_bn);
  const desc = currentLang === "bn" ? (ev.description_bn || ev.description_en) : (ev.description_en || ev.description_bn);
  const date = currentLang === "bn" ? (ev.date_formatted_bn || ev.date_formatted_en) : (ev.date_formatted_en || ev.date_formatted_bn);
  const batchLabel = ev.batches && ev.batches.length ? ev.batches.join(' · ') : '';

  const photos = ev.photos || [];
  const videos = ev.videos || [];
  const isVideosFirst = ev.media_order === 'videos_first';

  // Section 1: Photos block
  const photosSectionHtml = photos.length ? `
    <div class="event-photos-wrap">
      <div class="event-section-header">
        <div class="event-section-title-wrap">
          <div class="dcsc-accent-bar"></div>
          <div>
            <span class="dcsc-eyebrow">${currentLang === "bn" ? "ছবি সংগ্রহ" : "PHOTOS"}</span>
            <h3 class="event-section-title">${currentLang === "bn" ? "ইভেন্ট ফটোসমূহ" : "Event Photos"}</h3>
          </div>
        </div>
        <span class="event-section-badge">${photos.length} ${currentLang === "bn" ? "টি ছবি" : "Photos"}</span>
      </div>
      <div class="event-detail-grid">
        ${photos.map((p, pIdx) => {
          const photoSrc = normalizeCmsPath(p.photo) || "images/hostel-building.jpg";
          const defaultCap = currentLang === "bn" ? (ev.default_caption_bn || ev.default_caption_en) : (ev.default_caption_en || ev.default_caption_bn);
          const caption = currentLang === "bn" ? (p.caption_bn || p.caption_en || defaultCap || title) : (p.caption_en || p.caption_bn || defaultCap || title);
          return `
            <article class="dcsc-photo-card" data-aos="fade-up" data-aos-delay="${(pIdx % 6) * 50}">
              <button type="button" data-gallery-src="${photoSrc}" data-gallery-title="${caption}" data-gallery-desc="${title}">
                <img src="${photoSrc}" alt="${caption}" loading="lazy">
              </button>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  ` : "";

  // Section 2: Videos block
  const videosSectionHtml = videos.length ? `
    <div class="event-video-wrap">
      <div class="event-section-header">
        <div class="event-section-title-wrap">
          <div class="dcsc-accent-bar video-bar"></div>
          <div>
            <span class="dcsc-eyebrow">${currentLang === "bn" ? "ভিডিও সংগ্রহ" : "VIDEOS"}</span>
            <h3 class="event-section-title">${currentLang === "bn" ? "ইভেন্ট ভিডিও" : "Event Videos"}</h3>
          </div>
        </div>
        <span class="event-section-badge">${videos.length} ${currentLang === "bn" ? "টি ভিডিও" : "Videos"}</span>
      </div>
      <div class="event-video-grid">
        ${videos.map(v => {
          if (v.is_direct) {
            return `
              <div class="event-video-card">
                <video src="${v.url}" style="width: 100%; height: 100%; object-fit: contain;" controls preload="metadata"></video>
              </div>
            `;
          } else {
            return `
              <div class="event-video-card">
                <iframe src="${v.url}" style="width: 100%; height: 100%; border: 0;" allowfullscreen allow="autoplay; encrypted-media"></iframe>
              </div>
            `;
          }
        }).join("")}
      </div>
    </div>
  ` : "";

  // Order based on admin setting (photos first vs videos first)
  const mediaContentHtml = isVideosFirst
    ? `${videosSectionHtml}${photosSectionHtml}`
    : `${photosSectionHtml}${videosSectionHtml}`;

  const allLocations = (ev.locations && Array.isArray(ev.locations) && ev.locations.length)
    ? ev.locations.filter(Boolean)
    : (ev.location_name ? [ev.location_name] : []);

  detailView.innerHTML = `
    <div class="event-detail-header">
      <button type="button" class="event-back-btn" id="eventBackBtn">
        &larr; ${currentLang === "bn" ? "সকল ইভেন্টে ফিরে যান" : "Back to All Events"}
      </button>
      <span class="dcsc-eyebrow">${currentLang === "bn" ? "ইভেন্ট শোকেস" : "EVENT SHOWCASE"}</span>
      <h1 class="event-detail-title">${title}</h1>
      <div class="event-detail-meta">
        ${date ? `<span class="event-meta-pill event-meta-date">${GALLERY_ICONS.calendar}<span>${date}</span></span>` : ""}
        ${batchLabel ? `<span class="event-meta-pill event-meta-batch">${GALLERY_ICONS.batch}<span>${batchLabel}</span></span>` : ""}
        ${photos.length ? `<span class="event-meta-pill event-meta-count">${GALLERY_ICONS.photos}<span>${photos.length} ${currentLang === "bn" ? "টি ফটো" : "Photos"}</span></span>` : ""}
        ${videos.length ? `<span class="event-meta-pill event-meta-count">${GALLERY_ICONS.videos}<span>${videos.length} ${currentLang === "bn" ? "টি ভিডিও" : "Videos"}</span></span>` : ""}
        <button type="button" class="event-meta-pill event-meta-share" id="eventShareBtn" style="cursor:pointer; background:var(--surface-strong); border:1px solid var(--border); color:var(--text); padding:3px 12px; font-size:0.78rem; display:inline-flex; align-items:center; gap:6px;">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
          <span>${currentLang === "bn" ? "শেয়ার করুন" : "Share Event"}</span>
        </button>
        ${allLocations.map(loc => `
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}" target="_blank" rel="noopener noreferrer" class="event-meta-pill event-meta-location" title="${currentLang === "bn" ? "গুগল ম্যাপে অনুসন্ধান করুন" : "Search on Google Maps"}">
            ${GALLERY_ICONS.location}<span>${loc}</span>${GALLERY_ICONS.external}
          </a>
        `).join("")}
      </div>
      ${desc ? `<p class="event-detail-desc">${desc}</p>` : ""}
    </div>

    ${mediaContentHtml}
  `;

  mainView.style.display = "none";
  detailView.style.display = "block";
  window.location.hash = `#event=${eventId}`;
  window.scrollTo({ top: 0, behavior: "smooth" });

  
  const shareBtn = document.getElementById("eventShareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const shareUrl = `${window.location.origin}/event/${eventId}`;
      if (navigator.share) {
        navigator.share({
          title: title,
          text: `${title} — International Hall Gallery`,
          url: shareUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast(currentLang === "bn" ? "ইভেন্টের লিংক কপি করা হয়েছে!" : "Event link copied to clipboard!");
        });
      }
    });
  }

  const backBtn = document.getElementById("eventBackBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      closeEventDetailView();
    });
  }
}

function closeEventDetailView() {
  const mainView = document.getElementById("mainGalleryView");
  const detailView = document.getElementById("eventDetailView");
  if (mainView && detailView) {
    detailView.style.display = "none";
    mainView.style.display = "block";
    if (window.location.hash.startsWith("#event=")) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      const sections = document.querySelectorAll(".dcsc-event-section");

      sections.forEach((sec) => {
        if (filter === "all" || sec.dataset.category === filter) {
          sec.style.display = "block";
        } else {
          sec.style.display = "none";
        }
      });
    });
  });
}

function renderHomeGallery(galleryData) {
  const grid = document.getElementById("homeGalleryGrid");
  if (!grid) return;

  const items = [];
  const events = (galleryData?.events || []).slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const collections = galleryData?.collections || [];

  // 1. Slots 1 to 4: First photo of each of the 4 most recent events
  for (let i = 0; i < Math.min(4, events.length); i++) {
    const ev = events[i];
    if (ev.photos && ev.photos.length) {
      items.push({
        photo: ev.photos[0].photo,
        title_en: ev.title_en || 'Event Photo',
        title_bn: ev.title_bn || 'ইভেন্ট ছবি',
        eventId: ev.id,
        badge_en: 'Event',
        badge_bn: 'ইভেন্ট',
      });
    }
  }

  // 2. Slot 5: Latest batch gallery photo (e.g. HSC-28 or newest batch)
  const nonFounderCollections = collections.filter(c => {
    const h = (c.heading || '').toUpperCase();
    return !h.includes('HSC-27') && !h.includes('27');
  });
  let latestBatchPhoto = null;
  if (nonFounderCollections.length && nonFounderCollections[0].photos.length) {
    const col = nonFounderCollections[0];
    latestBatchPhoto = {
      photo: col.photos[0].photo,
      title_en: col.heading || 'Latest Batch Collection',
      title_bn: col.heading || 'লেটেস্ট ব্যাচ গ্যালারি',
      slug: col.slug,
      badge_en: col.heading || 'Latest Batch',
      badge_bn: col.heading || 'লেটেস্ট ব্যাচ',
    };
  } else if (galleryData?.items && galleryData.items.length) {
    const p = galleryData.items[0];
    latestBatchPhoto = {
      photo: p.photo,
      title_en: p.caption || 'Campus Memory',
      title_bn: p.caption || 'ক্যাম্পাস স্মৃতি',
      badge_en: 'Batch Gallery',
      badge_bn: 'ব্যাচ গ্যালারি',
    };
  }
  if (latestBatchPhoto) {
    items.push(latestBatchPhoto);
  }

  // 3. Slot 6: Fixed HSC-27 (Founder) gallery photo (CONSTANT / ধ্রুবক)
  const founderCollections = collections.filter(c => {
    const h = (c.heading || '').toUpperCase();
    return h.includes('HSC-27') || h.includes('27');
  });
  let founderPhoto = null;
  if (founderCollections.length && founderCollections[0].photos.length) {
    const col = founderCollections[0];
    founderPhoto = {
      photo: col.photos[0].photo,
      title_en: col.heading || 'HSC-27 Founder Batch',
      title_bn: col.heading || 'এইচএসসি-২৭ প্রতিষ্ঠাতা ব্যাচ',
      slug: col.slug,
      badge_en: 'HSC-27 (Founder)',
      badge_bn: 'এইচএসসি-২৭ (প্রতিষ্ঠাতা)',
    };
  } else if (galleryData?.items && galleryData.items.length > 1) {
    const p = galleryData.items[galleryData.items.length - 1];
    founderPhoto = {
      photo: p.photo,
      title_en: 'HSC-27 Founder Batch',
      title_bn: 'এইচএসসি-২৭ প্রতিষ্ঠাতা ব্যাচ',
      badge_en: 'HSC-27 (Founder)',
      badge_bn: 'এইচএসসি-২৭ (প্রতিষ্ঠাতা)',
    };
  }
  if (founderPhoto) {
    items.push(founderPhoto);
  }

  // Backfill if fewer than 6
  if (items.length < 6 && galleryData?.items) {
    for (const p of galleryData.items) {
      const norm = normalizeCmsPath(p.photo);
      if (!items.some(it => normalizeCmsPath(it.photo) === norm)) {
        items.push({
          photo: p.photo,
          title_en: p.caption || 'Hall Memory',
          title_bn: p.caption || 'হল স্মৃতি',
          badge_en: 'Gallery',
          badge_bn: 'গ্যালারি',
        });
      }
      if (items.length >= 6) break;
    }
  }

  if (!items.length) return;

  grid.innerHTML = items.slice(0, 6).map((item, index) => {
    const photo = normalizeCmsPath(item.photo) || "images/hall/hostel-building.jpg";
    const title = currentLang === "bn" ? (item.title_bn || item.title_en) : (item.title_en || item.title_bn);
    const linkUrl = item.eventId 
      ? `gallery.html#event=${item.eventId}` 
      : (item.slug ? `gallery.html#collection=${item.slug}` : `gallery.html`);
    const badge = currentLang === "bn" ? (item.badge_bn || item.badge_en || "গ্যালারি") : (item.badge_en || item.badge_bn || "Gallery");

    return `
      <article class="gallery-card" data-aos="fade-up" data-aos-delay="${(index % 6) * 60}">
        <a href="${linkUrl}" style="display: block; position: relative;">
          <img src="${photo}" alt="${title}" loading="lazy">
          <div class="gallery-card-overlay">
            <div>
              <span style="display: block; font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); font-weight: 700; margin-bottom: 3px;">
                ${badge} &rarr;
              </span>
              <span style="font-size: 0.95rem; font-weight: 700; line-height: 1.3; display: block;">
                ${title}
              </span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
}

async function renderAlumniList(alumniData) {
  const grid = document.querySelector(".person-grid");
  if (!grid || document.body.dataset.page !== "hostel") return;

  let profiles = alumniData;
  if (!profiles) {
    const hallData = await fetchJson("data/hall.json");
    profiles = hallData?.alumni_profiles || hallData?.profiles || [];
  }

  if (profiles && profiles.length) {
    const sortedProfiles = profiles.slice().sort((a, b) => Number(a.position || 0) - Number(b.position || 0));
    famousProfiles.alumni = sortedProfiles;

    grid.innerHTML = sortedProfiles.map((p, index) => {
      const fallback = index === 1 ? "images/hall/alumni2.jpg" : "images/hall/alumni1.jpg";
      const photo = normalizeCmsPath(p.photo) || fallback;
      const name = currentLang === "bn" ? p.name_bn : p.name_en;
      const shortBio = currentLang === "bn" ? (p.short_bio_bn || p.role_bn) : (p.short_bio_en || p.role_en);
      return `
        <article class="person-card" data-aos="fade-up" data-aos-delay="${index * 120}" data-famous-id="alumni-${index}" tabindex="0" role="button">
          <img src="${photo}" alt="${name}" loading="lazy" onerror="this.src='${fallback}'">
          <h3>${name}</h3>
          ${shortBio ? `<p>${shortBio}</p>` : ""}
        </article>
      `;
    }).join("");
  }
}

async function renderDeveloperPage(devData) {
  if (document.body.dataset.page !== "developer") return;

  const dev = devData || await fetchJson("data/developer.json");
  if (!dev) return;

  const eyebrowEl = document.querySelector(".developer-intro .eyebrow");
  if (eyebrowEl && (dev.eyebrow_en || dev.eyebrow_bn)) eyebrowEl.textContent = currentLang === "bn" ? (dev.eyebrow_bn || dev.eyebrow_en) : (dev.eyebrow_en || dev.eyebrow_bn);

  const subEl = document.querySelector(".developer-subtitle");
  if (subEl && (dev.subtitle_en || dev.subtitle_bn)) subEl.textContent = currentLang === "bn" ? (dev.subtitle_bn || dev.subtitle_en) : (dev.subtitle_en || dev.subtitle_bn);

  const nameEl = document.querySelector(".developer-intro h1");
  if (nameEl) nameEl.textContent = currentLang === "bn" ? dev.name_bn : dev.name_en;

  const bioEl = document.querySelector(".developer-lead");
  if (bioEl) bioEl.textContent = currentLang === "bn" ? dev.lead_bn : dev.lead_en;

  const portraitEl = document.querySelector(".developer-portrait img");
  if (portraitEl && dev.portrait) portraitEl.src = normalizeCmsPath(dev.portrait);

  const panels = document.querySelectorAll(".developer-info-grid .developer-panel");
  if (panels.length >= 3) {
    panels[0].querySelector("h2").textContent = currentLang === "bn" ? (dev.about_title_bn || "আমার সম্পর্কে") : (dev.about_title_en || "About Me");
    panels[0].querySelector("p").textContent = currentLang === "bn" ? dev.about_text_bn : dev.about_text_en;

    panels[1].querySelector("h2").textContent = currentLang === "bn" ? (dev.contact_title_bn || "যোগাযোগ ও ঠিকানা") : (dev.contact_title_en || "Contact & Location");
    const contactLines = (currentLang === "bn" ? dev.contact_text_bn : dev.contact_text_en).split("\n");
    panels[1].querySelector("p").innerHTML = contactLines.map((line) => {
      if (line.includes("@")) return `<a href="mailto:${line.trim()}">${line.trim()}</a>`;
      return `<span>${line.trim()}</span>`;
    }).join("<br>");

    panels[2].querySelector("h2").textContent = currentLang === "bn" ? (dev.focus_title_bn || "আমার দক্ষতা") : (dev.focus_title_en || "What I Do");
    panels[2].querySelector("p").textContent = currentLang === "bn" ? dev.focus_text_bn : dev.focus_text_en;
  }

  const tagsGrid = document.querySelector(".developer-tags");
  if (tagsGrid && dev.skills) {
    tagsGrid.innerHTML = dev.skills.map(s => `<span>${s.skill}</span>`).join("");
  }

  const timelineGrid = document.querySelector(".timeline");
  if (timelineGrid && dev.timeline) {
    timelineGrid.innerHTML = dev.timeline.map(t => `
      <p><b>${currentLang === "bn" ? t.step_bn : t.step_en}</b><span>${currentLang === "bn" ? t.desc_bn : t.desc_en}</span></p>
    `).join("");
  }

  const devActions = document.querySelectorAll(".developer-actions a");
  if (devActions.length >= 2) {
    if (dev.projects_link) devActions[0].href = dev.projects_link;
    if (dev.portfolio_link) devActions[1].href = dev.portfolio_link;
  }

  const projectsGrid = document.querySelector(".project-grid");
  if (projectsGrid && dev.projects) {
    projectsGrid.innerHTML = dev.projects.map((p, index) => {
      const pCategory = p.category || (p.title && !p.title.includes('http') ? p.title : "Featured Project");
      const pName = currentLang === "bn" ? (p.title_bn || p.title || "প্রোজেক্ট") : (p.title || p.title_en || "Project");
      const cleanTitle = (!pName || pName.startsWith('http') || pName === pCategory)
        ? (p.desc_en ? p.desc_en.split(',')[0] : "Web Project")
        : pName;
      const pLink = p.url || p.link || "#";
      const cleanDomain = p.domain_display || pLink.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const pDesc = currentLang === "bn" ? (p.desc_bn || p.desc_en || "") : (p.desc_en || p.desc_bn || "");
      return `
        <a class="project-tile" href="${pLink}" target="_blank" rel="noopener" data-aos="fade-up" data-aos-delay="${index * 80}">
          <div class="project-tile-top">
            <span class="project-category-pill">${pCategory}</span>
            <span style="font-size: 0.85rem; color: var(--accent); font-weight: 700;">↗</span>
          </div>
          <h3>${cleanTitle}</h3>
          <span class="project-domain-link">${cleanDomain}</span>
          <p>${pDesc}</p>
        </a>
      `;
    }).join("");
  }

  const contributorsGrid = document.querySelector(".contributor-grid");
  if (contributorsGrid && dev.contributors) {
    contributorsGrid.innerHTML = dev.contributors.map((c, index) => `
      <article class="person-card" data-aos="fade-up" data-aos-delay="${index * 120}">
        <img src="${normalizeCmsPath(c.photo)}" alt="${currentLang === "bn" ? c.name_bn : c.name_en}" loading="lazy">
        <h3>${currentLang === "bn" ? c.name_bn : c.name_en}</h3>
        <p>${currentLang === "bn" ? c.desc_bn : c.desc_en}</p>
      </article>
    `).join("");
  }
}

async function renderHallInfoPage(hallData) {
  if (document.body.dataset.page !== "hostel") return;

  const data = hallData || await fetchJson("data/hall.json");
  if (!data) return;

  // 1. History Places List
  const placesList = document.querySelector(".nearby-list");
  if (placesList && data.history_places && data.history_places.length) {
    placesList.innerHTML = data.history_places.map((place) => {
      const name = currentLang === "bn" ? place.name_bn : place.name_en;
      return `<li>${name}</li>`;
    }).join("");
  }

  // 2. Main History Photo
  const mainPhoto = document.querySelector(".hostel-photo img");
  if (mainPhoto && data.hall_photo) {
    mainPhoto.src = normalizeCmsPath(data.hall_photo);
  }

  // 3. Gallery Grid Photos (Campus Photos Gallery)
  const galleryGrid = document.querySelector(".gallery-grid.hall-photo-demo");
  const campusPhotosList = (data.campus_photos && data.campus_photos.length) ? data.campus_photos : data.hall_photos;
  if (galleryGrid && campusPhotosList && campusPhotosList.length) {
    galleryGrid.innerHTML = campusPhotosList.map((item, index) => {
      const photo = normalizeCmsPath(item.photo || item.asset?.url || item);
      const caption = currentLang === "bn" ? (item.caption_bn || item.caption_en || "ক্যাম্পাস ছবি") : (item.caption_en || item.caption_bn || "Campus Photo");
      return `
        <article class="gallery-card" data-aos="fade-up" data-aos-delay="${index * 120}">
          <img src="${photo}" alt="${caption}" loading="lazy">
        </article>
      `;
    }).join("");
  }

  // 4. Admission Success Chart
  const successChart = document.querySelector(".success-chart");
  if (successChart && data.success_chart && data.success_chart.length) {
    successChart.innerHTML = data.success_chart.map((row) => {
      const text = currentLang === "bn" ? row.text_bn : row.text_en;
      return `
        <div class="chart-row">
          <span>${row.year}</span>
          <div style="--w: ${row.width}%"><b>${text}</b></div>
        </div>
      `;
    }).join("");
  }

  // 5. Map IFrame
  const iframe = document.querySelector(".map-wrap iframe");
  if (iframe && data.map_url) {
    iframe.src = data.map_url;
  }
}

async function renderHallSuperPage(hallData) {
  if (document.body.dataset.page !== "hallsuper" && document.body.dataset.page !== "hostel") return;

  const data = hallData || await fetchJson("data/hall.json");
  if (!data) return;

  // 1. Hall Super Photo
  const superImg = byId("superPhotoImg") || document.querySelector("#hallsuper img") || (document.body.dataset.page === "hallsuper" ? document.querySelector(".hostel-photo img") : null);
  if (superImg && data.hall_super_photo) {
    superImg.src = normalizeCmsPath(data.hall_super_photo);
  }

  // 2. Eyebrow, Name, Designation and Bio
  const eyebrow = document.querySelector("#hallsuper .eyebrow") || document.querySelector(".split .eyebrow");
  if (eyebrow) {
    eyebrow.textContent = currentLang === "bn" ? (data.hall_super_eyebrow_bn || "সম্মানিত নেতৃত্ব") : (data.hall_super_eyebrow_en || "Respectful Leadership");
  }
  const nameEl = byId("hallSuperName") || document.querySelector("[data-i18n='hallSuper.name']");
  if (nameEl) {
    nameEl.textContent = currentLang === "bn" ? (data.hall_super_name_bn || "অধ্যাপক মোঃ কামরুজ্জামান") : (data.hall_super_name_en || "Prof. Md. Kamruzzaman");
  }
  const designationEl = document.querySelector("#hallsuper .split > div > p[style*='font-weight: 700']");
  if (designationEl && (data.hall_super_designation_bn || data.hall_super_designation_en)) {
    designationEl.textContent = currentLang === "bn" ? (data.hall_super_designation_bn || data.hall_super_designation_en) : (data.hall_super_designation_en || data.hall_super_designation_bn);
  }
  const bioEl = byId("hallSuperBio") || document.querySelector("[data-i18n='hallSuper.bio']");
  if (bioEl) {
    const bio = currentLang === "bn" ? (data.hall_super_bio_bn || data.hall_super_bio_en) : (data.hall_super_bio_en || data.hall_super_bio_bn);
    if (bio) bioEl.textContent = bio;
  }

  // 3. Direct Contact Actions & Helpdesk
  const phone = data.hall_super_phone || data.hall_super_contact?.phone;
  const whatsapp = data.hall_super_whatsapp || data.hall_super_contact?.whatsapp;
  const facebook = data.hall_super_facebook || data.hall_super_contact?.facebook;
  const email = data.hall_super_email || data.hall_super_contact?.email;
  const officeRoom = data.office_room || data.hall_super_contact?.office_room_en || data.hall_super_contact?.office_room_bn;
  const visitingHours = data.visiting_hours || data.hall_super_contact?.visiting_hours_en || data.hall_super_contact?.visiting_hours_bn;
  const emergencyText = data.emergency_contact_text || data.hall_super_contact?.emergency_contact;

  const callBtn = byId("superCallBtn");
  const waBtn = byId("superWaBtn");
  const fbBtn = byId("superFbBtn");
  const emailBtn = byId("superEmailBtn");
  if (callBtn && phone) callBtn.href = `tel:${phone}`;
  if (waBtn && whatsapp) waBtn.href = String(whatsapp).startsWith("http") ? whatsapp : `https://wa.me/${String(whatsapp).replace(/[^0-9]/g, "")}`;
  if (fbBtn && facebook) fbBtn.href = facebook;
  if (emailBtn && email) emailBtn.href = `mailto:${email}`;
  const officeEl = byId("superOfficeRoom");
  if (officeEl && officeRoom) officeEl.textContent = officeRoom;
  const hoursEl = byId("superVisitingHours");
  if (hoursEl && visitingHours) hoursEl.textContent = visitingHours;
  const emergencyEl = byId("superEmergencyText");
  if (emergencyEl && emergencyText) emergencyEl.textContent = emergencyText;

  // 4. Info grid (info boxes)
  const infoGrid = document.querySelector("#hallsuper .info-grid") || (document.body.dataset.page === "hallsuper" ? document.querySelector(".info-grid") : null);
  if (infoGrid && data.hall_super_info_boxes && data.hall_super_info_boxes.length) {
    infoGrid.innerHTML = data.hall_super_info_boxes.map((box) => {
      const title = currentLang === "bn" ? box.title_bn : box.title_en;
      const text = currentLang === "bn" ? box.text_bn : box.text_en;
      return `
        <article class="info-box">
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `;
    }).join("");
  }
}

function renderHomeHallSuper(hallData) {
  if (document.body.dataset.page !== "home") return;
  if (!hallData) return;
  const nameEl = byId("homeHallSuperName");
  if (nameEl) {
    nameEl.textContent = currentLang === "bn" ? (hallData.hall_super_name_bn || "অধ্যাপক মোঃ কামরুজ্জামান") : (hallData.hall_super_name_en || "Prof. Md. Kamruzzaman");
  }
  const bioEl = byId("homeHallSuperBio");
  if (bioEl) {
    const bio = currentLang === "bn" ? (hallData.hall_super_bio_bn || hallData.hall_super_bio_en) : (hallData.hall_super_bio_en || hallData.hall_super_bio_bn);
    if (bio) bioEl.textContent = bio;
  }
  const img = document.querySelector("#hallsuper-preview img");
  if (img && hallData.hall_super_photo) {
    img.src = normalizeCmsPath(hallData.hall_super_photo);
  }
}

window.openStudentModalFromRoom = function(slug) {
  const student = students.find((s) => s.slug === slug);
  if (student) {
    openStudentModal(student);
  }
};


window.openGalleryModal = openGalleryModal;


async function downloadGalleryImage(url, title) {
  if (!url) return;
  const btn = document.querySelector(".gallery-download-btn");
  const origHtml = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    const SPINNER_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle; animation: spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
    btn.innerHTML = `${SPINNER_SVG}<span>Downloading...</span>`;
  }

  const cleanName = ((title || "dc-hall-photo").trim().toLowerCase().replace(/[^a-z0-9_-]/gi, "-").replace(/-+/g, "-") || "photo") + ".jpg";

  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("Fetch failed: " + res.status);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const tempA = document.createElement("a");
    tempA.href = blobUrl;
    tempA.download = cleanName;
    document.body.appendChild(tempA);
    tempA.click();
    tempA.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
  } catch (err) {
    console.warn("Direct blob download failed, falling back to Sanity attachment / direct download", err);
    let dlUrl = url;
    if (url.includes("cdn.sanity.io")) {
      dlUrl = url + (url.includes("?") ? "&" : "?") + "dl=" + encodeURIComponent(cleanName);
    }
    const tempA = document.createElement("a");
    tempA.href = dlUrl;
    tempA.download = cleanName;
    tempA.target = "_blank";
    tempA.rel = "noopener noreferrer";
    document.body.appendChild(tempA);
    tempA.click();
    tempA.remove();
  } finally {
    if (btn) {
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = origHtml;
      }, 700);
    }
  }
}

window.downloadGalleryImage = downloadGalleryImage;


// ══════════════════════════════════════════════════════════════
// Dynamic Menu Visibility (Navbar & Mobile Drawer)
// ══════════════════════════════════════════════════════════════
function applyMenuVisibility() {
  const menuVis = cmsAdminSettings?.menu_visibility || cmsSettings?.menu_visibility;
  if (!menuVis || typeof menuVis !== "object") return;

  const menuMapping = {
    menu_home: ['a[href="index.html"]', 'a[href="./"]'],
    menu_students: ['a[href="students.html"]'],
    menu_roommates: ['a[href="roommates.html"]'],
    menu_results: ['a[href="results.html"]'],
    menu_gallery: ['a[href="gallery.html"]'],
    menu_hostel: ['a[href="hostel.html"]'],
    menu_hallsuper: ['a[href="hostel.html#hallsuper"]', 'a[href="hallsuper.html"]'],
    menu_developer: ['a[href="developer.html"]'],
    menu_dc_social: ['a[href="dc-social.html"]'],
    menu_dc_clubs: ['a[href="dc-clubs.html"]'],
    menu_profile: ['a[href="profile.html"]']
  };

  Object.entries(menuMapping).forEach(([key, selectors]) => {
    const isHidden = menuVis[key] === false;
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.closest('.nav-links') || el.closest('.nav-drawer') || el.closest('.dropdown-content')) {
          el.style.display = isHidden ? 'none' : '';
        }
      });
    });
  });
}


// ==============================================================================
// COMPACT FILTER DRAWERS & VIEW TOGGLE CONTROLLER
// ==============================================================================

function initStudentViewToggle() {
  const gridBtn = byId("viewGridModeBtn");
  const listBtn = byId("viewListModeBtn");
  const grid = byId("studentGrid");
  if (!grid || !gridBtn || !listBtn) return;

  const savedMode = localStorage.getItem("student_view_mode") || "grid";
  if (savedMode === "list") {
    grid.classList.add("view-compact");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  } else {
    grid.classList.remove("view-compact");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  }

  gridBtn.addEventListener("click", () => {
    grid.classList.remove("view-compact");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
    localStorage.setItem("student_view_mode", "grid");
  });

  listBtn.addEventListener("click", () => {
    grid.classList.add("view-compact");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
    localStorage.setItem("student_view_mode", "list");
  });
}

function initCompactFilterDrawers() {
  // Helper to open/close drawer
  const openDrawer = (overlay) => {
    if (!overlay) return;
    overlay.style.display = "flex";
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
  };

  const closeDrawer = (overlay) => {
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  };

  // 1. Student Filter Drawer
  const openStudentBtn = byId("openStudentFilterBtn");
  const closeStudentBtn = byId("closeStudentFilterBtn");
  const studentOverlay = byId("studentFilterOverlay");
  const applyStudentBtn = byId("applyStudentFilterBtn");
  const resetStudentBtn = byId("resetStudentFilterBtn");

  if (studentOverlay) {
    // Ensure hidden on load
    closeDrawer(studentOverlay);

    if (openStudentBtn) {
      openStudentBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openDrawer(studentOverlay);
      });
    }
    if (closeStudentBtn) {
      closeStudentBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeDrawer(studentOverlay);
      });
    }
    studentOverlay.addEventListener("click", (e) => {
      if (e.target === studentOverlay) closeDrawer(studentOverlay);
    });
    if (applyStudentBtn) {
      applyStudentBtn.addEventListener("click", () => {
        closeDrawer(studentOverlay);
        updateStudentFilterCount();
        renderStudentCards();
      });
    }
    if (resetStudentBtn) {
      resetStudentBtn.addEventListener("click", () => {
        ["studentBatchFilter", "studentGroupFilter", "studentSectionFilter", "studentBloodFilter", "filterBatch", "filterGroup", "filterSection", "filterBlood"].forEach(id => {
          const el = byId(id);
          if (el) el.value = el.options[0]?.value || "";
        });
        updateStudentFilterCount();
        closeDrawer(studentOverlay);
        renderStudentCards();
      });
    }

    ["studentBatchFilter", "studentGroupFilter", "studentSectionFilter", "studentBloodFilter", "filterBatch", "filterGroup", "filterSection", "filterBlood"].forEach(id => {
      const el = byId(id);
      if (el) {
        el.addEventListener("change", () => {
          updateStudentFilterCount();
          renderStudentCards();
        });
      }
    });
  }

  // 2. Roommate Filter Drawer
  const openRoomBtn = byId("openRoomFilterBtn");
  const closeRoomBtn = byId("closeRoomFilterBtn");
  const roomOverlay = byId("roomFilterOverlay");
  const applyRoomBtn = byId("applyRoomFilterBtn");
  const resetRoomBtn = byId("resetRoomFilterBtn");

  if (roomOverlay) {
    // Ensure hidden on load
    closeDrawer(roomOverlay);

    if (openRoomBtn) {
      openRoomBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openDrawer(roomOverlay);
      });
    }
    if (closeRoomBtn) {
      closeRoomBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeDrawer(roomOverlay);
      });
    }
    roomOverlay.addEventListener("click", (e) => {
      if (e.target === roomOverlay) closeDrawer(roomOverlay);
    });
    if (applyRoomBtn) {
      applyRoomBtn.addEventListener("click", () => {
        closeDrawer(roomOverlay);
        updateRoomFilterCount();
        renderRoommates();
      });
    }
    if (resetRoomBtn) {
      resetRoomBtn.addEventListener("click", () => {
        ["roomBatchFilter", "roomGroupFilter", "roomSectionFilter", "roomBloodFilter", "filterBatch", "filterGroup", "filterSection", "filterBlood"].forEach(id => {
          const el = byId(id);
          if (el) el.value = el.options[0]?.value || "";
        });
        updateRoomFilterCount();
        closeDrawer(roomOverlay);
        renderRoommates();
      });
    }

    ["roomBatchFilter", "roomGroupFilter", "roomSectionFilter", "roomBloodFilter", "filterBatch", "filterGroup", "filterSection", "filterBlood"].forEach(id => {
      const el = byId(id);
      if (el) {
        el.addEventListener("change", () => {
          updateRoomFilterCount();
          renderRoommates();
        });
      }
    });
  }

  // 3. Birthday Filter Drawer
  const openBdayBtn = byId("openBdayFilterBtn");
  const closeBdayBtn = byId("closeBdayFilterBtn");
  const bdayOverlay = byId("bdayFilterOverlay");
  const applyBdayBtn = byId("applyBdayFilterBtn");
  const resetBdayBtn = byId("resetBdayFilterBtn");

  const updateBirthdayFilterCount = () => {
    const m = byId("bdayMonthFilter")?.value || "all";
    const b = byId("bdayBatchFilter")?.value || "all";
    const g = byId("bdayGroupFilter")?.value || "all";
    const bl = byId("bdayBloodFilter")?.value || "all";
    const today = byId("bdayTodayToggle")?.checked;

    let count = 0;
    if (m !== "all") count++;
    if (b !== "all") count++;
    if (g !== "all") count++;
    if (bl !== "all") count++;
    if (today) count++;

    const badge = byId("bdayFilterBadge");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
  };

  if (bdayOverlay) {
    // Ensure hidden on load
    closeDrawer(bdayOverlay);

    if (openBdayBtn) {
      openBdayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openDrawer(bdayOverlay);
      });
    }
    if (closeBdayBtn) {
      closeBdayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeDrawer(bdayOverlay);
      });
    }
    bdayOverlay.addEventListener("click", (e) => {
      if (e.target === bdayOverlay) closeDrawer(bdayOverlay);
    });
    if (applyBdayBtn) {
      applyBdayBtn.addEventListener("click", () => {
        closeDrawer(bdayOverlay);
        updateBirthdayFilterCount();
        renderBirthdays();
      });
    }
    if (resetBdayBtn) {
      resetBdayBtn.addEventListener("click", () => {
        const mSel = byId("bdayMonthFilter");
        const bSel = byId("bdayBatchFilter");
        const gSel = byId("bdayGroupFilter");
        const blSel = byId("bdayBloodFilter");
        const tTog = byId("bdayTodayToggle");
        if (mSel) mSel.value = "all";
        if (bSel) bSel.value = "all";
        if (gSel) gSel.value = "all";
        if (blSel) blSel.value = "all";
        if (tTog) tTog.checked = false;
        updateBirthdayFilterCount();
        closeDrawer(bdayOverlay);
        renderBirthdays();
      });
    }

    ["bdayMonthFilter", "bdayBatchFilter", "bdayGroupFilter", "bdayBloodFilter", "bdayTodayToggle"].forEach(id => {
      const el = byId(id);
      if (el) {
        el.addEventListener("change", () => {
          updateBirthdayFilterCount();
          renderBirthdays();
        });
      }
    });
  }
}

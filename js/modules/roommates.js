/**
 * Dhaka College International Hall - 2-Pass Roommate Pairing Algorithm
 * Module: js/modules/roommates.js
 */

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
    const pairedIds = new Set();
    const roomPairs = [];

    // Pass 1: Explicit bedmate / roommate links
    roomStudents.forEach(s1 => {
      const id1 = s1.slug || s1.id;
      if (pairedIds.has(id1)) return;

      const mateSlug = isShared1stYear
        ? s1.room_1st_year?.bedmate_slug
        : (s1.room_2nd_year?.bedmate_slug || (s1.roommateIds && s1.roommateIds[0]));
      const mateName = (isShared1stYear
        ? (s1.room_1st_year?.bedmate_name || "")
        : (s1.room_2nd_year?.bedmate_name || "")).trim().toLowerCase();

      let match = null;
      if (mateSlug) {
        match = roomStudents.find(s2 => (s2.slug || s2.id) === mateSlug && !pairedIds.has(s2.slug || s2.id) && s2 !== s1);
      }
      if (!match && mateName) {
        match = roomStudents.find(s2 => (s2.name || '').trim().toLowerCase() === mateName && !pairedIds.has(s2.slug || s2.id) && s2 !== s1);
      }

      // Mutual back-check: if s2 selected s1
      if (!match) {
        match = roomStudents.find(s2 => {
          if (s2 === s1 || pairedIds.has(s2.slug || s2.id)) return false;
          const s2MateSlug = isShared1stYear
            ? s2.room_1st_year?.bedmate_slug
            : (s2.room_2nd_year?.bedmate_slug || (s2.roommateIds && s2.roommateIds[0]));
          const s2MateName = (isShared1stYear
            ? (s2.room_1st_year?.bedmate_name || "")
            : (s2.room_2nd_year?.bedmate_name || "")).trim().toLowerCase();
          return s2MateSlug === id1 || (s1.name && s2MateName === s1.name.trim().toLowerCase());
        });
      }

      if (match) {
        pairedIds.add(id1);
        pairedIds.add(match.slug || match.id);
        roomPairs.push([roomNum, [s1, match]]);
      }
    });

    // Pass 2: Pair remaining students in the same room in twos
    const remaining = roomStudents.filter(s => !pairedIds.has(s.slug || s.id));
    for (let i = 0; i < remaining.length; i += 2) {
      if (i + 1 < remaining.length) {
        pairedIds.add(remaining[i].slug || remaining[i].id);
        pairedIds.add(remaining[i + 1].slug || remaining[i + 1].id);
        roomPairs.push([roomNum, [remaining[i], remaining[i + 1]]]);
      } else {
        pairedIds.add(remaining[i].slug || remaining[i].id);
        roomPairs.push([roomNum, [remaining[i]]]);
      }
    }

    pairs.push(...roomPairs);
  });

  return pairs;
}

function renderRoommates() {
  const grid = byId("roommateGrid");
  if (!grid) return;

  const source = filteredRoommateStudents();
  const isHomePage = !!grid.dataset.limit || document.body.dataset.page === "home";

  // === HOMEPAGE: show latest batch rooms ===
  if (isHomePage) {
    grid.classList.remove("view-compact");
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
    const cleanB = singleBatchParam.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const batchLabel = cleanB.startsWith("HSC") ? "HSC-" + cleanB.replace(/^HSC/, "") : cleanB;
    const rooms = groupByRoom(batchSource);

    let html = `
      <div class="batch-archive-nav-wrap" style="grid-column: 1 / -1; margin-bottom: 12px;" data-aos="fade-up">
        <a href="roommates.html" class="btn secondary back-to-all-btn" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; padding: 8px 18px; border-radius: 8px; text-decoration: none;">
          ← ${currentLang === 'bn' ? 'সকল ব্যাচ' : 'All Batches'}
        </a>
      </div>
      <div class="batch-section-header active-batch-header" data-aos="fade-up" style="grid-column: 1 / -1; margin-bottom: 20px;">
        <div class="batch-header-inner">
          <h2 class="batch-heading">
            <span class="batch-icon">${BATCH_LOGO_SVG}</span>
            <span class="batch-label">${currentLang === 'bn' ? 'ব্যাচ:' : 'Batch:'}</span>
            <span class="batch-badge">${batchLabel}</span>
          </h2>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="batch-count-pill">${rooms.length} ${currentLang === 'bn' ? 'টি রুম' : 'Rooms'}</span>
          </div>
        </div>
      </div>`;

    const isCompactView = grid.classList.contains("view-compact");
    if (!rooms.length) {
      html += `<div class="empty-state" style="grid-column: 1 / -1;">${t("common.noStudent")}</div>`;
    } else {
      rooms.forEach(([room, pair], index) => {
        if (isCompactView) {
          html += renderSingleRoomCompactCard(room, pair, index);
        } else {
          html += `
            <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
              ${renderRoomPerson(pair[0], "fade-right")}
              <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
              ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
            </article>`;
        }
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

    const chevronSvg = `<span class="batch-collapse-chevron"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></span>`;

    html += `
      <div class="batch-section-header${isLatest ? ' active-batch-header' : ''}" data-aos="fade-up" style="grid-column: 1 / -1; cursor: pointer;" data-batch-toggle="${batch}">
        <div class="batch-header-inner">
          <h2 class="batch-heading">
            <span class="batch-icon">${BATCH_LOGO_SVG}</span>
            <span class="batch-label">${currentLang === 'bn' ? 'ব্যাচ:' : 'Batch:'}</span>
            <span class="batch-badge">${batch}</span>
          </h2>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="batch-count-pill">${rooms.length} ${currentLang === 'bn' ? 'টি রুম' : 'Rooms'}</span>
            ${chevronSvg}
          </div>
        </div>
      </div>
      <div class="batch-collapsible-wrapper" data-batch-wrapper="${batch}">`;

    const isCompactView = grid.classList.contains("view-compact");
    if (isLatest) {
      rooms.forEach(([room, pair], index) => {
        if (isCompactView) {
          html += renderSingleRoomCompactCard(room, pair, index);
        } else {
          html += `
            <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
              ${renderRoomPerson(pair[0], "fade-right")}
              <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
              ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
            </article>`;
        }
      });
    } else {
      const previewLimit = isCompactView ? 3 : 2;
      const previewRooms = rooms.slice(0, previewLimit);
      previewRooms.forEach(([room, pair], index) => {
        if (isCompactView) {
          html += renderSingleRoomCompactCard(room, pair, index);
        } else {
          html += `
            <article class="room-pair" data-aos="fade-up" data-aos-delay="${Math.min(index * 70, 350)}">
              ${renderRoomPerson(pair[0], "fade-right")}
              <button class="room-number" type="button" data-room-id="${room}" onclick="openRoomModal(\'${room}\')">ROOM<br>${currentLang === "bn" ? toBengaliDigits(room) : room}</button>
              ${pair[1] ? renderRoomPerson(pair[1], "fade-left") : `<div class="room-person empty">${t("common.emptySeat")}</div>`}
            </article>`;
        }
      });

      if (rooms.length > previewLimit) {
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

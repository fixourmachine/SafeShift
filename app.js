'use strict';

// ============================================================
// SECTION DEFINITIONS WITH CONTEXTUAL TIPS
// ============================================================

const SECTION_DEFS = [
  {
    id: 'safety-brief',
    name: 'Safety Brief',
    short: 'Safety',
    hasPatients: false,
    softLimitSecs: 120,
    hardLimitSecs: 180,
    framework: 'Unit Overview',
    tips: [
      { icon: '🏥', text: 'Cot capacity: How many occupied? Any beds to protect for expected admissions?' },
      { icon: '👥', text: 'Staffing & skill mix: Any gaps? ANNP cover? On-call consultant aware?' },
      { icon: '⚠️', text: '<strong>High-risk list:</strong> Name any baby at risk of deterioration RIGHT NOW', highlight: true },
      { icon: '🍼', text: 'Expected admissions: Deliveries, transfers in, retrieval requests?' },
      { icon: '🦠', text: 'Infection control: Isolation requirements, cohort issues, outbreak concerns?' },
      { icon: '🚑', text: 'Transfers: Repatriations or outward transfers planned this shift?' },
      { icon: '🔧', text: 'Equipment: Ventilator availability, nitric, transport team status?' },
      { icon: '📋', text: '<strong>Escalation:</strong> Anything requiring immediate consultant awareness?', highlight: true },
    ],
  },
  {
    id: 'nicu-rm1',
    name: 'NICU Room 1',
    short: 'Rm 1',
    hasPatients: true,
    maxPatients: 6,
    secsPerPatient: 150,
    maxTotalSecs: 900,
    framework: 'I-PASS',
    tips: [
      { icon: '🔴', text: '<strong>I</strong> — Illness severity: Stable / Watch / Sick / Very Sick / Critical?', highlight: true },
      { icon: '📋', text: '<strong>P</strong> — Patient summary: Key change THIS shift (not full admission history)' },
      { icon: '🫁', text: 'Respiratory support & trajectory — improving, worsening, or static?' },
      { icon: '❤️', text: 'Cardiovascular: inotropes, perfusion, HR/BP trend, lines secure?' },
      { icon: '✅', text: '<strong>A</strong> — Action list: What must happen? Who owns each task?', highlight: true },
      { icon: '📊', text: 'Results pending: bloods, cultures, imaging — who is chasing?' },
      { icon: '⚡', text: '<strong>S</strong> — Situation awareness: "If X happens, then do Y"' },
      { icon: '🔄', text: '<strong>S</strong> — Synthesis: Receiver reads back plan, concern & uncertainty', highlight: true },
    ],
  },
  {
    id: 'nicu-rm2',
    name: 'NICU Room 2',
    short: 'Rm 2',
    hasPatients: true,
    maxPatients: 6,
    secsPerPatient: 150,
    maxTotalSecs: 900,
    framework: 'I-PASS',
    tips: [
      { icon: '🔴', text: '<strong>I</strong> — Illness severity: Stable / Watch / Sick / Very Sick / Critical?', highlight: true },
      { icon: '📋', text: '<strong>P</strong> — Patient summary: Key change THIS shift only' },
      { icon: '🫁', text: 'Respiratory support & trajectory — improving, worsening, or static?' },
      { icon: '❤️', text: 'Cardiovascular: inotropes, perfusion, HR/BP trend, lines secure?' },
      { icon: '✅', text: '<strong>A</strong> — Action list: What must happen? Who owns each task?', highlight: true },
      { icon: '📊', text: 'Results pending: bloods, cultures, imaging — who is chasing?' },
      { icon: '⚡', text: '<strong>S</strong> — Situation awareness: "If X happens, then do Y"' },
      { icon: '🔄', text: '<strong>S</strong> — Synthesis: Receiver reads back plan, concern & uncertainty', highlight: true },
    ],
  },
  {
    id: 'side-rooms',
    name: 'Side Rooms',
    short: 'Side',
    hasPatients: true,
    maxPatients: 2,
    secsPerPatient: 150,
    maxTotalSecs: 600,
    framework: 'I-PASS',
    tips: [
      { icon: '🔴', text: '<strong>I</strong> — Illness severity: Stable / Watch / Sick / Very Sick / Critical?', highlight: true },
      { icon: '📋', text: '<strong>P</strong> — Patient summary: Key change THIS shift only' },
      { icon: '🔐', text: 'Isolation: reason, contact precautions in place, review date?' },
      { icon: '✅', text: '<strong>A</strong> — Action list: Outstanding tasks with named owners', highlight: true },
      { icon: '👪', text: 'Family: Safeguarding, ethics, palliative, or complex conversations needed?', highlight: true },
      { icon: '⚡', text: '<strong>S</strong> — Situation: If deteriorates — who escalates, how?' },
      { icon: '🔄', text: '<strong>S</strong> — Synthesis: Receiver reads back plan & key concern' },
    ],
  },
  {
    id: 'deliveries',
    name: 'Expected Deliveries',
    short: 'Delivery',
    hasPatients: true,
    maxPatients: 6,
    patientLabel: 'expected',
    softLimitSecs: 300,
    hardLimitSecs: 480,
    framework: 'Delivery Prep',
    tips: [
      { icon: '👶', text: 'For each: Gestation and reason for resus team attendance', highlight: true },
      { icon: '💉', text: 'Antenatal steroids: given? Count & timing? Complete course?' },
      { icon: '🧪', text: 'Magnesium sulphate given? Why? How far in labour?' },
      { icon: '📍', text: 'Location & timing: Which LW room / theatre? ETA?', highlight: true },
      { icon: '👩‍⚕️', text: 'Team: Who attends? Who leads resus? Airway lead named?' },
      { icon: '🛒', text: 'Equipment: Resus cot checked? CPAP/surfactant ready? Warmer on?' },
      { icon: '💬', text: 'Family: Antenatal counselling done? Parents\' understanding of likely outcome?' },
    ],
  },
  {
    id: 'nicu-rm34',
    name: 'NICU Rooms 3 & 4',
    short: 'Rm 3&4',
    hasPatients: true,
    maxPatients: 8,
    secsPerPatient: 150,
    maxTotalSecs: 1200,
    framework: 'I-PASS',
    tips: [
      { icon: '🔴', text: '<strong>I</strong> — Illness severity: Stable / Watch / Sick / Very Sick / Critical?', highlight: true },
      { icon: '📋', text: '<strong>P</strong> — Patient summary: Key change THIS shift only' },
      { icon: '🫁', text: 'Respiratory support & trajectory — improving, worsening, or static?' },
      { icon: '❤️', text: 'Cardiovascular: inotropes, perfusion, HR/BP trend, lines secure?' },
      { icon: '✅', text: '<strong>A</strong> — Action list: What must happen? Who owns each task?', highlight: true },
      { icon: '📊', text: 'Results pending: bloods, cultures, imaging — who is chasing?' },
      { icon: '⚡', text: '<strong>S</strong> — Situation awareness: "If X happens, then do Y"' },
      { icon: '🔄', text: '<strong>S</strong> — Synthesis: Receiver reads back plan, concern & uncertainty', highlight: true },
    ],
  },
  {
    id: 'other',
    name: 'Other / Interruption',
    short: 'Other',
    hasPatients: false,
    softLimitSecs: 180,
    hardLimitSecs: 300,
    framework: 'Wrap-up',
    tips: [
      { icon: '📌', text: 'Return to any parked topics — bring back deferred items now' },
      { icon: '🔄', text: 'Task allocation: Who owns anything that came up during handover?' },
      { icon: '📋', text: 'Admin items: discharge planning, referrals, rosters?' },
      { icon: '🎓', text: 'Teaching points? Note them — don\'t let them consume handover time', highlight: true },
      { icon: '🏁', text: 'Ready to close? Go to the safety pause before ending', highlight: true },
    ],
  },
];

// ============================================================
// STATE
// ============================================================

const STATE = {
  phase: 'SETUP',           // SETUP | RUNNING | PAUSED | SUMMARY
  shift: 'AM',
  date: '',
  startWallTime: null,
  startTimestamp: null,     // set when first section is activated
  endTimestamp: null,
  pauseStartTimestamp: null,
  totalPausedMs: 0,
  activeSectionIndex: null, // which section is currently running (null = no lap running)
  sections: [],
  interruptions: 0,
  interruptionLog: [],
  timerInterval: null,
  clockInterval: null,
  wakeLock: null,
  _exportCache: null,
};

function initSections(patientCounts) {
  return SECTION_DEFS.map((def, i) => ({
    def,
    patientCount: patientCounts[i] || 0,
    accumulatedMs: 0,       // total elapsed across all intervals
    isActive: false,
    activeStart: null,      // wall clock when current interval opened
    pausedMsAtStart: 0,     // getCurrentPausedMs() snapshot at interval open
    firstActivated: null,   // first time this section was tapped
    intervals: [],          // [{start, end, durationMs}] for local analysis
  }));
}

// ============================================================
// TIMER ENGINE
// ============================================================

function getCurrentPausedMs() {
  return STATE.totalPausedMs +
    (STATE.pauseStartTimestamp ? Date.now() - STATE.pauseStartTimestamp : 0);
}

function getElapsedMs() {
  if (!STATE.startTimestamp) return 0;
  return Math.max(0, Date.now() - STATE.startTimestamp - getCurrentPausedMs());
}

function getSectionElapsedMs(sec) {
  let total = sec.accumulatedMs;
  if (sec.isActive && sec.activeStart !== null) {
    const now = Date.now();
    const pauseDuringInterval = Math.max(0, getCurrentPausedMs() - sec.pausedMsAtStart);
    total += Math.max(0, now - sec.activeStart - pauseDuringInterval);
  }
  return total;
}

function fmtMs(ms) {
  if (!ms || ms < 0) ms = 0;
  const totalSecs = Math.floor(ms / 1000);
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function fmtSecs(secs) { return fmtMs((secs || 0) * 1000); }

// Returns the soft (amber) threshold in seconds
function getSoftLimitSecs(def, patientCount) {
  if (def.softLimitSecs) return def.softLimitSecs;
  if (def.hasPatients && patientCount > 0 && def.secsPerPatient)
    return patientCount * def.secsPerPatient;
  return 180;
}

// Returns the hard (red) threshold in seconds
function getHardLimitSecs(def, patientCount) {
  if (def.hardLimitSecs) return def.hardLimitSecs;
  if (def.hasPatients && patientCount > 0)
    return def.maxTotalSecs || getSoftLimitSecs(def, patientCount) * 1.5;
  return getSoftLimitSecs(def, patientCount) * 1.5;
}

function getTimerColor(def, patientCount, elapsedMs) {
  const secs = elapsedMs / 1000;
  if (secs >= getHardLimitSecs(def, patientCount)) return 'danger';
  if (secs >= getSoftLimitSecs(def, patientCount)) return 'amber';
  return '';
}

// ============================================================
// SHIFT DETECTION
// ============================================================

function detectShift() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return Math.abs(mins - 480) <= Math.abs(mins - 1200) ? 'AM' : 'PM';
}

// ============================================================
// WAKE LOCK
// ============================================================

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try { STATE.wakeLock = await navigator.wakeLock.request('screen'); } catch (_) {}
  }
}
function releaseWakeLock() {
  if (STATE.wakeLock) { STATE.wakeLock.release(); STATE.wakeLock = null; }
}

// ============================================================
// PHASE TRANSITIONS
// ============================================================

function startHandover() {
  const patientCounts = SECTION_DEFS.map(def => {
    if (!def.hasPatients) return 0;
    const el = document.getElementById(`count-${def.id}`);
    return el ? parseInt(el.dataset.value || 0) : 0;
  });

  const shiftEl = document.querySelector('.shift-btn.active');
  STATE.shift = shiftEl ? shiftEl.dataset.shift : detectShift();
  const dateEl = document.getElementById('handover-date');
  STATE.date = dateEl ? dateEl.value : new Date().toISOString().slice(0, 10);

  STATE.startTimestamp = null;   // set on first section tap
  STATE.startWallTime = null;
  STATE.totalPausedMs = 0;
  STATE.pauseStartTimestamp = null;
  STATE.activeSectionIndex = null;
  STATE.interruptions = 0;
  STATE.interruptionLog = [];
  STATE.endTimestamp = null;
  STATE._exportCache = null;
  STATE.phase = 'RUNNING';

  STATE.sections = initSections(patientCounts);

  requestWakeLock();
  showScreen('hud-screen');
  startTick();
  renderHUD();
  
  // Make sure the digital clock ticks even if paused.
  if (!STATE.clockInterval) {
    STATE.clockInterval = setInterval(() => {
      const digitalClock = document.getElementById('hud-live-clock');
      if (digitalClock) {
        digitalClock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      }
      renderAnalogueClock();
    }, 1000);
  }
}

// Close an active section interval and accumulate its time
function closeSection(idx, now) {
  const sec = STATE.sections[idx];
  if (!sec.isActive || sec.activeStart === null) return;

  const currentPausedMs = STATE.totalPausedMs +
    (STATE.pauseStartTimestamp ? now - STATE.pauseStartTimestamp : 0);
  const pauseDuringInterval = Math.max(0, currentPausedMs - sec.pausedMsAtStart);
  const intervalDuration = Math.max(0, now - sec.activeStart - pauseDuringInterval);

  sec.intervals.push({ start: sec.activeStart, end: now, durationMs: intervalDuration });
  sec.accumulatedMs += intervalDuration;
  sec.isActive = false;
  sec.activeStart = null;
  sec.pausedMsAtStart = 0;
}

// Tap a section tile: makes it active. Tapping the already-active tile deactivates it.
function activateSection(idx) {
  const now = Date.now();

  // If globally paused, resume first
  if (STATE.phase === 'PAUSED') {
    STATE.totalPausedMs += now - STATE.pauseStartTimestamp;
    STATE.pauseStartTimestamp = null;
    STATE.phase = 'RUNNING';
  }

  const prevIdx = STATE.activeSectionIndex;

  // Close the currently running section (if any)
  if (prevIdx !== null) {
    closeSection(prevIdx, now);
    STATE.sections[prevIdx].isActive = false;
  }

  // Tapping the already-active section → deactivate (soft pause, no lap running)
  if (prevIdx === idx) {
    STATE.activeSectionIndex = null;
    renderHUD();
    return;
  }

  // Activate the tapped section
  const sec = STATE.sections[idx];
  if (!sec.firstActivated) {
    sec.firstActivated = now;
    if (!STATE.startTimestamp) {
      STATE.startTimestamp = now;
      STATE.startWallTime = new Date().toISOString();
    }
  }
  sec.isActive = true;
  sec.activeStart = now;
  sec.pausedMsAtStart = getCurrentPausedMs();
  STATE.activeSectionIndex = idx;

  renderHUD();
}

function pauseHandover() {
  if (STATE.phase === 'RUNNING') {
    STATE.phase = 'PAUSED';
    STATE.pauseStartTimestamp = Date.now();
  } else if (STATE.phase === 'PAUSED') {
    // Toggle: pressing pause again resumes with whatever section was active
    STATE.totalPausedMs += Date.now() - STATE.pauseStartTimestamp;
    STATE.pauseStartTimestamp = null;
    STATE.phase = 'RUNNING';
  }
  renderHUD();
}

function logInterruption() {
  STATE.interruptions++;
  STATE.interruptionLog.push({
    timestamp: new Date().toISOString(),
    sectionIndex: STATE.activeSectionIndex,
    sectionName: STATE.activeSectionIndex !== null
      ? STATE.sections[STATE.activeSectionIndex].def.name : 'None',
    totalElapsedMs: getElapsedMs(),
  });
  showToast(`⚡ Interruption #${STATE.interruptions} logged`);
  const el = document.getElementById('interrupt-count-display');
  if (el) el.textContent = STATE.interruptions;
}

function endHandover() {
  const now = Date.now();

  // Close active section
  if (STATE.activeSectionIndex !== null) {
    closeSection(STATE.activeSectionIndex, now);
    STATE.sections[STATE.activeSectionIndex].isActive = false;
    STATE.activeSectionIndex = null;
  }

  // Absorb any remaining pause time
  if (STATE.phase === 'PAUSED' && STATE.pauseStartTimestamp) {
    STATE.totalPausedMs += now - STATE.pauseStartTimestamp;
    STATE.pauseStartTimestamp = null;
  }

  STATE.endTimestamp = now;
  STATE.phase = 'SUMMARY';
  if (!STATE.startTimestamp) STATE.startTimestamp = now;

  stopTick();
  if (STATE.clockInterval) {
    clearInterval(STATE.clockInterval);
    STATE.clockInterval = null;
  }
  releaseWakeLock();
  saveSession();
  showScreen('summary-screen');
  renderSummary();
}

// ============================================================
// PATIENT COUNT (adjustable during handover)
// ============================================================

function setPatientCount(sectionIdx, count) {
  const sec = STATE.sections[sectionIdx];
  sec.patientCount = Math.max(0, Math.min(sec.def.maxPatients || 0, count));

  // Update dots in tile
  const dotsEl = document.getElementById(`tile-dots-${sec.def.id}`);
  if (dotsEl) {
    dotsEl.querySelectorAll('.tile-dot').forEach((dot, i) => {
      dot.classList.toggle('filled', i < sec.patientCount);
      dot.classList.toggle('empty', i >= sec.patientCount);
    });
  }

  // Re-render detail panel if this is the active section
  if (STATE.activeSectionIndex === sectionIdx) renderDetailPanel();
}

// ============================================================
// TICK ENGINE
// ============================================================

function startTick() {
  stopTick();
  STATE.timerInterval = setInterval(tick, 250);
}
function stopTick() {
  if (STATE.timerInterval) { clearInterval(STATE.timerInterval); STATE.timerInterval = null; }
}
function tick() {
  if (STATE.phase !== 'RUNNING') return;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  // Total elapsed
  const totalEl = document.getElementById('hud-total-time');
  if (totalEl) totalEl.textContent = fmtMs(getElapsedMs());

  if (STATE.activeSectionIndex === null) return;

  const sec = STATE.sections[STATE.activeSectionIndex];
  const elapsed = getSectionElapsedMs(sec);
  const color = getTimerColor(sec.def, sec.patientCount, elapsed);

  // Active tile timer
  const tileTimer = document.getElementById(`tile-timer-${sec.def.id}`);
  if (tileTimer) {
    tileTimer.textContent = fmtMs(elapsed);
    tileTimer.className = `tile-time ${color}`;
  }
  const tilePerPt = document.getElementById(`tile-perpt-${sec.def.id}`);
  if (tilePerPt) {
    tilePerPt.textContent = (sec.patientCount > 0 && elapsed > 0)
      ? `~${fmtMs(elapsed / sec.patientCount)}/pt` : '';
  }

  // Detail panel — timer
  const detailTimer = document.getElementById('detail-timer');
  if (detailTimer) {
    detailTimer.textContent = fmtMs(elapsed);
    detailTimer.className = 'detail-timer' + (color ? ' ' + color : '');
  }
  const detailPpt = document.getElementById('detail-per-patient');
  if (detailPpt) {
    detailPpt.textContent = (sec.patientCount > 0 && elapsed > 0)
      ? `~${fmtMs(elapsed / sec.patientCount)} per patient` : '';
  }

  // Progress bar + target label
  const softSecs = getSoftLimitSecs(sec.def, sec.patientCount);
  const hardSecs = getHardLimitSecs(sec.def, sec.patientCount);
  const elapsedSecs = elapsed / 1000;

  const bar = document.getElementById('timer-progress-bar');
  if (bar) {
    bar.style.width = Math.min(100, (elapsedSecs / hardSecs) * 100) + '%';
    bar.className = 'timer-progress-bar' + (color ? ' ' + color : '');
  }
  const targetLabel = document.getElementById('timer-target-label');
  if (targetLabel) {
    if (elapsedSecs < softSecs) {
      targetLabel.textContent = `Target: ${fmtSecs(softSecs)} · −${fmtSecs(softSecs - elapsedSecs)} left`;
      targetLabel.style.color = '';
    } else if (elapsedSecs < hardSecs) {
      targetLabel.textContent = `+${fmtSecs(elapsedSecs - softSecs)} over target — approaching limit`;
      targetLabel.style.color = 'var(--amber)';
    } else {
      targetLabel.textContent = `+${fmtSecs(elapsedSecs - softSecs)} over budget`;
      targetLabel.style.color = 'var(--danger)';
    }
  }

  // Mobile sticky active bar tick updates
  const mobBar = document.getElementById('mobile-active-bar');
  if (mobBar && mobBar.classList.contains('visible')) {
    const mobTimer = mobBar.querySelector('.mobile-active-timer');
    if (mobTimer) {
      mobTimer.textContent = fmtMs(elapsed);
      mobTimer.className = `mobile-active-timer ${color}`.trim();
    }
    const mobBarInner = mobBar.querySelector('.mobile-active-progress-bar');
    if (mobBarInner) {
      mobBarInner.style.width = Math.min(100, (elapsedSecs / hardSecs) * 100) + '%';
      mobBarInner.className = `mobile-active-progress-bar ${color}`.trim();
    }
    const mobTarget = mobBar.querySelector('.mobile-active-target');
    if (mobTarget) {
      if (elapsedSecs < softSecs) {
        mobTarget.textContent = `Target: ${fmtSecs(softSecs)} · −${fmtSecs(softSecs - elapsedSecs)} left`;
      } else if (elapsedSecs < hardSecs) {
        mobTarget.textContent = `+${fmtSecs(elapsedSecs - softSecs)} over target — approaching limit`;
      } else {
        mobTarget.textContent = `+${fmtSecs(elapsedSecs - softSecs)} over budget`;
      }
    }
    const mobPerPt = mobBar.querySelector('.mobile-active-perpt');
    if (mobPerPt) {
      mobPerPt.textContent = (sec.patientCount > 0 && elapsed > 0)
        ? `~${fmtMs(elapsed / sec.patientCount)}/pt` : '';
    }
  }

  // Update digital clock
  const digitalClock = document.getElementById('hud-live-clock');
  if (digitalClock) {
    digitalClock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  // Update analogue clock
  renderAnalogueClock();
}

// ============================================================
// RENDER — ANALOGUE CLOCK
// ============================================================

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = angleDeg * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad)
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  // If a section is exactly or more than 60 mins (360 degrees), cap it or draw a full circle
  if (endAngle - startAngle >= 359.9) {
    endAngle = startAngle + 359.9;
  }
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function renderAnalogueClock() {
  const container = document.getElementById('clock-container');
  if (!container) return;
  // Check if we are running or paused
  if (STATE.phase !== 'RUNNING' && STATE.phase !== 'PAUSED') {
    container.innerHTML = '';
    return;
  }

  const now = new Date();
  const msSinceStart = getElapsedMs();
  const startMsTimestamp = now.getTime() - msSinceStart; // approximate virtual start time ignoring pauses

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  // Angles for hands
  const hourAngle = (h % 12 + m / 60) * 30;
  const minuteAngle = (m + s / 60) * 6;
  const secondAngle = s * 6;

  // Generate ticks
  let ticksHtml = '';
  for (let i = 0; i < 60; i++) {
    const angle = i * 6;
    const isHour = i % 5 === 0;
    const p1 = polarToCartesian(0, 0, isHour ? 85 : 88, angle);
    const p2 = polarToCartesian(0, 0, 95, angle);
    const className = isHour ? 'clock-mark-hour' : 'clock-mark-minute';
    ticksHtml += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="${className}" />`;
  }

  // Generate pie slices for each section
  let arcsHtml = '';
  const r = 70; // radius of the pie slices

  STATE.sections.forEach((sec, idx) => {
    if (!sec.intervals.length && (!sec.isActive || sec.activeStart === null)) return;
    
    // Combine all intervals and the current active interval
    const allIntervals = [...sec.intervals];
    if (sec.isActive && sec.activeStart !== null) {
      allIntervals.push({ start: sec.activeStart, end: Date.now() });
    }

    allIntervals.forEach(interval => {
      // Map wall time to angle. 1 minute = 6 degrees.
      // E.g., if interval starts at 08:15:30, it maps to 15.5 minutes = 15.5 * 6 = 93 degrees.
      const st = new Date(interval.start);
      const en = new Date(interval.end);
      
      const stAngle = (st.getMinutes() + st.getSeconds() / 60) * 6;
      let enAngle = (en.getMinutes() + en.getSeconds() / 60) * 6;
      
      // Handle wrapping past the hour (e.g., 55 to 05)
      // If the duration is positive but end angle is smaller, we wrapped around
      let durationMs = interval.end - interval.start;
      if (durationMs > 0 && enAngle < stAngle) {
        enAngle += 360; 
      }
      // If duration is > 60 minutes, it's a full circle + overlap.
      // describeArc handles up to 359.9 degrees.
      
      const arcPath = describeArc(0, 0, r, stAngle, enAngle);
      arcsHtml += `<path d="${arcPath}" class="clock-slice clock-slice-color-${idx % 8}" />`;
    });
  });

  const svgHtml = `
    <svg viewBox="-100 -100 200 200" class="clock-svg">
      <circle cx="0" cy="0" r="95" class="clock-face" />
      ${arcsHtml}
      ${ticksHtml}
      <!-- Hour hand -->
      <line x1="0" y1="0" x2="${polarToCartesian(0,0,50,hourAngle).x}" y2="${polarToCartesian(0,0,50,hourAngle).y}" class="clock-hand-hour" />
      <!-- Minute hand -->
      <line x1="0" y1="0" x2="${polarToCartesian(0,0,75,minuteAngle).x}" y2="${polarToCartesian(0,0,75,minuteAngle).y}" class="clock-hand-minute" />
      <!-- Center dot -->
      <circle cx="0" cy="0" r="4" class="clock-center-dot" />
    </svg>
  `;
  container.innerHTML = svgHtml;
}

// ============================================================
// RENDER — HUD
// ============================================================

function renderHUD() {
  renderHUDTopbar();
  renderSectionTiles();
  renderDetailPanel();
  renderTips(STATE.activeSectionIndex !== null ? STATE.sections[STATE.activeSectionIndex].def : null);
  renderMobileActiveBar();

  const pauseOverlay = document.getElementById('pause-overlay');
  if (pauseOverlay) pauseOverlay.classList.toggle('visible', STATE.phase === 'PAUSED');

  const pauseBtn = document.getElementById('btn-pause');
  if (pauseBtn) {
    pauseBtn.classList.toggle('paused', STATE.phase === 'PAUSED');
    pauseBtn.innerHTML = STATE.phase === 'PAUSED'
      ? `<span>▶</span><span class="btn-label">Resume</span>`
      : `<span>⏸</span><span class="btn-label">Pause</span>`;
  }

  const intEl = document.getElementById('interrupt-count-display');
  if (intEl) intEl.textContent = STATE.interruptions;

  updateTimerDisplay();
}

function renderHUDTopbar() {
  const badge = document.getElementById('hud-shift-badge');
  if (badge) {
    badge.textContent = STATE.shift === 'AM' ? '☀️ Morning' : '🌙 Evening';
    badge.className = `hud-shift-badge ${STATE.shift === 'AM' ? 'tag-am' : 'tag-pm'}`;
  }
}

function renderSectionTiles() {
  const grid = document.getElementById('section-tiles-grid');
  if (!grid) return;
  grid.innerHTML = '';

  STATE.sections.forEach((sec, i) => {
    const isActive = STATE.activeSectionIndex === i;
    const elapsed = getSectionElapsedMs(sec);
    const color = getTimerColor(sec.def, sec.patientCount, elapsed);
    const visited = sec.firstActivated !== null;
    const visitCount = sec.intervals.length + (sec.isActive ? 1 : 0);

    const tile = document.createElement('div');
    tile.className = [
      'section-tile',
      isActive ? 'active' : '',
      isActive && color ? color : '',
      !visited ? 'pristine' : '',
    ].filter(Boolean).join(' ');
    tile.id = `tile-${sec.def.id}`;
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    tile.setAttribute('aria-label', `${sec.def.name}${isActive ? ' — active' : ''}, ${fmtMs(elapsed)}`);
    tile.setAttribute('data-color-idx', i % 8);

    // Visit badge (shows ×N if visited more than once)
    const visitBadge = visitCount > 1
      ? `<span class="tile-visit-badge">×${visitCount}</span>` : '';

    // Cot dots for sections with patients
    let dotsHtml = '';
    if (sec.def.hasPatients) {
      dotsHtml = `<div class="tile-dots" id="tile-dots-${sec.def.id}" role="group" aria-label="Patient count">`;
      for (let d = 0; d < sec.def.maxPatients; d++) {
        const filled = d < sec.patientCount;
        dotsHtml += `<span class="tile-dot ${filled ? 'filled' : 'empty'}" data-dot="${d}" data-section="${i}"
          role="button" tabindex="-1" aria-label="Set ${d + 1} ${sec.def.patientLabel || 'patient'}${d !== 0 ? 's' : ''}"></span>`;
      }
      dotsHtml += '</div>';
    }

    tile.innerHTML = `
      <div class="tile-header">
        <span class="tile-name">${sec.def.name}</span>
        <span class="tile-header-right">
          ${visitBadge}
          ${isActive ? '<span class="tile-active-pip" aria-hidden="true"></span>' : ''}
        </span>
      </div>
      ${dotsHtml}
      <div class="tile-time${color && isActive ? ' ' + color : ''}" id="tile-timer-${sec.def.id}">${visited || isActive ? fmtMs(elapsed) : '—'}</div>
      <div class="tile-perpt" id="tile-perpt-${sec.def.id}">${sec.patientCount > 0 && elapsed > 0 ? `~${fmtMs(elapsed / sec.patientCount)}/pt` : ''}</div>`;

    // Tile click → activate section
    tile.addEventListener('click', e => {
      if (e.target.closest('.tile-dot')) return;
      activateSection(i);
    });
    tile.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateSection(i); }
    });

    // Cot dot interaction
    const dotsContainer = tile.querySelector('.tile-dots');
    if (dotsContainer) {
      dotsContainer.addEventListener('click', e => {
        const dot = e.target.closest('.tile-dot');
        if (!dot) return;
        e.stopPropagation();
        const dotIdx = parseInt(dot.dataset.dot);
        // Tapping the last filled dot → decrement; otherwise set to dotIdx+1
        const newCount = sec.patientCount === dotIdx + 1 ? dotIdx : dotIdx + 1;
        setPatientCount(i, newCount);
      });
      dotsContainer.addEventListener('mouseover', e => {
        const dot = e.target.closest('.tile-dot');
        if (!dot) return;
        const hoverIdx = parseInt(dot.dataset.dot);
        dotsContainer.querySelectorAll('.tile-dot').forEach((d, di) =>
          d.classList.toggle('hover-preview', di <= hoverIdx));
      });
      dotsContainer.addEventListener('mouseleave', () => {
        dotsContainer.querySelectorAll('.tile-dot').forEach(d =>
          d.classList.remove('hover-preview'));
      });
    }

    grid.appendChild(tile);
  });
}

function renderDetailPanel() {
  const panel = document.getElementById('detail-panel');
  if (!panel) return;

  if (STATE.activeSectionIndex === null) {
    panel.innerHTML = `
      <div class="detail-placeholder">
        <div class="detail-placeholder-icon">👆</div>
        <div class="detail-placeholder-text">Tap any section<br>to start its timer</div>
      </div>`;
    return;
  }

  const sec = STATE.sections[STATE.activeSectionIndex];
  const elapsed = getSectionElapsedMs(sec);
  const color = getTimerColor(sec.def, sec.patientCount, elapsed);
  const softSecs = getSoftLimitSecs(sec.def, sec.patientCount);
  const hardSecs = getHardLimitSecs(sec.def, sec.patientCount);
  const elapsedSecs = elapsed / 1000;

  let targetText, targetColor;
  if (elapsedSecs < softSecs) {
    targetText = `Target: ${fmtSecs(softSecs)} · −${fmtSecs(softSecs - elapsedSecs)} left`;
    targetColor = '';
  } else if (elapsedSecs < hardSecs) {
    targetText = `+${fmtSecs(elapsedSecs - softSecs)} over target — approaching limit`;
    targetColor = 'var(--amber)';
  } else {
    targetText = `+${fmtSecs(elapsedSecs - softSecs)} over budget`;
    targetColor = 'var(--danger)';
  }

  panel.innerHTML = `
    <div class="detail-section-name" id="detail-section-name">${sec.def.name}</div>
    <div class="detail-timer${color ? ' ' + color : ''}" id="detail-timer">${fmtMs(elapsed)}</div>
    <div class="detail-per-patient" id="detail-per-patient">
      ${sec.patientCount > 0 && elapsed > 0 ? `~${fmtMs(elapsed / sec.patientCount)} per patient` : ''}
    </div>
    <div class="timer-target-row">
      <div class="timer-progress-track" role="progressbar" aria-label="Section time progress">
        <div class="timer-progress-bar${color ? ' ' + color : ''}" id="timer-progress-bar"
          style="width:${Math.min(100, elapsedSecs / hardSecs * 100)}%"></div>
      </div>
      <div class="timer-target-label" id="timer-target-label" style="color:${targetColor}">${targetText}</div>
    </div>`;
}

function renderTips(def) {
  const tipsBody = document.getElementById('tips-body');
  const tipsFramework = document.getElementById('tips-framework');
  const tipsSectionName = document.getElementById('tips-section-name');
  if (!tipsBody) return;

  if (!def) {
    if (tipsFramework) tipsFramework.textContent = '';
    if (tipsSectionName) tipsSectionName.textContent = 'Tap a section to see tips';
    tipsBody.innerHTML = '';
    return;
  }

  if (tipsFramework) tipsFramework.textContent = def.framework || '';
  if (tipsSectionName) tipsSectionName.textContent = def.name;
  tipsBody.innerHTML = '';
  (def.tips || []).forEach(tip => {
    const item = document.createElement('div');
    item.className = 'tip-item' + (tip.highlight ? ' highlight' : '');
    item.innerHTML = `<span class="tip-icon">${tip.icon}</span><span class="tip-text">${tip.text}</span>`;
    tipsBody.appendChild(item);
  });
}

// ============================================================
// RENDER — SETUP SCREEN
// ============================================================

function renderSetup() {
  // Auto-detect shift and pre-select
  const autoShift = detectShift();
  document.querySelectorAll('.shift-btn').forEach(btn => {
    const isActive = btn.dataset.shift === autoShift;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  const dateEl = document.getElementById('handover-date');
  if (dateEl && !dateEl.value) dateEl.value = new Date().toISOString().slice(0, 10);
  updateShiftLabel();
  renderPrevSessions();
}

function updateShiftLabel() {
  const el = document.getElementById('setup-shift-label');
  const active = document.querySelector('.shift-btn.active');
  if (el && active) el.textContent = `Expected start: ${active.dataset.shift === 'AM' ? '08:00' : '20:00'}`;
}

function setupCounterButtons() {
  SECTION_DEFS.forEach(def => {
    if (!def.hasPatients) return;
    const minusBtn = document.getElementById(`minus-${def.id}`);
    const plusBtn  = document.getElementById(`plus-${def.id}`);
    const display  = document.getElementById(`count-${def.id}`);
    const dotsEl   = document.getElementById(`setup-dots-${def.id}`);
    if (!minusBtn || !plusBtn || !display) return;

    let value = 0;
    display.dataset.value = '0';

    function updateDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      for (let i = 0; i < def.maxPatients; i++) {
        const d = document.createElement('span');
        d.className = 'dot' + (i >= value ? ' empty' : '');
        dotsEl.appendChild(d);
      }
    }
    function update() {
      display.textContent = value;
      display.dataset.value = value;
      minusBtn.disabled = value <= 0;
      plusBtn.disabled  = value >= def.maxPatients;
      updateDots();
    }
    minusBtn.addEventListener('click', () => { if (value > 0) { value--; update(); } });
    plusBtn.addEventListener('click',  () => { if (value < def.maxPatients) { value++; update(); } });
    update();
  });
}

// ============================================================
// RENDER — SUMMARY SCREEN
// ============================================================

function renderSummary() {
  const totalMs   = Math.max(0, STATE.endTimestamp - STATE.startTimestamp - STATE.totalPausedMs);
  const pausedMs  = STATE.totalPausedMs;

  // Patient tallies (rooms only, not deliveries for cot denominator)
  const roomSections = STATE.sections.filter(s => s.def.hasPatients && !s.def.patientLabel);
  const totalCots    = roomSections.reduce((n, s) => n + s.patientCount, 0);
  const roomTotalMs  = roomSections.reduce((n, s) => n + s.accumulatedMs, 0);
  const totalPatients = STATE.sections.filter(s => s.def.hasPatients)
    .reduce((n, s) => n + s.patientCount, 0);

  // Per-patient average (across room sections with patients)
  const ptSections = STATE.sections.filter(s => s.patientCount > 0 && s.accumulatedMs > 0 && s.def.hasPatients);
  const avgPerPatientMs = ptSections.length
    ? ptSections.reduce((n, s) => n + s.accumulatedMs / s.patientCount, 0) / ptSections.length
    : 0;

  // Punctuality
  const startDate = new Date(STATE.startWallTime);
  const expectedStartHour = STATE.shift === 'AM' ? 8 : 20;
  const expectedEndHour   = STATE.shift === 'AM' ? 9 : 21;
  const lateStartMins = Math.max(0,
    (startDate.getHours() * 60 + startDate.getMinutes()) - expectedStartHour * 60);
  const endDate = new Date(STATE.endTimestamp);
  const lateEndMins = Math.max(0,
    (endDate.getHours() * 60 + endDate.getMinutes()) - expectedEndHour * 60);

  const startTimeStr = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const endTimeStr   = endDate.toLocaleTimeString('en-GB',   { hour: '2-digit', minute: '2-digit' });

  STATE._exportCache = {
    totalMs, pausedMs, totalPatients, totalCots, roomTotalMs,
    avgPerPatientMs, lateStartMins, lateEndMins, startTimeStr, endTimeStr,
  };

  setEl('summary-total-time', fmtMs(totalMs));
  setEl('summary-total-patients', totalPatients);
  setEl('summary-avg-per-pt', avgPerPatientMs > 0 ? fmtMs(avgPerPatientMs) : '—');
  setEl('summary-interruptions', STATE.interruptions);
  setEl('summary-start-time', startTimeStr);
  setEl('summary-end-time', endTimeStr);
  setEl('summary-late-start', lateStartMins > 0 ? `+${lateStartMins} min late` : 'On time');
  setEl('summary-paused', pausedMs > 0 ? fmtMs(pausedMs) : '—');

  const lateEl = document.getElementById('summary-late-start');
  if (lateEl) lateEl.style.color =
    lateStartMins > 10 ? 'var(--danger)' : lateStartMins > 0 ? 'var(--amber)' : 'var(--accent)';

  const tableBody = document.getElementById('section-table-body');
  if (tableBody) {
    tableBody.innerHTML = '';
    STATE.sections.forEach(sec => {
      if (!sec.firstActivated && sec.accumulatedMs === 0) return;
      const pct = totalMs > 0 ? Math.round(sec.accumulatedMs / totalMs * 100) : 0;
      const perPt = (sec.patientCount > 0 && sec.accumulatedMs > 0)
        ? fmtMs(sec.accumulatedMs / sec.patientCount) : '—';
      const ptsHtml = sec.patientCount > 0
        ? `<span class="section-row-pts">${sec.patientCount} pt${sec.patientCount !== 1 ? 's' : ''}</span>` : '';
      const lapsHtml = sec.intervals.length > 1
        ? `<span class="section-row-pts">×${sec.intervals.length}</span>` : '';
      const row = document.createElement('div');
      row.className = 'section-row';
      row.innerHTML = `
        <div class="section-row-name">${sec.def.name} ${ptsHtml}${lapsHtml}</div>
        <div class="section-row-time">${sec.accumulatedMs > 0 ? fmtMs(sec.accumulatedMs) : '—'}</div>
        <div class="section-row-perpt">${perPt}</div>
        <div class="section-row-pct">${pct > 0 ? pct + '%' : ''}</div>`;
      tableBody.appendChild(row);
    });
  }
}

function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ============================================================
// EXPORT
// ============================================================

function buildTextReport() {
  const {
    totalMs = 0, pausedMs = 0, totalPatients = 0, totalCots = 0, roomTotalMs = 0,
    avgPerPatientMs = 0, lateStartMins = 0, lateEndMins = 0, startTimeStr = '', endTimeStr = '',
  } = STATE._exportCache || {};

  const dateStr = new Date(STATE.date + 'T12:00:00').toLocaleDateString('en-GB',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const lines = [
    'SafeShift QI Data',
    '═══════════════════════════════════════',
    `Date:            ${dateStr}`,
    `Shift:           ${STATE.shift === 'AM' ? 'Morning (AM)' : 'Evening (PM)'} Handover`,
    `Started:         ${startTimeStr}`,
    `Ended:           ${endTimeStr}`,
    `Duration:        ${fmtMs(totalMs)}`,
    `Paused time:     ${pausedMs > 0 ? fmtMs(pausedMs) : '—'}`,
    `Late vs start:   ${lateStartMins > 0 ? `+${lateStartMins} min` : 'On time'}`,
    `Late vs end:     ${lateEndMins > 0 ? `+${lateEndMins} min` : 'On time'}`,
    '',
    'SECTION BREAKDOWN',
    '───────────────────────────────────────',
    ...STATE.sections
      .filter(s => s.firstActivated || s.accumulatedMs > 0)
      .map(sec => {
        const time  = sec.accumulatedMs > 0 ? fmtMs(sec.accumulatedMs) : '—';
        const perPt = sec.patientCount > 0 && sec.accumulatedMs > 0
          ? `  (${fmtMs(sec.accumulatedMs / sec.patientCount)}/pt)` : '';
        const pts   = sec.patientCount > 0 ? ` [${sec.patientCount}pt]` : '      ';
        const laps  = sec.intervals.length > 1 ? ` ×${sec.intervals.length}` : '';
        return `${sec.def.name.padEnd(22)}${pts.padEnd(7)}${time}${perPt}${laps}`;
      }),
    '',
    'STATISTICS',
    '───────────────────────────────────────',
    `Total patients:         ${totalPatients}`,
    `Avg time/patient:       ${avgPerPatientMs > 0 ? fmtMs(avgPerPatientMs) : '—'}`,
    `Handover time/cot:      ${totalCots > 0 ? fmtMs(totalMs / totalCots) : '—'}`,
    `Room time/cot:          ${totalCots > 0 && roomTotalMs > 0 ? fmtMs(roomTotalMs / totalCots) : '—'}`,
    `Interruptions:          ${STATE.interruptions}`,
  ];

  if (STATE.interruptionLog.length > 0) {
    lines.push('', 'INTERRUPTION LOG', '───────────────────────────────────────');
    STATE.interruptionLog.forEach((intr, i) => {
      lines.push(`#${i + 1}  ${intr.sectionName}  at ${fmtMs(intr.totalElapsedMs)}`);
    });
  }

  lines.push('', `Submitted: ${new Date().toISOString()}`, 'SafeShift v1 — NICU Handover QI Tool');
  return lines.join('\n');
}

function buildCSVRow() {
  const {
    totalMs = 0, pausedMs = 0, totalCots = 0, roomTotalMs = 0,
    lateStartMins = 0, lateEndMins = 0, startTimeStr = '', endTimeStr = '',
  } = STATE._exportCache || {};

  const header = [
    'Date', 'Shift', 'StartTime', 'EndTime',
    'TotalSecs', 'PausedSecs', 'LateVsStart_Mins', 'LateVsEnd_Mins',
    'TotalPatients', 'WholeHandoverSecsPerCot', 'RoomSecsPerCot',
    'Interruptions',
    ...SECTION_DEFS.map(d => [`${d.short}_Secs`, `${d.short}_Pts`, `${d.short}_SecsPerPt`, `${d.short}_Laps`]).flat(),
  ].join(',');

  const totalPts = STATE.sections.filter(s => s.def.hasPatients)
    .reduce((n, s) => n + s.patientCount, 0);

  const sectionData = STATE.sections.map(sec => [
    Math.round((sec.accumulatedMs || 0) / 1000),
    sec.patientCount || 0,
    sec.patientCount > 0 && sec.accumulatedMs > 0
      ? Math.round(sec.accumulatedMs / sec.patientCount / 1000) : '',
    sec.intervals.length,
  ]).flat();

  const row = [
    STATE.date, STATE.shift, startTimeStr, endTimeStr,
    Math.round(totalMs / 1000), Math.round(pausedMs / 1000),
    lateStartMins, lateEndMins,
    totalPts,
    totalCots > 0 ? Math.round(totalMs / totalCots / 1000) : '',
    totalCots > 0 && roomTotalMs > 0 ? Math.round(roomTotalMs / totalCots / 1000) : '',
    STATE.interruptions,
    ...sectionData,
  ].join(',');

  return header + '\n' + row;
}

function buildJSON() {
  const { totalMs = 0, pausedMs = 0, lateStartMins = 0, lateEndMins = 0 } = STATE._exportCache || {};
  return JSON.stringify({
    date: STATE.date, shift: STATE.shift,
    startWallTime: STATE.startWallTime,
    endWallTime: new Date(STATE.endTimestamp).toISOString(),
    totalDurationSecs: Math.round(totalMs / 1000),
    totalPausedSecs: Math.round(pausedMs / 1000),
    lateStartMins, lateEndMins,
    interruptions: STATE.interruptions,
    interruptionLog: STATE.interruptionLog,
    sections: STATE.sections.map(sec => ({
      name: sec.def.name,
      patientCount: sec.patientCount,
      durationSecs: Math.round((sec.accumulatedMs || 0) / 1000),
      secsPerPatient: sec.patientCount > 0 && sec.accumulatedMs > 0
        ? Math.round(sec.accumulatedMs / sec.patientCount / 1000) : null,
      lapCount: sec.intervals.length,
    })),
    exportedAt: new Date().toISOString(),
    tool: 'SafeShift v1',
  }, null, 2);
}

async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = Object.assign(document.createElement('textarea'),
      { value: text, style: 'position:fixed;opacity:0' });
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta); return ok;
  }
}

function downloadFile(content, filename, mime) {
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([content], { type: mime })),
    download: filename,
  });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function openEmail() {
  const subject = `SafeShift QI — ${STATE.shift} Handover ${STATE.date}`;
  window.location.href =
    `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildTextReport())}`;
}

// ============================================================
// STORAGE
// ============================================================

function saveSession() {
  const key = `safeshift_session_${STATE.startTimestamp}`;
  try {
    localStorage.setItem(key, buildJSON());
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith('safeshift_session_')).sort();
    while (keys.length > 20) localStorage.removeItem(keys.shift());
  } catch (_) {}
}

function loadSessions() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith('safeshift_session_'))
    .sort().reverse().slice(0, 5)
    .map(k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } })
    .filter(Boolean);
}

function renderPrevSessions() {
  const list = document.getElementById('prev-sessions-list');
  if (!list) return;
  const sessions = loadSessions();
  if (sessions.length === 0) {
    list.innerHTML = '<p class="no-sessions">No previous sessions yet — they will appear here after your first handover.</p>';
    return;
  }
  list.innerHTML = '';
  sessions.forEach(s => {
    const dateLabel = new Date(s.date + 'T12:00:00').toLocaleDateString('en-GB',
      { weekday: 'short', day: 'numeric', month: 'short' });
    const duration = s.totalDurationSecs ? fmtSecs(s.totalDurationSecs) : '—';
    const item = document.createElement('div');
    item.className = 'session-item';
    item.innerHTML = `
      <div class="session-item-info">${dateLabel} · ${s.shift === 'AM' ? '☀️' : '🌙'}</div>
      <div class="session-item-time">${duration}</div>
      <button class="session-export-btn">Export</button>`;
    item.querySelector('.session-export-btn').addEventListener('click', async () => {
      await copyToClipboard(JSON.stringify(s, null, 2));
      showToast('📋 Session data copied');
    });
    list.appendChild(item);
  });
}

// ============================================================
// UI HELPERS
// ============================================================

function renderMobileActiveBar() {
  const mobileBar = document.getElementById('mobile-active-bar');
  if (!mobileBar) return;

  if (STATE.activeSectionIndex === null || (STATE.phase !== 'RUNNING' && STATE.phase !== 'PAUSED')) {
    mobileBar.classList.remove('visible');
    return;
  }

  const sec = STATE.sections[STATE.activeSectionIndex];
  const elapsed = getSectionElapsedMs(sec);
  const color = getTimerColor(sec.def, sec.patientCount, elapsed);
  const softSecs = getSoftLimitSecs(sec.def, sec.patientCount);
  const hardSecs = getHardLimitSecs(sec.def, sec.patientCount);
  const elapsedSecs = elapsed / 1000;

  let targetText = '';
  if (elapsedSecs < softSecs) {
    targetText = `Target: ${fmtSecs(softSecs)} · −${fmtSecs(softSecs - elapsedSecs)} left`;
  } else if (elapsedSecs < hardSecs) {
    targetText = `+${fmtSecs(elapsedSecs - softSecs)} over target — approaching limit`;
  } else {
    targetText = `+${fmtSecs(elapsedSecs - softSecs)} over budget`;
  }

  const progressPct = Math.min(100, (elapsedSecs / hardSecs) * 100);

  mobileBar.className = 'mobile-active-bar visible';
  mobileBar.innerHTML = `
    <div class="mobile-active-info">
      <div class="mobile-active-title">${sec.def.name}</div>
      <div class="mobile-active-progress-track">
        <div class="mobile-active-progress-bar ${color}" style="width: ${progressPct}%"></div>
      </div>
      <div class="mobile-active-target">${targetText}</div>
    </div>
    <div class="mobile-active-timer-col">
      <div class="mobile-active-timer ${color}">${fmtMs(elapsed)}</div>
      <div class="mobile-active-perpt">
        ${sec.patientCount > 0 && elapsed > 0 ? `~${fmtMs(elapsed / sec.patientCount)}/pt` : ''}
      </div>
    </div>
  `;
}

// ── Theme System ───────────────────────────────────────────

function initTheme() {
  const savedTheme = localStorage.getItem('safeshift_theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  
  setTheme(initialTheme);

  // Sync with system preferences if the user hasn't overridden manually
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('safeshift_theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update icons on all buttons (☀️ means 'switch to light', 🌙 means 'switch to dark')
  const icons = document.querySelectorAll('.theme-icon');
  icons.forEach(span => {
    span.textContent = theme === 'dark' ? '☀️' : '🌙';
  });

  // Update meta theme-color for PWA header bar integration
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#080c18' : '#f8fafc');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  localStorage.setItem('safeshift_theme', nextTheme);
  setTheme(nextTheme);
  showToast(`Switched to ${nextTheme === 'dark' ? 'Night' : 'Day'} Mode`);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const t = document.getElementById(id);
  if (t) { t.classList.add('active'); t.scrollTop = 0; }
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2800);
}

// ============================================================
// INIT
// ============================================================

function init() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
    
    // Listen for controlling service worker changes (i.e. a new SW activated)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing && STATE.phase === 'SETUP') {
        refreshing = true;
        window.location.reload();
      }
    });
  }

  // Initialize day/night mode theme
  initTheme();

  setupCounterButtons();
  renderSetup();
  showScreen('setup-screen');

  // Theme toggle listeners
  document.getElementById('theme-toggle-setup')?.addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-hud')?.addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-summary')?.addEventListener('click', toggleTheme);

  // Shift toggle
  document.querySelectorAll('.shift-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.shift-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      updateShiftLabel();
    });
  });

  document.getElementById('btn-begin')?.addEventListener('click', startHandover);
  document.getElementById('btn-pause')?.addEventListener('click', pauseHandover);
  document.getElementById('btn-end-session')?.addEventListener('click', () => {
    if (confirm('End this handover and go to the summary?')) endHandover();
  });
  document.getElementById('btn-interrupt')?.addEventListener('click', logInterruption);
  document.getElementById('btn-resume-pause')?.addEventListener('click', () => {
    if (STATE.phase === 'PAUSED') pauseHandover(); // toggle
  });

  // Summary exports
  document.getElementById('export-email')?.addEventListener('click', () => {
    openEmail();
    document.getElementById('export-success').textContent = '✉️ Email client opened';
    document.getElementById('export-success').style.opacity = '1';
    setTimeout(() => { document.getElementById('export-success').style.opacity = '0'; }, 2500);
  });
  document.getElementById('export-copy-text')?.addEventListener('click', async () => {
    await copyToClipboard(buildTextReport());
    document.getElementById('export-success').textContent = '✅ Report copied — paste into email or message';
    document.getElementById('export-success').style.opacity = '1';
    setTimeout(() => { document.getElementById('export-success').style.opacity = '0'; }, 2500);
    showToast('📋 Text report copied');
  });
  document.getElementById('export-copy-csv')?.addEventListener('click', async () => {
    await copyToClipboard(buildCSVRow());
    document.getElementById('export-success').textContent = '✅ CSV row copied — paste into spreadsheet';
    document.getElementById('export-success').style.opacity = '1';
    setTimeout(() => { document.getElementById('export-success').style.opacity = '0'; }, 2500);
    showToast('📊 CSV row copied');
  });
  document.getElementById('export-json')?.addEventListener('click', () => {
    downloadFile(buildJSON(), `safeshift_${STATE.date}_${STATE.shift}.json`, 'application/json');
    document.getElementById('export-success').textContent = '✅ JSON file downloaded';
    document.getElementById('export-success').style.opacity = '1';
    setTimeout(() => { document.getElementById('export-success').style.opacity = '0'; }, 2500);
  });
  document.getElementById('btn-new-session')?.addEventListener('click', () => {
    stopTick(); releaseWakeLock(); renderSetup(); showScreen('setup-screen');
  });

  // PWA install
  let deferredInstall;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); deferredInstall = e;
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'flex';
  });
  document.getElementById('btn-install')?.addEventListener('click', async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'none';
  });
  document.getElementById('btn-install-dismiss')?.addEventListener('click', () => {
    const banner = document.getElementById('install-banner');
    if (banner) banner.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', init);

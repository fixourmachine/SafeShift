/**
 * edit-start-time.js
 *
 * Pure-logic extract of the edit-start-time functions from app.js.
 * No DOM, no globals — everything is passed in / returned explicitly,
 * making the business logic fully unit-testable.
 *
 * NOTE: keep this in sync with the equivalent code in app.js.
 */

'use strict';

/**
 * Builds a fresh section object (mirrors initSections in app.js).
 */
function makeSection(def = { id: 'test', name: 'Test' }) {
  return {
    def,
    patientCount: 0,
    accumulatedMs: 0,
    isActive: false,
    activeStart: null,
    pausedMsAtStart: 0,
    firstActivated: null,
    intervals: [],
  };
}

/**
 * Core logic of applyEditedStartTime extracted for unit testing.
 *
 * @param {object} params
 * @param {number}   params.idx              - index of the section being edited
 * @param {number}   params.newStartMs       - the desired new start timestamp (ms)
 * @param {object[]} params.sections         - STATE.sections array (mutated in place)
 * @param {object}   params.state            - partial STATE (startTimestamp mutated)
 * @param {number}   params.currentPausedMs  - result of getCurrentPausedMs() (0 for tests)
 * @param {number}   params.nowMs            - Date.now() substitute
 *
 * @returns {{ ok: boolean, error?: string }}
 */
function applyEditStartTimeLogic({ idx, newStartMs, sections, state, currentPausedMs = 0, nowMs }) {
  const sec = sections[idx];

  // ── Sanity checks ──
  if (newStartMs > nowMs) {
    return { ok: false, error: 'future' };
  }

  if (sec.intervals.length > 0) {
    const firstInterval = sec.intervals[0];
    if (newStartMs >= firstInterval.end) {
      return { ok: false, error: 'after-interval-end' };
    }
    // Adjust the first interval
    const oldDuration = firstInterval.durationMs;
    const newDuration = Math.max(0, firstInterval.end - newStartMs);
    const delta = newDuration - oldDuration;
    firstInterval.start = newStartMs;
    firstInterval.durationMs = newDuration;
    sec.accumulatedMs = Math.max(0, sec.accumulatedMs + delta);
  }

  // If currently active with no closed intervals yet, adjust activeStart
  if (sec.intervals.length === 0 && sec.isActive && sec.activeStart !== null) {
    sec.activeStart = newStartMs;
  }

  // Update firstActivated
  sec.firstActivated = newStartMs;

  // ── Trim any other section whose interval overlaps with newStartMs ──
  sections.forEach((otherSec, otherIdx) => {
    if (otherIdx === idx) return;

    otherSec.intervals.forEach(interval => {
      if (interval.end > newStartMs && interval.start < newStartMs) {
        const oldDuration = interval.durationMs;
        const newDuration = Math.max(0, newStartMs - interval.start);
        otherSec.accumulatedMs = Math.max(0, otherSec.accumulatedMs - (oldDuration - newDuration));
        interval.end = newStartMs;
        interval.durationMs = newDuration;
      }
    });

    if (otherSec.isActive && otherSec.activeStart !== null && otherSec.activeStart < newStartMs) {
      otherSec.activeStart = newStartMs;
      otherSec.pausedMsAtStart = currentPausedMs;
    }
  });

  // ── Recompute global start timestamp ──
  let minActivated = Infinity;
  sections.forEach(s => {
    if (s.firstActivated !== null && s.firstActivated < minActivated) {
      minActivated = s.firstActivated;
    }
  });
  if (minActivated !== Infinity) {
    state.startTimestamp = minActivated;
    state.startWallTime = new Date(minActivated).toISOString();
  }

  return { ok: true };
}

module.exports = { makeSection, applyEditStartTimeLogic };

'use strict';

/**
 * Unit tests for applyEditStartTimeLogic
 * (the edit-start-time bug fix introduced in app.js v1.3.1)
 *
 * Tests are grouped into four suites:
 *  1. Sanity-check rejections
 *  2. Basic start-time edit (single section, no other sections affected)
 *  3. Overlap trimming   ← the main bug that was fixed
 *  4. Global start-timestamp recomputation
 */

const { makeSection, applyEditStartTimeLogic } = require('./edit-start-time.logic');

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Returns a wall-clock ms value for HH:MM on a fixed date (2025-01-01) */
function t(hh, mm, ss = 0) {
  return new Date(`2025-01-01T${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}.000Z`).getTime();
}

/** Builds a closed interval object */
function interval(startHH, startMM, endHH, endMM) {
  const s = t(startHH, startMM);
  const e = t(endHH, endMM);
  return { start: s, end: e, durationMs: e - s };
}

/** Creates a minimal STATE-like object */
function makeState(startTimestamp = null) {
  return { startTimestamp, startWallTime: null };
}

/**
 * Convenience wrapper — runs the logic and returns
 * { result, sections, state } so tests stay readable.
 */
function run({ idx, newHH, newMM, sections, state, nowHH = 12, nowMM = 0 }) {
  const result = applyEditStartTimeLogic({
    idx,
    newStartMs: t(newHH, newMM),
    sections,
    state,
    currentPausedMs: 0,
    nowMs: t(nowHH, nowMM),
  });
  return { result, sections, state };
}

// ─── 1. Sanity-check rejections ───────────────────────────────────────────────

describe('1. Sanity-check rejections', () => {
  test('rejects a start time in the future', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 0);
    sec.intervals.push(interval(8, 0, 8, 30));
    sec.accumulatedMs = t(8, 30) - t(8, 0);

    const { result } = run({
      idx: 0,
      newHH: 13, newMM: 0,     // future (nowMs is 12:00)
      sections: [sec],
      state: makeState(t(8, 0)),
      nowHH: 12, nowMM: 0,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBe('future');
  });

  test('rejects a start time after the first interval has already ended', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 0);
    sec.intervals.push(interval(8, 0, 8, 15));   // ended at 08:15
    sec.accumulatedMs = 15 * 60 * 1000;

    const { result } = run({
      idx: 0,
      newHH: 8, newMM: 20,    // 08:20 > 08:15 end → invalid
      sections: [sec],
      state: makeState(t(8, 0)),
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBe('after-interval-end');
  });
});

// ─── 2. Basic edit (single section) ──────────────────────────────────────────

describe('2. Basic edit — single section, no other sections', () => {
  test('moves the first interval start earlier and extends its duration', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 10);
    sec.intervals.push(interval(8, 10, 8, 30));  // 20 min
    sec.accumulatedMs = 20 * 60 * 1000;

    const { result, sections } = run({
      idx: 0,
      newHH: 8, newMM: 0,    // pull back to 08:00 → should now be 30 min
      sections: [sec],
      state: makeState(t(8, 10)),
    });

    expect(result.ok).toBe(true);
    expect(sections[0].intervals[0].start).toBe(t(8, 0));
    expect(sections[0].intervals[0].durationMs).toBe(30 * 60 * 1000);
    expect(sections[0].accumulatedMs).toBe(30 * 60 * 1000);
    expect(sections[0].firstActivated).toBe(t(8, 0));
  });

  test('moves the first interval start later and shortens its duration', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 0);
    sec.intervals.push(interval(8, 0, 8, 30));   // 30 min
    sec.accumulatedMs = 30 * 60 * 1000;

    const { result, sections } = run({
      idx: 0,
      newHH: 8, newMM: 15,   // push forward to 08:15 → should now be 15 min
      sections: [sec],
      state: makeState(t(8, 0)),
    });

    expect(result.ok).toBe(true);
    expect(sections[0].intervals[0].start).toBe(t(8, 15));
    expect(sections[0].intervals[0].durationMs).toBe(15 * 60 * 1000);
    expect(sections[0].accumulatedMs).toBe(15 * 60 * 1000);
  });

  test('adjusts activeStart when section has no closed intervals yet', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 10);
    sec.isActive = true;
    sec.activeStart = t(8, 10);
    // no closed intervals

    const { result, sections } = run({
      idx: 0,
      newHH: 8, newMM: 0,
      sections: [sec],
      state: makeState(t(8, 10)),
    });

    expect(result.ok).toBe(true);
    expect(sections[0].activeStart).toBe(t(8, 0));
    expect(sections[0].firstActivated).toBe(t(8, 0));
  });

  test('does not alter a second (later) closed interval on the same section', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 0);
    sec.intervals.push(interval(8, 0, 8, 15));   // first  — 15 min
    sec.intervals.push(interval(8, 20, 8, 30));  // second — 10 min
    sec.accumulatedMs = 25 * 60 * 1000;

    const { result, sections } = run({
      idx: 0,
      newHH: 7, newMM: 50,  // pull first interval back 10 min
      sections: [sec],
      state: makeState(t(8, 0)),
    });

    expect(result.ok).toBe(true);
    // Second interval untouched
    expect(sections[0].intervals[1].start).toBe(t(8, 20));
    expect(sections[0].intervals[1].end).toBe(t(8, 30));
    // First interval now starts at 07:50, ends at 08:15 = 25 min
    expect(sections[0].intervals[0].durationMs).toBe(25 * 60 * 1000);
  });
});

// ─── 3. Overlap trimming (the main bug fix) ───────────────────────────────────

describe('3. Overlap trimming — preceding section clipped when start moves earlier', () => {
  test('trims a preceding section interval that ends after the new start time', () => {
    // Room 1 ran 08:00 → 08:30 (30 min)
    // Room 2 ran 08:30 → 09:00 (30 min) — its recorded start is 08:30
    // User corrects Room 2 to say it actually started at 08:20.
    // Room 1's interval (08:00–08:30) now overlaps: its end (08:30) > new start (08:20)
    // → Room 1's end should be trimmed back to 08:20 (was 30 min, now 20 min)

    const room1 = makeSection({ id: 'room1', name: 'Room 1' });
    room1.firstActivated = t(8, 0);
    room1.intervals.push(interval(8, 0, 8, 30));
    room1.accumulatedMs = 30 * 60 * 1000;

    const room2 = makeSection({ id: 'room2', name: 'Room 2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [room1, room2];

    const { result } = run({
      idx: 1,           // editing Room 2
      newHH: 8, newMM: 20,
      sections,
      state,
    });

    expect(result.ok).toBe(true);

    // Room 2 start pulled earlier
    expect(sections[1].intervals[0].start).toBe(t(8, 20));
    expect(sections[1].intervals[0].durationMs).toBe(40 * 60 * 1000); // 08:20–09:00

    // Room 1 end trimmed to 08:20
    expect(sections[0].intervals[0].end).toBe(t(8, 20));
    expect(sections[0].intervals[0].durationMs).toBe(20 * 60 * 1000); // 08:00–08:20
    expect(sections[0].accumulatedMs).toBe(20 * 60 * 1000);
  });

  test('does not trim a preceding interval that ends before the new start time', () => {
    // Room 1 ran 08:00 → 08:15 (no overlap with new start of 08:20)
    const room1 = makeSection({ id: 'room1', name: 'Room 1' });
    room1.firstActivated = t(8, 0);
    room1.intervals.push(interval(8, 0, 8, 15));
    room1.accumulatedMs = 15 * 60 * 1000;

    const room2 = makeSection({ id: 'room2', name: 'Room 2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [room1, room2];

    run({ idx: 1, newHH: 8, newMM: 20, sections, state });

    // Room 1 untouched
    expect(sections[0].intervals[0].end).toBe(t(8, 15));
    expect(sections[0].accumulatedMs).toBe(15 * 60 * 1000);
  });

  test('trims the active section of another room when its activeStart predates new start', () => {
    // Room 1 is currently active from 08:00 (no closed intervals yet)
    // User corrects Room 2 start to 08:20 — Room 1's active start is before 08:20
    // → Room 1's activeStart should be advanced to 08:20

    const room1 = makeSection({ id: 'room1', name: 'Room 1' });
    room1.firstActivated = t(8, 0);
    room1.isActive = true;
    room1.activeStart = t(8, 0);

    const room2 = makeSection({ id: 'room2', name: 'Room 2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [room1, room2];

    run({ idx: 1, newHH: 8, newMM: 20, sections, state });

    expect(sections[0].activeStart).toBe(t(8, 20));
  });

  test('trims multiple overlapping sections simultaneously', () => {
    // Three rooms all had intervals ending at 08:30.
    // Editing Room C's start back to 08:10 should trim Room A AND Room B.

    const roomA = makeSection({ id: 'a', name: 'A' });
    roomA.firstActivated = t(8, 0);
    roomA.intervals.push(interval(8, 0, 8, 30));
    roomA.accumulatedMs = 30 * 60 * 1000;

    const roomB = makeSection({ id: 'b', name: 'B' });
    roomB.firstActivated = t(8, 5);
    roomB.intervals.push(interval(8, 5, 8, 30));
    roomB.accumulatedMs = 25 * 60 * 1000;

    const roomC = makeSection({ id: 'c', name: 'C' });
    roomC.firstActivated = t(8, 30);
    roomC.intervals.push(interval(8, 30, 9, 0));
    roomC.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [roomA, roomB, roomC];

    run({ idx: 2, newHH: 8, newMM: 10, sections, state });

    expect(sections[0].intervals[0].end).toBe(t(8, 10));
    expect(sections[0].accumulatedMs).toBe(10 * 60 * 1000);

    expect(sections[1].intervals[0].end).toBe(t(8, 10));
    expect(sections[1].accumulatedMs).toBe(5 * 60 * 1000);
  });

  test('does not trim a non-overlapping interval on a different section', () => {
    // Room 1: 08:00–08:10 (ends before Room 2's new start of 08:20)
    // Room 3: 08:40–09:00 (starts after Room 2's new start) — not straddling
    const room1 = makeSection({ id: 'r1', name: 'R1' });
    room1.firstActivated = t(8, 0);
    room1.intervals.push(interval(8, 0, 8, 10));
    room1.accumulatedMs = 10 * 60 * 1000;

    const room2 = makeSection({ id: 'r2', name: 'R2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const room3 = makeSection({ id: 'r3', name: 'R3' });
    room3.firstActivated = t(8, 40);
    room3.intervals.push(interval(8, 40, 9, 0));
    room3.accumulatedMs = 20 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [room1, room2, room3];

    run({ idx: 1, newHH: 8, newMM: 20, sections, state });

    // Room 1 untouched
    expect(sections[0].intervals[0].end).toBe(t(8, 10));
    expect(sections[0].accumulatedMs).toBe(10 * 60 * 1000);

    // Room 3 untouched (its start is after new start time)
    expect(sections[2].intervals[0].start).toBe(t(8, 40));
    expect(sections[2].accumulatedMs).toBe(20 * 60 * 1000);
  });
});

// ─── 4. Global start-timestamp recomputation ──────────────────────────────────

describe('4. Global start-timestamp recomputation', () => {
  test('rolls back global start when the first-ever section gets an earlier start', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 10);
    sec.intervals.push(interval(8, 10, 8, 30));
    sec.accumulatedMs = 20 * 60 * 1000;

    const state = makeState(t(8, 10));
    run({ idx: 0, newHH: 8, newMM: 0, sections: [sec], state });

    expect(state.startTimestamp).toBe(t(8, 0));
  });

  test('advances global start when first-ever section is pushed later', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 0);
    sec.intervals.push(interval(8, 0, 8, 30));
    sec.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    run({ idx: 0, newHH: 8, newMM: 15, sections: [sec], state });

    // Only one section — global start must follow it
    expect(state.startTimestamp).toBe(t(8, 15));
  });

  test('does not change global start when a later section is edited earlier than itself but still later than a prior section', () => {
    // Room 1 started at 08:00 (global start). Room 2 started at 08:30.
    // User pulls Room 2 back to 08:20. Global start should still be 08:00.

    const room1 = makeSection({ id: 'r1', name: 'R1' });
    room1.firstActivated = t(8, 0);
    room1.intervals.push(interval(8, 0, 8, 20));
    room1.accumulatedMs = 20 * 60 * 1000;

    const room2 = makeSection({ id: 'r2', name: 'R2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 0));
    const sections = [room1, room2];

    run({ idx: 1, newHH: 8, newMM: 20, sections, state });

    // Global start remains 08:00 (Room 1's firstActivated)
    expect(state.startTimestamp).toBe(t(8, 0));
  });

  test('global start rolls back when editing a non-first section to before the current global start', () => {
    // Room 1 "started" at 08:10 (global start). Room 2 at 08:30.
    // User edits Room 2 back to 08:00 — now Room 2 is the earliest.

    const room1 = makeSection({ id: 'r1', name: 'R1' });
    room1.firstActivated = t(8, 10);
    room1.intervals.push(interval(8, 10, 8, 30));
    room1.accumulatedMs = 20 * 60 * 1000;

    const room2 = makeSection({ id: 'r2', name: 'R2' });
    room2.firstActivated = t(8, 30);
    room2.intervals.push(interval(8, 30, 9, 0));
    room2.accumulatedMs = 30 * 60 * 1000;

    const state = makeState(t(8, 10));
    const sections = [room1, room2];

    run({ idx: 1, newHH: 8, newMM: 0, sections, state });

    expect(state.startTimestamp).toBe(t(8, 0));
  });

  test('startWallTime is updated as an ISO string when global start changes', () => {
    const sec = makeSection();
    sec.firstActivated = t(8, 10);
    sec.intervals.push(interval(8, 10, 8, 30));
    sec.accumulatedMs = 20 * 60 * 1000;

    const state = makeState(t(8, 10));
    run({ idx: 0, newHH: 8, newMM: 0, sections: [sec], state });

    expect(state.startWallTime).toBe(new Date(t(8, 0)).toISOString());
  });
});

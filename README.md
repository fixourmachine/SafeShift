# SafeShift — NICU Handover, Cognitive Aid & QI Tool

[![PWA Status](https://img.shields.io/badge/PWA-Supported-brightgreen.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Language](https://img.shields.io/badge/Language-Vanilla%20JS%20%2F%20HTML%20%2F%20CSS-blue.svg)](#)
[![License](https://img.shields.io/badge/License-AGPL--3.0-orange.svg)](#)

**SafeShift** is a lightweight, offline-first Progressive Web App (PWA) designed specifically for Neonatal Intensive Care Units (NICU). It serves as a real-time timing tracker, cognitive aid, and Quality Improvement (QI) data collection tool to streamline shift handovers, reduce cognitive load, and improve clinical safety.

Designed with clinical usability in mind, SafeShift ensures the handover process is safe, structured, and quantifiable.

---

## 🌟 Key Features

### 📋 Pre-Handover Setup
*   **Shift & Date Detection:** Autodetects current shift (AM/PM) based on the time of day.
*   **Granular Area Configuration:** Set patient counts for specific care zones (NICU Room 1, NICU Room 2, Side Rooms, Expected Deliveries, NICU Rooms 3 & 4).
*   **Session History:** View and manage previous session stats stored locally.

### ⏱️ Live Handover HUD (Heads-Up Display)
*   **Lap-Timer Sections:** Tap any room or section tile to focus active timing on it. Re-tapping pauses the section.
*   **Analogue Clock Pie Chart Visualization:** A custom SVG analogue clock overlay that visually maps active handover durations as colored pie slices directly over the current hour of the clock face.
*   **Live Patient Adjustments:** Directly change patient counts in individual rooms on the fly during the handover.
*   **Interruption Tracker:** Quick-log button (⚡) to count and timestamp shift handover interruptions.
*   **Prevent Sleep Mode:** Uses the HTML5 Screen Wake Lock API to prevent mobile and tablet screens from dimming or locking during handovers.
*   **Responsive Layout:** Features a tablet-optimized split view and an adaptive mobile layout with a sticky bottom action bar.

### 🧠 Cognitive Aids & Tips Panel
*   **Framework-Driven Tips:** Displays contextual, structured checklists depending on the selected section (e.g., **I-PASS** for clinical rooms, **Unit Overview** for the general safety brief, and **Delivery Prep** for expected deliveries).
*   **High-Priority Highlights:** Critical handover prompts (like illness severity classification and syntheses/read-backs) are emphasized in high-contrast styling.

### 📊 Summary, Punctuality & QI Export
*   **Automated Metrics:** Evaluates total duration, start/end timestamps, total patient count, average time spent per patient, total interruptions, and start punctuality (e.g., late start flags).
*   **Section-by-Section Breakdown:** Transparent reporting table highlighting the time, average per-patient time, and percentage allocation for each section.
*   **🏁 Closing Safety Pause:** A mandatory checklist before concluding the session (verifying sickest baby plans, owner-assigned critical tasks, outstanding result chasers, family communication, and consultant escalation thresholds).
*   **QI Export Capabilities:**
    *   ✉️ **Email Report:** Formats and pre-fills an email with structured handover metrics.
    *   📋 **Copy Report:** One-click copy of a plain-text markdown report to the clipboard.
    *   📊 **Copy CSV Row:** One-click copy of flat CSV data for direct paste into QI spreadsheets.
    *   ⬇️ **Download JSON:** Download a full JSON file containing granular interval logs and metadata.

---

## 🛠️ Technology Stack

SafeShift is built with **zero external dependencies** to ensure rapid load times, reliability in hospital networks, and absolute data privacy (no data leaves the local device):

*   **HTML5 & CSS3:** Responsive layout using CSS Grid, Flexbox, custom variables, and modern system typography. Includes both Day (Light) and Night (Dark) mode color palettes.
*   **Vanilla JavaScript:** Highly responsive event handling, state machine, SVG generation, and duration computations.
*   **Service Worker (`sw.js`):** Intercepts network queries to enable 100% offline capability (caches all core assets).
*   **Web App Manifest (`manifest.json`):** Allows installation directly on home screens (iOS/Android) and desktops as a native standalone application.

---

## 📦 File Structure

```
SafeShift/
├── index.html        # Main PWA application frame & screens
├── style.css         # Modern visual guidelines, variables, layouts, and animations
├── app.js            # Timer engine, UI rendering, analogue clock, and export generators
├── sw.js             # Service Worker for offline asset caching
├── manifest.json     # PWA metadata configuration
├── icon-192.png      # Application icons (PWA)
└── icon-512.png      # Application icons (PWA)
```

---

## 🚀 Getting Started

### Running Locally
Since SafeShift has no backend or bundlers, you can run it directly:

1.  **Direct Open:** Double-click `index.html` in any modern web browser.
2.  **Simple HTTP Server:** To fully test PWA service workers, serve the files over localhost.
    *   **Python:**
        ```bash
        python -m http.server 8000
        ```
    *   **Node.js / npm:**
        ```bash
        npx serve .
        ```
    *   Open `http://localhost:8000` (or the port provided) in your browser.

### Installing as a Mobile/Tablet App
1.  Navigate to the deployed app URL or your local address in Safari (iOS) or Chrome (Android).
2.  **iOS:** Tap the **Share** button ➡️ select **Add to Home Screen**.
3.  **Android:** Tap the banner or select **Install App** from the browser menu.
4.  Launch **SafeShift** from your home screen to experience it in standalone, fullscreen mode with offline support.

---

## 🔒 Data Privacy & Security

SafeShift operates entirely client-side.
*   **No Database / No Cloud Sync:** All sessions are saved directly in the browser's `LocalStorage`.
*   **Patient Safety / GDPR / HIPAA Compliance:** SafeShift **does not** collect, store, or transmit any Patient Identifiable Information (PII). It only records patient counts, timestamps, and section durations.

---

## 📄 License

This project is licensed under the GNU Affero License.

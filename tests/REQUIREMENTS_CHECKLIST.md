# ClearUX Usable Product Requirements Checklist

This checklist is included so the professor can quickly see where each requirement is covered.

## 1. High-fidelity prototype / usable interface
Covered by:
- `index.html`
- `styles.css`
- `src/app.js`

The interface includes a polished ClearUX dashboard, scenario selector, simulated webpage preview, scan button, result card, confidence score, evidence table, and feedback buttons.

## 2. Working implementation of core features
Covered by:
- `src/detector.js`
- `src/scenarios.js`
- `src/app.js`

Implemented core feature:
**Dark Pattern Detection: Cancellation vs Subscription**

The app checks:
- subscription/stay steps
- cancellation steps
- step ratio
- cancel button position from top
- cancel font size
- cancel contrast ratio
- cancel button size compared to subscription button size

## 3. Specific, non-vague detection rules
Covered by:
- `README.md`
- `docs/PRECISE_TEST_CASES.md`
- `src/detector.js`

The project defines exact thresholds:
- hidden by scroll: cancel option > 700px from top and main button < 250px from top
- low contrast: contrast ratio < 4.5:1
- small text: font size < 12px
- much smaller button: cancel area < 55% of main button area
- step asymmetry: cancellation steps are at least 2× subscription/stay steps
- high warning: confidence ≥ 80%
- medium warning: confidence between 50% and 79%

## 4. At least one automated unit test
Covered by:
- `tests/detector.test.js`

The project includes 3 automated unit tests:
- TC-01: clear dark pattern returns high warning
- TC-02: edge case returns medium warning
- TC-03: safe page returns no warning

Run tests with:

```bash
npm install
npm test
```

## 5. Public GitHub repository ready
Covered by:
- clean folder structure
- `README.md`
- `package.json`
- source files in `src/`
- tests in `tests/`
- documentation in `docs/`
- icons in `assets/`

The team can upload this folder directly to GitHub.

## 6. Hosted app link or recorded demo ready
Covered by:
- static web app files: `index.html`, `styles.css`, `src/`
- `docs/DEMO_SCRIPT.md`
- `docs/SUBMISSION_NOTES.md`

The project can be hosted on GitHub Pages, Netlify, or Vercel. If hosting is not possible, the team can record a demo using the script in `docs/DEMO_SCRIPT.md`.

## 7. Extension icon
Covered by:
- `assets/clearux-icon.svg`
- `assets/icon-16.png`
- `assets/icon-32.png`
- `assets/icon-48.png`
- `assets/icon-128.png`

These are used by the optional extension popup demo.

## 8. Optional Chrome extension popup demo
Covered by:
- `manifest.json`
- `extension/popup.html`
- `extension/popup.js`
- `assets/` icons

This is included as an extra demonstration. The main submission is still the hostable web MVP.

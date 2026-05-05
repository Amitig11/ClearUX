import { scenarios } from "./scenarios.js";
import { analyzeScenario } from "./detector.js";

const scenarioSelect = document.getElementById("scenarioSelect");
const pagePreview = document.getElementById("pagePreview");
const fakeUrl = document.getElementById("fakeUrl");
const scanBtn = document.getElementById("scanBtn");
const scanState = document.getElementById("scanState");
const resultBox = document.getElementById("resultBox");
const evidenceList = document.getElementById("evidenceList");
const feedbackMsg = document.getElementById("feedbackMsg");
const helpfulYes = document.getElementById("helpfulYes");
const helpfulNo = document.getElementById("helpfulNo");

function renderScenario(key) {
  const scenario = scenarios[key];
  fakeUrl.textContent = `https://demo.clearux.local/${scenario.id}`;
  feedbackMsg.textContent = "";
  evidenceList.innerHTML = "";
  scanState.textContent = "Ready to scan";
  resultBox.className = "result neutral";
  resultBox.innerHTML = `<strong>No scan yet</strong><p>Select a scenario and click Scan Current Page.</p>`;

  if (key === "clearDarkPattern") {
    pagePreview.innerHTML = `
      <h2 class="web-title">${scenario.pageTitle}</h2>
      <p class="web-subtitle">Your Premium plan renews tomorrow. Choose what you want to do.</p>
      <a href="#" class="primary-btn">Keep Premium</a>
      <div class="spacer-large"></div>
      <a href="#" class="tiny-cancel">Cancel Subscription</a>
      <p class="web-subtitle">Next steps after clicking cancel: Continue to Cancel → Confirm Cancellation</p>
    `;
  } else if (key === "edgeCase") {
    pagePreview.innerHTML = `
      <h2 class="web-title">${scenario.pageTitle}</h2>
      <p class="web-subtitle">Manage your plan below.</p>
      <a href="#" class="primary-btn">Renew Subscription</a>
      <div class="spacer-medium"></div>
      <a href="#" class="secondary-btn">Cancel Subscription</a>
      <p class="web-subtitle">Next step after clicking cancel: Confirm Cancellation</p>
    `;
  } else {
    pagePreview.innerHTML = `
      <h2 class="web-title">${scenario.pageTitle}</h2>
      <nav class="article-nav"><a>Home</a><a>Search</a><a>Read More</a><a>Contact Us</a><a>About</a></nav>
      <div class="article-body">
        <p>This page is a normal educational article. It has no subscription, cancellation, billing, renewal, unsubscribe, or manage-plan flow.</p>
        <p>ClearUX should not show a warning here because the page does not include the pattern being tested.</p>
      </div>
    `;
  }
}

function renderEvidence(evidence) {
  const rows = [
    ["Subscribe steps", evidence.subscriptionSteps ?? "Not found"],
    ["Cancel steps", evidence.cancellationSteps ?? "Not found"],
    ["Step ratio", evidence.asymmetryRatio ? `${evidence.asymmetryRatio}:1` : "N/A"],
    ["Cancel top", evidence.cancelButtonTopPx != null ? `${evidence.cancelButtonTopPx}px` : "N/A"],
    ["Cancel font", evidence.cancelFontSizePx != null ? `${evidence.cancelFontSizePx}px` : "N/A"],
    ["Cancel contrast", evidence.cancelContrastRatio != null ? `${evidence.cancelContrastRatio}:1` : "N/A"],
    ["Hidden by scroll", evidence.cancelHiddenByScroll ? "Yes" : "No"],
    ["Threshold met", evidence.warningThresholdMet ? "Yes" : "No"]
  ];
  evidenceList.innerHTML = rows.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("");
}

scanBtn.addEventListener("click", () => {
  const scenario = scenarios[scenarioSelect.value];
  scanState.textContent = "Scanning page…";
  setTimeout(() => {
    const result = analyzeScenario(scenario);
    scanState.textContent = `Scan completed in ${result.scanTimeMs} ms`;
    resultBox.className = `result ${result.status}`;
    resultBox.innerHTML = `
      <strong>${result.label}</strong>
      <div class="confidence">${result.confidence}%</div>
      <p>${result.explanation}</p>
    `;
    renderEvidence(result.evidence);
  }, 180);
});

scenarioSelect.addEventListener("change", () => renderScenario(scenarioSelect.value));
helpfulYes.addEventListener("click", () => feedbackMsg.textContent = "Feedback saved locally: Helpful = Yes");
helpfulNo.addEventListener("click", () => feedbackMsg.textContent = "Feedback saved locally: Helpful = No");

renderScenario(scenarioSelect.value);

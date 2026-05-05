import { scenarios } from "../src/scenarios.js";
import { analyzeScenario } from "../src/detector.js";

const select = document.getElementById("scenario");
const scan = document.getElementById("scan");
const resultBox = document.getElementById("result");

scan.addEventListener("click", () => {
  const result = analyzeScenario(scenarios[select.value]);
  resultBox.className = `result ${result.status}`;
  resultBox.innerHTML = `<strong>${result.label}</strong><div class="confidence">${result.confidence}%</div><p>${result.explanation}</p>`;
});

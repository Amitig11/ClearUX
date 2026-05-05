import test from "node:test";
import assert from "node:assert/strict";
import { scenarios } from "../src/scenarios.js";
import { analyzeScenario } from "../src/detector.js";

test("TC-01 clear dark pattern returns a high warning with quantified evidence", () => {
  const result = analyzeScenario(scenarios.clearDarkPattern);
  assert.equal(result.status, "high-warning");
  assert.equal(result.label, "Warning: Unfair cancellation flow detected");
  assert.ok(result.confidence >= 80);
  assert.equal(result.evidence.subscriptionSteps, 1);
  assert.equal(result.evidence.cancellationSteps, 3);
  assert.equal(result.evidence.asymmetryRatio, 3);
  assert.equal(result.evidence.cancelHiddenByScroll, true);
  assert.equal(result.evidence.cancelLowContrast, true);
});

test("TC-02 edge case returns a medium warning, not an exaggerated high warning", () => {
  const result = analyzeScenario(scenarios.edgeCase);
  assert.equal(result.status, "medium-warning");
  assert.ok(result.confidence >= 50 && result.confidence <= 79);
  assert.equal(result.evidence.subscriptionSteps, 1);
  assert.equal(result.evidence.cancellationSteps, 2);
  assert.equal(result.evidence.cancelHiddenByScroll, false);
});

test("TC-03 safe page returns no warning when no subscription or cancellation flow exists", () => {
  const result = analyzeScenario(scenarios.safePage);
  assert.equal(result.status, "safe");
  assert.equal(result.confidence, 0);
  assert.equal(result.evidence.subscriptionFlowFound, false);
  assert.equal(result.evidence.cancellationFlowFound, false);
  assert.equal(result.evidence.warningThresholdMet, false);
});

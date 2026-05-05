const KEYWORDS = ["Subscribe", "Cancel Subscription", "Renew Plan", "Billing", "Unsubscribe", "Manage Plan", "Start Free Trial", "Upgrade", "Get Premium"];

export function calculateArea(element) {
  if (!element || element.widthPx == null || element.heightPx == null) return 0;
  return element.widthPx * element.heightPx;
}

// Main function used by the app and the tests.
// It receives one scenario and returns the ClearUX result.
export function analyzeScenario(scenario) {
  const start = performance.now ? performance.now() : Date.now();
  const subscription = scenario.subscription;
  const cancellation = scenario.cancellation;
  const bothFlowsIdentified = Boolean(subscription.identified && cancellation.identified);
  const hasSubscriptionKeywords = scenario.visibleWordsOnPage.some(word => KEYWORDS.some(keyword => word.toLowerCase().includes(keyword.toLowerCase())));

  if (!bothFlowsIdentified) {
    return {
      status: "safe",
      label: "No dark pattern detected",
      confidence: 0,
      explanation: hasSubscriptionKeywords
        ? "The page contains a subscription-related word, but ClearUX did not find both a subscription flow and a cancellation flow. No warning is shown."
        : "No subscription/cancellation flow detected on this page. No warning is shown.",
      evidence: {
        subscriptionFlowFound: subscription.identified,
        cancellationFlowFound: cancellation.identified,
        visibleWordsChecked: scenario.visibleWordsOnPage,
        warningThresholdMet: false
      },
      scanTimeMs: Math.round((performance.now ? performance.now() : Date.now()) - start)
    };
  }

  // Step ratio: example 3 cancel steps / 1 subscribe step = 3:1.
  const ratio = cancellation.steps / Math.max(subscription.steps, 1);
  // These rules are quantified so the test is not vague.
  // Hidden by scroll means cancel is below 700px while the main button is near the top.
  const cancelHiddenByScroll = cancellation.buttonTopPx > 700 && subscription.buttonTopPx < 250;
  const cancelLowContrast = cancellation.contrastRatio < 4.5;
  const cancelSmallText = cancellation.fontSizePx < 12;
  const subscriptionArea = calculateArea(subscription);
  const cancellationArea = calculateArea(cancellation);
  const cancelMuchSmaller = cancellationArea < subscriptionArea * 0.55;
  const extraFriction = cancellation.steps - subscription.steps >= 2;

  // Simple confidence score for the MVP. More evidence = higher confidence.
  let confidence = 0;
  if (ratio >= 2) confidence += 45;
  else if (ratio >= 1.5) confidence += 25;

  if (cancelHiddenByScroll) confidence += 15;
  if (cancelLowContrast) confidence += 12;
  if (cancelSmallText) confidence += 10;
  if (cancelMuchSmaller) confidence += 8;
  if (extraFriction) confidence += 10;

  confidence = Math.min(100, confidence);

  const highWarning = ratio >= 2 && confidence >= 80;
  const mediumWarning = !highWarning && confidence >= 50 && confidence <= 79;

  const evidence = {
    subscriptionFlowFound: true,
    cancellationFlowFound: true,
    subscriptionSteps: subscription.steps,
    cancellationSteps: cancellation.steps,
    asymmetryRatio: Number(ratio.toFixed(2)),
    subscriptionButtonTopPx: subscription.buttonTopPx,
    cancelButtonTopPx: cancellation.buttonTopPx,
    cancelHiddenByScroll,
    subscriptionFontSizePx: subscription.fontSizePx,
    cancelFontSizePx: cancellation.fontSizePx,
    cancelSmallText,
    subscriptionAreaPx2: subscriptionArea,
    cancellationAreaPx2: cancellationArea,
    cancelMuchSmaller,
    cancelContrastRatio: cancellation.contrastRatio,
    cancelLowContrast,
    cancellationPath: cancellation.requiredPath,
    warningThresholdMet: highWarning || mediumWarning
  };

  if (highWarning) {
    return {
      status: "high-warning",
      label: "Warning: Unfair cancellation flow detected",
      confidence,
      explanation: `Canceling requires ${cancellation.steps} steps while staying subscribed requires ${subscription.steps} step. The cancel option is ${cancellation.buttonTopPx}px from the top, uses ${cancellation.fontSizePx}px text, and has a ${cancellation.contrastRatio}:1 contrast ratio.`,
      evidence,
      scanTimeMs: Math.round((performance.now ? performance.now() : Date.now()) - start)
    };
  }

  if (mediumWarning) {
    return {
      status: "medium-warning",
      label: "Caution: Cancellation option is less prominent",
      confidence,
      explanation: `Canceling requires ${cancellation.steps} steps while renewing requires ${subscription.steps} step. The cancel option is visible, but it is lower on the page (${cancellation.buttonTopPx}px from the top) and has lower contrast (${cancellation.contrastRatio}:1).`,
      evidence,
      scanTimeMs: Math.round((performance.now ? performance.now() : Date.now()) - start)
    };
  }

  return {
    status: "safe",
    label: "No dark pattern detected",
    confidence,
    explanation: "ClearUX found both flows, but the measured difference did not meet the warning threshold.",
    evidence,
    scanTimeMs: Math.round((performance.now ? performance.now() : Date.now()) - start)
  };
}

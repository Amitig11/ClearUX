export const scenarios = {
  clearDarkPattern: {
    id: "clear-dark-pattern",
    title: "Clear Dark Pattern: Hard to Cancel",
    pageTitle: "StreamPlus — Manage Subscription",
    serviceName: "StreamPlus",
    description: "The page makes keeping the plan easy, but cancellation requires more steps and the cancel link is visually weak.",
    flowSource: "MVP demo dataset. In a real extension, this can come from locally saved subscription-flow history or a verified service-flow database.",
    subscription: {
      identified: true,
      label: "Keep Premium",
      steps: 1,
      buttonTopPx: 140,
      fontSizePx: 18,
      widthPx: 240,
      heightPx: 48,
      contrastRatio: 8.6,
      firstScreenVisible: true
    },
    cancellation: {
      identified: true,
      label: "Cancel Subscription",
      steps: 3,
      buttonTopPx: 930,
      fontSizePx: 10,
      widthPx: 120,
      heightPx: 20,
      contrastRatio: 2.1,
      firstScreenVisible: false,
      requiredPath: ["Cancel Subscription", "Continue to Cancel", "Confirm Cancellation"]
    },
    visibleWordsOnPage: ["Keep Premium", "Cancel Subscription", "Continue to Cancel", "Confirm Cancellation"]
  },

  edgeCase: {
    id: "edge-case",
    title: "Edge Case: Visible but Weaker Cancel Option",
    pageTitle: "StudyCloud — Subscription Settings",
    serviceName: "StudyCloud",
    description: "The cancel option exists and is clickable, but it is lower on the page and visually weaker than the renew button.",
    flowSource: "MVP demo dataset. Both flows are known for this test scenario.",
    subscription: {
      identified: true,
      label: "Renew Subscription",
      steps: 1,
      buttonTopPx: 120,
      fontSizePx: 16,
      widthPx: 220,
      heightPx: 44,
      contrastRatio: 7.9,
      firstScreenVisible: true
    },
    cancellation: {
      identified: true,
      label: "Cancel Subscription",
      steps: 2,
      buttonTopPx: 560,
      fontSizePx: 12,
      widthPx: 150,
      heightPx: 34,
      contrastRatio: 3.8,
      firstScreenVisible: true,
      requiredPath: ["Cancel Subscription", "Confirm Cancellation"]
    },
    visibleWordsOnPage: ["Renew Subscription", "Cancel Subscription", "Confirm Cancellation"]
  },

  safePage: {
    id: "safe-page",
    title: "Safe Page: No Subscription Flow",
    pageTitle: "Top 5 Study Tips for Students",
    serviceName: "Student Blog",
    description: "The page is a normal article and contains no subscription, billing, renewal, or cancellation flow.",
    flowSource: "Live page scan: no subscription or cancellation keywords are present.",
    subscription: {
      identified: false,
      label: null,
      steps: 0,
      buttonTopPx: null,
      fontSizePx: null,
      widthPx: null,
      heightPx: null,
      contrastRatio: null,
      firstScreenVisible: false
    },
    cancellation: {
      identified: false,
      label: null,
      steps: 0,
      buttonTopPx: null,
      fontSizePx: null,
      widthPx: null,
      heightPx: null,
      contrastRatio: null,
      firstScreenVisible: false,
      requiredPath: []
    },
    visibleWordsOnPage: ["Home", "Search", "Read More", "Contact Us", "About"]
  }
};

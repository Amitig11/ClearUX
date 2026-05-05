# Submission Notes

## Project name
ClearUX - Usable Product MVP

## Feature implemented
**Dark Pattern Detection: Cancellation vs Subscription**

## What this product is
This is a working usable product MVP. It is a hostable web app that demonstrates the core behavior of the ClearUX browser extension.

The tester can choose one of three webpage scenarios and click **Scan Current Page**. The app then shows:

- result status
- confidence score
- short explanation
- exact measurable evidence
- Helpful / Not Helpful feedback buttons

## Why this matches our ClearUX project
Our project focuses on detecting when cancellation is harder than subscribing or staying subscribed. This MVP implements that idea using step count and visual prominence measurements.

## Why the tests are not vague
We replaced vague terms with measurable conditions:

- **hidden** = cancel option is more than 700px from the top
- **low contrast** = contrast ratio is below 4.5:1
- **small font** = font size is below 12px
- **asymmetric flow** = cancellation takes at least 2 times more steps
- **high warning** = confidence is 80% or higher
- **medium warning** = confidence is between 50% and 79%

## Links to add before submission
- Figma URL: [paste the final Figma high-fidelity prototype link]
- GitHub URL: [paste the public GitHub repository link]
- Hosted app or demo video: [paste the hosted app link or recorded demo link]

## How the professor can test manually
1. Open the hosted app.
2. Select **TC-01 Clear dark pattern**.
3. Click **Scan Current Page**.
4. Confirm it shows a high warning with confidence 80% or higher.
5. Select **TC-02 Edge case**.
6. Click **Scan Current Page**.
7. Confirm it shows a medium warning with confidence between 50% and 79%.
8. Select **TC-03 Safe page**.
9. Click **Scan Current Page**.
10. Confirm it shows **No dark pattern detected**.

## How to run automated tests
```bash
npm install
npm test
```

Expected result: all 3 tests pass.

## Note about deployment
Because ClearUX is originally a browser-extension idea, a full Chrome Store deployment is not required for this MVP. We implemented the core logic as a hostable web MVP and also included an optional Chrome extension popup demo.

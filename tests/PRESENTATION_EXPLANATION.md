# ClearUX - Simple Presentation Explanation

## What we built
We built a usable MVP for ClearUX. It is a web demo that acts like our browser extension. The user chooses a webpage scenario, clicks **Scan Current Page**, and the system tells them if the page may contain an unfair cancellation flow.

## Why this is not vague
We did not just say that the cancel button is "hidden" or "less visible". We measured it using exact values:

- number of steps
- button position in pixels
- font size in pixels
- contrast ratio
- button size/area
- confidence score

This makes the product easier to automate because a test can compare actual values with expected values.

## What ClearUX checks
ClearUX checks if cancellation is harder than subscribing or staying subscribed. For example, if staying subscribed takes 1 click but cancelling takes 3 clicks, this is a 3:1 ratio. Since our warning threshold is 2:1, the system should warn the user.

## How confidence works in our MVP
The score increases when the page has more evidence of unfair design:

- cancellation takes at least 2 times more steps
- cancel button is low on the page
- cancel text is small
- cancel contrast is low
- cancel button is much smaller

A high warning needs at least 80% confidence. A medium warning is between 50% and 79%.

## Limitation we noticed
A real browser extension needs both the subscription flow and cancellation flow to compare them. If the extension only sees the cancellation page, it may not know what the subscription page looked like.

For the MVP, we solved this by using predefined demo scenarios. In the future, we can store the subscription flow locally when the user subscribes, then compare it later when the user cancels.

## What to say if the professor asks why it is a web app
We can say:

"For this milestone, we implemented the core ClearUX logic as a hostable web MVP. It simulates the browser extension behavior and includes the detection result, explanation, confidence score, measurable evidence, feedback, and automated tests. This made the product testable and easy to access through a hosted link."

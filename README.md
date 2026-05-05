# ClearUX - Usable Product MVP

## Team members
Nissrine Belghiti, Sara El-loussi, Hanna Sayed Ahmed, Abdoul Madjid Issoufou

## Project idea
ClearUX is a browser-extension project that helps users notice unfair subscription designs. Our MVP focuses on one problem: a website may make it easy to keep, renew, or subscribe to a plan, but harder to cancel it.

For this usable product deadline, we implemented a working web MVP/demo of the main ClearUX feature. It can be opened locally, hosted online, tested by the professor, and explained during the presentation.

## What is implemented
The implemented feature is:

**Dark Pattern Detection: Cancellation vs Subscription**

The app lets the tester choose one of three webpage scenarios and click **Scan Current Page**. Then ClearUX displays:

- detection result status
- confidence score
- short explanation
- exact measurable evidence used by the system
- feedback buttons: **Helpful** and **Not Helpful**

## Why the product is built this way
During development, we realized that a real extension cannot always compare the subscribe flow and the cancel flow unless it has information about both. If the user only opens the cancellation page, the extension may not know how easy the original subscription page was.

For this MVP, we used a small predefined demo dataset with exact values for each scenario. This keeps the product realistic and testable for the deadline. A future version can improve this by:

1. saving the subscription flow locally when the user subscribes, then comparing it later when the user cancels, or
2. using a verified database of common services and their subscription/cancellation flows.

## Specific detection rules
We avoided vague words such as **hidden**, **less visible**, and **accessible** unless they are defined by numbers. The MVP uses these measurable rules:

| Concept | Exact rule used in the MVP |
|---|---|
| Hidden by scroll | Cancel option is more than **700px** from the top while the main subscription/stay button is above **250px** |
| Low contrast | Cancel option contrast ratio is below **4.5:1** |
| Small text | Cancel option font size is below **12px** |
| Much smaller button | Cancel button area is less than **55%** of the subscription/stay button area |
| Step asymmetry | Cancellation requires at least **2×** as many steps as subscribing/staying |
| High warning | Step ratio is at least **2:1** and confidence is **80% or higher** |
| Medium warning | Confidence is between **50% and 79%** |
| Safe result | Subscription and cancellation flows are not both detected |

## Scenarios included

### TC-01: Happy path / clear dark pattern
This is the strongest case.

- Service name: **StreamPlus**
- Keep Premium path: **1 step**
- Cancel Subscription path: **3 steps**
- Cancel link position: **930px from top**
- Cancel font size: **10px**
- Cancel contrast ratio: **2.1:1**
- Expected result: **High warning**, confidence **80% or higher**

### TC-02: Edge case
This checks a less obvious situation.

- Service name: **StudyCloud**
- Renew Subscription path: **1 step**
- Cancel Subscription path: **2 steps**
- Cancel button position: **560px from top**
- Cancel font size: **12px**
- Cancel contrast ratio: **3.8:1**
- Expected result: **Medium warning**, confidence between **50% and 79%**

### TC-03: Safe page / unhappy path
This checks that ClearUX does not create a false warning.

- Page name: **Top 5 Study Tips for Students**
- Visible links/buttons: **Home**, **Search**, **Read More**, **Contact Us**, **About**
- No subscription-related words such as **Subscribe**, **Cancel Subscription**, **Renew Plan**, **Billing**, **Unsubscribe**, or **Manage Plan**
- Expected result: **No warning**

## How to run locally
You can open `index.html` directly in the browser.

Or run it using Node:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:8080
```

## How to run automated tests
```bash
npm install
npm test
```

The automated tests check:

1. TC-01 returns a high warning.
2. TC-02 returns a medium warning.
3. TC-03 returns no warning.


## Testing notes for the professor
To test the app manually:

1. Open the hosted ClearUX app.
2. Select **TC-01 Clear dark pattern**.
3. Click **Scan Current Page**.
4. Confirm that it shows a high warning with confidence 80% or above.
5. Repeat with **TC-02 Edge case** and confirm it shows a medium warning.
6. Repeat with **TC-03 Safe page** and confirm it shows no warning.

To test automatically:

```bash
npm install
npm test
```

## Optional extension popup demo
We also included an optional Chrome extension popup demo with an icon.

Steps:

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select this project folder, the folder that contains `manifest.json`.
6. Click the ClearUX icon and test the popup.

The hosted web MVP is the main submission because the assignment accepts a hosted app link or recorded demo.

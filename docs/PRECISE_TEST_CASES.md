# ClearUX Precise Test Cases for Usable Product

## Feature Name
Dark Pattern Detection: Cancellation vs Subscription

## Feature Description
This feature checks whether cancellation is harder than subscribing or staying subscribed. The MVP compares exact values: subscription steps, cancellation steps, cancel button position, cancel button font size, cancel button contrast ratio, and cancel button size.

---

## TC-01 | Happy Path: Clear Dark Pattern

**Test Objective:** Verify that ClearUX gives a high warning when cancellation is clearly harder than staying subscribed.

**Preconditions:**
- The ClearUX web MVP is open in Chrome.
- The scenario dropdown is set to **TC-01 Clear dark pattern**.

**Test Input / Data:**
- Service name: StreamPlus.
- Stay/subscribe button label: **Keep Premium**.
- Stay/subscribe button steps: **1**.
- Stay/subscribe button position: **140px from top**.
- Stay/subscribe button font size: **18px**.
- Stay/subscribe button size: **240px × 48px**.
- Cancel link label: **Cancel Subscription**.
- Cancel flow steps: **3**.
- Cancel link position: **930px from top**.
- Cancel link font size: **10px**.
- Cancel link size: **120px × 20px**.
- Cancel link contrast ratio: **2.1:1**.

**Steps:**
1. Open the ClearUX app.
2. Select **TC-01 Clear dark pattern**.
3. Click **Scan Current Page**.
4. Read the result card on the right side.
5. Check the evidence table.

**Expected Result:**
- Label shown: **Warning: Unfair cancellation flow detected**.
- Confidence score is **80% or higher**.
- Evidence shows subscription steps = **1**.
- Evidence shows cancel steps = **3**.
- Evidence shows step ratio = **3:1**.
- Evidence shows cancel top = **930px**.
- Evidence shows cancel font = **10px**.
- Evidence shows cancel contrast = **2.1:1**.
- Explanation mentions that canceling requires more steps and the cancel option is visually weak.

**Pass/Fail Verdict:**
- **PASS** if all expected results above are shown.
- **FAIL** if the warning is missing, confidence is below 80%, or the evidence does not match the scenario values.

---

## TC-02 | Edge Case: Visible but Weaker Cancel Option

**Test Objective:** Verify that ClearUX gives a medium warning when cancellation is accessible but visually less prominent.

**Preconditions:**
- The ClearUX web MVP is open in Chrome.
- The scenario dropdown is set to **TC-02 Edge case**.

**Test Input / Data:**
- Service name: StudyCloud.
- Renew button label: **Renew Subscription**.
- Renew button steps: **1**.
- Renew button position: **120px from top**.
- Renew button font size: **16px**.
- Renew button size: **220px × 44px**.
- Cancel button label: **Cancel Subscription**.
- Cancel flow steps: **2**.
- Cancel button position: **560px from top**.
- Cancel button font size: **12px**.
- Cancel button size: **150px × 34px**.
- Cancel button contrast ratio: **3.8:1**.

**Steps:**
1. Open the ClearUX app.
2. Select **TC-02 Edge case**.
3. Click **Scan Current Page**.
4. Read the result card on the right side.
5. Check the evidence table.

**Expected Result:**
- Label shown: **Caution: Cancellation option is less prominent**.
- Confidence score is between **50% and 79%**.
- Evidence shows subscription steps = **1**.
- Evidence shows cancel steps = **2**.
- Evidence shows step ratio = **2:1**.
- Evidence shows cancel top = **560px**.
- Evidence shows cancel font = **12px**.
- Evidence shows cancel contrast = **3.8:1**.
- Explanation says the cancel option is visible but less prominent.

**Pass/Fail Verdict:**
- **PASS** if the result is a medium warning with confidence between 50% and 79%.
- **FAIL** if the system shows no explanation, gives a high warning, or says there is no issue.

---

## TC-03 | Unhappy Path: No Subscription Flow

**Test Objective:** Verify that ClearUX does not show a false warning on a normal page.

**Preconditions:**
- The ClearUX web MVP is open in Chrome.
- The scenario dropdown is set to **TC-03 Safe page**.

**Test Input / Data:**
- Page title: **Top 5 Study Tips for Students**.
- Visible links/buttons: **Home**, **Search**, **Read More**, **Contact Us**, **About**.
- The page does not contain: **Subscribe**, **Cancel Subscription**, **Renew Plan**, **Billing**, **Unsubscribe**, or **Manage Plan**.

**Steps:**
1. Open the ClearUX app.
2. Select **TC-03 Safe page**.
3. Click **Scan Current Page**.
4. Read the result card on the right side.
5. Check that no warning overlay appears.

**Expected Result:**
- Label shown: **No dark pattern detected**.
- Confidence score is **0%**.
- Evidence shows subscription steps = **Not found**.
- Evidence shows cancel steps = **Not found**.
- Explanation says no subscription/cancellation flow was detected.

**Pass/Fail Verdict:**
- **PASS** if no warning appears and the result says no dark pattern detected.
- **FAIL** if ClearUX incorrectly flags the page as a dark pattern.

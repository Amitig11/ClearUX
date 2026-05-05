# Recorded Demo Script

Use this script if submitting a recorded demo instead of only a hosted link.

1. Show the project folder and explain that this is the working ClearUX MVP.
2. Open the app in the browser.
3. Say: "This MVP focuses on one pattern: cancellation being harder than subscribing or staying subscribed."
4. Select **TC-01 Clear dark pattern** and click **Scan Current Page**.
5. Point to the confidence score and evidence table. Mention: "Canceling requires 3 steps, while staying subscribed requires 1 step. The cancel link is 930px from the top, uses 10px text, and has 2.1:1 contrast. This produces a high warning."
6. Select **TC-02 Edge case** and click **Scan Current Page**.
7. Say: "This is not as severe. Canceling requires 2 steps and the button is visible, but it is still less prominent. This produces a medium warning, not an exaggerated high warning."
8. Select **TC-03 Safe page** and click **Scan Current Page**.
9. Say: "This page has no subscription or cancellation flow, so ClearUX correctly shows no dark pattern detected."
10. Open the terminal and run `npm test`.
11. Show that all tests pass.

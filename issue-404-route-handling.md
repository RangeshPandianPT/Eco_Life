# Issue Draft: Improve 404 and Broken Route Handling Across App Navigation

## Title
Improve 404 and Broken Route Handling Across App Navigation

## Why this issue
The app has many feature routes, so users can easily hit invalid URLs or stale links. Tightening route fallback behavior and guidance improves UX and reduces drop-off.

## Description
When users navigate to invalid or outdated routes, they should always land on a clear recovery screen with fast paths back into core features.

### Scope
- Ensure all unknown paths consistently show the Not Found experience.
- Add clear actions on the Not Found page:
  - Go to Dashboard
  - Go to Eco Tools
  - Go Back
- Track not-found route hits for product insights (basic event logging hook).

### Acceptance Criteria
- Any invalid URL shows the same Not Found screen.
- All 3 recovery actions work on desktop and mobile.
- No blank screens or console errors for invalid paths.
- A lightweight event is emitted when a 404 route is rendered.

### Priority
Medium

### Labels
- enhancement
- ux
- routing

## GitHub Steps
1. Open the repository on GitHub.
2. Go to Issues -> New issue.
3. Paste the title and description from this file.
4. Add labels: enhancement, ux, routing.
5. Click Create.

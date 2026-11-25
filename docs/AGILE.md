# Agile Plan — JERUS Shop

**Method:** Scrum-style, 1-week sprints. Each sprint ends with a working, demo-able increment.
**Roles (for a team):** Product Owner (decides priorities), Scrum Master (keeps the board moving), Developers.
**Board columns:** Backlog → To Do → In Progress → Testing → Done (use Trello / GitHub Projects / MS Teams Planner).

## Definition of Done
- Feature works for the intended role (user or admin)
- Tested manually (happy path + one error case)
- No hard-coded secrets or URLs
- Code committed with a clear message (e.g. `feat: add cart quantity update`)

## Product Backlog (user stories)

| ID | As a... | I want to... | Priority | Sprint |
|---|---|---|---|---|
| US-01 | visitor | register and log in | High | 1 |
| US-02 | admin | have a protected admin area | High | 1 |
| US-03 | visitor | browse and search shirts | High | 2 |
| US-04 | user | view a shirt and pick a size | High | 2 |
| US-05 | user | add shirts to my cart and edit quantities | High | 2 |
| US-06 | user | check out and see my orders | High | 3 |
| US-07 | admin | add / edit / delete shirts | High | 3 |
| US-08 | admin | change a shirt's price | High | 3 |
| US-09 | admin | change a shirt's image (upload or URL) | High | 3 |
| US-10 | admin | track sales (revenue, orders, best sellers, last 7 days) | High | 4 |
| US-11 | admin | update order status (shipped, delivered...) | Medium | 4 |
| US-12 | user | pay online with a real gateway | Medium | 5 |
| US-13 | user | leave product reviews | Low | 5 |
| US-14 | admin | create discount codes | Low | 6 |

## Sprint Plan

**Sprint 1 — Foundation:** project setup, MongoDB connection, User model, JWT auth, roles, protected routes. *(US-01, US-02)*
**Sprint 2 — Storefront:** Product model, shop page, search, product detail, cart. *(US-03 – US-05)*
**Sprint 3 — Orders & Admin products:** checkout, order history, admin CRUD, price + image editing. *(US-06 – US-09)*
**Sprint 4 — Sales tracking:** stats aggregation, dashboard, order status. *(US-10, US-11)*
**Sprint 5+ — Improvements:** payment gateway, reviews, discount codes, polish.

*Status: Sprints 1–4 are implemented in this codebase. Sprint 5+ items are open backlog.*

## How to add a new feature (the repeatable recipe)

1. Write the user story in the backlog and agree on "done".
2. **Server:** add `models/X.js` → `controllers/xController.js` → `routes/xRoutes.js`, then one `app.use('/api/x', ...)` line in `server/server.js`.
3. **Client:** add a page in `client/src/pages/`, one `<Route>` in `App.jsx`, and a link in `Navbar.jsx`.
4. Test, commit, demo at the sprint review.

## Sprint ceremonies (keep them short)
- **Planning** (30 min): pick stories from the backlog.
- **Daily stand-up** (5 min): done / doing / blocked.
- **Review** (15 min): demo the working increment.
- **Retrospective** (15 min): what to keep, stop, and improve.

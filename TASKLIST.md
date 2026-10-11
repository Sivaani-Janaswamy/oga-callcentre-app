# TASKLIST.md — On-Ground.ai Call Centre App

**Window:** Fri 9 Oct (evening) → Sun 11 Oct, **6:00 PM IST hard deadline**.
**Internal target:** submit by **Sun 3:00 PM**. Late submissions are not reviewed.
Each checkbox is roughly one commit. Commit message format: `type(scope): what` (e.g. `feat(plan): add paging to calls list`).

Legend: ⭐ must-build · ➕ bonus · ⏱ estimate

---

## Schedule at a glance

| Block  | When                    | Goal                                   |
| ------ | ----------------------- | -------------------------------------- |
| A      | Fri evening (~3h)       | Setup, shell, data layer, routing      |
| B      | Sat morning (~4h)       | Dashboard + Plan (3 tabs)              |
| C      | Sat afternoon (~4h)     | Calendar + Pulse home + channel        |
| D      | Sat evening (~3h)       | Leads modal + core polish pass         |
| E      | Sun morning (~3h)       | Bonus items, responsive, tests         |
| F      | Sun late morning → 3 PM | README, deploy, recording, submit      |
| Buffer | Sun 3 PM → 6 PM         | Emergency only. Do not plan work here. |

Sleep is part of the plan. If you fall behind, **cut bonus work, never the README**.

---

## Phase 0 — Before coding (⏱ 30 min)

- [x] Open the mock in Chrome. Click every screen, hover everything, note behaviours (don't save the page, don't view-source to copy).
- [x] Take your own notes on exact labels, numbers and colours per screen. Put them in `notes/ui-reference.md` (this is your own spec supplement).
- [x] Create a **public** GitHub repo `oga-callcentre-app`. Add MIT licence and a stub README.
- [x] Start a running list of AI tools used (you'll need it for the README).

---

## Phase 1 — Foundation (⏱ ~3h) ⭐

- [x] `chore: scaffold Vite + React + TS`
- [x] `chore: add Tailwind, ESLint, Prettier, Vitest`
- [x] `feat(styles): design tokens (colours, type scale, radius, spacing)`
- [x] `feat(data): types.ts from DATABASE_DESIGN.md`
- [x] `feat(data): seed.ts fixtures for agent, leads, signals`
- [x] `feat(data): seed missed calls, recent calls, events, stats`
- [x] `feat(data): seed channels, messages, needs-input, kudos`
- [x] `feat(services): api.ts with async wrappers + delay`
- [x] `feat(utils): format.ts (₹, duration, date, time-left)`
- [x] `feat(shell): Sidebar with expandable Plan group`
- [x] `feat(shell): TopBar with status chips and avatar`
- [x] `feat(shell): AppShell layout + React Router routes`
- [x] `feat(ui): Card, Badge, Button, Avatar, ProgressBar primitives`
- [x] `feat(hooks): useAsync, usePaging`
- [x] **Checkpoint:** every route renders a placeholder inside the shell, nav highlights correctly.

---

## Phase 2 — Dashboard (⏱ ~2h) ⭐

- [x] `feat(dashboard): greeting banner`
- [x] `feat(dashboard): 4 KPI cards with delta chips`
- [x] `feat(dashboard): My progress panel`
- [x] `feat(dashboard): Who's waiting list + "Open planner" link`
- [x] `feat(dashboard): earnings card with progress bar`
- [x] `feat(dashboard): My tasks card with count badge`
- [x] `feat(dashboard): Calls handled bar chart (Recharts, today highlighted)`
- [x] `feat(dashboard): CSAT trend bar chart`
- [x] **Checkpoint:** dashboard implemented and verified at the target desktop layout.

---

## Phase 3 — Plan (⏱ ~3h) ⭐

- [x] `feat(plan): PlanHeader band + sidebar navigation (no tab bar)`
- [ ] `feat(plan): Calls to make list, ranked by score`
- [ ] `feat(plan): expandable row (accordion, one open at a time)`
- [ ] `feat(plan): Pager component + paging on calls list`
- [ ] `test(plan): usePaging edge cases (first/last page, empty)`
- [ ] `feat(plan): Incoming summary strip (count + ₹ at stake)`
- [ ] `feat(plan): Incoming rows with Call back button, Unknown caller state`
- [x] `feat(plan): Recent list with call type icon, time, length`
- [x] `feat(plan): call review panel on row tap`
- [x] `feat(plan): recent-call loading and empty review states`
- [ ] **Checkpoint:** compare all three tabs against the mock.

---

## Phase 4 — Calendar (⏱ ~2h) ⭐

- [ ] `feat(calendar): month grid builder util + unit tests (leap years, offsets)`
- [ ] `feat(calendar): header with prev/next month and Today button`
- [ ] `feat(calendar): today outline + event dots from data`
- [ ] `feat(calendar): selected-day events panel`
- [ ] **Checkpoint:** Oct 2026 layout matches mock; Today returns to 9 Oct 2026 (or the real current date).

---

## Phase 5 — Pulse (⏱ ~3h) ⭐

- [ ] `feat(pulse): Pulse home header + search box`
- [ ] `feat(pulse): AvaniBot card with Daily Brief / Ask a question buttons`
- [ ] `feat(pulse): Role agents, Task agents (with % chips), General sections`
- [ ] `feat(pulse): Kudos card`
- [ ] `feat(pulse): channel route + header with Back button`
- [ ] `feat(pulse): message list (others left, self right, times, labelled bubbles)`
- [ ] `feat(pulse): pinned Needs-your-input card (UI only)`
- [ ] `feat(pulse): composer bar`
- [ ] **Checkpoint:** home → channel → back works, scrolling inside the chat is smooth.

---

## Phase 6 — Leads modal (⏱ ~2.5h) ⭐

- [ ] `feat(leads): Modal primitive (backdrop, Esc, focus trap, scroll lock)`
- [ ] `feat(leads): LeadsModal header with "Lead n of N"`
- [ ] `feat(leads): LeadCard (status, name, interest, time-left chip, prompt)`
- [ ] `feat(leads): ScoreBar for ICP and intent score`
- [ ] `feat(leads): collapsible ICP breakdown, How we got here`
- [ ] `feat(leads): buying signals group with evidence quotes`
- [ ] `feat(leads): cumulative missed footer chip`
- [ ] `feat(leads): next/previous paging + dots + keyboard arrows`
- [ ] `feat(dashboard): open modal from tasks card (hot leads)`
- [ ] **Checkpoint:** paging never overflows; collapsibles reset on lead change.

---

## Phase 7 — Core polish (⏱ ~1h) ⭐

- [ ] Hover and focus states on every interactive element, matching the mock.
- [ ] Consistent loading skeletons and empty states.
- [ ] Remove console warnings, dead code, unused imports.
- [ ] Run Lighthouse (accessibility) and fix obvious issues.
- [ ] `chore: lint + format pass`

---

## Phase 8 — Bonus (⏱ ~3h, do in this order) ➕

1. [ ] ➕ `feat(pulse): send message (Enter to send, auto-scroll, time stamp)`
2. [ ] ➕ `feat(pulse): answer Needs-your-input via buttons or reply box → collapses to answered state + system line`
3. [ ] ➕ `feat(responsive): drawer sidebar, stacked KPIs, full-width modal at ≤640px`
4. [ ] ➕ `feat(plan): Call back opens in-app call overlay (timer, end call, mark called back)`
5. [ ] ➕ `feat(plan): Practise a call page with scripted scenario and reward`
6. [ ] ➕ `test: key unit and component tests (paging, calendar util, send message)`
7. [ ] ➕ Optional: DEMO strip and floating dial button (only if time remains).

---

## Phase 9 — Ship (⏱ ~3h, finish by Sun 3 PM)

- [ ] `docs: README` — what it is, how to run, stack + why, structure, done / skipped, decisions, **AI tools used**, known issues.
- [ ] Add screenshots to `/docs/screens/`.
- [ ] `chore: production build passes, no warnings`.
- [ ] Deploy to Vercel, test the live link in an incognito window.
- [ ] Record a ≤ 2-minute screen recording: shell → dashboard → plan tabs → calendar → pulse → channel send → leads modal. Upload (Drive/YouTube unlisted) and add the link to the README.
- [ ] Final check that the repo is public (or shared with the email I'm sending from).
- [ ] Send email: **To** mukunda@on-ground.ai · **Subject** `Assignment Submission: <your full name>` · include repo link, live link, recording link, 3-line summary.
- [ ] Confirm the email was sent (check Sent folder).

---

## Rules to re-read before every session

1. **Never copy the mock's source.** Observe, then write it fresh.
2. **Commit small, commit often.** They read the history.
3. **Explain-ability beats cleverness.** If I can't explain a line, rewrite it simpler.
4. **Cut bonus, never must-builds.** Match to mock + working behaviour = 55% of the grade.
5. **README is 10%** and also the first thing they read. Write it as I go, not at the end.

---

## Risk register

| Risk                            | Mitigation                                                                  |
| ------------------------------- | --------------------------------------------------------------------------- |
| Running out of time             | Strict phase checkpoints; cut Phase 8 items from the bottom up              |
| Visual mismatch with the mock   | Side-by-side check at the end of every phase, same viewport                 |
| Recharts styling fights         | Fall back to simple SVG bars if it takes > 30 min                           |
| Modal focus/scroll bugs         | Build `Modal` primitive early (Phase 6 start) and test with keyboard        |
| Deploy surprises                | Deploy a hello-world to Vercel in Phase 1 so Sunday isn't the first attempt |
| Missing the deadline by minutes | Email draft ready by Sat night; send by 3 PM Sunday                         |

---

## AI tools log (README-ready template)

Use this list in the README. Add one row per tool you actually used, and note what it helped with and what you verified yourself.

| Tool           | What I used it for                                                                | What I verified myself                                                                                     |
| -------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Claude         | Planning docs, reviewing decisions, and checking reasoning before implementation. | I confirmed the final answer matches the project requirements and does not rely on unverified mock source. |
| GitHub Copilot | Drafting code, component structure, and quick implementation checks.              | I reviewed generated code for correctness, simplicity, and project fit before keeping it.                  |
| _add more_     | _brief explanation_                                                               | _brief verification_                                                                                       |

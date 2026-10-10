# SPEC.md — On-Ground.ai Call Centre App (Front-End Rebuild)

> Deadline: **Sun 11 Oct 2026, 6:00 PM IST** · Target submit: **Sun 3:00 PM**
> Source of truth: the assignment PDF defines scope; the mock defines look and behaviour. If they conflict, the mock wins on visuals and interactions; the PDF wins on scope.
> Screen details below come from the PDF and the mock behaviour notes. **Before building each screen, verify exact labels, copy and numbers against the mock notes.** Do not save the mock page or copy its source.

## Project Rules

1. DATE RULE: The app uses a fixed demo clock. `src/utils/clock.ts` exports `DEMO_TODAY = 2026-10-09` (Fri). Every "today", "time left", greeting, calendar highlight, Today button, and 7-day chart ends on this date. Never call `new Date()` outside `src/utils/clock.ts`.
2. SOURCE OF TRUTH: The PDF defines scope. The mock defines look and behaviour. If they conflict, the mock wins on visuals and interactions; the PDF wins on what is required.
3. SCOPE TIERS:
   - MUST: app shell; Dashboard (KPIs, progress, who's waiting, earnings, tasks, both 7-day charts using Recharts); Plan: Calls to make (ranked, expandable rows, paging), Incoming (with a Call back button), Recent (tap a row opens a review panel); Calendar; Pulse home; Pulse channel chat (header, back, pinned card, bubbles); Leads modal with paging.
   - BONUS (in order): send a message in a channel; answer the "Needs your input" card; phone-width layout; Practise a call + working Call back flow; deploy + recording.
   - OPTIONAL: DEMO strip, floating dial button.
4. Charts and the review panel are MUST. Only the working Call back flow and Practise are bonus; the Call back button itself remains a MUST UI element.
5. Use the docs and notes only; no copying from the mock HTML or PDF source.

---

## 1. Goals and non-goals

**Goals**

1. Match the mock visually (30% of grade) and behaviourally (25%).
2. Clean, readable, typed code (25%). Every line must be explainable by me in a review.
3. A README that explains how to run, why this stack, what is done/skipped, and AI tools used (10%).
4. Bonus and polish (10%).

**Non-goals**

- No backend, auth, real telephony, or real AI. Everything is sample data.
- No pixel-perfect obsession over the DEMO strip or floating dial button (optional per the brief).

---

## 2. Stack and rationale

| Concern   | Choice                                                | Why                                                                                |
| --------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Framework | React 18 + Vite + TypeScript                          | Preferred by the brief; fast dev loop; types make the data model visible in review |
| Styling   | Tailwind CSS + a small token file                     | Restrained, consistent type scale; fast to match the mock                          |
| Routing   | React Router v6                                       | Real URLs for each screen, back button works in Pulse                              |
| State     | React state + Context (`AppContext`)                  | Small app; Redux is overkill                                                       |
| Charts    | Recharts                                              | Covers the "charts with a library" bonus                                           |
| Data      | Typed mock module + service layer                     | Behaves like an API without a backend                                              |
| Icons     | lucide-react                                          | Light, consistent                                                                  |
| Tests     | Vitest + React Testing Library (a few targeted tests) | Shows code quality; keep scope small                                               |
| Deploy    | Vercel                                                | Live link bonus                                                                    |

---

## 3. Information architecture and routes

| Screen        | Route                | Components                                                                                                   | Data service functions                                                                                      | TASKLIST phase |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------- |
| Dashboard     | `/dashboard`         | Greeting banner, KPI cards, progress panel, waiting list, earnings card, tasks card, calls chart, CSAT chart | `getAgent()`, `getDashboardMetrics()`, `getWaitingList()`, `getEarnings()`, `getTasks()`, `getDailyStats()` | Phase 2        |
| Plan default  | `/plan/calls`        | Plan header, tabs, ranked call rows, accordion, pager                                                        | `getCallsToMake()`, `getIncomingCalls()`, `getRecentCalls()`, `getCallReview()`                             | Phase 3        |
| Plan incoming | `/plan/incoming`     | Missed calls summary strip, incoming rows, call-back CTA                                                     | `getIncomingCalls()`                                                                                        | Phase 3        |
| Plan recent   | `/plan/recent`       | Recent call rows, review panel drawer                                                                        | `getRecentCalls()`, `getCallReview()`                                                                       | Phase 3        |
| Calendar      | `/calendar`          | Month header, day grid, selected-day panel                                                                   | `getCalendarEvents()`, `getMonthEvents()`                                                                   | Phase 4        |
| Pulse home    | `/pulse`             | Pulse header, bot card, agents list, kudos card                                                              | `getChannels()`, `getKudos()`                                                                               | Phase 5        |
| Pulse channel | `/pulse/:channelId`  | Channel header, pinned needs-input card, message list, composer                                              | `getChannelMessages()`, `getNeedsInput()`, `sendMessage()`                                                  | Phase 5        |
| Leads modal   | overlay on dashboard | Leads modal, lead cards, score bars, collapsible sections, pager                                             | `getLeadById()`, `getLeads()`, `getLeadSignals()`                                                           | Phase 6        |

The Leads modal is not a route. It opens over the Dashboard from the task list (optionally mirrored in a `?lead=<id>` query param so it survives refresh).

---

## 4. Folder structure

```
src/
  app/            App.tsx, router.tsx, AppContext.tsx
  components/
    shell/        Sidebar, TopBar, AppShell
    ui/           Card, Badge, Button, Avatar, Pager, Collapsible, Modal, ProgressBar
    dashboard/    KpiCard, ProgressPanel, WaitingList, EarningsCard, TasksCard, CallsChart, CsatChart
    plan/         PlanHeader, PlanTabs, LeadRow, MissedCallRow, RecentCallRow, CallReviewDrawer
    calendar/     MonthGrid, CalendarHeader, DayCell
    pulse/        PulseHome, AgentList, ChannelList, KudosCard, ChannelView, NeedsInputCard, MessageBubble, Composer
    leads/        LeadsModal, LeadCard, ScoreBar, SignalGroup
  data/           seed.ts (fixtures), types.ts
  services/       api.ts (async wrappers over fixtures)
  hooks/          useAsync.ts, usePaging.ts, useMediaQuery.ts
  styles/         tokens.css, index.css
  utils/          format.ts (₹, durations, dates), score.ts
  tests/
```

---

## 5. Design tokens (keep restrained, close to the mock)

- **Palette:** deep green sidebar, white content cards on a warm off-white page, purple for Pulse header/modal header, amber/gold for accents and the Earnings/Kudos panels, green/red for positive/negative chips. Define as CSS variables, not hard-coded hex in components.
- **Type scale (fixed, 5 sizes):** 10px (meta), 11px (secondary), 12px (body), 13px (card titles), 18–24px (hero numbers). Nothing larger except the big KPI numbers.
- **Radius:** 6 / 10 / 14px. **Spacing:** 4px grid.
- **Font:** system UI stack (or Inter), single family.

---

## 6. App shell (must build)

**Sidebar (left, dark green, ~150–160px)**

- Brand text "On-Ground.ai" at top.
- Items: Dashboard, Plan (expandable with sub-items: Calls to make, Incoming, Recent, Practise a call), Calendar, Pulse.
- Active item has a highlighted pill; active Plan sub-item highlighted separately.
- Plan group stays expanded while any `/plan/*` route is active.

**Top bar**

- Left: "OG" badge + "On-Ground.ai".
- Right: three status chips (notification count badge in red, a small score/streak chip, a points chip) and a user avatar. Hover shows a tooltip.

**Behaviour**

- Shell persists across routes; only the content pane changes.
- Content pane scrolls independently of the sidebar.
- On phone width: sidebar collapses into a hamburger drawer (bonus).

**Acceptance**

- [ ] Navigation highlights match the current route, including on refresh.
- [ ] Plan sub-menu expands/collapses and keeps state across navigation.

---

## 7. Dashboard `/dashboard`

**Greeting banner** (dark navy gradient): "Good afternoon 👋", agent name (Arvind Rajan), company and role line (The Sleep Company · Call Centre), a "+ On Qu…" style action button, and a secondary button on the right.

**KPI cards (4, in a row)** — e.g. Score, Avg handle time, CSAT/Conversion %, In queue. Each shows a big value, a label, and a small delta chip (green up / red down).

**My progress — today (green panel)**

- Two stat tiles: leads created, leads called. A "+N" chip on each.

**Who's waiting**

- List of 2+ rows: avatar, name, short reason, urgency chip (e.g. "4m 20s" in red/amber). Link "Open planner" → `/plan/calls`.

**My earnings this month**

- Large ₹ amount, sub-line ("₹1,750 from practised calls" style), progress bar toward a target.

**My tasks** (brown/amber card with a count badge)

- Rows: "2 callbacks", "2 hot leads", "1 outcome", each with an icon and secondary text.
- **Clicking "2 hot leads" (or the leads row) opens the Leads modal.**

**Charts**

- "Calls handled — last 7 days": bar chart, today's bar visually distinct (darker).
- "CSAT trend — last 7 days": bar chart with % labels, today's bar distinct.
- Weekday labels on the x-axis, value labels above bars.

**Acceptance**

- [ ] All numbers come from the data layer, not hard-coded in JSX.
- [ ] Charts render with Recharts, today's bar highlighted, tooltip on hover.
- [ ] Clicking the tasks row opens the Leads modal at lead 1.

---

## 8. Plan

Shared **Plan header** (dark band): "Today's calling plan" + "Planner" title, and a date/streak chip on the right. Below it, a sub-title and the active tab's content.

### 8.1 Calls to make `/plan/calls`

- Title "Planned outgoing calls", sub-line "Ranked by lead score, tap a row for the full picture".
- Rows ranked by lead score descending. Each row: avatar initials, name, short context ("Interested · Ortho Grid · ₹10,000"), score badge on the right with a small delta.
- **Expandable:** clicking a row expands inline details (intent, last note, buying signals summary, Call button). Only one open at a time (accordion).
- **Paging:** 5 per page; footer shows "Page 1 of N" with prev/next. Next/prev disabled at the ends.

### 8.2 Incoming `/plan/incoming`

- Title "Missed calls", sub-line "Ranked by expected value, the highest value is called first".
- Summary strip: **count missed today** and **expected value at stake** (sum, ₹).
- Rows: avatar, name (or "Unknown"), "Missed Today 10:09 AM · Hold queue" meta, expected value on the right, and a green **Call back** button.
- "Unknown" caller shows "No plan saved" instead of a value.
- **Call back** → starts the in-app call flow (see Bonus) and marks the row "Calling…".

### 8.3 Recent `/plan/recent`

- Title "Recent calls", sub-line "Tap a call to review it".
- Rows: type icon (in-app vs phone), name, time and length ("Today 11:30 AM · —"), chevron.
- **Tap a row** → opens a review drawer/panel with call summary, outcome, duration and notes.

### 8.4 Practise a call (bonus) `/plan/practise`

- A list of practice scenarios, "Start" runs a scripted fake call (timer, transcript lines, end call) and awards sample points shown in earnings.

**Acceptance (Plan overall)**

- [ ] Sorting is computed in the service layer, not hard-coded in the order of fixtures.
- [ ] Paging logic lives in `usePaging` and is unit-tested.
- [ ] Empty state exists for each list.

---

## 9. Calendar `/calendar`

- Header: calendar icon + "Calendar", sub-line, and a one-line info banner at top.
- **Month grid:** Sun–Sat header, 6-week layout, current month "October 2026".
- **Today** is outlined (blue border). **Event dots** appear under days with events (small coloured dot).
- Header controls: prev (‹) and next (›) month, a **Today** button that jumps back to the current month and selects today.
- Clicking a day selects it and shows that day's events in a small panel/popover below or beside the grid.
- Days from neighbouring months are shown muted or blank, depending on the mock.

**Acceptance**

- [ ] Month math is correct for any month (leap years, 28–31 days, week offsets).
- [ ] Today button always returns to the real current date.
- [ ] Event dots come from `events` data.

---

## 10. Pulse

### 10.1 Pulse home `/pulse`

- Purple header band: "Pulse" + company subtitle; search box "Ask AvaniBot or search Pulse…".
- **AvaniBot card** (purple gradient): label "AVANIBOT" with an "ALWAYS ON" chip, short blurb, two buttons: **Daily Brief** and **Ask a question**.
- **Custom Agents** row.
- **Role Agents** section: list of agents (e.g. `# callcentre-agent`) with a unread count badge.
- **Task Agents** section: `# cross-sell-agent`, `# sop-agent`, `# lead-conversion-agent`, `# capture-agent`, each with a member count and a coloured percentage chip on the right.
- **General** section: e.g. `customer-discussions`.
- **Kudos card** (gold, at bottom): "Kudos NEW" with a short message.
- Clicking any channel → `/pulse/:channelId`.

### 10.2 Pulse channel `/pulse/:channelId`

- Purple header with **Back** button and `# channel-name`.
- **Needs your input** (pinned): red count badge, "pinned" tag, title ("Confirm the 4:30pm callback"), sub-line, **two buttons** (Confirmed / Reschedule), and a reply text box with a send button.
- Date separator ("Today · Call Centre Team").
- **Message list:** others on the left (avatar initials, name, time, bubble with icon-prefixed labels like STAKEHOLDERS / ISSUE DEFINITION / SUGGESTED RESOLUTION), current user on the right (green bubble with time).
- **Composer** at bottom: placeholder "Message #callcentre-team…", emoji button.

**Bonus behaviours**

- Sending a message appends a green bubble on the right with the current time and scrolls to bottom. Enter sends, Shift+Enter newline.
- Clicking **Confirmed** or **Reschedule** resolves the pinned card: it collapses into a small "Answered: Confirmed" state and a system line is added to the chat. Typing in the reply box and sending does the same with the typed answer.

**Acceptance**

- [ ] Message list auto-scrolls on new message.
- [ ] Channel state persists while navigating between channels in the same session.
- [ ] Back button returns to `/pulse`.

---

## 11. Leads modal (must build)

- Opens from the dashboard tasks card. Overlay dims and blurs the page behind. Close with the ✕ button, Esc key, or clicking the backdrop.
- **Header (purple):** "Leads" with sub-line "Lead 1 of 5 · 5L.A to close", close button.
- **Pager:** dots indicator plus prev/next arrows. **Next and previous paging** between leads; disabled at ends. Keyboard ←/→ also pages.
- **Lead card**
  - Status chip ("OPEN"), avatar, name, interest line ("Interested: Ortho GRID · ₹9,490"), a "3h left" timer chip.
  - A highlighted prompt: "Quote to be given to customer".
  - **ICP score bar** with percentage (e.g. 87%), and **Lead intent score** shown as a separate row.
  - Collapsible sections: **ICP fit breakdown**, **How we got here**, **Where we picked up signals** (open by default in the mock).
  - **Buying signals** (collapsible), each a small card: Financing Related, Quotation Demanded, Warranty Related, with an italic evidence quote.
  - Footer chip in red: "CUMULATIVE MISSED: n — expired without close, visible to manager".
- Collapsible state resets when changing lead.

**Acceptance**

- [ ] Modal traps focus, restores focus on close, has `aria-modal` and a labelled title.
- [ ] Paging never goes out of range; counter text updates.
- [ ] Score bars animate to value on mount.

---

## 12. Bonus checklist (priority order)

1. Send a message in a channel.
2. Answer the "Needs your input" card.
3. Phone-width layout (≤ 640px): drawer sidebar, stacked KPI cards, scrollable chart row, full-width modal.
4. Practise a call and Call back flow (in-app call overlay with timer and end button).
5. Charts with Recharts (already in the core plan).
6. Live link on Vercel.
7. 2-minute screen recording.

---

## 13. Cross-cutting requirements

- **Accessibility:** semantic buttons/links, visible focus ring, `aria-expanded` on accordions, `aria-current` on nav, colour contrast ≥ 4.5:1 for body text.
- **Performance:** no layout shift on route change, lazy-load Recharts via route-level code splitting.
- **Loading/empty/error states:** each service call returns via `useAsync` with a skeleton and an empty state.
- **Dates:** the app's "today" comes from a single `src/utils/clock.ts`; `DEMO_TODAY` is fixed to `2026-10-09` (Fri). Use this value for every date-derived UI. Never call `new Date()` outside `clock.ts`.
- **Currency:** `₹` with Indian digit grouping (`en-IN`).

---

## 14. Definition of done

- [ ] All must-build screens match the mock at laptop width in latest Chrome.
- [ ] No console errors or warnings.
- [ ] `npm run build` and `npm run lint` pass; a few unit tests pass.
- [ ] README complete (run steps, stack + why, done/skipped, AI tools used).
- [ ] Git history shows incremental, meaningful commits (no single giant commit).
- [ ] Repo public (or shared with my email address), link emailed with subject `Assignment Submission: <full name>` to mukunda@on-ground.ai before the deadline.

---

## 15. README outline (write as you go, finish Sunday morning)

1. What this is, with screenshots or the demo link.
2. How to run (`npm i`, `npm run dev`, `npm run build`).
3. Stack and why (including why React + Tailwind + Recharts).
4. Folder structure and data flow in 5 lines.
5. What is done / what is skipped and why.
6. Decisions and trade-offs.
7. **AI tools used** (name each tool and what it helped with) — mandatory.
8. Known issues.

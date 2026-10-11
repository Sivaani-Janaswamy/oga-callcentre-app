# On-Ground.ai Call Centre app

I built this front-end rebuild with sample data only.

Live: <add link>  
Screen recording: <add link>

## How to run

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Stack and why

- React 18 for the UI.
- Vite for a small, fast development server and build.
- TypeScript strict for typed application code.
- Tailwind with CSS-variable design tokens for consistent styling.
- React Router for the application routes.
- Recharts for the Dashboard charts.
- Vitest and Testing Library for focused tests.
- Lucide React for interface icons.

## How it is organised

I keep fixture data in `src/data/seed.ts`.

The async service layer in `src/services/api.ts` reads the fixtures and owns in-memory changes.

Hooks load service data and expose loading and error states to components.

Components render the shell, screens, lists, modals, charts, and chat views.

`clock.ts` owns the fixed demo date and `format.ts` owns display formatting. Rankings, totals,
SOP adherence, and the Dashboard task list are computed in the service layer.

## What is built

- Shared app shell with sidebar, top bar, routing, and planner navigation.
- Dashboard with KPIs, progress, waiting list, earnings, tasks, and Recharts charts.
- Plan: Calls to make with score sorting, paging, and expandable lead rows.
- Plan: Incoming missed calls with computed totals and a Call back calling state.
- Plan: Recent calls with a review panel and SOP checklist for the available reviewed call.
- Calendar with month navigation, fixed Today behavior, event dots, selected-day state, and upcoming events.
- Pulse home with agents, channels, direct messages, Kudos, and search.
- Generic channel chat with seeded messages, sending, and Needs your input cards.
- AvaniBot chat with pinned cards, delayed daily brief replies, and question handling.
- Leads modal opened from Dashboard tasks with paging, scores, signals, and evidence.
- Bonus: send a message, answer Needs your input with the Dashboard task list staying in sync,
  Call back calling state, and charts with Recharts.

## What is not built

- Phone-width layout — time.
- Practise a call — time.
- Call overlay with timer — time.
- Profile menu actions — time.
- Settings — time.
- Customer-discussions and kudos views — time.
- Task-agent channel metric panels — time.
- DEMO strip and dial button — time.

## Decisions

- I use the fixed demo date 9 Oct 2026 through one `clock.ts`, so the demo is stable; the
  reference app uses the real date.
- I route all data through an async service layer with in-memory state and no backend.
- I use a fixed type scale and colour tokens from my own UI reference notes.

## Placeholders

I ran `git grep -n "PLACEHOLDER" -- src`. Lead details and Divya's lead values are invented
fixture content. Recent-call prefix rules, some calendar events, Pulse fixture copy, the
non-brief AvaniBot reply, task-to-pinned-card mapping, selected-day panel copy, planned-call
score thresholds and expanded detail, Dashboard task destinations, and the hidden
zero-open-card behavior are marked in code because I could not verify them from the reference.

## Mock reference

I opened the mock only in the browser to observe layout and behaviour. I did not copy its source into this repo. I built my own reference notes (colours, sizes, labels) and screenshots, and used those to direct the coding agent.

## AI tools used

| Tool | What I used it for |
| --- | --- |
| Claude | Planning docs, specs, and prompts. |
| GitHub Copilot agent in VS Code | Most of the implementation, under my specs in `SPEC.md`, `DATABASE_DESIGN.md`, and `TASKLIST.md`. |

Every AI-written change was checked with lint, build, and tests, and the git history shows the
work in small commits.

## Known issues

- No phone-width layout.
- Vite warns about the chunk size.
- The demo uses a fixed date.

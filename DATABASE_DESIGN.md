# DATABASE_DESIGN.md — Data Model for the Call Centre App

There is **no backend**. This document defines the data model as TypeScript types and a mock data layer, shaped so it could map to real tables later. All data is sample data.

---

## 1. Design principles

1. **One source of truth:** all fixtures live in `src/data/seed.ts`. Components never import fixtures directly. They call `src/services/api.ts`.
2. **Async-shaped service layer:** every function returns a `Promise` (with a tiny artificial delay), so loading states and error handling are real.
3. **Derived values are computed, not stored:** totals, rankings, "who's waiting", expected value sums, and calendar dots are derived in the service layer.
4. **In-memory mutations:** sending a message, answering the pinned card, and marking a callback as "calling" mutate an in-memory store for the session. Optional: persist to `sessionStorage` so refresh keeps state.
5. **IDs are strings** (`"lead_01"`) so they can later be UUIDs.
6. **Money in paise or integer rupees?** Store **integer rupees** (`amountInr: 9490`) and format at the edge.
7. **Time:** ISO 8601 strings in data; `Date` objects only inside utils.

---

## 2. Entity overview

```
Agent ─┬─< Task
       ├─< Lead (assigned_to)
       ├─< Call (handled_by)
       ├─< CalendarEvent
       ├─< KpiSnapshot / DailyStat (per day)
       └─< Message (author, when sender is the agent)

Lead ─┬─< BuyingSignal
      ├─< Call
      └─< MissedCall (optional link when caller is known)

Channel ─┬─< Message
         ├─< NeedsInput (0..1 pinned)
         └─< ChannelMember

Earnings (per agent per month) ─ derived from Calls + PractiseSession
PractiseScenario ─< PractiseSession
```

---

## 3. Types

```ts
// src/data/types.ts

export type ID = string;
export type ISODate = string; // "2026-10-09"
export type ISODateTime = string; // "2026-10-09T10:09:00+05:30"

/* ---------- People ---------- */

export interface Agent {
  id: ID;
  name: string; // "Arvind Rajan"
  shortName: string; // "Arvind R."
  company: string; // "The Sleep Company"
  role: string; // "Call Centre"
  avatarInitials: string; // "AR"
  points: number; // top-bar chip
  streakDays: number; // top-bar chip
  unreadNotifications: number; // red badge in top bar
}

/* ---------- Leads ---------- */

export type LeadStatus = 'open' | 'won' | 'lost' | 'expired';

export interface Lead {
  id: ID;
  name: string; // "Mukunda"
  initials: string; // "MK"
  phone: string; // fake number
  productInterest: string; // "Ortho GRID"
  quoteValueInr: number; // 9490
  status: LeadStatus;
  assignedTo: ID; // Agent.id
  score: number; // 0-100, drives ranking in "Calls to make"
  scoreDelta: number; // +/- shown as small chip
  icpScore: number; // 0-100, ICP fit
  intentScore: number; // 0-100, lead intent
  nextAction: string; // "Quote to be given to customer"
  closeBy: ISODateTime; // used to compute "3h left"
  cumulativeMissed: number; // red footer chip
  context: string; // one-line shown in Plan rows
  lastNote?: string;
  icpBreakdown: IcpFactor[];
  provenance: ProvenanceStep[]; // "How we got here"
  signalIds: ID[]; // → BuyingSignal
}

export interface IcpFactor {
  label: string; // "Budget", "Need", "Authority", "Timeline"
  weight: number; // 0-1
  value: number; // 0-100
}

export interface ProvenanceStep {
  at: ISODateTime;
  label: string; // "Walk-in captured", "First call", "Quote requested"
}

export type SignalType =
  'financing' | 'quotation' | 'warranty' | 'competitor' | 'timeline' | 'other';

export interface BuyingSignal {
  id: ID;
  leadId: ID;
  type: SignalType;
  title: string; // "Financing Related"
  evidence: string; // italic quote shown in the modal
  detectedAt: ISODateTime;
}

/* ---------- Calls ---------- */

export type CallChannel = 'in_app' | 'phone';
export type CallDirection = 'outgoing' | 'incoming';
export type CallOutcome =
  'connected' | 'callback_requested' | 'not_interested' | 'no_answer' | 'converted' | 'unknown';

export interface Call {
  id: ID;
  leadId?: ID; // may be unknown caller
  displayName: string; // denormalised for "Unknown"
  channel: CallChannel;
  direction: CallDirection;
  startedAt: ISODateTime;
  durationSec?: number; // undefined → shown as "—"
  outcome: CallOutcome;
  handledBy: ID;
  summary?: string; // shown in the review panel
  notes?: string;
}

export interface MissedCall {
  id: ID;
  leadId?: ID; // undefined for "Unknown"
  displayName: string;
  at: ISODateTime;
  reason: string; // "Hold queue", "Chat sent"
  expectedValueInr?: number; // undefined → "No plan saved"
  status: 'missed' | 'calling' | 'called_back';
}

/* ---------- Tasks, calendar, stats ---------- */

export type TaskKind = 'callbacks' | 'hot_leads' | 'outcome';

export interface Task {
  id: ID;
  kind: TaskKind;
  title: string; // "2 callbacks"
  subtitle: string; // "next in 15 mins"
  count: number;
  leadIds?: ID[]; // for hot_leads → opens Leads modal in this order
}

export interface CalendarEvent {
  id: ID;
  title: string;
  date: ISODate;
  time?: string; // "16:30"
  type: 'callback' | 'meeting' | 'practice' | 'other';
  leadId?: ID;
}

export interface DailyStat {
  date: ISODate;
  callsHandled: number;
  csatPercent: number;
}

export interface KpiSet {
  qaScore: number; // 76
  avgHandleTimeSec: number; // 252 → "4m 12s"
  conversionPercent: number; // 34
  inQueue: number; // 2
  deltas: Record<'qaScore' | 'avgHandleTime' | 'conversion' | 'inQueue', number>;
}

export interface ProgressToday {
  leadsCreated: number;
  leadsCalled: number;
  createdDelta: number;
  calledDelta: number;
}

export interface WaitingItem {
  id: ID;
  leadId: ID;
  name: string;
  reason: string;
  waitingLabel: string; // "4m 20s"
  urgency: 'high' | 'medium' | 'low';
}

export interface Earnings {
  agentId: ID;
  month: string; // "2026-10"
  totalInr: number; // 5200
  fromPractiseInr: number; // 1750
  targetInr: number; // progress bar denominator
}

/* ---------- Pulse ---------- */

export type ChannelGroup = 'role' | 'task' | 'general';

export interface Channel {
  id: ID;
  slug: string; // "callcentre-agent"
  group: ChannelGroup;
  description: string;
  memberCount: number;
  unreadCount: number;
  healthPercent?: number; // coloured chip on task agents
  healthTone?: 'good' | 'warn' | 'bad';
}

export interface Message {
  id: ID;
  channelId: ID;
  authorId: ID; // Agent.id or ChannelMember.id
  authorName: string;
  authorInitials: string;
  isSelf: boolean; // right-aligned green bubble when true
  kind: 'text' | 'stakeholders' | 'issue' | 'resolution' | 'system';
  body: string;
  sentAt: ISODateTime;
}

export interface NeedsInput {
  id: ID;
  channelId: ID;
  title: string; // "Confirm the 4:30pm callback"
  subtitle: string; // "Priya Iyer · likely billing dispute"
  options: [string, string]; // ["Confirmed", "Reschedule"]
  status: 'open' | 'answered';
  answer?: string;
  answeredAt?: ISODateTime;
}

export interface Kudos {
  id: ID;
  from: string;
  message: string;
  isNew: boolean;
}

/* ---------- Practise (bonus) ---------- */

export interface PractiseScenario {
  id: ID;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  script: { speaker: 'customer' | 'you'; text: string }[];
  rewardInr: number;
}
```

---

## 4. Relationships and rules

| Relationship           | Rule                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------- |
| Lead → BuyingSignal    | 0..n signals; modal shows them grouped under "Where we picked up signals"           |
| Lead → Call            | A lead may have many calls; Recent shows latest first                               |
| MissedCall → Lead      | Optional. Unknown callers have no lead and no expected value                        |
| Task(hot_leads) → Lead | `leadIds` defines paging order in the Leads modal                                   |
| Channel → NeedsInput   | At most one open pinned card per channel                                            |
| Message.isSelf         | Derived by comparing `authorId` to the current agent                                |
| Earnings               | `totalInr` = base + `fromPractiseInr`; practise sessions increase `fromPractiseInr` |

---

## 5. Derived values (computed in the service layer)

| Value                            | Formula                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Calls-to-make order              | `leads.filter(open).sort(by score desc)`                                                       |
| Missed-call expected value total | `sum(missedCalls.expectedValueInr ?? 0)` for today                                             |
| Missed calls order               | by `expectedValueInr desc`, unknowns last                                                      |
| "3h left"                        | `closeBy − now`, formatted `Xh` / `Xm` / "expired"                                             |
| Calendar dots                    | group `events` by `date`                                                                       |
| Calendar grid                    | 6×7 matrix from first-of-month weekday offset                                                  |
| 7-day charts                     | last 7 `DailyStat` rows ending today                                                           |
| Handle time label                | `252 → "4m 12s"`                                                                               |
| ₹ formatting                     | `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })` |

---

## 6. Service layer API (`src/services/api.ts`)

```ts
// Read
getCurrentAgent(): Promise<Agent>
getDashboard(): Promise<{
  kpis: KpiSet; progress: ProgressToday; waiting: WaitingItem[];
  earnings: Earnings; tasks: Task[]; callsLast7: DailyStat[]; csatLast7: DailyStat[];
}>
getPlannedCalls(page: number, pageSize: number): Promise<Page<Lead>>
getMissedCalls(): Promise<{ items: MissedCall[]; totalValueInr: number; count: number }>
getRecentCalls(): Promise<Call[]>
getCallById(id: ID): Promise<Call>
getEvents(month: string /* "2026-10" */): Promise<CalendarEvent[]>
getChannels(): Promise<{ role: Channel[]; task: Channel[]; general: Channel[] }>
getChannel(id: ID): Promise<{ channel: Channel; messages: Message[]; needsInput?: NeedsInput }>
getKudos(): Promise<Kudos>
getLeadsForTask(taskId: ID): Promise<Lead[]>
getSignals(leadId: ID): Promise<BuyingSignal[]>
getPractiseScenarios(): Promise<PractiseScenario[]>

// Write (in-memory)
sendMessage(channelId: ID, body: string): Promise<Message>
answerNeedsInput(id: ID, answer: string): Promise<NeedsInput>
startCallback(missedCallId: ID): Promise<MissedCall>
completePractise(scenarioId: ID): Promise<Earnings>

interface Page<T> { items: T[]; page: number; pageSize: number; totalItems: number; totalPages: number }
```

Rules: `getPlannedCalls` slices after sorting. All functions resolve after ~150–300 ms. A tiny `maybeFail` helper (off by default) lets me demo error states.

---

## 7. Seed data guidance

Use plausible Indian names and fake numbers only. Do **not** reuse real customer data. Keep to roughly:

- 1 agent (Arvind Rajan, The Sleep Company, Call Centre).
- 6–8 leads (5 in the hot-leads modal), 8–12 buying signals total across them.
- 5 missed calls (one "Unknown"), spanning today and yesterday.
- 8 recent calls (mix of in-app/phone, some with no duration).
- 7 days of `DailyStat` ending today.
- 6–10 calendar events across October 2026 (a few dots on days like 26, 28).
- 8 channels (role: callcentre-agent; task: cross-sell, sop, lead-conversion, capture; general: customer-discussions), 6–10 messages in `#callcentre-team`, 1 `NeedsInput`.
- 1 `Kudos`, 3–4 `PractiseScenario`.

Numbers visible in the mock (e.g. KPIs, ₹ totals) should be copied by **value** (facts, not code) so the screens match. Write all fixtures by hand in your own structure.

---

## 8. Mapping to real tables (for the README's "if this had a backend" note)

| Type                           | Table                                            | Notes                                 |
| ------------------------------ | ------------------------------------------------ | ------------------------------------- |
| Agent                          | `agents`                                         |                                       |
| Lead                           | `leads` + `lead_icp_factors` + `lead_provenance` | child tables for arrays               |
| BuyingSignal                   | `buying_signals`                                 | FK `lead_id`                          |
| Call                           | `calls`                                          | FK `lead_id` nullable                 |
| MissedCall                     | `missed_calls`                                   | FK `lead_id` nullable                 |
| Task                           | derived view                                     | not stored; computed from leads/calls |
| CalendarEvent                  | `calendar_events`                                | index on `date`                       |
| DailyStat                      | materialised view                                | refreshed nightly                     |
| Channel / Message / NeedsInput | `channels`, `messages`, `needs_input`            | index `messages(channel_id, sent_at)` |
| Earnings                       | derived                                          | from calls + practise sessions        |

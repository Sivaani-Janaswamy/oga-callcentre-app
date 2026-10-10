export type ID = string;
export type ISODate = string;
export type ISODateTime = string;

export interface Agent {
  id: ID;
  greeting: string;
  name: string;
  shortName: string;
  company: string;
  role: string;
  avatarInitials: string;
  points: number;
  streakDays: number;
  unreadNotifications: number;
  rank: number;
}

export type LeadStatus = 'open' | 'won' | 'lost' | 'expired';

export interface Lead {
  id: ID;
  name: string;
  initials: string;
  phone: string;
  productInterest: string;
  quoteValueInr: number;
  status: LeadStatus;
  assignedTo: ID;
  score: number;
  scoreDelta: number;
  icpScore: number;
  intentScore: number;
  nextAction: string;
  closeBy: ISODateTime;
  cumulativeMissed: number;
  context: string;
  lastNote?: string;
  icpBreakdown: IcpFactor[];
  provenance: ProvenanceStep[];
  signalIds: ID[];
}

export interface IcpFactor {
  label: string;
  weight: number;
  value: number;
}

export interface ProvenanceStep {
  at: ISODateTime;
  label: string;
}

export type SignalType =
  'financing' | 'quotation' | 'warranty' | 'competitor' | 'timeline' | 'other';

export interface BuyingSignal {
  id: ID;
  leadId: ID;
  type: SignalType;
  title: string;
  evidence: string;
  detectedAt: ISODateTime;
}

export type CallChannel = 'in_app' | 'phone';
export type CallDirection = 'outgoing' | 'incoming';
export type CallOutcome =
  'connected' | 'callback_requested' | 'not_interested' | 'no_answer' | 'converted' | 'unknown';

export interface Call {
  id: ID;
  leadId?: ID;
  displayName: string;
  channel: CallChannel;
  direction: CallDirection;
  startedAt: ISODateTime;
  durationSec?: number;
  outcome: CallOutcome;
  handledBy: ID;
  summary?: string;
  notes?: string;
}

export interface MissedCall {
  id: ID;
  leadId?: ID;
  displayName: string;
  at: ISODateTime;
  reason: string;
  expectedValueInr?: number;
  status: 'missed' | 'calling' | 'called_back';
}

export type TaskKind = 'callbacks' | 'hot_leads' | 'outcome';

export interface Task {
  id: ID;
  kind: TaskKind;
  title: string;
  subtitle: string;
  count: number;
  leadIds?: ID[];
}

export interface CalendarEvent {
  id: ID;
  title: string;
  date: ISODate;
  time?: string;
  type: 'callback' | 'meeting' | 'practice' | 'other';
  leadId?: ID;
}

export interface DailyStat {
  date: ISODate;
  callsHandled: number;
  csatPercent: number;
}

export interface KpiSet {
  qaScore: number;
  avgHandleTimeSec: number;
  csatTodayPercent: number;
  inQueue: number;
  deltas: {
    qaScore: number;
    avgHandleTimePercent: number;
    csatTodayPoints: number;
    inQueueLive: boolean;
  };
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
  waitingLabel: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface Earnings {
  agentId: ID;
  month: string;
  totalInr: number;
  fromPractiseInr: number;
  slabFloorInr: number;
  targetInr: number;
}

export type ChannelGroup = 'role' | 'task' | 'general';

export interface Channel {
  id: ID;
  slug: string;
  group: ChannelGroup;
  description: string;
  memberCount: number;
  unreadCount: number;
  healthPercent?: number;
  healthTone?: 'good' | 'warn' | 'bad';
}

export interface Message {
  id: ID;
  channelId: ID;
  authorId: ID;
  authorName: string;
  authorInitials: string;
  isSelf: boolean;
  kind: 'text' | 'stakeholders' | 'issue' | 'resolution' | 'system';
  body: string;
  sentAt: ISODateTime;
}

export interface NeedsInput {
  id: ID;
  channelId: ID;
  title: string;
  subtitle: string;
  options: [string, string];
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

export interface PractiseScenario {
  id: ID;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  script: { speaker: 'customer' | 'you'; text: string }[];
  rewardInr: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

import { agent, buyingSignals, calendarEvents, channels, channelMessages, dailyStats, earnings, kpis, leads, missedCalls, needsInput, practiseScenarios, progressToday, recentCalls, tasks, waitingList, kudos } from '../data/seed';
import type { Agent, BuyingSignal, CalendarEvent, Channel, DailyStat, Earnings, ID, KpiSet, Lead, Message, MissedCall, NeedsInput, Page, PractiseScenario, Task, WaitingItem, Kudos } from '../data/types';

const delay = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function getCurrentAgent(): Promise<Agent> {
  await delay(180);
  return agent;
}

export async function getDashboard(): Promise<{
  kpis: KpiSet;
  progress: typeof progressToday;
  waiting: WaitingItem[];
  earnings: Earnings;
  tasks: Task[];
  callsLast7: DailyStat[];
  csatLast7: DailyStat[];
}> {
  await delay(200);
  return {
    kpis,
    progress: progressToday,
    waiting: waitingList,
    earnings,
    tasks,
    callsLast7: dailyStats,
    csatLast7: dailyStats,
  };
}

export async function getPlannedCalls(page: number, pageSize: number): Promise<Page<Lead>> {
  await delay(220);
  const sorted = [...leads].filter((lead) => lead.status === 'open').sort((a, b) => b.score - a.score);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = sorted.slice(start, end);

  return {
    items,
    page,
    pageSize,
    totalItems: sorted.length,
    totalPages: Math.max(1, Math.ceil(sorted.length / pageSize)),
  };
}

export async function getMissedCalls(): Promise<{ items: MissedCall[]; totalValueInr: number; count: number }> {
  await delay(180);
  const items = [...missedCalls].sort((a, b) => {
    const left = a.expectedValueInr ?? 0;
    const right = b.expectedValueInr ?? 0;
    return right - left;
  });
  const totalValueInr = items.reduce((sum, call) => sum + (call.expectedValueInr ?? 0), 0);

  return { items, totalValueInr, count: items.length };
}

export async function getRecentCalls(): Promise<import('../data/types').Call[]> {
  await delay(170);
  return [...recentCalls].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
}

export async function getCallById(id: ID): Promise<import('../data/types').Call> {
  await delay(150);
  const match = [...recentCalls].find((call) => call.id === id);

  if (!match) {
    throw new Error(`Call not found: ${id}`);
  }

  return match;
}

export async function getEvents(month: string): Promise<CalendarEvent[]> {
  await delay(180);
  return calendarEvents.filter((event) => event.date.startsWith(month));
}

export async function getChannels(): Promise<{ role: Channel[]; task: Channel[]; general: Channel[] }> {
  await delay(170);
  return {
    role: channels.filter((channel) => channel.group === 'role'),
    task: channels.filter((channel) => channel.group === 'task'),
    general: channels.filter((channel) => channel.group === 'general'),
  };
}

export async function getChannel(id: ID): Promise<{ channel: Channel; messages: Message[]; needsInput?: NeedsInput }> {
  await delay(220);
  const channel = channels.find((item) => item.id === id);

  if (!channel) {
    throw new Error(`Channel not found: ${id}`);
  }

  return {
    channel,
    messages: channelMessages[id] ?? [],
    needsInput,
  };
}

export async function getKudos(): Promise<Kudos> {
  await delay(150);
  return kudos;
}

export async function getLeadsForTask(taskId: ID): Promise<Lead[]> {
  await delay(180);
  const task = tasks.find((item) => item.id === taskId);
  const ids = task?.leadIds ?? [];
  return leads.filter((lead) => ids.includes(lead.id));
}

export async function getSignals(leadId: ID): Promise<BuyingSignal[]> {
  await delay(180);
  return buyingSignals.filter((signal) => signal.leadId === leadId);
}

export async function getPractiseScenarios(): Promise<PractiseScenario[]> {
  await delay(180);
  return practiseScenarios;
}

export async function sendMessage(channelId: ID, body: string): Promise<Message> {
  await delay(180);
  const message: Message = {
    id: `msg_${Date.now()}`,
    channelId,
    authorId: 'agent_01',
    authorName: 'Arvind Rajan',
    authorInitials: 'AR',
    isSelf: true,
    kind: 'text',
    body,
    sentAt: new Date().toISOString(),
  };

  const currentMessages = channelMessages[channelId] ?? [];
  channelMessages[channelId] = [...currentMessages, message];
  return message;
}

export async function answerNeedsInput(id: ID, answer: string): Promise<NeedsInput> {
  await delay(180);
  const result = { ...needsInput, id, status: 'answered' as const, answer, answeredAt: new Date().toISOString() };
  return result;
}

export async function startCallback(missedCallId: ID): Promise<MissedCall> {
  await delay(180);
  const match = missedCalls.find((call) => call.id === missedCallId);

  if (!match) {
    throw new Error(`Missed call not found: ${missedCallId}`);
  }

  return { ...match, status: 'calling' };
}

export async function completePractise(scenarioId: ID): Promise<Earnings> {
  await delay(180);
  const reward = practiseScenarios.find((scenario) => scenario.id === scenarioId)?.rewardInr ?? 0;

  return {
    ...earnings,
    fromPractiseInr: earnings.fromPractiseInr + reward,
  };
}

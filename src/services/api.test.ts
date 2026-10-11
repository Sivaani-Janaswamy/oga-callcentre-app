import { describe, expect, it } from 'vitest';
import {
  answerNeedsInput,
  completePractise,
  getCallReview,
  getChannel,
  getDashboard,
  getHotLeads,
  getMissedCalls,
  sendMessage,
} from './api';

describe('call review service', () => {
  it('computes SOP adherence from the checklist', async () => {
    const review = await getCallReview('call_04');

    expect(review?.passedItems).toBe(5);
    expect(review?.totalItems).toBe(6);
    expect(review?.adherencePercent).toBe(83);
  });

  it('removes the linked dashboard task when a pinned card is answered', async () => {
    const before = await getDashboard();
    expect(before.tasks.some((task) => task.kind === 'hot_leads')).toBe(true);

    await answerNeedsInput('input_02', 'Calling now');

    const after = await getDashboard();
    expect(after.tasks.some((task) => task.kind === 'hot_leads')).toBe(false);
    expect(after.tasks.map((task) => task.kind)).toEqual(['callbacks', 'outcome']);
  });

  describe('hot leads service', () => {
    it('returns the leads attached to the hot leads task', async () => {
      const hotLeads = await getHotLeads();

      expect(hotLeads.map((lead) => lead.id)).toEqual(['lead_01', 'lead_02']);
    });
  });

  it('adds a practise reward to earnings', async () => {
    const before = await getDashboard();

    await completePractise('practice_01');

    const after = await getDashboard();
    expect(after.earnings.totalInr).toBe(before.earnings.totalInr + 50);
    expect(after.earnings.fromPractiseInr).toBe(before.earnings.fromPractiseInr + 50);
  });
});

describe('pulse service', () => {
  it('sending a message appends it to the channel', async () => {
    const before = await getChannel('channel_01');
    const beforeCount = before.messages.length;

    await sendMessage('channel_01', 'Test message');

    const after = await getChannel('channel_01');
    expect(after.messages.length).toBe(beforeCount + 1);
    expect(after.messages[after.messages.length - 1].body).toBe('Test message');
    expect(after.messages[after.messages.length - 1].isSelf).toBe(true);
  });
});

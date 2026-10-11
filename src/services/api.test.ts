import { describe, expect, it } from 'vitest';
import { getCallReview, getHotLeads } from './api';

describe('call review service', () => {
  it('computes SOP adherence from the checklist', async () => {
    const review = await getCallReview('call_04');

    expect(review?.passedItems).toBe(5);
    expect(review?.totalItems).toBe(6);
    expect(review?.adherencePercent).toBe(83);
  });

  describe('hot leads service', () => {
    it('returns the leads attached to the hot leads task', async () => {
      const hotLeads = await getHotLeads();

      expect(hotLeads.map((lead) => lead.id)).toEqual(['lead_01', 'lead_02']);
    });
  });
});

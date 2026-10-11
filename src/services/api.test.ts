import { describe, expect, it } from 'vitest';
import { getCallReview } from './api';

describe('call review service', () => {
  it('computes SOP adherence from the checklist', async () => {
    const review = await getCallReview('call_04');

    expect(review?.passedItems).toBe(5);
    expect(review?.totalItems).toBe(6);
    expect(review?.adherencePercent).toBe(83);
  });
});

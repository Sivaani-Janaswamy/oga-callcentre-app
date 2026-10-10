import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePaging } from './usePaging';

describe('usePaging', () => {
  it('returns the first page of results', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const { result } = renderHook(() => usePaging(items, 3));

    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([1, 2, 3]);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it('returns the last page when moving to the end', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const { result } = renderHook(() => usePaging(items, 3));

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.items).toEqual([4, 5, 6]);
    expect(result.current.hasPrevious).toBe(true);
    expect(result.current.hasNext).toBe(false);
  });

  it('handles empty lists without errors', () => {
    const { result } = renderHook(() => usePaging<number>([], 3));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.items).toEqual([]);
    expect(result.current.page).toBe(1);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(false);
  });
});

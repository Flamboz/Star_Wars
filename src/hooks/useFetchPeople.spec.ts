import { act, renderHook } from '@testing-library/react';
import { useFetchPeople } from './useFetchPeople';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { Person } from '../types';

type RenderHookResultType = {
  current: {
    people: Person[];
    isLoading: boolean;
    isError: boolean;
    previousURL: string | null;
    nextURL: string | null;
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    handlePrevious: () => void;
    handleNext: () => void;
  };
};

describe('useFetchPeople', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should fetch people data on initial render', async () => {
    const mockResponse = {
      results: [{ name: 'Luke Skywalker' }],
      previous: null,
      next: 'next-url',
      count: 1,
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as Mock;

    let result: RenderHookResultType;

    await act(async () => {
      const data = renderHook(useFetchPeople);
      result = data.result;
    });

    expect(result!.current.people).toEqual(mockResponse.results);
    expect(result!.current.isLoading).toBe(false);
    expect(result!.current.isError).toBe(false);
    expect(result!.current.previousURL).toBe(mockResponse.previous);
    expect(result!.current.nextURL).toBe(mockResponse.next);
    expect(result!.current.totalPages).toBe(1);
  });

  it('should handle fetch error', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    let result: RenderHookResultType;

    await act(async () => {
      const data = renderHook(useFetchPeople);
      result = data.result;
    });

    expect(result!.current.people).toEqual([]);
    expect(result!.current.isLoading).toBe(false);
    expect(result!.current.isError).toBe(true);
  });

  it('should go to the next page', async () => {
    const mockResponse = {
      results: [{ name: 'Luke Skywalker' }],
      previous: null,
      next: 'next-url',
      count: 20,
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as Mock;

    let result: RenderHookResultType;

    await act(async () => {
      const data = renderHook(useFetchPeople);
      result = data.result;
    });

    await act(() => {
      result.current.handleNext();
    });

    expect(result!.current.currentPage).toBe(2);
  });

  it('should go to the previous page', async () => {
    const mockResponse = {
      results: [{ name: 'Luke Skywalker' }],
      previous: 'previous-url',
      next: 'next-url',
      count: 20,
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as Mock;

    let result: RenderHookResultType;

    await act(async () => {
      const data = renderHook(useFetchPeople);
      result = data.result;
    });

    await act(() => {
      result.current.handlePrevious();
    });

    expect(result!.current.currentPage).toBe(1);
  });

  it('should persist current page in local storage', async () => {
    const mockResponse = {
      results: [{ name: 'Luke Skywalker' }],
      previous: null,
      next: 'next-url',
      count: 20,
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as Mock;

    let result: RenderHookResultType;

    await act(async () => {
      const data = renderHook(useFetchPeople);
      result = data.result;
    });

    await act(() => {
      result.current.goToPage(2);
    });

    expect(localStorage.getItem('currentPage')).toBe('2');
  });
});

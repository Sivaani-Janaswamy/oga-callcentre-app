import { useEffect, useState } from 'react';

export function useAsync<T>(
  request: () => Promise<T>,
  deps: unknown[] = [],
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    request()
      .then((response) => {
        if (!cancelled) {
          setData(response);
        }
      })
      .catch((caughtError: unknown) => {
        if (!cancelled) {
          setError(caughtError instanceof Error ? caughtError : new Error('Async request failed'));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [request, deps]);

  return { data, loading, error };
}

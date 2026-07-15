const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;

const hits = new Map<string, number[]>();

function prune(now: number) {
  if (hits.size < 5000) return;
  hits.forEach((timestamps, key) => {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, recent);
    }
  });
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  prune(now);

  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

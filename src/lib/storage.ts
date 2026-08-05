/**
 * Generic localStorage persistence utility.
 * Gracefully handles unavailability and quota exceeded errors.
 */

export interface StorageManager<T> {
  save(key: string, data: T): void;
  load(key: string): T | null;
  remove(key: string): void;
}

export function createStorageManager<T>(): StorageManager<T> {
  return {
    save(key: string, data: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // localStorage unavailable or quota exceeded
      }
    },
    load(key: string): T | null {
      try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
      } catch {
        return null;
      }
    },
    remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
    },
  };
}

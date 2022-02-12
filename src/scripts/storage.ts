export const storageKeys = [
  'host',
  'token',
  'usercache',
  'currentTimeline',
  'currentList',
  'currentAntenna',
  'version',
] as const;

export type StorageKey = typeof storageKeys[number];

export const storage = {
  get(key: StorageKey) {
    return localStorage.getItem(key);
  },
  set(key: StorageKey, value: unknown) {
    const v = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, v);
  },
  remove(key: StorageKey) {
    localStorage.removeItem(key);
  }
};
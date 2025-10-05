import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

export const setItem = (key: string, value: string): Promise<void> => {
  return new Promise((resolve) => {
    storage.set(key, value);
    resolve();
  });
};

export const getItem = (key: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const value = storage.getString(key);
    resolve(value ?? null);
  });
};

export const removeItem = (key: string): Promise<void> => {
  return new Promise((resolve) => {
    storage.delete(key);
    resolve();
  });
};

export const clearAll = (): Promise<void> => {
  return new Promise((resolve) => {
    storage.clearAll();
    resolve();
  });
};
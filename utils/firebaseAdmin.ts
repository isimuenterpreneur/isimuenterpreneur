import { ref, push, set, remove, update } from "firebase/database";
import { dbClient } from "../lib/firebaseClient";

export const writeRecord = async <T>(path: string, data: T) => {
  const itemRef = push(ref(dbClient, path));
  await set(itemRef, data);
  return itemRef.key;
};

export const updateRecord = async <T>(path: string, data: Partial<T>) => {
  await update(ref(dbClient, path), data);
};

export const deleteRecord = async (path: string) => {
  await remove(ref(dbClient, path));
};

export const buildCollection = <T>(items: Record<string, T> | null): T[] => {
  return items ? Object.entries(items).map(([id, item]) => ({ ...item, id })) : [];
};

import { dbClient, storageClient } from "../lib/firebaseClient";
import { ref, get, push, set, update, remove } from "firebase/database";
import { uploadBytes, getDownloadURL, ref as storageRef } from "firebase/storage";

export const readCollection = async <T>(path: string): Promise<(T & { id: string })[]> => {
  const snapshot = await get(ref(dbClient, path));
  if (!snapshot.exists()) return [];
  const data = snapshot.val() as Record<string, T>;
  return Object.entries(data).map(([id, item]) => ({ ...item, id }));
};

export const readObject = async <T>(path: string): Promise<T | null> => {
  const snapshot = await get(ref(dbClient, path));
  return snapshot.exists() ? (snapshot.val() as T) : null;
};

export const writeRecord = async <T>(path: string, data: T) => {
  const target = push(ref(dbClient, path));
  await set(target, data);
  return target.key;
};

export const updateRecord = async <T>(path: string, data: Partial<T>) => {
  await update(ref(dbClient, path), data);
};

export const deleteRecord = async (path: string) => {
  await remove(ref(dbClient, path));
};

export const uploadFile = async (folder: string, file: File) => {
  const storageReference = storageRef(storageClient, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(storageReference, file);
  return getDownloadURL(storageReference);
};

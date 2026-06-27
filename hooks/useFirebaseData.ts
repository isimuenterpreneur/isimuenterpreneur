"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { dbClient } from "../lib/firebaseClient";

export const useFirebaseData = <T extends object>(path: string) => {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const dbRef = ref(dbClient, path);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const value = snapshot.val() as Record<string, T>;
          setData(Object.entries(value).map(([id, item]) => ({ ...item, id })));
        } else {
          setData([]);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
};

import { useState, useEffect } from "react";
import * as Storage from "@/services/local-storage";

export const useUser = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await Storage.getUserId();
      if (!userId) {
        return;
      }
      setUserId(userId);
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      setIsSignedIn(true);
    }
  }, [userId]);

  return { userId, isSignedIn };
};

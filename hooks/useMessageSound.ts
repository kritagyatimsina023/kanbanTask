"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "chat-message-sound";

export const useMessageSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const savedPreference = localStorage.getItem(STORAGE_KEY);

    return savedPreference !== null ? savedPreference === "true" : true;
  });

  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification.mp3");
    audioRef.current.volume = 0.5;
    return () => {
      audioRef.current = null;
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const nextValue = !current;

      localStorage.setItem(STORAGE_KEY, String(nextValue));

      return nextValue;
    });
  }, []);

  const playSound = useCallback(async () => {
    if (!soundEnabled || !audioRef.current) {
      return;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (error) {
      console.error("Unable to play notification sound:", error);
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};

"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "chat-message-sound";

const ChatMessageSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const savedPreference = localStorage.getItem(STORAGE_KEY);

    return savedPreference !== null ? savedPreference === "true" : true;
  });

  useEffect(() => {
    const audio = new Audio("/sounds/message-notification.mp3");

    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    setSoundEnabled((current) => {
      const nextValue = !current;

      localStorage.setItem(STORAGE_KEY, String(nextValue));

      return nextValue;
    });
  };

  const playSound = async () => {
    if (!soundEnabled || !audioRef.current) {
      return;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (error) {
      console.error("Unable to play notification sound:", error);
    }
  };

  return null;
};

export default ChatMessageSound;

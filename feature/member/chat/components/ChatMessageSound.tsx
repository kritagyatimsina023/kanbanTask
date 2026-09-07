"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "chat-message-sound";

const ChatMessageSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const savedPreference = localStorage.getItem(STORAGE_KEY);

    if (savedPreference !== null) {
      setSoundEnabled(savedPreference === "true");
    }

    audioRef.current = new Audio("/sounds/message-notification.mp3");
    audioRef.current.volume = 0.5;
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

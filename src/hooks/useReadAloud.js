"use client";

import { useCallback, useRef } from "react";

/** Read lesson text aloud via Web Speech API (inclusive / a11y) */
export function useReadAloud() {
  const speakingRef = useRef(false);

  const readAloud = useCallback((text) => {
    if (typeof window === "undefined" || !text?.trim()) return;

    window.speechSynthesis?.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    speakingRef.current = true;
    utterance.onend = () => {
      speakingRef.current = false;
    };
    window.speechSynthesis?.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    speakingRef.current = false;
  }, []);

  return { readAloud, stop };
}

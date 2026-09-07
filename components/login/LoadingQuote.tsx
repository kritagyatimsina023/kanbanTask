"use client";

import { LucideLoader2, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

const randomQuote = [
  "Every login is a fresh start. Make today count.",
  "Progress is built one completed task at a time.",
  "Your next achievement is waiting behind your next task.",
  "Clear goals. Focused work. Meaningful results.",
  "Start fresh. Stay focused. Finish strong.",
];

const LoadingQuote = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % randomQuote.length);
        setVisible(true);
      }, 200);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen w-full items-center justify-center bg-slate-950/30 p-4! backdrop-blur-[8px]">
      <div className="relative flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/60 bg-white/90 px-8! py-10! text-center shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mb-7! flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <div className="absolute inset-0 animate-pulse rounded-2xl bg-indigo-100/50" />

          <div className="relative mb-7! flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-indigo-100/50" />
            <div className="relative flex h-8! w-8! flex-col justify-center gap-1! rounded-md! bg-white p-1.5! shadow-sm ring-1 ring-indigo-100">
              <span className="h-1! w-full animate-pulse rounded-full bg-indigo-400 [animation-delay:0s] [animation-duration:1.2s]" />
              <span className="h-1! w-3/4 animate-pulse rounded-full bg-indigo-300 [animation-delay:0.2s] [animation-duration:1.2s]" />
              <span className="h-1! w-1/2 animate-pulse rounded-full bg-blue-300 [animation-delay:0.4s] [animation-duration:1.2s]" />
            </div>
          </div>
        </div>
        <div className="relative flex min-h-[96px] items-center justify-center px-3!">
          <p
            className={`font-serif text-xl font-medium italic leading-relaxed tracking-tight text-slate-800 transition-all ease-out ${
              visible
                ? "translate-y-0 scale-100 opacity-100 duration-500"
                : "-translate-y-3 scale-[0.97] opacity-0 duration-300"
            }`}
          >
            {randomQuote[quoteIndex]}
          </p>
        </div>

        <div className="my-5! h-px w-12 bg-slate-200" />

        <div className="flex items-center gap-2! text-xs font-medium tracking-wide text-slate-400">
          <Sparkles size={13} className="text-indigo-400" />
          <span>Preparing your workspace</span>
        </div>

        <div className="mt-6! flex gap-1.5!">
          {randomQuote.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === quoteIndex
                  ? "w-5 bg-indigo-500"
                  : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingQuote;

"use client";

import React, { useRef } from "react";
import ShineButton from "@/components/ShineButton";
import { KanbanSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  getStartdHref: string;
};

const CTA = ({ getStartdHref }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    tl.to(boxRef.current, {
      clipPath: "inset(0 0% 0 0%)",
      duration: 0.8,
      ease: "power3.inOut",
    })
      .from(
        iconRef.current,
        {
          scale: 0,
          rotate: -30,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.4",
      )
      .from(headingRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(descRef.current, { y: 15, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(
        buttonRef.current,
        { y: 15, opacity: 0, scale: 0.9, duration: 0.5 },
        "-=0.25",
      );
    gsap.to(iconRef.current, {
      scale: 1.08,
      duration: 1.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });
  }, []);

  return (
    <section className="px-4! pb-20! sm:px-6! lg:px-8! lg:pb-24!">
      <div
        style={{
          clipPath: "inset(0 46% 0 54%)",
        }}
        ref={boxRef}
        className="mx-auto!  max-w-8xl! overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6! py-12! text-center text-white shadow-2xl shadow-indigo-200 sm:px-10! sm:py-16!"
      >
        <div
          ref={iconRef}
          className="mx-auto! flex h-14! w-14! items-center justify-center rounded-2xl bg-white/15"
        >
          <KanbanSquare size={27} />
        </div>

        <h2
          ref={headingRef}
          className="mt-6! text-3xl! font-bold tracking-tight sm:text-4xl!"
        >
          Ready to organize your workflow?
        </h2>

        <p
          ref={descRef}
          className="mx-auto! mt-4! max-w-xl! text-sm! leading-6! text-indigo-100 sm:text-base!"
        >
          Bring your tasks, team members, progress, notifications, and rewards
          together in one centralized workspace.
        </p>

        <div ref={buttonRef} className="mt-5!">
          <ShineButton href={getStartdHref} variant="white">
            Enter WorkSpace
          </ShineButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;

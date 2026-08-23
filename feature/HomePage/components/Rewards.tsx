"use client";

import React, { useCallback, useRef } from "react";
import { Crown, Sparkles, Trophy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function InfoRow({
  icon: Icon,
  title,
  description,
  rowRef,
  iconRef,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  rowRef: (el: HTMLDivElement | null) => void;
  iconRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={rowRef} className="flex gap-4!">
      <div
        ref={iconRef}
        className="flex h-10! w-10! shrink-0! items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
      >
        <Icon size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>

        <p className="mt-1! text-xs! leading-5! text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function RankingRow({
  rank,
  name,
  points,
  rowRef,
  rankBadgeRef,
  pointsRef,
}: {
  rank: string;
  name: string;
  points: string;
  rowRef: (el: HTMLDivElement | null) => void;
  rankBadgeRef: (el: HTMLDivElement | null) => void;
  pointsRef: (el: HTMLSpanElement | null) => void;
}) {
  const numericPoints = Number(points.replace(/,/g, ""));

  return (
    <div
      ref={rowRef}
      className="flex items-center gap-3! rounded-xl border border-gray-100 bg-gray-50 p-3! transition-colors duration-300 hover:bg-indigo-50/50"
    >
      <div
        ref={rankBadgeRef}
        className="flex h-8! w-8! items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600"
      >
        {rank}
      </div>

      <div className="flex-1!">
        <p className="text-xs font-semibold text-gray-800">{name}</p>
      </div>

      <span
        ref={pointsRef}
        className="text-xs font-bold text-indigo-600"
        data-value={numericPoints}
      >
        0 pts
      </span>
    </div>
  );
}

const rankingData = [
  { rank: "1", name: "Alex Morgan", points: "1,240" },
  { rank: "2", name: "John Smith", points: "1,120" },
  { rank: "3", name: "Sarah Lee", points: "980" },
  { rank: "4", name: "Your Position", points: "850" },
];

const infoRowsData = [
  {
    icon: Trophy,
    title: "Reward System",
    description:
      "Members can earn rewards based on completed work and business logic defined by the application.",
  },
  {
    icon: Crown,
    title: "Leaderboard",
    description:
      "Members can compare their performance and see their position among other team members.",
  },
  {
    icon: Sparkles,
    title: "Recognition",
    description:
      "Reward notifications provide immediate feedback when members receive recognition.",
  },
];

const Rewards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardHeaderRef = useRef<HTMLDivElement>(null);
  const trophyWrapRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<SVGSVGElement>(null);

  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const rankRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rankBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointsRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const infoRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addRankRowRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !rankRowRefs.current.includes(el)) rankRowRefs.current.push(el);
  }, []);
  const addRankBadgeRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !rankBadgeRefs.current.includes(el))
      rankBadgeRefs.current.push(el);
  }, []);
  const addPointsRef = useCallback((el: HTMLSpanElement | null) => {
    if (el && !pointsRefs.current.includes(el)) pointsRefs.current.push(el);
  }, []);
  const addInfoRowRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !infoRowRefs.current.includes(el)) infoRowRefs.current.push(el);
  }, []);
  const addInfoIconRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !infoIconRefs.current.includes(el)) infoIconRefs.current.push(el);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(cardRef.current, {
        x: -80,
        opacity: 0,
        scale: 0.95,
        rotate: -3,
        duration: 0.4,
        ease: "power4.out",
      })
        .from(
          cardHeaderRef.current,
          { y: -10, opacity: 0, duration: 0.3 },
          "-=0.5",
        )
        .from(
          trophyWrapRef.current,
          {
            scale: 0,
            rotate: -20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.4",
        )
        .from(
          crownRef.current,
          {
            scale: 0,
            rotate: 15,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2.4)",
          },
          "-=0.3",
        )

        .from(
          rankRowRefs.current,
          {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.2",
        )
        .from(
          rankBadgeRefs.current,
          {
            scale: 0,
            duration: 0.4,
            ease: "back.out(2.5)",
            stagger: 0.12,
          },
          "<",
        )

        .from(badgeRef.current, { x: 20, opacity: 0, duration: 0.5 }, "-=0.6")
        .from(
          headingRef.current,
          { y: 30, opacity: 0, duration: 0.7 },
          "-=0.35",
        )
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(
          infoRowRefs.current,
          {
            x: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          infoIconRefs.current,
          {
            scale: 0,
            rotate: 30,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.12,
          },
          "<+0.1",
        )

        .call(
          () => {
            pointsRefs.current.forEach((el) => {
              if (!el) return;
              const target = Number(el.dataset.value);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.1,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(obj.val).toLocaleString()} pts`;
                },
              });
            });
          },
          [],
          "-=0.6",
        );

      gsap.to(crownRef.current, {
        rotate: 8,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      if (rankRowRefs.current[0]) {
        gsap.to(rankRowRefs.current[0], {
          boxShadow: "0 0 0 2px rgba(99,102,241,0.25)",
          duration: 1.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.5,
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 px-4! py-20! sm:px-6! lg:px-8! lg:py-24!"
    >
      <div className="mx-auto! max-w-7xl!">
        <div className="grid items-center gap-12! lg:grid-cols-2! lg:gap-20!">
          <div className="order-2! lg:order-1!">
            <div
              ref={cardRef}
              className="rounded-2xl border border-gray-200 bg-white p-6! shadow-xl shadow-gray-100"
            >
              <div
                ref={cardHeaderRef}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3!">
                  <div
                    ref={trophyWrapRef}
                    className="flex h-10! w-10! items-center justify-center rounded-xl bg-amber-50 text-amber-600"
                  >
                    <Trophy size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Leaderboard
                    </p>

                    <p className="text-[10px] text-gray-400">Top performers</p>
                  </div>
                </div>

                <Crown ref={crownRef} size={20} className="text-amber-500" />
              </div>

              <div className="mt-6! space-y-3!">
                {rankingData.map((row) => (
                  <RankingRow
                    key={row.rank}
                    rank={row.rank}
                    name={row.name}
                    points={row.points}
                    rowRef={addRankRowRef}
                    rankBadgeRef={addRankBadgeRef}
                    pointsRef={addPointsRef}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="order-1! lg:order-2!">
            <span
              ref={badgeRef}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              Motivation
            </span>

            <h2
              ref={headingRef}
              className="mt-3! text-3xl! font-bold tracking-tight text-gray-900 sm:text-4xl!"
            >
              Turn productivity into progress
            </h2>

            <p
              ref={descRef}
              className="mt-5! text-sm! leading-7! text-gray-500 sm:text-base!"
            >
              Rewards and leaderboards give members an additional motivation to
              complete their tasks and contribute to the team.
            </p>

            <div className="mt-8! space-y-5!">
              {infoRowsData.map((row) => (
                <InfoRow
                  key={row.title}
                  icon={row.icon}
                  title={row.title}
                  description={row.description}
                  rowRef={addInfoRowRef}
                  iconRef={addInfoIconRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;

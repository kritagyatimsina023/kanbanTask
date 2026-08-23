"use client";

import React, { useRef } from "react";
import { Bell, KanbanSquare, Trophy, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
function FeatureCard({
  icon: Icon,
  title,
  description,
  details,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  gradient: string;
}) {
  return (
    <div
      className={`h-full w-full rounded-2xl border border-white/60 bg-gradient-to-br ${gradient} p-6! shadow-2xl shadow-gray-300/40`}
    >
      <div className="flex h-12! w-12! items-center justify-center rounded-xl bg-white/70 text-indigo-600 shadow-sm backdrop-blur-sm">
        <Icon size={22} />
      </div>

      <h3 className="mt-6! text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-3! text-sm! leading-6! text-gray-600">{description}</p>

      <div className="mt-5! space-y-2!">
        {details.map((detail) => (
          <div
            key={detail}
            className="flex items-center gap-2! text-xs! text-gray-600"
          >
            <span className="h-1.5! w-1.5! shrink-0! rounded-full bg-indigo-500" />
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: KanbanSquare,
    title: "Kanban Board",
    description:
      "Visualize your entire workflow with a clean and intuitive Kanban board.",
    details: [
      "Organize tasks by status",
      "Track work from Todo to Completed",
      "Get a clear overview of team progress",
    ],
    gradient: "from-indigo-50 via-white to-blue-100",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Bring your team together and keep everyone aligned with their responsibilities.",
    details: [
      "Assign tasks to specific members",
      "Manage team roles and permissions",
      "Monitor individual contributions",
    ],
    gradient: "from-violet-50 via-white to-purple-100",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Keep your team updated with timely notifications whenever important activity happens.",
    details: [
      "Task assignment notifications",
      "Updates when work changes",
      "Reward and activity notifications",
    ],
    gradient: "from-blue-50 via-white to-cyan-100",
  },
  {
    icon: Trophy,
    title: "Rewards & Ranking",
    description:
      "Turn productivity into motivation with points, rewards, and competitive leaderboards.",
    details: [
      "Earn points for completed work",
      "Track team rankings",
      "Encourage consistent productivity",
    ],
    gradient: "from-purple-50 via-white to-indigo-100",
  },
];

const OverView = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftRef = useRef<HTMLDivElement | null>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      const cards = cardsRef.current;
      if (!cards.length || !pinTargetRef.current) return;

      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
      });

      gsap.fromTo(
        leftRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          yPercent: 100,
          scale: 1,
          opacity: 1,
          rotate: 0,
        });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTargetRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,

          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const prevCards = cards.slice(0, i);

        tl.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
          },
          i - 1,
        );

        prevCards.forEach((prevCard, j) => {
          const depth = i - j;
          tl.to(
            prevCard,
            {
              scale: 1 - depth * 0.04,
              y: -depth * 14,
              opacity: 1 - depth * 0.08,
              filter: `blur(${depth * 0.5}px)`,
              duration: 1,
              ease: "power2.out",
            },
            i - 1,
          );
        });
      });
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef}>
      <section
        ref={pinTargetRef}
        className="px-4! py-20! sm:px-6! lg:px-8! lg:py-24!"
      >
        <div className="mx-auto! max-w-7xl!">
          <div className="grid gap-10!  lg:grid-cols-2! lg:gap-16!">
            <div
              ref={leftRef}
              style={{
                clipPath: "inset(0 100% 0 0)",
              }}
              className="flex  flex-col justify-center"
            >
              <span className="text-xs heading font-bold uppercase tracking-widest text-indigo-600">
                Everything in one place
              </span>

              <h2 className="mt-3! subHeading text-3xl! font-bold tracking-tight text-gray-900 sm:text-4xl!">
                Everything your team needs to move work forward
              </h2>

              <p className="mt-4! para max-w-xl! text-sm! leading-7! text-gray-500 sm:text-base!">
                Kanban Workspace brings task management, team collaboration,
                progress tracking, notifications, and rewards into one focused
                workspace. Instead of switching between different tools, your
                team can manage the entire workflow from a single place.
              </p>
              <p className="mt-4! paraTwo max-w-xl! text-sm! leading-7! text-gray-500 sm:text-base!">
                Whether you are assigning a new task, checking ongoing work,
                communicating with teammates, or celebrating completed tasks,
                everything stays connected and easy to track.
              </p>

              <div className="mt-7! grid max-w-xl! grid-cols-2! gap-4!">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4!">
                  <p className="text-lg! font-bold text-indigo-600">Simple</p>
                  <p className="mt-1! text-xs! leading-5! text-gray-500">
                    Easy-to-understand workflow for every team member.
                  </p>
                </div>

                <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4!">
                  <p className="text-lg! font-bold text-violet-600">
                    Connected
                  </p>
                  <p className="mt-1! text-xs! leading-5! text-gray-500">
                    Tasks, communication, notifications, and rewards in one
                    place.
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={stackRef}
              className="relative h-[380px]! w-full! sm:h-[340px]!"
            >
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  ref={addToRefs}
                  className="absolute inset-0 origin-top will-change-transform"
                  style={{ zIndex: i + 1 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    details={feature.details}
                    gradient={feature.gradient}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverView;

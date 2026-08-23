"use client";

import React, { useRef } from "react";
import { ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function RoleCard({
  icon: Icon,
  title,
  description,
  features,
  cardRef,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-gray-200 bg-white p-6! shadow-sm sm:p-8!"
    >
      <div className="flex h-12! w-12! items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-6! text-xl! font-bold text-gray-900">{title}</h3>

      <p className="mt-3! text-sm! leading-6! text-gray-500">{description}</p>

      <div className="mt-6! space-y-3!">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3!">
            <CheckCircle2 size={15} className="shrink-0! text-emerald-500" />

            <span className="text-xs font-medium text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const RoleBased = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.from(
        leftCardRef.current,
        {
          x: -120,
          rotate: -8,
          opacity: 0,
        },
        0,
      ).from(
        rightCardRef.current,
        {
          x: 120,
          rotate: 8,
          opacity: 0,
        },
        0,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 px-4! py-20! sm:px-6! lg:px-8! lg:py-24!"
    >
      <div className="mx-auto! max-w-7xl!">
        <div className="grid gap-8! lg:grid-cols-2! lg:gap-10!">
          <RoleCard
            cardRef={leftCardRef}
            icon={ShieldCheck}
            title="Powerful Admin Workspace"
            description="Administrators get a dedicated workspace to manage users, tasks, rewards, leaderboards, and overall team activity."
            features={[
              "Dedicated admin sidebar",
              "User management",
              "Task creation and assignment",
              "Task deletion and management",
              "Dashboard statistics",
              "Leaderboard and reward management",
              "Team activity monitoring",
            ]}
          />
          <RoleCard
            cardRef={rightCardRef}
            icon={UserCheck}
            title="Focused Member Workspace"
            description="Members get a clean workspace focused on their assigned tasks, progress, rewards, notifications, and personal performance."
            features={[
              "Dedicated member sidebar",
              "Personal task overview",
              "Task statistics",
              "Task status charts",
              "Draggable task board",
              "Personal notifications",
              "Rewards and leaderboard position",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default RoleBased;

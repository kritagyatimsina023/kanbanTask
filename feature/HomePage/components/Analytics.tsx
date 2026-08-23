"use client";

import React, { useRef } from "react";
import { BarChart3, PieChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function AnalyticsFeature({
  icon: Icon,
  title,
  description,
  featureRef,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  featureRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={featureRef}
      className="rounded-xl border border-white/10 bg-white/10 p-4!"
    >
      <Icon size={19} />

      <h3 className="mt-3! text-sm font-semibold">{title}</h3>

      <p className="mt-1! text-[11px]! leading-5! text-indigo-200">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  statRef,
}: {
  label: string;
  value: string;
  statRef: (el: HTMLParagraphElement | null) => void;
}) {
  return (
    <div className="rounded-xl bg-white/10 p-3!">
      <p className="text-[10px] text-indigo-200">{label}</p>

      <p ref={statRef} className="mt-1! text-lg font-bold" data-value={value}>
        0
      </p>
    </div>
  );
}

const featuresData = [
  {
    icon: BarChart3,
    title: "Bar Charts",
    description: "Track task distribution and progress.",
  },
  {
    icon: PieChart,
    title: "Pie Charts",
    description: "Understand task status at a glance.",
  },
];

const statsData = [
  { label: "Total", value: "24" },
  { label: "Progress", value: "8" },
  { label: "Done", value: "13" },
];

const barHeights = [45, 70, 55, 90, 65, 80, 100];

const Analytics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeaderRef = useRef<HTMLDivElement>(null);
  const chartBoxRef = useRef<HTMLDivElement>(null);

  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addFeatureRef = (el: HTMLDivElement | null) => {
    if (el && !featureRefs.current.includes(el)) featureRefs.current.push(el);
  };
  const addStatRef = (el: HTMLParagraphElement | null) => {
    if (el && !statRefs.current.includes(el)) statRefs.current.push(el);
  };
  const addBarRef = (el: HTMLDivElement | null) => {
    if (el && !barRefs.current.includes(el)) barRefs.current.push(el);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });
      tl.to(sectionRef.current, {
        clipPath: " inset(0 0% 0 0%)",
        duration: 0.35,
        ease: "power3.inOut",
      })
        .from(badgeRef.current, {
          x: -20,
          opacity: 0,
          duration: 0.3,
        })
        .from(headingRef.current, { y: 30, opacity: 0, duration: 0.4 }, "-=0.3")
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.4 }, "-=0.4")
        .from(
          featureRefs.current,
          {
            y: 25,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            stagger: 0.15,
          },
          "+=0.3",
        )

        .from(
          panelRef.current,
          {
            x: 100,
            opacity: 0,
            scale: 0.92,
            rotate: -4,
            duration: 0.35,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          panelHeaderRef.current,
          { y: -10, opacity: 0, duration: 0.3 },
          "-=0.5",
        )

        .from(
          statRefs.current.map((el) => el?.closest("div.rounded-xl")),
          {
            y: 15,
            opacity: 0,
            duration: 0.2,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          chartBoxRef.current,
          { opacity: 0, y: 10, duration: 0.3 },
          "-=0.2",
        )

        .from(
          barRefs.current,
          {
            scaleY: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .call(
          () => {
            statRefs.current.forEach((el) => {
              if (!el) return;
              const target = Number(el.dataset.value);
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(obj.val)}`;
                },
              });
            });
          },
          [],
          "-=0.8",
        );

      gsap.to(barRefs.current, {
        scaleY: 1.03,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.15,
          from: "random",
        },
        delay: 2.5,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      style={{
        clipPath: " inset(0 46% 0 54%)",
      }}
      className="bg-gradient-to-br from-indigo-600 to-violet-700 px-4! py-20! text-white sm:px-6! lg:px-8! lg:py-24!"
    >
      <div className="mx-auto! max-w-7xl!">
        <div className="grid items-center gap-12! lg:grid-cols-2! lg:gap-20!">
          <div>
            <span
              ref={badgeRef}
              className="text-xs font-bold uppercase tracking-widest text-indigo-200"
            >
              Analytics
            </span>

            <h2
              ref={headingRef}
              className="mt-3! text-3xl! font-bold tracking-tight sm:text-4xl!"
            >
              Understand your team&apos;s progress
            </h2>
            <p
              ref={descRef}
              className="mt-5! max-w-xl! text-sm! leading-7! text-indigo-100 sm:text-base!"
            >
              Members get a clear overview of their own task performance through
              statistics and visual charts, making it easy to understand
              workload and progress.
            </p>

            <div className="mt-8! grid grid-cols-2! gap-4!">
              {featuresData.map((feature) => (
                <AnalyticsFeature
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  featureRef={addFeatureRef}
                />
              ))}
            </div>
          </div>

          <div
            ref={panelRef}
            className="rounded-2xl border border-white/10 bg-white/10 p-5! backdrop-blur-xl"
          >
            <div
              ref={panelHeaderRef}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold">My Task Overview</p>
                <p className="mt-1! text-xs text-indigo-200">
                  Current performance
                </p>
              </div>

              <BarChart3 size={20} />
            </div>

            <div className="mt-6! grid grid-cols-3! gap-3!">
              {statsData.map((stat) => (
                <MiniStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  statRef={addStatRef}
                />
              ))}
            </div>

            <div
              ref={chartBoxRef}
              className="mt-6! rounded-xl bg-white/10 p-4!"
            >
              <div className="flex h-36! items-end justify-around gap-4!">
                {barHeights.map((height, index) => (
                  <div
                    key={index}
                    ref={addBarRef}
                    className="w-full origin-bottom rounded-t-md bg-white/80"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;

"use client";

import React, { useRef } from "react";
import { Bell, CheckCircle2, ClipboardList, Trophy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function NotificationFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className=" group rounded-2xl border border-gray-200 bg-white p-6! shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50">
      <div className=" flex h-11! w-11! items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={20} />
      </div>
      <h3 className="mt-5! text-sm font-bold text-gray-900">{title}</h3>
      <p className="mt-2! text-xs! leading-5! text-gray-500">{description}</p>
    </div>
  );
}

const featuresData = [
  {
    icon: ClipboardList,
    title: "Task Created",
    description:
      "Members receive notifications when a task is specifically assigned to them.",
  },
  {
    icon: CheckCircle2,
    title: "Task Deleted",
    description:
      "Relevant users are notified when their assigned task is deleted.",
  },
  {
    icon: Trophy,
    title: "Rewards",
    description:
      "Members receive notifications when they earn rewards for their work.",
  },
];

const Notification = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerIconWrapRef = useRef<HTMLDivElement>(null);
  const bannerBellRef = useRef<SVGSVGElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  const pingDotRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!badgeRef.current || !headingRef.current || !descRef.current) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(badgeRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.35,
      })

        .from(
          headingRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.15",
        )

        .from(
          descRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.25",
        );

      if (
        bannerRef.current &&
        bannerIconWrapRef.current &&
        bannerBellRef.current &&
        bannerTextRef.current &&
        pingDotRef.current
      ) {
        tl.from(
          bannerRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.15",
        )

          .from(
            bannerIconWrapRef.current,
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(2)",
            },
            "-=0.25",
          )

          .from(
            bannerTextRef.current,
            {
              x: -15,
              opacity: 0,
              duration: 0.4,
            },
            "-=0.25",
          )

          .to(bannerBellRef.current, {
            rotate: 15,
            duration: 0.08,
            transformOrigin: "top center",
          })

          .to(bannerBellRef.current, {
            rotate: -12,
            duration: 0.08,
          })

          .to(bannerBellRef.current, {
            rotate: 8,
            duration: 0.08,
          })

          .to(bannerBellRef.current, {
            rotate: -4,
            duration: 0.08,
          })

          .to(bannerBellRef.current, {
            rotate: 0,
            duration: 0.1,
            ease: "power2.out",
          })

          .fromTo(
            pingDotRef.current,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.25,
              ease: "back.out(3)",
            },
            "-=0.1",
          );

        gsap.to(pingDotRef.current, {
          scale: 1.4,
          opacity: 0,
          duration: 1.2,
          ease: "power1.out",
          repeat: -1,
          delay: 2,
        });

        gsap.to(bannerBellRef.current, {
          rotate: 10,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
          repeatDelay: 3.5,
          delay: 5,
          transformOrigin: "top center",
        });
      }
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="px-4! py-20! sm:px-6! lg:px-8! lg:py-24!"
    >
      <div className="mx-auto! max-w-7xl!">
        <div className="mx-auto! max-w-2xl! text-center">
          <span
            ref={badgeRef}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600"
          >
            Stay Updated
          </span>

          <h2
            ref={headingRef}
            className="mt-3! text-3xl! font-bold tracking-tight text-gray-900 sm:text-4xl!"
          >
            Never miss an important update
          </h2>

          <p
            ref={descRef}
            className="mt-4! text-sm! leading-6! text-gray-500 sm:text-base!"
          >
            The notification system keeps users informed about important
            activities happening within their workspace, so everyone stays aware
            of changes, assignments, rewards, and important events.
          </p>
        </div>

        <div className="mt-12! grid gap-5! md:grid-cols-3!">
          {featuresData.map((feature) => (
            <NotificationFeature
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div
          ref={bannerRef}
          className="mt-8! rounded-2xl border border-indigo-100 bg-indigo-50 p-6!"
        >
          <div className="flex flex-col gap-5! sm:flex-row! sm:items-center!">
            <div
              ref={bannerIconWrapRef}
              className="relative flex h-12! w-12! shrink-0! items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm"
            >
              <Bell ref={bannerBellRef} size={21} />

              <span
                ref={pingDotRef}
                className="absolute -right-1! -top-1! h-3! w-3! rounded-full bg-red-500 ring-2 ring-white"
              />
            </div>

            <div ref={bannerTextRef}>
              <h3 className="text-sm font-bold text-gray-900">
                Smart read &amp; unread notifications
              </h3>

              <p className="mt-1! text-xs! leading-5! text-gray-500">
                Notifications maintain their read state. When users open their
                notification panel, unread notifications can be automatically
                marked as read, providing a clear distinction between new and
                already viewed updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notification;

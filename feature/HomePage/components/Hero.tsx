"use client";

import { useRef } from "react";
import { Bell, CheckCircle2, KanbanSquare, Sparkles } from "lucide-react";
import ShineButton from "@/components/ShineButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  getStartedHref: string;
};

const Hero = ({ getStartedHref }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.3,
      })
        .from(
          ".hero-heading-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".hero-cta > *",
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            stagger: 0.15,
          },
          "-=0.4",
        )
        .from(
          ".hero-feature-item",
          {
            x: -15,
            opacity: 0,
            duration: 0.35,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .from(
          ".hero-preview-card",
          {
            y: 50,
            opacity: 0,
            rotateX: 8,
            scale: 0.45,
            duration: 0.4,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .from(
          ".kanban-column",
          {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.12,
          },
          "-=0.5",
        )
        .from(
          ".hero-notification",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );

      const counters = gsap.utils.toArray<HTMLElement>(".stat-number");
      counters.forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay: 1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent =
              el.dataset.suffix === "%"
                ? `${Math.round(obj.val)}%`
                : `${Math.round(obj.val)}`;
          },
        });
      });

      gsap.to(".blob-1", {
        x: 20,
        y: 30,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.from(buttonRef.current, {
        yPercent: 500,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.4,
      });
      gsap.to(".blob-2", {
        x: -25,
        y: -20,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-notification", {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      gsap.to(".hero-badge-icon", {
        rotate: 15,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      gsap.to(".avatar-dot", {
        scale: 1.1,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        delay: 1.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4! py-20! sm:px-6! sm:py-24! lg:px-8! lg:py-32!"
    >
      <div className="blob-1 pointer-events-none absolute -left-32! -top-32! h-80! w-80! rounded-full bg-indigo-200/30 blur-3xl!" />

      <div className="blob-2 pointer-events-none absolute -bottom-32! -right-32! h-96! w-96! rounded-full bg-violet-200/30 blur-3xl!" />

      <div className="relative mx-auto! max-w-7xl!">
        <div className="grid items-center gap-14! lg:grid-cols-2! lg:gap-20!">
          <div>
            <div className="hero-badge mb-6! inline-flex items-center gap-2! rounded-full border border-indigo-100 bg-white/80 px-3! py-1.5! text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">
              <Sparkles size={14} className="hero-badge-icon" />
              Modern Task Management Workspace
            </div>

            <h1 className="max-w-3xl! text-4xl! font-bold tracking-tight text-gray-950 sm:text-5xl! lg:text-6xl!">
              <span className="hero-heading-line block">Manage tasks.</span>
              <span className="hero-heading-line block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Manage your team.
              </span>
              <span className="hero-heading-line block">Get things done.</span>
            </h1>
            <p className="hero-desc mt-6! max-w-2xl! text-base! leading-7! text-gray-600 sm:text-lg!">
              Kanban Workspace is a full-stack task management platform designed
              to help teams organize work, track progress, communicate
              efficiently, and stay motivated through rewards and leaderboards.
            </p>
            <div className=" overflow-hidden">
              <div
                ref={buttonRef}
                className=" mt-8! flex my-4! flex-col gap-3! sm:flex-row!"
              >
                <ShineButton href={getStartedHref}>Get Started</ShineButton>
                <ShineButton
                  variant="white"
                  href="#features"
                  className="bg-white!"
                >
                  Explore Feature
                </ShineButton>
              </div>
            </div>

            <div className="mt-8! flex flex-wrap items-center gap-x-6! gap-y-3! text-xs text-gray-500">
              <div className="hero-feature-item flex items-center gap-2!">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Role-based workspace
              </div>

              <div className="hero-feature-item flex items-center gap-2!">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Real-time notifications
              </div>

              <div className="hero-feature-item flex items-center gap-2!">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Kanban task management
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="hero-preview-card rounded-2xl border border-gray-200 bg-white p-3! shadow-2xl shadow-indigo-100">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4!">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2!">
                    <div className="flex h-9! w-9! items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <KanbanSquare size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900">
                        Kanban Workspace
                      </p>

                      <p className="text-[10px] text-gray-400">
                        Team Dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2!">
                    <div className="avatar-dot h-7! w-7! rounded-full bg-indigo-100" />
                    <div className="avatar-dot h-7! w-7! rounded-full bg-violet-100" />
                  </div>
                </div>

                <div className="mt-5! grid grid-cols-3! gap-3!">
                  <div className="rounded-xl border border-gray-100 bg-white p-3!">
                    <p className="text-[10px] text-gray-400">Tasks</p>
                    <p
                      className="stat-number mt-1! text-lg font-bold text-gray-900"
                      data-value="24"
                    >
                      0
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-3!">
                    <p className="text-[10px] text-gray-400">Progress</p>
                    <p
                      className="stat-number mt-1! text-lg font-bold text-indigo-600"
                      data-value="72"
                      data-suffix="%"
                    >
                      0%
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-3!">
                    <p className="text-[10px] text-gray-400">Completed</p>
                    <p
                      className="stat-number mt-1! text-lg font-bold text-emerald-600"
                      data-value="18"
                    >
                      0
                    </p>
                  </div>
                </div>

                <div className="mt-4! grid grid-cols-3! gap-3!">
                  {[
                    { title: "Todo", count: 4, color: "bg-gray-100" },
                    { title: "In Progress", count: 3, color: "bg-amber-50" },
                    { title: "Completed", count: 7, color: "bg-emerald-50" },
                  ].map((column) => (
                    <div
                      key={column.title}
                      className={`kanban-column ${column.color} rounded-xl p-3!`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-600">
                          {column.title}
                        </span>

                        <span className="text-[10px] font-bold text-gray-400">
                          {column.count}
                        </span>
                      </div>

                      <div className="mt-3! space-y-2!">
                        <div className="h-14! rounded-lg bg-white shadow-sm" />
                        <div className="h-10! rounded-lg bg-white shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-notification absolute -bottom-5! -left-5! hidden items-center gap-3! rounded-xl border border-gray-100 bg-white p-3! shadow-xl sm:flex">
              <div className="flex h-9! w-9! items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Bell size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-900">
                  New notification
                </p>

                <p className="text-[10px] text-gray-400">
                  Task assigned to you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

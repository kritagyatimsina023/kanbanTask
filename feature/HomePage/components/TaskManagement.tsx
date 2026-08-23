"use client";

import React, { useCallback, useRef } from "react";
import {
  ClipboardList,
  Eye,
  KanbanSquare,
  MessageSquare,
  Zap,
} from "lucide-react";
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

function KanbanColumn({
  title,
  count,
  tasks,
  colRef,
  taskRef,
  barRef,
}: {
  title: string;
  count: string;
  tasks: string[];
  colRef: (el: HTMLDivElement | null) => void;
  taskRef: (el: HTMLDivElement | null) => void;
  barRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={colRef} className="rounded-xl bg-gray-50 p-3!">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-700">{title}</span>

        <span className="rounded-full bg-white px-2! py-0.5! text-[10px] font-semibold text-gray-400">
          {count}
        </span>
      </div>

      <div className="mt-3! space-y-2!">
        {tasks.map((task) => (
          <div
            key={task}
            ref={taskRef}
            className="rounded-lg border border-gray-100 bg-white p-3! shadow-sm"
          >
            <p className="text-[11px] font-medium text-gray-700">{task}</p>

            <div className="mt-2! h-1! w-1/2! rounded-full bg-indigo-100">
              <div
                ref={barRef}
                className="h-full! w-2/3! origin-left rounded-full bg-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const infoRowsData = [
  {
    icon: ClipboardList,
    title: "Task Assignment",
    description:
      "Administrators can create tasks and assign them to specific members.",
  },
  {
    icon: Zap,
    title: "Draggable Workflow",
    description: "Move tasks between Todo, In Progress, and Completed states.",
  },
  {
    icon: Eye,
    title: "Task Visibility",
    description:
      "Members can easily see their assigned tasks, deadlines, descriptions, and current status.",
  },
  {
    icon: MessageSquare,
    title: "Task Communication",
    description:
      "Members can communicate with administrators regarding individual tasks.",
  },
];

const columnsData = [
  {
    title: "Todo",
    count: "4",
    tasks: ["Create dashboard", "Update navigation"],
  },
  {
    title: "In Progress",
    count: "3",
    tasks: ["Authentication", "Task service"],
  },
  {
    title: "Completed",
    count: "7",
    tasks: ["Database setup", "User system"],
  },
];

const TaskManagement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const boardHeaderRef = useRef<HTMLDivElement>(null);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const taskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addRowRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  }, []);

  const addIconRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !iconRefs.current.includes(el)) {
      iconRefs.current.push(el);
    }
  }, []);

  const addColRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !colRefs.current.includes(el)) {
      colRefs.current.push(el);
    }
  }, []);

  const addTaskRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !taskRefs.current.includes(el)) {
      taskRefs.current.push(el);
    }
  }, []);

  const addBarRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !barRefs.current.includes(el)) {
      barRefs.current.push(el);
    }
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

      tl.from(badgeRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.15,
      })
        .from(
          headingRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.25,
          },
          "-=0.2",
        )
        .from(
          descRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.25",
        )
        .from(
          rowRefs.current,
          {
            x: -30,
            opacity: 0,
            duration: 0.35,
            stagger: 0.07,
          },
          "-=0.2",
        )
        .from(
          iconRefs.current,
          {
            scale: 0,
            rotate: -45,
            duration: 0.3,
            ease: "back.out(2)",
            stagger: 0.07,
          },
          "<",
        )
        .from(
          boardRef.current,
          {
            x: 80,
            opacity: 0,
            scale: 0.95,
            rotate: 3,
            duration: 0.55,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .from(
          boardHeaderRef.current,
          {
            y: -10,
            opacity: 0,
            duration: 0.3,
          },
          "-=0.25",
        )
        .from(
          colRefs.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.35,
            stagger: 0.07,
          },
          "-=0.15",
        )
        .from(
          taskRefs.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.3,
            stagger: 0.04,
          },
          "-=0.2",
        )
        .from(
          barRefs.current,
          {
            scaleX: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.15",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="px-4! py-20! sm:px-6! lg:px-8! lg:py-24!"
    >
      <div className="mx-auto! max-w-7xl!">
        <div className="grid items-center gap-12! lg:grid-cols-2! lg:gap-20!">
          <div>
            <span
              ref={badgeRef}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600"
            >
              Task Management
            </span>

            <h2
              ref={headingRef}
              className="mt-3! text-3xl! font-bold tracking-tight text-gray-900 sm:text-4xl!"
            >
              Turn tasks into visible progress
            </h2>

            <p
              ref={descRef}
              className="mt-5! text-sm! leading-7! text-gray-500 sm:text-base!"
            >
              Organize your entire workflow through an intuitive Kanban board.
              Tasks can move through different stages as work progresses, giving
              both administrators and members a clear picture of what needs to
              be done.
            </p>

            <div className="mt-8! space-y-5!">
              {infoRowsData.map((row) => (
                <InfoRow
                  key={row.title}
                  icon={row.icon}
                  title={row.title}
                  description={row.description}
                  rowRef={addRowRef}
                  iconRef={addIconRef}
                />
              ))}
            </div>
          </div>

          <div
            ref={boardRef}
            className="rounded-2xl border border-gray-200 bg-white p-5! shadow-xl shadow-gray-100"
          >
            <div
              ref={boardHeaderRef}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">Task Board</p>

                <p className="mt-1! text-xs text-gray-400">
                  Manage your workflow
                </p>
              </div>

              <KanbanSquare size={20} className="text-indigo-600" />
            </div>

            <div className="mt-6! grid gap-4! md:grid-cols-3!">
              {columnsData.map((col) => (
                <KanbanColumn
                  key={col.title}
                  title={col.title}
                  count={col.count}
                  tasks={col.tasks}
                  colRef={addColRef}
                  taskRef={addTaskRef}
                  barRef={addBarRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskManagement;

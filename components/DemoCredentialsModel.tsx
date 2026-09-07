"use client";

import { Check, Copy, KeyRound, ShieldCheck, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const credentials = [
  {
    role: "Admin",
    label: "Administrator",
    email: "admin@example.com",
    password: "admin123",
    icon: ShieldCheck,
  },
  {
    role: "Member",
    label: "Member",
    email: "member1@example.com",
    password: "member123",
    icon: UserRound,
  },
] as const;

export default function DemoCredentialsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(true);

  const [activeRole, setActiveRole] =
    useState<(typeof credentials)[number]["role"]>("Admin");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const active = credentials.find((c) => c.role === activeRole)!;
  const ActiveIcon = active.icon;

  const copyToClipboard = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);

    setCopiedKey(key);

    setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1400);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4! backdrop-blur-sm transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;

          if (!open) {
            setMounted(false);
          }
        }}
        className={`pass-card relative w-full max-w-sm overflow-hidden rounded-[1.4rem] bg-white shadow-[0_30px_80px_-20px_rgba(30,27,75,0.55)] ${
          open ? "pass-enter" : "pass-exit"
        }`}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-blue-700 px-6! pb-8! pt-6!">
          <div className="pass-dots pointer-events-none absolute inset-0 opacity-25" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo credentials"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X size={16} />
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/25">
              <KeyRound size={20} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-200">
                Demo Access Pass
              </p>

              <h2 className="text-lg font-bold leading-tight text-white">
                Explore the workspace
              </h2>
            </div>
          </div>
        </div>

        <div className="relative h-0">
          <div className="pass-notch pass-notch-left" />
          <div className="pass-notch pass-notch-right" />
          <div className="pass-perforation" />
        </div>

        <div className="px-6! pt-6!">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1!">
            {credentials.map((c) => {
              const Icon = c.icon;
              const isActive = c.role === activeRole;

              return (
                <button
                  key={c.role}
                  type="button"
                  onClick={() => setActiveRole(c.role)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2! text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={14} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6! py-5!">
          <div className="flex items-center gap-2 pb-4!">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <ActiveIcon size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {active.label} account
              </p>

              <p className="text-[11px] text-gray-400">
                Signed in with full {active.role.toLowerCase()} permissions
              </p>
            </div>
          </div>

          <FieldRow
            label="Email"
            value={active.email}
            copied={copiedKey === `${active.role}-email`}
            onCopy={() => copyToClipboard(active.email, `${active.role}-email`)}
          />

          <div className="h-2.5!" />

          <FieldRow
            label="Password"
            value={active.password}
            copied={copiedKey === `${active.role}-password`}
            onCopy={() =>
              copyToClipboard(active.password, `${active.role}-password`)
            }
          />
        </div>

        <div className="border-t border-gray-100 bg-gray-50/70 px-6! py-4!">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-4! py-2.75! text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-600 active:scale-[0.98]"
          >
            Continue to login
          </button>

          <p className="mt-2.5! text-center text-[10px] text-gray-400">
            For demo purposes only — no real data is affected.
          </p>
        </div>
      </div>

      <style jsx>{`
        .pass-dots {
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.55) 1px,
            transparent 1px
          );
          background-size: 14px 14px;
        }

        .pass-perforation {
          position: absolute;
          left: 1.5rem;
          right: 1.5rem;
          top: -1px;
          border-top: 2px dashed rgba(99, 102, 241, 0.25);
        }

        .pass-notch {
          position: absolute;
          top: -12px;
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: rgb(15 23 42 / 0.6);
        }

        .pass-notch-left {
          left: -12px;
        }

        .pass-notch-right {
          right: -12px;
        }

        .pass-card {
          transform-origin: top center;
        }

        .pass-enter {
          animation: pass-drop 0.62s cubic-bezier(0.2, 1.1, 0.3, 1) both;
        }

        .pass-exit {
          animation: pass-lift 0.32s cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes pass-drop {
          0% {
            opacity: 0;
            transform: translateY(-46vh) scale(0.82) rotate(-4deg);
          }

          55% {
            opacity: 1;
            transform: translateY(1.2vh) scale(1.015) rotate(0.6deg);
          }

          78% {
            transform: translateY(-0.5vh) scale(0.995) rotate(-0.2deg);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        @keyframes pass-lift {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-18vh) scale(0.9);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pass-enter,
          .pass-exit {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function FieldRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <label className="mb-1! block text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </label>

      <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3! py-2.25!">
        <code className="text-sm text-gray-800">{value}</code>

        <button
          type="button"
          onClick={onCopy}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
            copied
              ? "bg-emerald-100 text-emerald-600"
              : "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

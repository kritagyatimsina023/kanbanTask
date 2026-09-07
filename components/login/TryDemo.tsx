"use client";
import { KeyRound, Sparkles } from "lucide-react";
export default function TryDemo({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="try-demo-btn">
      <span className="try-demo-glow" aria-hidden="true" />
      <span className="try-demo-shine" aria-hidden="true" />
      <span className="try-demo-content">
        <KeyRound size={14} className="try-demo-key" />
        Try Demo Credentials
        <Sparkles size={12} className="try-demo-spark" />
      </span>
      <style jsx>{`
        .try-demo-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 0.6rem;
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          box-shadow: 0 10px 28px -8px rgba(79, 70, 229, 0.55);
          transform: skewX(-8deg);
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          animation: demo-drop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease;
        }

        .try-demo-btn:hover {
          transform: skewX(-3deg) translateY(-2px) scale(1.04);
          box-shadow: 0 16px 36px -8px rgba(79, 70, 229, 0.65);
        }

        .try-demo-btn:active {
          transform: skewX(-3deg) translateY(0) scale(0.97);
        }

        .try-demo-btn:focus-visible {
          outline: 2px solid #c7d2fe;
          outline-offset: 3px;
        }

        .try-demo-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transform: skewX(8deg);
        }

        .try-demo-glow {
          position: absolute;
          inset: -8px;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          filter: blur(12px);
          opacity: 0.4;
          animation: demo-pulse 2.4s ease-in-out infinite;
        }

        .try-demo-shine {
          position: absolute;
          top: 0;
          left: -60%;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          animation: demo-shine 3.4s ease-in-out infinite;
          animation-delay: 1.1s;
        }

        .try-demo-key {
          animation: demo-jiggle 2.8s ease-in-out infinite;
        }

        .try-demo-spark {
          animation: demo-twinkle 1.8s ease-in-out infinite;
        }

        @keyframes demo-drop {
          0% {
            opacity: 0;
            transform: skewX(-8deg) translateY(-18px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: skewX(-8deg) translateY(3px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: skewX(-8deg) translateY(0) scale(1);
          }
        }

        @keyframes demo-shine {
          0% {
            left: -60%;
          }
          22% {
            left: 130%;
          }
          100% {
            left: 130%;
          }
        }

        @keyframes demo-pulse {
          0%,
          100% {
            opacity: 0.32;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        @keyframes demo-jiggle {
          0%,
          92%,
          100% {
            transform: rotate(0deg);
          }
          94% {
            transform: rotate(-12deg);
          }
          96% {
            transform: rotate(8deg);
          }
          98% {
            transform: rotate(-4deg);
          }
        }

        @keyframes demo-twinkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .try-demo-btn,
          .try-demo-shine,
          .try-demo-glow,
          .try-demo-key,
          .try-demo-spark {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </button>
  );
}

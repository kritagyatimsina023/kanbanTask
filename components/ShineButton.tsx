import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type ShineButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  showArrow?: boolean;
  variant?: "blue" | "white";
};

const ShineButton = ({
  children,
  href = "#",
  external = false,
  className = "",
  showArrow = true,
  variant = "blue",
}: ShineButtonProps) => {
  const isWhite = variant === "white";

  const content = (
    <>
      {/* Ambient Glow — z-0, sits above bg but below text, no negative z-index */}
      <span
        className={`absolute inset-0! z-0! rounded-xl blur-xl animate-pulse ${
          isWhite ? "bg-white/40" : "bg-blue-500/40"
        }`}
      />

      {/* Shine */}
      <span className="pointer-events-none absolute -inset-y-10! left-[-2%]! z-0! w-1/2! rotate-12!">
        <span
          className={`block h-full w-full bg-linear-to-r from-transparent to-transparent animate-[shine_2.5s_ease-in-out_infinite] ${
            isWhite ? "via-blue-500/20" : "via-white/40"
          }`}
        />
      </span>

      {/* Text */}
      <span className="relative z-10!">{children}</span>

      {/* Arrow */}
      {showArrow && (
        <ArrowRight
          size={17}
          className={`relative z-10! transition-transform duration-300 group-hover:translate-x-1.5 ${
            isWhite ? "text-blue-600" : "text-white"
          }`}
        />
      )}
    </>
  );

  const classNames = `
    group relative isolate inline-flex items-center justify-center gap-2!
    overflow-hidden rounded-xl
    px-6! py-3!
    text-sm font-semibold
    transition-all duration-300
    hover:scale-[1.03]
    active:scale-[0.98]
    ${
      isWhite
        ? "bg-white text-blue-600 shadow-lg shadow-blue-900/10 hover:bg-blue-50 hover:shadow-xl"
        : "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
    }
    ${className}
  `;

  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" className={classNames}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
};

export default ShineButton;

// export default ShineButton;

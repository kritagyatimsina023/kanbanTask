type TooltipProps = {
  text: string;
  children: React.ReactNode;
  blurDesign?: boolean;
  side?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({
  text,
  children,
  blurDesign = false,
  side = "top",
}: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 mb-2! -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2! -translate-x-1/2",
    left: "right-full top-1/2 mr-2! -translate-y-1/2",
    right: "left-full top-1/2 ml-2! -translate-y-1/2",
  };

  return (
    <div className="group relative inline-flex">
      {children}
      <div
        role="tooltip"
        className={`pointer-events-none absolute z-[9999]
          ${positionClasses[side]}
          whitespace-nowrap rounded-lg
          border border-gray-700
          bg-gray-900/90
          px-2.5! py-1.5!
          text-[11px] font-medium text-white
          opacity-0 shadow-lg
          transition-all duration-150
          group-hover:opacity-100
 ${blurDesign ? "bg-white/30 text-black! backdrop-blur-xl border-none" : "bg-gray-900"}
          ${side === "top" ? "translate-y-1 group-hover:translate-y-0!" : ""}
          ${side === "bottom" ? "-translate-y-1 group-hover:translate-y-0!" : ""}
          ${side === "left" ? "translate-x-1 group-hover:translate-x-0!" : ""}
          ${side === "right" ? "-translate-x-1 group-hover:translate-x-0!" : ""}
        `}
      >
        {text}
      </div>
    </div>
  );
}

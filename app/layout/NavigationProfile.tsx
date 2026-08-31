"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "@/components/Tooltip";

type Props = {
  roleLink: string;
  email: string;
  role: string;
};

const NavigationProfile = ({ roleLink, email, role }: Props) => {
  const pathname = usePathname();

  const showTooltip = pathname === "/";

  const content = (
    <div className="hidden cursor-pointer flex-col justify-center sm:flex">
      <span className="max-w-[120px] truncate text-xs font-semibold text-gray-700">
        {email.split("@")[0]}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
        {role}
      </span>
    </div>
  );

  return (
    <Link href={roleLink}>
      {showTooltip ? (
        <Tooltip text="Navigate to dashboard" side="bottom">
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </Link>
  );
};

export default NavigationProfile;

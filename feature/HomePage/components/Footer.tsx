import { KanbanSquare } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 px-4! py-8! sm:px-6! lg:px-8!">
      <div className="mx-auto! flex max-w-7xl! flex-col items-center justify-between gap-4! sm:flex-row!">
        <div className="flex items-center gap-2!">
          <div className="flex h-8! w-8! items-center justify-center rounded-lg bg-indigo-600 text-white">
            <KanbanSquare size={16} />
          </div>

          <span className="text-sm font-bold text-gray-900">
            Kanban Workspace
          </span>
        </div>

        <p className="text-xs text-gray-400">Task management made simple.</p>
      </div>
    </footer>
  );
};

export default Footer;

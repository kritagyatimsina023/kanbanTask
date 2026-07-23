import { getSession } from "@/lib/auth";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";

import { logoutAction } from "../app/actions/auth";

const Nav = async () => {
  const session = await getSession();
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <LayoutDashboard size={24} />
          Kanban Board
        </Link>
        <div className="navbar-actions">
          {session ? (
            <>
              <div
                className="user-info"
                style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}
              >
                {session.email}{" "}
                <strong style={{ color: "var(--primary)", marginLeft: "4px" }}>
                  ({session.role})
                </strong>
              </div>
              <form action={logoutAction}>
                <button type="submit" className="btn btn-danger">
                  <LogOut size={16} />
                  Logout
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

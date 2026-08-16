import {
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4! py-10!">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="mb-6! inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3! py-1.5! text-sm font-medium text-indigo-600 shadow-sm">
            <CheckCircle2 size={16} />
            Smart Task Management
          </div>
          <h1 className="max-w-xl! text-4xl font-bold leading-tight tracking-tight text-gray-900">
            Manage tasks.
            <span className="block bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Track progress. Get rewarded.
            </span>
          </h1>

          <p className="mt-5! max-w-lg text-base leading-7 text-gray-600">
            A collaborative Kanban workspace designed to help teams organize
            tasks, track performance, and recognize members for their
            contributions.
          </p>

          <div className="mt-8! grid max-w-lg gap-3!">
            <Feature
              icon={<BarChart3 size={18} />}
              title="Dashboard & Summary"
              description="Track total users, active tasks, completed tasks and workspace activity."
            />

            <Feature
              icon={<ShieldCheck size={18} />}
              title="User Management"
              description="Admins can ban members with a reason and unban them when needed."
            />

            <Feature
              icon={<Trophy size={18} />}
              title="Leaderboard & Rewards"
              description="Members climb the leaderboard by completing tasks and can earn rewards."
            />

            <Feature
              icon={<Users size={18} />}
              title="Team Collaboration"
              description="Assign tasks, monitor progress, and keep everyone aligned."
            />
          </div>
        </div>
        <div className="w-full max-w-[420px] justify-self-center">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-8! shadow-[0_20px_60px_rgba(79,70,229,0.12)] backdrop-blur-sm">
            <div className="mb-7! text-center">
              <div className="mx-auto mb-4! flex h-12! w-12! items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200">
                <CheckCircle2 size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

              <p className="mt-2! text-sm text-gray-500">
                Sign in to access your workspace and tasks.
              </p>
            </div>
            <LoginForm />

            <div className="mt-7! border-t border-gray-100 pt-5!">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={14} />
                Secure workspace access
              </div>

              <div className="mt-3! flex justify-center gap-2 text-[11px] text-gray-400">
                <span>Tasks</span>
                <span>•</span>
                <span>Leaderboard</span>
                <span>•</span>
                <span>Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4 rounded-xl border border-gray-100 bg-white/70 p-4! transition-all hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-white hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        <p className="mt-1! text-xs leading-5 text-gray-500">{description}</p>
      </div>
    </div>
  );
}

import { LayoutDashboard, ShieldCheck, Users, Zap } from "lucide-react";
import React from "react";
function DarkFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4!">
      <Icon size={18} className="text-indigo-400" />

      <h3 className="mt-3! text-sm font-semibold">{title}</h3>

      <p className="mt-1! text-[11px]! leading-5! text-gray-400">
        {description}
      </p>
    </div>
  );
}

const Security = () => {
  return (
    <section className="px-4! py-20! sm:px-6! lg:px-8! lg:py-24!">
      <div className="mx-auto! max-w-7xl!">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-950 to-gray-900 px-6! py-12! text-white sm:px-10! lg:px-16! lg:py-16!">
          <div className="grid gap-10! lg:grid-cols-2! lg:items-center!">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Built for teams
              </span>

              <h2 className="mt-3! text-3xl! font-bold tracking-tight sm:text-4xl!">
                One application.
                <span className="block text-indigo-400">
                  Different experiences.
                </span>
              </h2>

              <p className="mt-5! max-w-xl! text-sm! leading-7! text-gray-400 sm:text-base!">
                Role-based architecture ensures that administrators and members
                get the tools they actually need without unnecessary complexity
                in their workspace.
              </p>
            </div>

            <div className="grid gap-4! sm:grid-cols-2!">
              <DarkFeature
                icon={ShieldCheck}
                title="Role Based Access"
                description="Separate admin and member experiences."
              />

              <DarkFeature
                icon={LayoutDashboard}
                title="Dedicated Dashboards"
                description="Relevant information for each role."
              />

              <DarkFeature
                icon={Users}
                title="Team Collaboration"
                description="Manage assignments and progress."
              />

              <DarkFeature
                icon={Zap}
                title="Centralized Workflow"
                description="Everything managed from one workspace."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;

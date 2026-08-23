import { CheckCircle2 } from "lucide-react";

export default function RoleCard({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6! shadow-sm sm:p-8!">
      <div className="flex h-12! w-12! items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={22} />
      </div>

      <h3 className="mt-6! text-xl! font-bold text-gray-900">{title}</h3>

      <p className="mt-3! text-sm! leading-6! text-gray-500">{description}</p>

      <div className="mt-6! space-y-3!">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3!">
            <CheckCircle2 size={15} className="shrink-0! text-emerald-500" />

            <span className="text-xs font-medium text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

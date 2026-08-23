export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5! shadow-sm transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50">
      <div className="flex h-10! w-10! items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={19} />
      </div>

      <h3 className="mt-5! text-sm font-bold text-gray-900">{title}</h3>

      <p className="mt-2! text-xs! leading-5! text-gray-500">{description}</p>
    </div>
  );
}

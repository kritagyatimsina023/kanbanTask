"use client";

import { CheckCircle2, Circle, ListTodo, LoaderCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const statusColors = ["#94a3b8", "#6366f1", "#22c55e"];

type Props = {
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
};

export default function MemberTaskOverview({ stats }: Props) {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const chartData = [
    {
      name: "Todo",
      tasks: stats.todo,
    },
    {
      name: "In Progress",
      tasks: stats.inProgress,
    },
    {
      name: "Completed",
      tasks: stats.completed,
    },
  ];

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
    },
    {
      title: "Todo",
      value: stats.todo,
      icon: Circle,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: LoaderCircle,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
    },
  ];
  const statusData = [
    {
      name: "Todo",
      value: stats.todo,
    },
    {
      name: "In Progress",
      value: stats.inProgress,
    },
    {
      name: "Completed",
      value: stats.completed,
    },
  ];
  return (
    <section className="space-y-9!">
      <div className="grid grid-cols-1 gap-4! sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                  <Icon size={18} className="text-indigo-600" />
                </div>
              </div>

              <p className="mt-4! text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Donut */}
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Task Status
            </h3>
            <p className="mt-1! text-xs text-gray-500">
              Distribution of your current tasks
            </p>
          </div>
          <div className="mt-4! grid grid-cols-1 items-center sm:grid-cols-2">
            <div className="relative h-[220px]!">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={88}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {completionRate}%
                </span>

                <span className="text-xs text-gray-500">Completed</span>
              </div>
            </div>

            <div className="space-y-4!">
              {statusData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5! w-2.5! rounded-full"
                      style={{
                        backgroundColor: statusColors[index],
                      }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5! shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Task Progress
            </h3>

            <p className="mt-1! text-xs text-gray-500">
              Compare tasks across each status
            </p>
          </div>
          <div className="mt-6! h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6b7280",
                    fontSize: 12,
                  }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6b7280",
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar
                  dataKey="tasks"
                  radius={[6, 6, 0, 0]}
                  fill="#6366f1"
                  maxBarSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

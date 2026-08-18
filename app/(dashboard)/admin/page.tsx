import DashboardHomePage from "@/feature/admin/dashboard/components/DashboardHomePage";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  if (!session) return null;
  return <DashboardHomePage />;
}

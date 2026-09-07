import { requireAuth } from "@/lib/auth";
import { taskService } from "@/feature/member/task.service";
import { parseTaskSearchParam } from "@/feature/admin/tasks/task.utils";
import MyTaskHome from "./MyTaskHome";
type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};

export default async function MyTaskTableDataPage({ searchParams }: Props) {
  const params = await searchParams;
  const session = await requireAuth();
  const query = parseTaskSearchParam(params);
  const tasks = await taskService.getMyTasks(session.id, query);
  return <MyTaskHome taskData={tasks} />;
}

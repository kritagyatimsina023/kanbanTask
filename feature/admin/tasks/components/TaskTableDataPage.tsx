// import { taskService } from "../tasks.service";
import { taskService } from "@/feature/member/task.service";
import TaskTable from "./TaskTable";
import { isValidTaskFilter } from "@/constants/taskFilters.constants";

type TaskTableDataPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};

const TaskTableDataPage = async ({ searchParams }: TaskTableDataPageProps) => {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const search = params.search || undefined;
  const filter = isValidTaskFilter(params.filter) ? params.filter : undefined;
  const tasks = await taskService.getAllTasks({ page, search, filter });

  return <TaskTable data={tasks} />;
};

export default TaskTableDataPage;

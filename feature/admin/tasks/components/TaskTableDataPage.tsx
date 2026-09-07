import { taskService } from "@/feature/member/task.service";
import TaskTable from "./TaskTable";
import { parseTaskSearchParam } from "../task.utils";

type TaskTableDataPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};

const TaskTableDataPage = async ({ searchParams }: TaskTableDataPageProps) => {
  const params = await searchParams;
  const query = parseTaskSearchParam(params);
  const tasks = await taskService.getAllTasks(query);

  return <TaskTable data={tasks} />;
};
export default TaskTableDataPage;

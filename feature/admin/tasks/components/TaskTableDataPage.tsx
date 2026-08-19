// import { taskService } from "../tasks.service";
import { taskService } from "@/feature/member/task.service";
import TaskTable from "./TaskTable";

type TaskTableDataPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const TaskTableDataPage = async ({ searchParams }: TaskTableDataPageProps) => {
  const params = await searchParams;
  console.log(params, "is params"); // {page:1}
  const page = Math.max(1, Number(params.page) || 1);
  const tasks = await taskService.getAllTasks(page);

  return <TaskTable data={tasks} />;
};

export default TaskTableDataPage;

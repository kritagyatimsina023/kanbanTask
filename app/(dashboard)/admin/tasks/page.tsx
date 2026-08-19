import TaskMainPage from "@/feature/admin/tasks/components/TaskMainPage";
type TaskHomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const TaskHome = async ({ searchParams }: TaskHomeProps) => {
  return <TaskMainPage searchParams={searchParams} />;
};

export default TaskHome;

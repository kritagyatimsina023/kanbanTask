import TaskMainPage from "@/feature/admin/tasks/components/TaskMainPage";
type TaskHomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const TaskHome = ({ searchParams }: TaskHomeProps) => {
  return <TaskMainPage searchParams={searchParams} />;
};

export default TaskHome;

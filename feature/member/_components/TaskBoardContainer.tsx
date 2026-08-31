import TaskBoardContent from "./TaskBoardContent";
import { CurrentUser } from "@/app/types/auth";
import { TaskWithAssignee } from "@/app/types/task.types";
import { Member } from "@/app/types/member.types";
import { taskService } from "../task.service";

type Props = {
  currentUser: CurrentUser;
  view: "mine" | "all";
};
export default async function TaskBoardContainer({ currentUser, view }: Props) {
  const { tasks, members } = await taskService.getTasks(view, currentUser.id);
  return (
    <TaskBoardContent
      initialTasks={tasks as unknown as TaskWithAssignee[]}
      members={members as unknown as Member[]}
      currentUser={currentUser}
    />
  );
}

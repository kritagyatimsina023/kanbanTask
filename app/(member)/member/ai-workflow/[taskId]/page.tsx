import { taskService } from "@/feature/member/task.service";
import { requireAuth } from "@/lib/auth";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    taskId: string;
  }>;
};

const mockWorkflow = {
  title: "Build Task Messaging System",
  summary:
    "Implement a task-specific communication system that allows members and administrators to exchange messages and receive notifications.",

  steps: [
    {
      id: 1,
      title: "Analyze Requirements",
      description:
        "Review the task requirements and identify the users, permissions, message flow, and notification requirements.",
      outcome:
        "A clear understanding of the messaging and notification requirements.",
    },
    {
      id: 2,
      title: "Design Database Structure",
      description:
        "Create the required database models and relationships for task-specific messages.",
      outcome: "A database structure that supports task-based conversations.",
    },
    {
      id: 3,
      title: "Implement Messaging API",
      description:
        "Create server actions or API endpoints for sending, retrieving, and replying to task-specific messages.",
      outcome:
        "Members and administrators can exchange messages for a specific task.",
    },
    {
      id: 4,
      title: "Integrate Notifications",
      description: "Connect messaging with the existing notification system.",
      outcome: "Users receive notifications for new task-related messages.",
    },
    {
      id: 5,
      title: "Implement Read and Unread Tracking",
      description:
        "Track message read status and calculate unread message counts.",
      outcome: "The UI can display accurate unread message counts.",
    },
  ],
};

const AIWorkflowTaskPage = async ({ params }: Props) => {
  const { taskId } = await params;
  const session = await requireAuth();

  const task = await taskService.getTaskForAI(session.id, taskId);

  if (!task) {
    return <div>Task not found.</div>;
  }
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const workflow = mockWorkflow;

  return (
    <div className="space-y-6!">
      <Link
        href={"/member/ai-workflow"}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
      >
        <MoveLeftIcon className="h-4 w-4" />
        <span>Back to task list</span>
      </Link>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          AI Workflow
        </p>

        <h1 className="mt-1! text-2xl font-bold text-gray-900">{task.title}</h1>

        <p className="mt-2! text-sm text-gray-500">
          {task.description ?? "No description"}
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6!">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {workflow.title}
          </h2>

          <p className="mt-1! text-sm text-gray-500">{workflow.summary}</p>
        </div>

        {/* Steps */}
        <div className="mt-6! space-y-4!">
          {workflow.steps.map((step) => (
            <div
              key={step.id}
              className="rounded-lg border border-gray-200 p-4!"
            >
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                  {step.id}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-1! text-sm text-gray-600">
                    {step.description}
                  </p>

                  <div className="mt-3! rounded-md bg-gray-50 p-3!">
                    <p className="text-xs font-medium text-gray-700">
                      Expected outcome
                    </p>

                    <p className="mt-1! text-xs text-gray-500">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIWorkflowTaskPage;

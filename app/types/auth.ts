export interface LoginState {
  error: string | null;
}

export interface CreateTaskState {
  error: string | null;
  success: boolean;
  fieldErrors?: {
    title?: string[];
    description?: string[];
    assigneeId?: string[];
  };
}
export type CurrentUser = {
  id: string;
  role: "ADMIN" | "MEMBER";
};

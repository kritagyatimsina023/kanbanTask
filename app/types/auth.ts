export interface LoginState {
  error: string | null;
}

export interface CreateTaskState {
  error: string | null;
  success: boolean;
}
export type CurrentUser = {
  id: string;
  role: "ADMIN" | "MEMBER";
};

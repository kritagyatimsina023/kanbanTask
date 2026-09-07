import { Role } from "@/generated/prisma/enums";

export interface LoginState {
  error: string | null;
  success: boolean;
}
// export interface CreateTaskState {
//   error: string | null;
//   success: boolean;
//   fieldErrors?: {
//     title?: string[];
//     description?: string[];
//     assigneeId?: string[];
//     deadline?: string[];
//   };
// }
export type CurrentUser = {
  id: string;
  role: Role;
};

import { requireAuth } from "@/lib/auth";
import { getUsersWithStats } from "../user.action";
import UsersTable from "./UsersTable";

export default async function UserPage() {
  await requireAuth();

  const users = await getUsersWithStats();

  return (
    <div>
      <div className="mb-8!">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>

        <p className="mt-2! text-sm text-gray-600">
          Manage users, monitor their tasks, and control account access.
        </p>
      </div>
      <UsersTable users={users} />
    </div>
  );
}

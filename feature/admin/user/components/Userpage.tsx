import { Suspense } from "react";
import UserTableDataPage from "./UserTableDataPage";
import UsersTableSkeleton from "./UserTableSkeleton";

export default async function UserPage() {
  return (
    <div>
      <div className="mb-8!">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>

        <p className="mt-2! text-sm text-gray-600">
          Manage users, monitor their tasks, and control account access.
        </p>
      </div>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UserTableDataPage />
      </Suspense>
    </div>
  );
}

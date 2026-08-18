import { requireAuth } from "@/lib/auth";
// import React from "react";
// import { getUsersWithStats } from "../user.action";
import UsersTable from "./UsersTable";
import { usersServices } from "../user.service";
// import { delay } from "@/lib/delay";

const UserTableDataPage = async () => {
  //   await delay(5000);
  await requireAuth();
  // const users = await getUsersWithStats();
  const users = await usersServices.getUserWithStats();
  return (
    <>
      <UsersTable users={users} />
    </>
  );
};

export default UserTableDataPage;

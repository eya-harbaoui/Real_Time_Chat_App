import React from "react";
import Conversation from "./Conversation";
const users = [
  {
    id: 1,
    fullName: "John Doe",
    username: "john",
    avatar: `https://avatar.iran.liara.run/public/boy?username=john`,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "jane",
    avatar: `https://avatar.iran.liara.run/public/girl?username=jane`,
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    username: "alice123",
    avatar: `https://avatar.iran.liara.run/public/girl?username=alice123`,
  },
  {
    id: 4,
    fullName: "Bob Brown",
    username: "bobbyB",
    avatar: `https://avatar.iran.liara.run/public/boy?username=bobbyB`,
  },
];

export const UsersList = () => {
  return (
    <div className="card-body items-start bg-base-100 shadow-2xl rounded-xl space-y-4 w-full">
      <h2 className="text-xl font-bold">Users List</h2>
      <div className="flex flex-col w-full">
        {users.map((user) => {
          return (
            <div>
              <Conversation user={user} />
              <div className="divider my-0 py-0"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

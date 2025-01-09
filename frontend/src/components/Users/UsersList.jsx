import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
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
  const { loading, conversations } = useGetConversation();
  console.log("conversations", conversations);
  return (
    <div className="card-body items-start bg-base-100 shadow-xl rounded-xl space-y-4 w-full overflow-auto scrollbar-thin scrollbar-thumb-[#c0bdbdac] scrollbar-track-gray-200">
      <h2 className="text-xl font-bold">Users List</h2>
      <div className="flex flex-col w-full">
        {conversations.map((conversation) => {
          return (
            <div key={conversation._id}>
              <Conversation conversation={conversation} />
              <div className="divider my-0 py-0"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

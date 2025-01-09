import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

export const UsersList = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversations", conversations);
  return (
    <div className="card-body items-start bg-base-100 shadow-xl rounded-xl w-full overflow-auto scrollbar-thin scrollbar-thumb-[#c0bdbdac] scrollbar-track-gray-200">
      <h2 className="text-xl font-bold">Users List</h2>
      <div className="flex flex-col w-full">
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : (
          <></>
        )}

        {conversations.map((conversation, idx) => {
          return (
            <div key={conversation._id}>
              <Conversation
                conversation={conversation}
                lastIdx={idx === conversations?.length - 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

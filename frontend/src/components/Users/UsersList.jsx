import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

export const UsersList = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversations", conversations);

  return (
    <div className="card-body items-start bg-base-100 shadow-xl rounded-xl w-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#c0bdbdac] scrollbar-track-gray-200 ">
      <h2 className="text-xl font-bold">Users List</h2>
      <div className="w-full">
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : (
          <div className="flex flex-row md:flex-col gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#c0bdbdac] scrollbar-track-gray-200 pb-2">
            {conversations.map((conversation, idx) => {
              return (
                <div key={conversation._id} className="flex-shrink-0">
                  <Conversation
                    conversation={conversation}
                    lastIdx={idx === conversations?.length - 1}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

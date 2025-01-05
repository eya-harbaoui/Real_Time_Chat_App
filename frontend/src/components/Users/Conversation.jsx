import React from "react";

const Conversation = ({ user }) => {
  return (
    <div className="flex space-x-4 items-center cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={user.avatar} />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">{user.username}</h2>
      </div>
    </div>
  );
};

export default Conversation;

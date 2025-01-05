import React from "react";

const Conversation = ({ user }) => {
  return (
    <div className="flex space-x-4 items-center cursor-pointer">
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img src={user.avatar} />
        </div>
      </div>
      <div>
        <h2 className="text-base font-semibold">{user.username}</h2>
      </div>
    </div>
  );
};

export default Conversation;

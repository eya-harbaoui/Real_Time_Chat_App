import React from "react";
import homeImg from "../../assets/home.svg";
import { useAuthContext } from "../../context/AuthContext";
const HomeWelcome = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="card-body bg-base-100 shadow-2xl rounded-xl w-full flex flex-col max-h-full items-center">
      <h1 className="text-3xl font-bold text-center text-purple-600">
        <span className=" text-gray-900">Welcome </span> {authUser.fullName} !{" "}
      </h1>
      <h1 className="text-xl font-semibold text-center text-gray-900">
        Select a chat to start messaging
      </h1>
      <img src={homeImg} alt="" className="w-full max-w-md h-auto" />
    </div>
  );
};

export default HomeWelcome;

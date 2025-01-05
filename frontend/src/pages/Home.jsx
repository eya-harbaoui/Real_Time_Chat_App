import React from "react";
import { SideBar } from "../components/SideBar";
import { UsersList } from "../components/Users/UsersList";
import { SearchInput } from "../components/SearchInput";
import Chat from "../components/Chat/Chat";
export const Home = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <SideBar />
      <div className="flex flex-col space-y-8 items-center w-1/3 ml-8">
        <SearchInput />
        <UsersList />
        <UsersList />
      </div>
      <div className="flex flex-col space-y-8 items-center w-2/3 ml-8">
        <Chat />
      </div>
    </div>
  );
};

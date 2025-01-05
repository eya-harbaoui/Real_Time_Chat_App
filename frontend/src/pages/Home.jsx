import React from "react";
import { SideBar } from "../components/SideBar";
import { UsersList } from "../components/Users/UsersList";
import { SearchInput } from "../components/SearchInput";
import Chat from "../components/Chat/Chat";

export const Home = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex flex-row w-full h-screen">
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-52"
        } md:flex-row`}
      >
        <div className="flex flex-col space-y-4 items-center w-full md:w-1/3 p-4">
          <SearchInput />
          <UsersList />
          <UsersList />
        </div>
        <div className="flex flex-col items-center w-full md:w-2/3 p-4">
          <Chat />
        </div>
      </div>
    </div>
  );
};

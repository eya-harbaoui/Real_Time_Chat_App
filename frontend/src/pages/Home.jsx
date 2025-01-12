import React, { useEffect } from "react";
import { SideBar } from "../components/SideBar/SideBar";
import { UsersList } from "../components/Users/UsersList";
import { SearchInput } from "../components/SearchInput";
import HomeWelcome from "../components/Home/HomeWelcome";
import ChatCard from "../components/Chat/ChatCard";
import useConversation from "../zustand/useConversation";

export const Home = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-row justify-center w-full h-screen">
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex flex-col w-full transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-52"
        } md:flex-row h-full space-y-4`}
      >
        <div className="flex flex-col space-y-4 items-center w-full md:w-1/3 px-4 max-h-full">
          <SearchInput />
          <UsersList />
        </div>

        {!selectedConversation ? <HomeWelcome /> : <ChatCard />}
      </div>
    </div>
  );
};

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
    //cleanup when component unmount
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

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
          {!selectedConversation ? <HomeWelcome /> : <ChatCard />}
        </div>
      </div>
    </div>
  );
};

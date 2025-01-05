import React, { useState } from "react";
import {
  IoMdHome,
  IoIosNotifications,
  IoIosSettings,
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdMenu,
  IoMdClose,
} from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const sideBarItems = [
  { id: 1, title: "Home", icon: <IoMdHome size={24} /> },
  { id: 2, title: "Chat", icon: <IoChatbubbleEllipsesOutline size={24} /> },
  { id: 3, title: "Notifications", icon: <IoIosNotifications size={24} /> },
  { id: 4, title: "Settings", icon: <IoIosSettings size={24} /> },
  { id: 5, title: "Logout", icon: <BiLogOut size={24} /> },
];

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 flex-col items-start bg-purple-600 h-screen transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-10" : "w-52"} md:translate-x-0`}
      >
        <div className="flex items-start justify-between p-2">
          {!isCollapsed && (
            <h1 className="text-lg font-bold text-white">Talkio</h1>
          )}
          <button
            className="text-white"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <IoIosArrowForward size={24} />
            ) : (
              <IoIosArrowBack size={24} />
            )}
          </button>
        </div>
        <ul className="flex flex-col items-start p-2 space-y-4">
          {sideBarItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-row items-center space-x-2 text-white"
            >
              <span>{item.icon}</span>
              <span className="text-lg font-medium">
                {!isCollapsed && item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

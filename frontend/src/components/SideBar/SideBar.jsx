import React from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdMenu,
  IoMdClose,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { sideBarItems } from "./SideBarUtils";
import { useMediaQuery } from "react-responsive";

export const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { loading, logout } = useLogout();

  // Check if the screen size is mobile (max-width 768px)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleItem = (itemLink) => {
    if (itemLink === "/logout") {
      handleLogout();
    } else {
      navigate(itemLink);
    }
  };

  if (isMobile) {
    // Mobile version: show a navbar instead of a sidebar
    return (
      <div className="fixed top-0 left-0 w-full bg-purple-600 z-50 p-4 flex justify-between items-center">
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>

        <h1 className="text-lg font-bold text-white">Talkio</h1>

        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-purple-600 p-4 space-y-4">
            {sideBarItems.map((item) => (
              <li
                key={item.id}
                className="text-white flex space-x-2 cursor-pointer hover:bg-purple-700 w-full p-2 rounded-md"
                onClick={() => handleItem(item.link)}
              >
                <span>{item.icon}</span>
                <span className="text-base font-medium">{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Desktop version: sidebar
  return (
    <div
      className={`fixed top-0 left-0 z-40 flex-col items-start bg-purple-600 h-full transition-all duration-300 ${
        isCollapsed ? "w-14" : "w-52"
      } md:translate-x-0`}
    >
      <div className="flex items-start justify-between p-4">
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
            className="flex flex-row items-center space-x-2 text-white cursor-pointer hover:bg-purple-700 w-full p-2 rounded-md"
            onClick={() => handleItem(item.link)}
          >
            <span>{item.icon}</span>
            {!isCollapsed && (
              <span className="text-lg font-medium">{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

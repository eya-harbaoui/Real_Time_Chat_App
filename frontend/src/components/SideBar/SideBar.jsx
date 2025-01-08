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

export const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const [isOpen, setIsOpen] = React.useState(false); // Mobile menu state
  const navigate = useNavigate();

  const { loading, logout } = useLogout();

  // Function to handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleItem = (itemLink) => {
    if (itemLink == "/logout") {
      handleLogout();
    } else {
      navigate(itemLink);
    }
  };

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
        className={`fixed top-0 left-0 z-40 flex-col items-start bg-purple-600 h-screen transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-14" : "w-52"} md:translate-x-0`}
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
              onClick={() => {
                handleItem(item.link);
              }}
            >
              <span>{item.icon}</span>
              {!isCollapsed && (
                <span className="text-lg font-medium">{item.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

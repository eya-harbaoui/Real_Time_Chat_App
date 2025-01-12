import { IoMdHome, IoIosNotifications, IoIosSettings } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

export const sideBarItems = [
  {
    id: 1,
    title: "Home",
    icon: <IoMdHome size={24} />,
    link: "/",
  },
  {
    id: 2,
    title: "Profile",
    icon: <FaRegUserCircle size={23} />,
    link: "/profile",
  },

  {
    id: 3,
    title: "Settings",
    icon: <IoIosSettings size={24} />,
    link: "/settings",
  },
  {
    id: 4,
    title: "Logout",
    icon: <BiLogOut size={24} />,
    link: "/logout",
  },
];

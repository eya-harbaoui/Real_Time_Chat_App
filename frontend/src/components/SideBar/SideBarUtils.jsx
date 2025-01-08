import { IoMdHome, IoIosNotifications, IoIosSettings } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

export const sideBarItems = [
  {
    id: 1,
    title: "Home",
    icon: <IoMdHome size={24} />,
    link: "/",
  },
  {
    id: 2,
    title: "Notifications",
    icon: <IoIosNotifications size={24} />,
    link: "/notifications",
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

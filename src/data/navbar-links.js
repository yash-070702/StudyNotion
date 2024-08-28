import { FaHome } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
export const NavbarLinks = [
  {
    title: "Home",
    path: "/",
    icon:<FaHome/>
  
  },
  {
    title: "Catalog",
  icon:<FaClipboardList />
  },
  {
    title: "About Us",
    path: "/about",
    icon:<FaCircleInfo />
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon:<MdEmail />
  },
];

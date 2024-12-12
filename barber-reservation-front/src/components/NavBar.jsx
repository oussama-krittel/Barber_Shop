import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHome, FaBook } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { getCurrentUser } from "./../services/user";

import LogoSection from "./LogoSection";
import SidebarItem from "./SidebarItem";
import UserComponent from "./UserComponent";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Logo Section */}
        <LogoSection expanded={expanded} setExpanded={setExpanded} />

        {/* Sidebar Items */}
        <ul className="flex-1 px-4 mt-10 space-y-4">
          <SidebarItem
            icon={<FaHome size={20} />}
            text="Home"
            link="/"
            active={location.pathname === "/"}
            expanded={expanded}
          />
          <SidebarItem
            icon={<FaBook size={20} />}
            text="Reservations"
            link="/reservations"
            active={location.pathname === "/reservations"}
            expanded={expanded}
          />
          <SidebarItem
            icon={<MdPhone size={22} />}
            text="Contact"
            link="/contact"
            active={location.pathname === "/contact"}
            expanded={expanded}
          />
        </ul>

        {/* User Section */}
        <UserComponent user={getCurrentUser()} expanded={expanded} />
      </nav>
    </aside>
  );
}

export default NavBar;

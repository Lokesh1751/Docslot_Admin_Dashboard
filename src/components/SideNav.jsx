import React from "react";
import {
  MdHome,
  MdAddCircle,
  MdCategory,
  MdAdminPanelSettings,
  MdCalendarToday,
  MdPeople, // Import an icon for "All Doctors"
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SideNav() {
  const location = useLocation();
  const currloc = location.pathname;
  console.log(currloc);

  return (
    <div className="bg-[#0046C0] flex flex-col h-[100vh] w-auto ">
      {/* Logo Section */}
      <div className="flex gap-2 p-6 items-center">
        <div className="bg-white p-4 rounded-full">
          <img
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/wall-decoration/j/s/d/doctor-logo-1-doctor-1-6x5in-doctor-logo-decalbazaar-original-imagpnchqbfc3jf2.jpeg?q=90&crop=false"
            alt="DocSlot Logo"
            className="w-[50px] h-[50px]"
          />
        </div>
        <h1 className="text-3xl text-white font-bold">DocSlot</h1>
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <NavItem
          to="/dashboard"
          icon={<MdHome />}
          label="Dashboard"
          ispath={currloc === "/dashboard"}
        />
        <NavItem
          to="/adddoc"
          icon={<MdAddCircle />}
          label="Add Doctor"
          ispath={currloc === "/adddoc"}
        />
        <NavItem
          to="/cat"
          icon={<MdCategory />}
          label="Categories"
          ispath={currloc === "/cat"}
        />
        <NavItem
          to="/profile"
          icon={<MdAdminPanelSettings />}
          label="Admin Profile"
          ispath={currloc === "/profile"}
        />
        <NavItem
          to="/allapp"
          icon={<MdCalendarToday />}
          label="All Appointments"
          ispath={currloc === "/allapp"}
        />
        <NavItem
          to="/alldoc" // Add route for "All Doctors"
          icon={<MdPeople />} // Use an appropriate icon for doctors
          label="All Doctors"
          ispath={currloc === "/alldoc"}
        />
      </div>
    </div>
  );
}

// NavItem Component
const NavItem = ({ to, icon, label, ispath }) => (
  <Link to={to}>
    <div
      className={`flex items-center gap-4 p-6  m-2 cursor-pointer rounded-md ${
        ispath
          ? "bg-white text-blue-700 font-bold"
          : "text-white hover:bg-blue-700"
      }`}
    >
      <div
        className={`flex-shrink-0 text-2xl ${
          ispath ? "text-blue-700" : "text-white"
        }`}
      >
        {icon}
      </div>
      <h1
        className={`text-xl font-medium ${
          ispath ? "text-blue-700" : "text-white"
        }`}
      >
        {label}
      </h1>
    </div>
  </Link>
);

export default SideNav;

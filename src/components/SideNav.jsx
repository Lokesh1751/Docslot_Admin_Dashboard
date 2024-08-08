import React from "react";
import {
  MdHome,
  MdAddCircle,
  MdCategory,
  MdAdminPanelSettings,
  MdCalendarToday,
} from "react-icons/md";

function SideNav() {
  return (
    <div className="bg-[#0046C0] flex flex-col h-screen w-[270px]">
      {/* Logo Section */}
      <div className="flex gap-2 p-6 items-center">
        <div className="bg-white p-4 rounded-full">
          <img
            src="https://www.freeiconspng.com/thumbs/doctor-logo/doctor-symbol-universal-png-2.png"
            alt="DocSlot Logo"
            className="w-[50px] h-[50px]"
          />
        </div>
        <h1 className="text-3xl text-white font-bold">DocSlot</h1>
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <NavItem icon={<MdHome />} label="Dashboard" />
        <NavItem icon={<MdAddCircle />} label="Add Doctor" />
        <NavItem icon={<MdCategory />} label="Categories" />
        <NavItem icon={<MdAdminPanelSettings />} label="Admin Profile" />
        <NavItem icon={<MdCalendarToday />} label="All Appointments" />
      </div>
    </div>
  );
}

// NavItem Component
const NavItem = ({ icon, label }) => (
  <div className="flex items-center gap-4 p-6 text-white hover:bg-blue-700 cursor-pointer rounded-md">
    <div className="flex-shrink-0 text-2xl">{icon}</div>
    <h1 className="text-xl font-medium">{label}</h1>
  </div>
);

export default SideNav;

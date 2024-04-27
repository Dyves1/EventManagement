

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import EventManagement from "./EventContainer";
import { CiLogout } from "react-icons/ci";
import { logout } from "../../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

const DashboardContainer = () => {
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics },
    { name: "Setting", link: "/", icon: RiSettings4Line },
    { name: "Logout", link: "/", icon: CiLogout  },

    
  ];

  const [open, setOpen] = useState(true);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false)
  const dispatch = useDispatch(); // Get dispatch function from Redux
  // const history = useHistory()
  const navigate = useNavigate();

  const confirmLogout = (e) => {
    e.preventDefault();
    setConfirmLogoutOpen(true); // Open the confirmation modal
};

const cancelLogout = () => {
  setConfirmLogoutOpen(false); // Close the confirmation modal
};
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
    // history.push("/");// Dispatch the logout action
  };
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#F04520] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={menu.name}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              onClick={menu.name === "Logout" ? confirmLogout : null}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
        <EventManagement/>
        
      </div>
      {confirmLogoutOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
                        <div className="flex justify-end">
                            <button
                                className="text-gray-500 mr-4 hover:text-gray-700"
                                onClick={cancelLogout}
                            >
                                Cancel
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={handleLogout}
                            >
                                continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </section>
  );
};

export default DashboardContainer;
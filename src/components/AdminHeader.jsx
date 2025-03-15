import React from "react";
import { FaSearch } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header>
      <div className="flex lg:justify-end">
        <div className="flex gap-5 lg:w-[40%]">
          <div className="flex-grow">
            <div className="relative flex gap-3 items-center bg-white rounded-md p-3">
              <FaSearch color="gray" />
              <input
                placeholder="Search"
                type="text"
                className="border-0 bg-white text-sm"
              />
            </div>
          </div>

          <div className="bg-white sm:mr-3 h-[45px] p-3 rounded-md">
            <img className=" w-5 h-5" src="/images/icons/message.svg" alt="" />
          </div>
          <div className="bg-white h-[45px] p-3 rounded-md">
            <img src="/images/icons/notifications.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

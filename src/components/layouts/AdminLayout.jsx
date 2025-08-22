"use client";

import React, { useEffect, useState } from "react";
import AdminSideNav from "../AdminSideNav";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
import { getCookie } from "cookies-next";

const AdminLayout = ({ children, header }) => {
  const [showBar, setShowBar] = useState(true);
  const [user] = useAtom(userAtom);
  const pathname = usePathname();
  const router = useRouter();
  const token = getCookie("token");

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); 
  };
  handleResize();


  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    // if (!token) {
    //   router.push('/auth/login')
    // }
    // if (user !== undefined) {
    //   if (pathname.includes(user.role)) {
    //     return
    //   }
    //   router.push(`/${user.role}`)
    // }
  }, []);
  return (
    <div className="lg:flex">
      <div className={showBar ? "block " : "hidden"}>
      <AdminSideNav setShowBar={() => {
  if (isMobile) setShowBar(false);
}} />
      </div>
      <section className="lg:w-[80%] lg:ml-auto lg:p-6 p-4">
        <div className="sm:flex w-full justify-between">
          <button
            onClick={() => setShowBar(true)}
            className="lg:hidden block bg-white h-10 w-10 mr-3 my-auto"
          >
            <img
              src="/images/icons/menu.png"
              className="w-8 h-8 mx-auto"
              alt=""
            />
          </button>
          {/* {header !== false && <AdminHeader />} */}
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default AdminLayout;

"use client";

import React, { useEffect, useState } from "react";
import AdminSideNav from "../AdminSideNav";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

const AdminLayout = ({ children, collapsedProps }) => {
  const [showBar, setShowBar] = useState(true);
  const [collapsed, setCollapsed] = useState(collapsedProps ? true : false);
  const [user] = useAtom(userAtom);
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Still waiting for userAtom hydration
    if (user === undefined) {
      setIsLoading(true);
      return;
    }

    const isAdminRoute = pathname.startsWith("/admin");
    const isUserAdmin = user?.role === "admin";

    if (isAdminRoute && !isUserAdmin) {
      // only redirect if we know user is NOT admin
      router.replace("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [user, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-purple text-4xl" />
      </div>
    );
  }

  return (
    <div className="lg:flex w-full">
      <div className={`${showBar ? "block" : "hidden"} transition-all duration-300`}>
        <AdminSideNav
          setShowBar={() => isMobile && setShowBar(false)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
      <section
        className={`${collapsed ? "lg:w-[94%]" : "lg:w-[80%]"} transition-all duration-300 lg:ml-auto lg:p-6 p-4`}
      >
        <div className="sm:flex w-full justify-between">
          <button
            onClick={() => setShowBar(true)}
            className="lg:hidden block bg-white h-10 w-10 mr-3 my-auto"
          >
            <Image
              src="/images/icons/menu.png"
              className="w-8 h-8 mx-auto"
              alt="Menu"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default AdminLayout;

"use client";

import React, { useEffect, useState } from "react";
import AdminSideNav from "../AdminSideNav";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

const AdminLayout = ({ children, collapsedProps }) => {
  const [showBar, setShowBar] = useState(true);
  const [collapsed, setCollapsed] = useState(!!collapsedProps);
  const user = useAtomValue(userAtom);
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Detect mobile layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Wait for Jotai hydration before checking auth
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // Wait until atom is ready
    if (user === null) {
      router.replace("/auth/login");
      return;
    }

    const isAdminRoute = pathname.startsWith("/admin");
    const isUserAdmin = user?.role === "admin";

    if (isAdminRoute && !isUserAdmin) {
      router.replace("/auth/login");
    }
  }, [hydrated, user, pathname, router]);

  if (!hydrated || user === undefined) {
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

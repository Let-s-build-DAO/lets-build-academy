"use client";

import React, { useEffect, useState } from "react";
import AdminSideNav from "../AdminSideNav";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loading state for user authentication
  const [isLoading, setIsLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Efficient authorization check with proper dependencies
  useEffect(() => {
    // Don't run if we've already redirected or if user is still loading
    if (hasRedirected || user === undefined) {
      if (user !== undefined) {
        setIsLoading(false);
      }
      return;
    }

    // Check if user has required permissions for admin routes
    const isAdminRoute = pathname.startsWith('/admin');
    const isUserAdmin = user?.role === 'admin';

    if (isAdminRoute && !isUserAdmin) {
      // User is not authorized for admin routes
      setHasRedirected(true);
      router.push('/auth/login');
      return;
    }

    // If user is authenticated and on correct route, allow access
    if (user && ((isAdminRoute && isUserAdmin) || !isAdminRoute)) {
      setIsLoading(false);
    }
  }, [user, pathname, router, hasRedirected]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-center text-purple text-4xl mb-2" />
          {/* <p className="mt-4 text-lg text-gray-600">Loading...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:flex w-full">
      <div className={`${showBar ? "block" : "hidden"} transition-all duration-300`}>
        <AdminSideNav
          setShowBar={() => {
            if (isMobile) setShowBar(false);
          }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
      <section className={`${collapsed ? 'lg:w-[94%]' : "lg:w-[80%]"} transition-all duration-300 lg:ml-auto lg:p-6 p-4`}>
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
          {/* {header !== false && <AdminHeader />} */}
        </div>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default AdminLayout;

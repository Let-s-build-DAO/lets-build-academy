"use client";

import React, { useEffect, useState } from "react";
import TopNav from "../TopNav";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store";
import { FaSpinner } from "react-icons/fa";

const AdminLayout = ({ children, hideSidebar }) => {
  const [showNav, setShowNav] = useState(!hideSidebar);
  const user = useAtomValue(userAtom);
  const pathname = usePathname();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  // Keep nav state in sync with prop
  useEffect(() => {
    setShowNav(!hideSidebar);
  }, [hideSidebar]);

  // Wait for Jotai hydration before checking auth
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
      <div className="min-h-screen flex items-center justify-center bg-[#111113]">
        <FaSpinner className="animate-spin text-indigo-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111113] w-full text-white">
      {!hideSidebar && showNav && <TopNav />}
      
      {/* 
        The main content area now spans the full width without any side margins, 
        making it perfect for our new centered layout system.
      */}
      <main className="flex-1 w-full transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

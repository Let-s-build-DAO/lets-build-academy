"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { hasCookie, deleteCookie } from "cookies-next";
import { Menu, X, Zap, KeyRound, LogOut, User } from "lucide-react";

const TopNav = () => {
  const pathname = usePathname();
  const [nav, setNav] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie("token")) {
      router.push("/auth/login");
    }
  }, [router]);

  const logout = () => {
    deleteCookie("token");
    localStorage.removeItem("null");
    router.push("/auth/login");
  };

  const userNav = [
    { href: "/user", name: "Home" },
    { href: "/user/tracks", name: "Tracks" },
  ];

  const adminNav = [
    { href: "/admin", name: "Home" },
    { href: "/admin/tracks", name: "Tracks" },
    { href: "/admin/reviews", name: "Reviews" },
    { href: "/admin/admins", name: "Mentors" },
    { href: "/admin/students", name: "Students" },
  ];

  useEffect(() => {
    if (pathname.includes("user")) {
      setNav(userNav);
    } else if (pathname.includes("admin")) {
      setNav(adminNav);
    } else {
      setNav([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111113]/90 backdrop-blur-md border-b border-white/10 text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo & Links */}
          <div className="flex items-center gap-8">
            <Link href={pathname.includes("admin") ? "/admin" : "/user"} className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter">LB Academy</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {nav?.map((item, idx) => {
                const isActive = item.href === "/user" || item.href === "/admin" 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);
                  
                return (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? "text-white bg-white/10" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Stats & Profile */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Mock Streaks & Keys (Only show for users) */}
            {pathname.includes("user") && (
              <div className="flex items-center gap-3 mr-4 border-r border-white/10 pr-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="font-bold text-sm">2</span>
                  <KeyRound className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="font-bold text-sm">0</span>
                  <Zap className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}

            {/* Promo Button */}
            {pathname.includes("user") && (
              <button className="px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                Join Pod
              </button>
            )}

            {/* Profile Dropdown (Simplified for now) */}
            <Link href={pathname.includes("admin") ? "/admin/profile" : "/user/profile"} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <User className="w-5 h-5 text-gray-400 hover:text-white" />
            </Link>
            <button onClick={logout} className="p-2 rounded-full hover:bg-red-500/10 transition-colors group">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1c1c1f] border-b border-white/10 pb-4 px-4">
          <div className="flex flex-col space-y-2 mt-2">
            {nav?.map((item, idx) => {
              const isActive = item.href === "/user" || item.href === "/admin" 
                ? pathname === item.href 
                : pathname.startsWith(item.href);
                
              return (
                <Link 
                  key={idx} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? "text-white bg-white/10" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="h-px bg-white/10 my-2"></div>
            <Link 
              href={pathname.includes("admin") ? "/admin/profile" : "/user/profile"} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <button 
              onClick={logout} 
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;

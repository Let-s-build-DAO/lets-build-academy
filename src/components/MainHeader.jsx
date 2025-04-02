"use client";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

const MainHeader = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`z-50 fixed top-0 w-full lg:px-16 px-4 py-4 ${
          isScrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center xxl:container mx-auto">
          <img src="/academylogo.png" className="w-40" alt="" />
          <nav className="lg:flex hidden justify-between">
            <ul className="flex my-auto">
              <li className="mr-6 text-black">
                {" "}
                <Link href={"/"}>Home</Link>{" "}
              </li>
              <li className="mr-6">
                <Link href={"/courses"}> Courses</Link>
              </li>
              <li className="mr-6">
                <Link href={"/about"}>About Us</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </nav>
          <Link className="sm:hidden" href={"/auth"}>
            <button className="bg-purple flex text-white font-medium p-3 px-8 rounded-full ml-5">
              Start Learning
              <img className="ml-3" src="/east.png" alt="" />
            </button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden block bg-primary h-10 w-10 my-auto"
          >
            <img
              src="/images/icons/menu.png"
              className="w-8 h-8 mx-auto"
              alt=""
            />
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed z-50 top-24 left-0 right-0 p-6 bg-purple text-white w-[90%] mx-auto rounded-md">
          <p
            onClick={() => setOpen(!open)}
            className="float-right text-4xl cursor-pointer"
          >
            &times;
          </p>
          <p className="my-4 mt-20 font-bold">
            <Link href={"/"}>Home</Link>
          </p>
          <p className="my-4 font-bold">
            <Link href={"/about"}>About Us</Link>
          </p>
          <p className="my-4 font-bold">
            <Link href={"/courses"}>Courses</Link>
          </p>
          <p className="my-4 font-bold">
            <Link href={"/contact"}>Contact</Link>
          </p>
          <button className="bg-white text-purple font-medium p-2 px-8 rounded-full w-full">
            Start Learning
          </button>
        </div>
      )}
    </>
  );
};

export default MainHeader;

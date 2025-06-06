"use client";

import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/Hero";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/viktoh7351@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <section>
        <Hero text="Contact Us" />
        <section className="content">
          <div className="lg:w-[40%] sm:p-4 mx-auto my-10">
            <h1 className="text-3xl my-3 font-bold text-center">
              Leave us a message
            </h1>
            <p className="text-center">
              We're here to help. Feel free to get in touch with us for any
              inquiries, course information, or assistance. Our team is ready to
              assist you on your tech education journey.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 rounded-sm my-3 text-sm w-full border border-[#CECCCF]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="p-3 rounded-sm my-3 text-sm w-full border border-[#CECCCF]"
                required
              />
              <input
                type="hidden"
                name="_subject"
                value="New submission!"
              ></input>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message"
                className="h-40 p-3 resize-none rounded-sm my-3 text-sm w-full border border-[#CECCCF]"
                required
              ></textarea>
              <button
                type="submit"
                className="p-3 rounded-full my-3 bg-purple text-white text-sm w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p className="text-green-600 text-center mt-2">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center mt-2">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default Contact;

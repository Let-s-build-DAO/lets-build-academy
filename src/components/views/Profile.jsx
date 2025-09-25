"use client";
import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import ProfileCard from "../cards/ProfileCard";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { userAtom } from "@/src/store";
import firebase_app from "@/src/firebase/config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Spinner from "@/src/components/Spinner";

const db = getFirestore(firebase_app);

const Profile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [bio, setBio] = useState(user?.info);
  const [twitter, setTwitter] = useState(user?.socials?.twitter || "");
  const [instagram, setInstagram] = useState(user?.socials?.instagram || "");
  const [github, setGithub] = useState(user?.socials?.github || "");
  const [loading, setLoading] = useState(false);

  const updateData = async () => {
    setLoading(true);
    try {
      const userDoc = doc(db, "usersProd", user.id);
      await updateDoc(userDoc, {
        info: bio,
        socials: {
          twitter: twitter,
          instagram: instagram,
          github: github,
        },
      });
      toast.success("Profile updated successfully!");
      setLoading(false);
      // Update the user atom and other states with the new values
      setUser((prevUser) => ({
        ...prevUser,
        info: bio,
        socials: {
          twitter,
          instagram,
          github,
        },
      }));
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Profile Form Card */}
        <div className="lg:w-[60%] w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-purple">Profile Details</h1>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  disabled
                  value={user?.username}
                  type="text"
                  className="p-3 mt-1 bg-gray-100 w-full rounded-md focus:outline-purple focus:ring-2 focus:ring-purple/30 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  disabled
                  value={user?.email}
                  className="p-3 mt-1 bg-gray-100 w-full rounded-md focus:outline-purple focus:ring-2 focus:ring-purple/30 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="resize-none h-32 p-3 mt-1 bg-gray-100 w-full rounded-md focus:outline-purple focus:ring-2 focus:ring-purple/30 transition"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
              <div>
                <button
                  onClick={updateData}
                  className="w-full bg-purple rounded-full text-sm p-3 text-white font-semibold shadow-md hover:bg-purple/90 transition flex items-center justify-center"
                >
                  {loading ? <Spinner /> : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Divider for large screens */}
        {/* <div className="hidden lg:block w-px bg-gray-200 mx-2"></div> */}
        {/* Profile Card & Socials */}
        <div className="lg:w-[40%] w-full flex flex-col items-center">
          <ProfileCard />
          <div className="w-full mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Social Links</h2>
            <div className="bg-gray-100 flex items-center my-3 rounded-md">
              <span className="p-3 text-purple">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.5c0 .34.04.67.1.99C8.09 9.36 4.6 7.5 2.18 4.88c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
              </span>
              <input
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full rounded-r-md bg-gray-100 p-3 focus:outline-purple focus:ring-2 focus:ring-purple/30 transition"
                type="text"
                placeholder="Twitter username"
              />
            </div>
            <div className="bg-gray-100 flex items-center my-3 rounded-md">
              <span className="p-3 text-pink-500">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5C19.87 22 22 19.87 22 16.25v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 1.5h8.5c2.34 0 3.75 1.41 3.75 3.75v8.5c0 2.34-1.41 3.75-3.75 3.75h-8.5c-2.34 0-3.75-1.41-3.75-3.75v-8.5c0-2.34 1.41-3.75 3.75-3.75zm8.5 2.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-4.25 1.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5z"/></svg>
              </span>
              <input
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-r-md bg-gray-100 p-3 focus:outline-pink-500 focus:ring-2 focus:ring-pink-200 transition"
                type="text"
                placeholder="Instagram username"
              />
            </div>
            <div className="bg-gray-100 flex items-center my-3 rounded-md">
              <span className="p-3 text-gray-700">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </span>
              <input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full rounded-r-md bg-gray-100 p-3 focus:outline-gray-700 focus:ring-2 focus:ring-gray-300 transition"
                type="text"
                placeholder="GitHub username"
              />
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Profile;

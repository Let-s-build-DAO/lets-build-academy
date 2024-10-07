"use client";
import React, { useState } from "react";
import AdminLayout from "../../_layouts/AdminLayout";
import ProfileCard from "../../_components/cards/ProfileCard";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { userAtom } from "@/app/store";
import firebase_app from "@/app/firebase/config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Spinner from "@/app/_components/Spinner";

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
      <section className="lg:flex mt-8">
        <div className="lg:w-[70%]">
          <h1 className="text-4xl font-bold">Profile Details</h1>
          {/* <div className='my-2'>
            <label className='text-sm'>First Name</label>
            <input type="text" className='p-3 my-1 bg-white w-full rounded-md' />
          </div>
          <div className='my-2'>
            <label className='text-sm'>Last Name</label>
            <input type="text" className='p-3 my-1 bg-white w-full rounded-md' />
          </div> */}
          <div className="my-2">
            <label className="text-sm">Username</label>
            <input
              disabled
              value={user?.username}
              type="text"
              className="p-3 my-1 bg-white w-full rounded-md"
            />
          </div>
          <div className="my-2">
            <label className="text-sm">Email</label>
            <input
              type="email"
              disabled
              value={user?.email}
              className="p-3 my-1 bg-white w-full rounded-md"
            />
          </div>
          <div className="my-2">
            <label className="text-sm">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-36 p-3 my-1 bg-white w-full rounded-md"
            ></textarea>
          </div>
          <div className="my-2">
            <button
              onClick={updateData}
              className="w-20 bg-purple rounded-md text-sm p-3 text-white"
            >
              {loading ? <Spinner /> : "Save"}
            </button>
          </div>
        </div>
        <div className="lg:w-[30%] lg:ml-6">
          <ProfileCard />
          <div className="bg-[#CECCCF] text-[#848086] flex my-3 rounded-md">
            <p className="p-3 text-xs w-80 ">https://twitter.com/</p>
            <input
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-r-md"
              type="text"
            />
          </div>
          <div className="bg-[#CECCCF] text-[#848086] flex my-3 rounded-md">
            <p className="p-3 text-xs w-80">https://instagram.com/</p>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-r-md"
              type="text"
            />
          </div>
          <div className="bg-[#CECCCF] text-[#848086] flex my-3 rounded-md">
            <p className="p-3 text-xs w-80 ">https://github.com/</p>
            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full rounded-r-md"
              type="text"
            />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Profile;

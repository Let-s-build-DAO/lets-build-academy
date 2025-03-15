import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white h-auto rounded-lg p-5">
      <h3 className="text-sm font-bold">Profile</h3>
      <img src="/images/user.png" className="mx-auto w-32" alt="" />
      <p className="flex justify-center my-4 font-bold text-sm">
        {user?.username}{" "}
        <img
          className="w-4 h-4 my-auto mx-2"
          src="./images/icons/verified.svg"
          alt=""
        />
      </p>
    </div>
  );
};

export default ProfileCard;

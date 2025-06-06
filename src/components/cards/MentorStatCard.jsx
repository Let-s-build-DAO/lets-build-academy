import React from "react";

const MentorStatCard = ({ text, count, color, bg, img }) => {
  return (
    <div
      className={`w-full flex p-4 rounded-md ${color} ${bg} relative`}
    >
      <div className="lg:w-1/2">
        <p>{text}</p>
        <h2 className="text-3xl my-4 font-bold">{count}</h2>
      </div>
      <div className="absolute bottom-3 right-3 mt-auto lg:w-[50%] w-1/2">
        <svg
          viewBox="0 0 162 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.77393 18.7921C3.62522 12.7959 9.43078 8.16882 14.7304 5.27379C19.8439 2.48039 25.7378 1.49977 31.2624 3.65657C37.0783 5.92707 41.4565 12.2466 44.1697 14.0441C46.8828 15.8416 48.2394 16.644 52.8518 17.7969C57.4642 18.9499 61.0678 18.6288 66.2195 17.7969C70.9901 17.0266 70.0439 17.0608 77.9981 14.0441C85.9523 11.0275 89.6002 18.1797 91.9213 21.993C93.5492 24.6675 92.7352 23.8652 95.4484 27.6095C98.1615 31.3538 102.29 37.6509 107.144 37.1666C111.999 36.6823 112.299 34.7596 115.012 32.6199C117.726 30.4803 118.974 29.894 121.862 30.089C124.75 30.284 128.82 34.4509 131.262 38.8425C133.704 43.2342 133.704 44.9939 139.402 45.5288C145.099 46.0637 148.757 38.2355 154.842 43.2342C156.453 44.5571 159.006 47.1981 159.491 49.3506C159.664 50.1185 159.844 50.5983 160.29 51.2581"
            stroke={img}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* <img className='mt-auto w-[60%]' src="./images/Vector.svg" alt="" /> */}
    </div>
  );
};

export default MentorStatCard;


import React from "react";

const MentorStatCard = ({ text, count, color, bg, img }) => {
  return (
    <div
      className={`w-full flex items-center gap-4 p-6 rounded-xl shadow-lg ${bg} relative overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl duration-200`}
    >
      {/* <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-200 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          className="bi bi-person-workspace text-purple-700"
          viewBox="0 0 16 16"
        >
          <path d="M6 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2zm13-1c0-.26-.164-1.03-.76-1.724-.545-.636-1.492-1.256-3.16-1.275-1.717 0-2.687.63-3.24 1.276-.593.69-.758 1.457-.76 1.72l.008.002.014.002H15z" />
          <rect x="4" y="8" width="8" height="2" rx="1" />
        </svg>
      </div> */}
      <div className="flex-1">
        <p className={`font-semibold text-sm mb-2 ${color}`}>{text}</p>
        <h2 className={`text-4xl font-extrabold ${color}`}>{count}</h2>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <svg width="120" height="40" viewBox="0 0 162 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.77393 18.7921C3.62522 12.7959 9.43078 8.16882 14.7304 5.27379C19.8439 2.48039 25.7378 1.49977 31.2624 3.65657C37.0783 5.92707 41.4565 12.2466 44.1697 14.0441C46.8828 15.8416 48.2394 16.644 52.8518 17.7969C57.4642 18.9499 61.0678 18.6288 66.2195 17.7969C70.9901 17.0266 70.0439 17.0608 77.9981 14.0441C85.9523 11.0275 89.6002 18.1797 91.9213 21.993C93.5492 24.6675 92.7352 23.8652 95.4484 27.6095C98.1615 31.3538 102.29 37.6509 107.144 37.1666C111.999 36.6823 112.299 34.7596 115.012 32.6199C117.726 30.4803 118.974 29.894 121.862 30.089C124.75 30.284 128.82 34.4509 131.262 38.8425C133.704 43.2342 133.704 44.9939 139.402 45.5288C145.099 46.0637 148.757 38.2355 154.842 43.2342C156.453 44.5571 159.006 47.1981 159.491 49.3506C159.664 50.1185 159.844 50.5983 160.29 51.2581" stroke={img} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default MentorStatCard;

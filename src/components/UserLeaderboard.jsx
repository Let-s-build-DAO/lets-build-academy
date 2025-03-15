"use client";
import React, { useState } from "react";

const UserLeaderboard = () => {
  const [datas, setDatas] = useState([
    {
      name: "Victor",
      percentage: 40,
    },
    {
      name: "Great",
      percentage: 25,
    },
    {
      name: "Alabo",
      percentage: 65,
    },
    {
      name: "David",
      percentage: 80,
    },
  ]);
  return (
    <div className="rounded-md bg-white p-5">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">Leaderboard</h3>
        <select
          //   value={selectedOption}
          //   onChange={(e) => setSelectedOption(e.target.value)}
          className="py-2 px-5 rounded"
        >
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <table className="w-full text-nowrap border-collapse">
        <thead>
          <tr className="text-gray">
            <th className="text-start py-5 font-light">Rank</th>
            <th className="text-start py-5 font-light">Name</th>
            <th className="text-center py-5 font-light">Percentage</th>
          </tr>
        </thead>
        <tbody className="">
          {datas.map((data, index) => (
            <tr key={index} className="text-lg">
              <td className="text-start pt-5">{index + 1}</td>
              <td className="text-start pt-5 font-bold">{data.name}</td>
              <td className="text-center text-purple pt-5">
                {data.percentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLeaderboard;

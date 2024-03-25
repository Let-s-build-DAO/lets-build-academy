import { Progress } from 'antd';
import React from 'react';

const CoursesCard = () => {
  const mint = true
  const twoColors = { '0%': '#8F0FBA', '100%': '#8F0FBA' };

  return (
    <div className='bg-white rounded-md p-4 w-[49%] my-3'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img className='h-4 w-4 my-auto mx-4' src="../images/icons/local_library.svg" alt="" />
          <div className='my-auto w-44'>
            <h4 className='font-bold my-3 text-sm'>Learn Solidity</h4>
            <p className='text-xs my-3'>By Great Adams</p>
          </div>
        </div>
        {mint ? <Progress type="circle" percent={90} strokeColor={twoColors} size={60} /> : <button className='p-2 h-10 my-auto bg-white border border-purple rounded-md text-purple text-sm px-6'>Purchase</button>
        }
      </div>
      {mint ? <button className='p-2 h-10 float-right my-auto bg-white border border-purple rounded-md text-purple text-sm px-6'>Continue</button> : null
      }
    </div>
  );
};

export default CoursesCard;
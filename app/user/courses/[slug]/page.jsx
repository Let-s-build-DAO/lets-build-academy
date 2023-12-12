import AdminLayout from '@/app/_layouts/AdminLayout';
import React from 'react';

const CoursesPage = () => {
  return (
    <AdminLayout header={false}>
      <section>
        <div className='flex justify-between'>
          <div className='w-[48%]'>
            <h1 className='text-4xl font-bold'>Javascript</h1>
            <div className='my-3'>
              <video controls>
                <source src="/images/video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm'>Timeframe</p>
                <h3 className='font-bold text-sm'>2 weeks</h3>
              </div>
              <div>
                <p className='text-sm'>Skill Level</p>
                <h3 className='font-bold text-sm'> Beginners</h3>
              </div>
              <button className='p-3 rounded-md bg-purple text-white px-10'>Continue</button>
            </div>
          </div>
          <div className='w-[48%] mt-10'>
            <h3 className='font-bold text-lg my-2'>Introduction</h3>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis libero eget suscipit laoreet. Maecenas risus metus, imperdiet et vestibulum vel, scelerisque id velit. Duis lacinia nibh sed maximus venenatis. Duis sed mi molestie, maximus metus eu, tincidunt velit.
              <br /> <br />
              Etiam fermentum ut lorem eu scelerisque. Integer bibendum metus nec faucibus egestas. Praesent vitae viverra tellus. Phasellus sed risus sem. Duis vel placerat justo. Nunc lectus dui, mattis dignissim nunc sed, semper dignissim dui. Suspendisse scelerisque magna sed porta cursus. Vivamus faucibus sapien vel velit interdum porttitor non nec mauris. Integer feugiat maximus congue.</p>
          </div>
        </div>
        <div className='mt-10'>
          <h3 className='text-xl my-4 font-bold text-center'>Syllabus</h3>
          <div className='flex flex-wrap justify-between'>
            <div className='p-4 rounded-md bg-white flex justify-between w-[48%]'>
              <p className='font-bold'>Lesson 1</p>
              <div>
                <h3 className='font-bold text-lg'>The Basics</h3>
                <p className='text-xs'>The basics of Javascript</p>
              </div>
            </div>
            <div className='p-4 rounded-md bg-white flex justify-between w-[48%]'>
              <p className='font-bold'>Lesson 1</p>
              <div>
                <h3 className='font-bold text-lg'>The Basics</h3>
                <p className='text-xs'>The basics of Javascript</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default CoursesPage;
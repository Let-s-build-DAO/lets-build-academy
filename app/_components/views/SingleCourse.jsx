"use client"

import React, { useEffect, useState } from 'react';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';

const SingleCourse = ({ data }) => {
  // const [text] = useState('# Hello Editor ');
  const [id] = useState('preview-only');
  const [active, setActive] = useState(data?.lessons[0])
  const [lesson, setLesson] = useState(0)

  useEffect(() => {
    setActive(data?.lessons[parseInt(lesson) - 1])
  }, [lesson])
  return (
    data && lesson ? <section className=''>
      <div className='flex justify-between'>
        <div className={active?.handsOn ? 'w-1/2' : 'w-full'}>
          <div className='flex my-3 justify-between'>
            <button>
              <img src="/arrow_circle_left.png" alt="" />
            </button>
            <div className='text-center lg:w-1/2 w-[70%]'>
              <p className='font-bold'>Lesson {lesson}</p>
              <h1 className='font-bold lg:text-3xl'>{active?.title}</h1>
              <p>{active?.subtitle}</p>
            </div>
            <button>
              <img src="/arrow_circle_right.png" alt="" />
            </button>
          </div>
          <MdPreview editorId={id} modelValue={active?.body} />
        </div>
        {active?.handsOn ? <div className='w-1/2'></div> : null}
      </div>
      {/* <MdCatalog editorId={id} scrollElement={scrollElement} /> */}
    </section> : <section>
      <div className='lg:flex justify-between'>
        <div className='lg:w-[48%]'>
          <h1 className='text-4xl font-bold'>{data?.title}</h1>
          <div className='my-3'>
            <img className='w-full h-52 object-cover' src={data?.imgUrl} alt="" />
            {/* <video controls>
              <source src="/images/video.mp4" type="video/mp4" />
            </video> */}
          </div>
          <div className='flex justify-between'>
            <div>
              <p className='text-sm'>Timeframe</p>
              <h3 className='font-bold text-sm'>{data?.timeframe}</h3>
            </div>
            <div>
              <p className='text-sm'>Skill Level</p>
              <h3 className='font-bold text-sm'> {data?.skill}</h3>
            </div>
            {/* <Link href={'&lesson=0'}> */}
            <button onClick={() => setLesson(1)} className='p-3 rounded-md bg-purple text-white px-10'>Start</button>
            {/* </Link> */}
          </div>
        </div>
        <div className='lg:w-[48%] mt-10'>
          <h3 className='font-bold text-lg my-2'>Introduction</h3>
          <p className='text-sm'>{data?.description}</p>
        </div>
      </div>
      <div className='mt-10'>
        <h3 className='text-xl my-4 font-bold text-center'>Syllabus</h3>
        <div className='lg:flex flex-wrap justify-between'>
          {data?.lessons.map((lesson, index) => <div key={index} className='p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]'>
            <p className='font-bold'>Lesson {index + 1}</p>
            <div>
              <h3 className='font-bold text-lg'>{lesson.title}</h3>
              <p className='text-xs'>{lesson.subtitle}</p>
            </div>
          </div>)}

          {/* <div className='p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]'>
            <p className='font-bold'>Lesson 1</p>
            <div>
              <h3 className='font-bold text-lg'>The Basics</h3>
              <p className='text-xs'>The basics of Javascript</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
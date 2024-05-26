"use client"

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';

const scrollElement = document.documentElement;

const SingleCourse = () => {
  const [text] = useState('# Hello Editor ');
  const [id] = useState('preview-only');

  const lesson = useSearchParams().get('lesson')
  return (
    lesson ? <section className=''>
      <div className='flex my-3 justify-between'>
        <button>
          <img src="/arrow_circle_left.png" alt="" />
        </button>
        <div className='text-center lg:w-1/2 w-[70%]'>
          <p className='font-bold'>Lesson {lesson}</p>
          <h1 className='font-bold lg:text-3xl'>The Basics</h1>
          <p>The basics of Javascript</p>
        </div>
        <button>
          <img src="/arrow_circle_right.png" alt="" />
        </button>
      </div>
      <MdPreview editorId={id} modelValue={text} />
      {/* <MdCatalog editorId={id} scrollElement={scrollElement} /> */}
    </section> : <section>
      <div className='lg:flex justify-between'>
        <div className='lg:w-[48%]'>
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
            <Link href={'?lesson=1'}>
              <button className='p-3 rounded-md bg-purple text-white px-10'>Continue</button>
            </Link>
          </div>
        </div>
        <div className='lg:w-[48%] mt-10'>
          <h3 className='font-bold text-lg my-2'>Introduction</h3>
          <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis libero eget suscipit laoreet. Maecenas risus metus, imperdiet et vestibulum vel, scelerisque id velit. Duis lacinia nibh sed maximus venenatis. Duis sed mi molestie, maximus metus eu, tincidunt velit.
            <br /> <br />
            Etiam fermentum ut lorem eu scelerisque. Integer bibendum metus nec faucibus egestas. Praesent vitae viverra tellus. Phasellus sed risus sem. Duis vel placerat justo. Nunc lectus dui, mattis dignissim nunc sed, semper dignissim dui. Suspendisse scelerisque magna sed porta cursus. Vivamus faucibus sapien vel velit interdum porttitor non nec mauris. Integer feugiat maximus congue.</p>
        </div>
      </div>
      <div className='mt-10'>
        <h3 className='text-xl my-4 font-bold text-center'>Syllabus</h3>
        <div className='lg:flex flex-wrap justify-between'>
          <div className='p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]'>
            <p className='font-bold'>Lesson 1</p>
            <div>
              <h3 className='font-bold text-lg'>The Basics</h3>
              <p className='text-xs'>The basics of Javascript</p>
            </div>
          </div>
          <div className='p-4 rounded-md bg-white flex justify-between sm:my-3 lg:w-[48%]'>
            <p className='font-bold'>Lesson 1</p>
            <div>
              <h3 className='font-bold text-lg'>The Basics</h3>
              <p className='text-xs'>The basics of Javascript</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
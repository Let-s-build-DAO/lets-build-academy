"use client"

import AdminLayout from '@/src/layouts/AdminLayout';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const NewCourse = () => {
  const content = useSearchParams().get('content')
  const lesson = {
    title: "",
    subtitle: "",
    body: "",
    description: "",
    category: "",
    handsOn: false
  }
  const [lessons, setLessons] = useState([lesson])

  const handleLessonInputChange = (index, field, value) => {
    const updatedObjects = [...lessons];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setLessons(updatedObjects);
  };

  
  return (
    <AdminLayout header={false}>
      {content ? <div>
        <div className='lg:flex justify-between'>
          <h1 className='text-4xl font-bold'>Course Content</h1>
          <button onClick={() => setLessons([...lessons, lesson])} className='border sm:mt-4 rounded-full border-purple text-purple p-3'>Add Lesson <span className='font-medium ml-3'>+</span></button>
        </div>
        <div>
          {lessons.map((single, index) => <div key={index}>
            <h2 className='font-bold my-3 text-lg'>Lesson {index + 1}</h2>
            <div className='lg:flex justify-between lg:my-3'>
              <div className='lg:w-[49%] sm:my-3'>
                <label htmlFor="">Lesson Title</label>
                <input onChange={e => handleLessonInputChange(index, 'title', e.target.value)} value={single.title} type="text" className='p-3 rounded-md w-full mt-2' />
              </div>
              <div className='lg:w-[49%] sm:my-3'>
                <label htmlFor="">Lesson Subtitle (Optional)</label>
                <input onChange={e => handleLessonInputChange(index, 'subtitle', e.target.value)} value={single.subtitle} type="text" className='p-3 rounded-md w-full mt-2' />
              </div>
            </div>
            <div className='lg:flex justify-between lg:my-3'>
              <div className='lg:w-[49%] sm:my-3'>
                <label htmlFor="">Lesson Category</label>
                <select onChange={e => handleLessonInputChange(index, 'category', e.target.value)} value={single.category} name="" className='p-3 rounded-md w-full mt-2' id="">
                  <option className='hidden' value="">Select Lesson Category</option>
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                </select>
              </div>
              <div className='lg:w-[49%] sm:my-3'>
                <label htmlFor="">Hands On</label>
                <div className='mt-2'>
                  <input onChange={e => handleLessonInputChange(index, 'handsOn', e.target.checked)} type="checkbox" className='p-3' checked={single.handsOn} />
                </div>
              </div>
            </div>
            {single.category === 'video' && <div>
              <div className='my-3'>
                <div className='flex'>
                  <img className='w-8' src="/file_upload.png" alt="" />
                  <p className='my-auto ml-3'>CLick to upload video</p>
                </div>
              </div>
              <div className='my-3'>
                <label htmlFor="">Description</label>
                <textarea onChange={e => handleLessonInputChange(index, 'description', e.target.value)} value={single.description} name="" id="" className='w-full mt-2 p-3 rounded-md h-20'></textarea>
              </div>
            </div>}
            {single.category === 'article' && <div>
            <MdEditor modelValue={single.body} onChange={e => handleLessonInputChange(index, 'body', e)} language='en-US' toolbars={['bold', 'underline', 'italic', 'strikeThrough', 'title', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'link', 'code']} />

            </div>}
          </div>)}
        </div>
        <div className='mt-6'>
          <button className='p-3 w-full text-white bg-purple rounded-full '>Save</button>
        </div>
      </div> : <div>
        <h1 className='text-4xl font-bold'>Course Upload</h1>
        <div className='lg:flex mt-5 justify-between'>
          <div className='lg:w-[27%] lg:order-1 mt-11'>
            <div className='bg-white p-6 rounded-md w-full'>
              <img className='mx-auto' src="/file_upload.png" alt="" />
            </div>
            <button className='border rounded-full border-purple p-3 w-full bg-white text-purple mt-4'>Browse file</button>
          </div>
          <div className='lg:w-[70%] lg:order-0'>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Course Title</label>
              <input type="text" className='bg-white mt-2 rounded-md p-3 w-full' placeholder='Enter Course Title' />
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Description</label>
              <textarea name="" id="" className='bg-white mt-2 rounded-md h-32 p-3 w-full' placeholder='Enter Course Description'></textarea>
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Timeframe</label>
              <input type="text" className='bg-white mt-2 rounded-md p-3 w-full' placeholder='E.g Two (2) Weeks' />
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Skill Level</label>
              <select className='bg-white mt-2 rounded-md p-3 w-full' name="" id="">
                <option value="beginners">Beginners</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
              </select>
            </div>
            <div className='my-3'>
              <Link href={'/mentor/new?content=true'}>
                <button className='bg-purple w-full p-3 rounded-full text-white'>Next</button>
              </Link>
            </div>
          </div>

        </div>
      </div>}
    </AdminLayout>
  );
};

export default NewCourse;
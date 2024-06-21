"use client"

import AdminLayout from '@/app/_layouts/AdminLayout';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import firebase_app from "../../../firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const NewCourse = () => {
  const content = useSearchParams().get('content')
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [skill, setSkill] = useState("")
  const [img, setImg] = useState("")
  const [file, setFile] = useState(null)
  const router = useRouter()
  const uploadRef = useRef(null)

  const handleFileChange = (
    e,
  ) => {
    const file = e.target.files?.[0] // Add null check for e.target.files
    setFile(file)
    const reader = new FileReader()

    reader.onloadend = () => {
      setImg(reader.result?.toString() || '')
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

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

  const createCourse = async () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
      },
      (error) => {
        console.error('Upload failed', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = await addDoc(collection(db, "courses"), {
            title,
            description,
            timeframe,
            skill,
            lessons,
            imgUrl: downloadURL
          });
          // console.log(docRef);
          router.push('/admin/courses')
          console.log('File available at', downloadURL);
        });
      }
    );

  }

  return (
    <AdminLayout header={false}>
      {content ? <div>
        <div className='lg:flex justify-between'>
          <h1 className='text-4xl font-bold'>Course Content</h1>
          <button onClick={() => setLessons([...lessons, lesson])} className='border sm:mt-4 rounded-md border-purple text-purple p-3'>Add Lesson <span className='font-medium ml-3'>+</span></button>
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
                <div className='mt-3'>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={single.handsOn}
                      onChange={e => handleLessonInputChange(index, 'handsOn', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                  {/* <input type="checkbox" className='p-3' checked={single.handsOn} /> */}
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
          <button onClick={() => createCourse()} className='p-3 w-full text-white bg-purple rounded-md '>Save</button>
        </div>
      </div> : <div>
        <h1 className='text-4xl font-bold'>Course Upload</h1>
        <div className='lg:flex mt-5 justify-between'>
          <div className='lg:w-[27%] lg:order-1 mt-11'>
            {img ? <img className='mx-auto' src={img} alt="" /> : <div className='bg-white p-6 rounded-md w-full'>
              <img className='mx-auto' src="/file_upload.png" alt="" />
            </div>}
            <input
              id={`img`}
              type="file"
              onChange={(e) => handleFileChange(e)}
              ref={uploadRef}
              className="my-2 w-[100%] hidden max-w-[400px] lg:w-[100rem]"
            />
            <button onClick={() => uploadRef.current.click()} className='border rounded-md border-purple p-3 w-full bg-white text-purple mt-4'>Browse file</button>
          </div>
          <div className='lg:w-[70%] lg:order-0'>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Course Title</label>
              <input onChange={e => setTitle(e.target.value)} value={title} type="text" className='bg-white mt-2 rounded-md p-3 w-full' placeholder='Enter Course Title' />
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Description</label>
              <textarea onChange={e => setDescription(e.target.value)} value={description} name="" id="" className='bg-white mt-2 rounded-md h-32 p-3 w-full' placeholder='Enter Course Description'></textarea>
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Timeframe</label>
              <input onChange={e => setTimeframe(e.target.value)} value={timeframe} type="text" className='bg-white mt-2 rounded-md p-3 w-full' placeholder='E.g Two (2) Weeks' />
            </div>
            <div className='my-3'>
              <label className='test-sm' htmlFor="">Skill Level</label>
              <select onChange={e => setSkill(e.target.value)} value={skill} className='bg-white mt-2 rounded-md p-3 w-full' name="" id="">
                <option value="beginners">Beginners</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
              </select>
            </div>
            <div className='my-3'>
              <Link href={'?content=true'}>
                <button className='bg-purple w-full p-3 rounded-md text-white'>Next</button>
              </Link>
            </div>
          </div>

        </div>
      </div>}
    </AdminLayout>
  );
};

export default NewCourse;
"use client";

import AdminLayout from "@/src/components/layouts/AdminLayout";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import firebase_app from "../../../../firebase/config";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);
import { createSlug } from "@/src/utils/createSlug";
import Spinner from "@/src/components/Spinner";
import { toast } from "react-toastify";
import Image from "next/image";



const NewCourse = () => {
  const content = useSearchParams().get("content");
  const router = useRouter();
  const uploadRef = useRef(null);
  const page = useSearchParams().get("id");
  const lesson = {
    title: "",
    subtitle: "",
    body: "",
    description: "",
    category: "",
    videoFile: null,
    videoUrl: "",
    handsOn: false,
    editor: [],
    task: {},
  };

  // Load initial state from localStorage if available
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("newCourseForm");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  const initial = getInitialState() || {
    title: "",
    description: "",
    author: "",
    timeframe: "",
    skill: "",
    img: "",
    lessons: [lesson],
  };

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [author, setAuthor] = useState(initial.author);
  const [timeframe, setTimeframe] = useState(initial.timeframe);
  const [skill, setSkill] = useState(initial.skill);
  const [img, setImg] = useState(initial.img);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [lessons, setLessons] = useState(initial.lessons);
  const [openLesson, setOpenLesson] = useState(0); // Track which lesson is open
  const [uploadingVideo, setUploadingVideo] = useState(null); // Track which lesson video is uploading
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [uploadXhr, setUploadXhr] = useState(null); // Store xhr reference for cancellation
  const [videoObjectUrls, setVideoObjectUrls] = useState({}); // Store object URLs for cleanup

  // Save form state to localStorage on change
  useEffect(() => {
    if (!courseId) {
      const formState = {
        title,
        description,
        author,
        timeframe,
        skill,
        img,
        lessons,
      };
      localStorage.setItem("newCourseForm", JSON.stringify(formState));
    }
  }, [title, description, author, timeframe, skill, img, lessons, courseId]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.values(videoObjectUrls).forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [videoObjectUrls]);

  useEffect(() => {
    if (page) {
      setCourseId(page);
      fetchCourseData(page);
    }
  }, [page]);

  const fetchCourseData = async (id) => {
    const courseRef = doc(db, "courses", id);
    const docSnap = await getDoc(courseRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTitle(data.title);
      setDescription(data.description);
      setAuthor(data.author);
      setTimeframe(data.timeframe);
      setSkill(data.skill);
      setLessons(data.lessons);
      setImg(data.imgUrl);
    } else {
      toast.error("Course not found!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFile(file);
    if (!file) return;

    // Show preview only
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  // const handleLessonInputChange = (index, field, value) => {
  //   const updatedObjects = [...lessons];
  //   updatedObjects[index] = { ...updatedObjects[index], [field]: value };
  //   setLessons(updatedObjects);
  // };
  const handleLessonInputChange = (index, field, value) => {
    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];

      // If the field is `task`, we need to merge objects
      if (field === "task") {
        updatedLessons[index] = {
          ...updatedLessons[index],
          [field]: {
            ...(prevLessons[index]?.[field] || {}), // Keep previous object data
            ...value, // Merge new value
          },
        };
      }
      // If the field is `editor`, it must be an array (for checkboxes)
      else if (field === "editor") {
        updatedLessons[index] = {
          ...updatedLessons[index],
          [field]: Array.isArray(value) ? value : [], // Ensure it's an array
        };
      }
      // For everything else (title, category, description), just assign directly
      else {
        updatedLessons[index] = {
          ...updatedLessons[index],
          [field]: value,
        };
      }

      return updatedLessons;
    });
  };

  const handleValidation = () => {
    const fields = [
      { key: "title", label: "Course Title" },
      { key: "description", label: "Description" },
      { key: "timeframe", label: "Timeframe" },
      { key: "author", label: "Author" },
      { key: "skill", label: "Skill Level" },
      { key: "img", label: "Course Image" },
    ];
    for (const field of fields) {
      if (!eval(field.key)) {
        toast.error(`Please fill in the '${field.label}' field.`);
        return false;
      }
    }
    return true;
  };

  const createOrUpdateCourse = async () => {
    if (!handleValidation()) return;
    setLoading(true);
    let imgUrl = img;

    // Upload image to Cloudinary if file exists and not already a Cloudinary URL
    if (file && (!img || !img.startsWith("https://res.cloudinary.com/"))) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your preset
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dcgbfycr6/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          imgUrl = data.secure_url;
        } else {
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }
      } catch (err) {
        toast.error("Image upload error");
        setLoading(false);
        return;
      }
    }

    const courseData = {
      title,
      description,
      timeframe,
      skill,
      lessons,
      author,
      imgUrl,
      slug: createSlug(title),
      enabled: false
    };

    if (courseId) {
      // Update existing course
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, courseData);
      toast("Course updated successfully!");
    } else {
      // Create new course
      await addDoc(collection(db, "courses"), courseData);
      toast("Course created successfully!");
    }

    // Clear localStorage after course creation
    localStorage.removeItem("newCourseForm");
    setLoading(false);
    router.push("/admin/courses");
  };

  const handleVideoChange = (e, lessonIndex) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid video file (MP4, WebM, OGG, AVI, MOV)');
      return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error('Video file size must be less than 100MB');
      return;
    }

    // Update lesson with video file
    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      updatedLessons[lessonIndex] = {
        ...updatedLessons[lessonIndex],
        videoFile: file,
        videoUrl: '' // Clear any existing URL
      };
      return updatedLessons;
    });

    // Create object URL for preview and store it
    const objectUrl = URL.createObjectURL(file);
    setVideoObjectUrls((prev) => ({
      ...prev,
      [lessonIndex]: objectUrl
    }));

    toast.success('Video selected successfully!');
  };

  const handleVideoUpload = async (lessonIndex) => {
    const lesson = lessons[lessonIndex];
    if (!lesson.videoFile) {
      toast.error('Please select a video file first');
      return;
    }

    setUploadingVideo(lessonIndex);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", lesson.videoFile);
      formData.append("upload_preset", "ml_default"); // Replace with your preset
      formData.append("resource_type", "video"); // Specify it's a video upload

      // Create XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      setUploadXhr(xhr);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(progress));
        }
      });

      xhr.addEventListener('load', async () => {
        setUploadXhr(null);
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.secure_url) {
              // Update lesson with video URL
              setLessons((prevLessons) => {
                const updatedLessons = [...prevLessons];
                updatedLessons[lessonIndex] = {
                  ...updatedLessons[lessonIndex],
                  videoUrl: data.secure_url,
                  videoFile: null // Clear the file after successful upload
                };
                return updatedLessons;
              });

              // Clean up object URL after successful upload
              if (videoObjectUrls[lessonIndex]) {
                URL.revokeObjectURL(videoObjectUrls[lessonIndex]);
                setVideoObjectUrls((prev) => {
                  const newUrls = { ...prev };
                  delete newUrls[lessonIndex];
                  return newUrls;
                });
              }

              toast.success('Video uploaded successfully!');
              setUploadingVideo(null);
              setUploadProgress(0);
            } else {
              throw new Error('Upload failed - no secure URL received');
            }
          } catch (error) {
            console.error('Error parsing response:', error);
            toast.error('Failed to process upload response');
            setUploadingVideo(null);
            setUploadProgress(0);
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            toast.error(`Video upload failed: ${errorData.error?.message || 'Unknown error'}`);
          } catch {
            toast.error('Video upload failed');
          }
          setUploadingVideo(null);
          setUploadProgress(0);
        }
      });

      xhr.addEventListener('error', () => {
        setUploadXhr(null);
        console.error('Upload error');
        toast.error('Video upload failed');
        setUploadingVideo(null);
        setUploadProgress(0);
      });

      xhr.addEventListener('abort', () => {
        setUploadXhr(null);
        toast.error('Video upload was cancelled');
        setUploadingVideo(null);
        setUploadProgress(0);
      });

      // Send the request
      xhr.open('POST', 'https://api.cloudinary.com/v1_1/dcgbfycr6/video/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload setup error:', error);
      toast.error('Video upload failed');
      setUploadingVideo(null);
      setUploadProgress(0);
      setUploadXhr(null);
    }
  };

  const cancelVideoUpload = () => {
    if (uploadXhr) {
      uploadXhr.abort();
      setUploadXhr(null);
    }
  };

  return (
    <AdminLayout header={false}>
      {content ? (
        <div className="mx-auto py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-purple-900">Course Content</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="border rounded-full border-purple text-purple px-6 py-2 font-semibold hover:bg-purple/10 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => setLessons([...lessons, lesson])}
                className="border rounded-full border-purple text-purple px-6 py-2 font-semibold hover:bg-purple/10 transition-colors"
              >
                Add Lesson <span className="font-medium ml-3">+</span>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {lessons.map((single, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4">
                <button
                  type="button"
                  className={`w-full flex justify-between items-center py-3 px-4 rounded-lg focus:outline-none transition-colors ${openLesson === index ? 'bg-purple/10' : 'bg-gray-50'}`}
                  onClick={() => setOpenLesson(openLesson === index ? -1 : index)}
                >
                  <span className="font-bold text-lg text-purple-800">Lesson {index + 1}: {single.title || 'Untitled'}</span>
                  <span className="ml-2 text-purple-600">{openLesson === index ? '▲' : '▼'}</span>
                </button>
                {openLesson === index && (
                  <div className="pt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="font-semibold text-sm text-gray-700">Lesson Title</label>
                        <input
                          onChange={(e) => handleLessonInputChange(index, "title", e.target.value)}
                          value={single.title}
                          type="text"
                          className="p-3 rounded-md w-full mt-2 border border-gray-200 focus:border-purple focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-sm text-gray-700">Lesson Subtitle (Optional)</label>
                        <input
                          onChange={(e) => handleLessonInputChange(index, "subtitle", e.target.value)}
                          value={single.subtitle}
                          type="text"
                          className="p-3 rounded-md w-full mt-2 border border-gray-200 focus:border-purple focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="font-semibold text-sm text-gray-700">Lesson Category</label>
                        <select
                          onChange={(e) => handleLessonInputChange(index, "category", e.target.value)}
                          value={single.category}
                          className="p-3 rounded-md w-full mt-2 border border-gray-200 focus:border-purple focus:outline-none"
                        >
                          <option className="hidden" value="">Select Lesson Category</option>
                          <option value="video">Video</option>
                          <option value="article">Article</option>
                        </select>
                      </div>
                      {single.handsOn && <div>
                        <label className="font-semibold text-sm text-gray-700">Lesson Code Editor</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {["HTML", "CSS", "JS", "Solidity"].map((option) => (
                            <label key={option} className="flex items-center gap-2 bg-purple/5 px-3 py-2 rounded-full">
                              <input
                                type="checkbox"
                                value={option}
                                checked={single.editor.includes(option)}
                                onChange={(e) => {
                                  const selectedEditors = single.editor.includes(option)
                                    ? single.editor.filter((lang) => lang !== option)
                                    : [...single.editor, option];
                                  handleLessonInputChange(index, "editor", selectedEditors);
                                }}
                                className="accent-purple"
                              />
                              <span className="capitalize text-purple-700 font-medium">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>}
                    </div>
                    <div className="mb-4">
                      <label className="font-semibold text-sm text-gray-700">Hands On</label>
                      <div className="mt-2">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={single.handsOn}
                            onChange={(e) => handleLessonInputChange(index, "handsOn", e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    {single.editor.map((lang, idx) => (
                      <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                        <div>
                          <label className="font-semibold text-sm text-gray-700">{lang} Task Description</label>
                          <textarea
                            onChange={(e) => {
                              handleLessonInputChange(index, "task", {
                                ...single.task,
                                [lang]: {
                                  ...((single.task ?? {})[lang] || {}),
                                  description: e.target.value,
                                },
                              });
                            }}
                            value={single.task?.[lang]?.description || ""}
                            className="w-full mt-2 p-3 rounded-md h-20 border border-gray-200 focus:border-purple focus:outline-none"
                          ></textarea>
                        </div>
                        <div>
                          <label className="font-semibold text-sm text-gray-700">{lang} Boilerplate Code</label>
                          <textarea
                            onChange={(e) => {
                              handleLessonInputChange(index, "task", {
                                ...single.task,
                                [lang]: {
                                  ...((single.task ?? {})[lang] || {}),
                                  boilerplate: e.target.value,
                                },
                              });
                            }}
                            value={single.task?.[lang]?.boilerplate || ""}
                            className="w-full mt-2 p-3 rounded-md h-20 border border-gray-200 focus:border-purple focus:outline-none"
                          ></textarea>
                        </div>
                        <div>
                          <label className="font-semibold text-sm text-gray-700">{lang} Task Solution</label>
                          <textarea
                            onChange={(e) => {
                              handleLessonInputChange(index, "task", {
                                ...single.task,
                                [lang]: {
                                  ...((single.task ?? {})[lang] || {}),
                                  solution: e.target.value,
                                },
                              });
                            }}
                            value={single.task?.[lang]?.solution || ""}
                            className="w-full mt-2 p-3 rounded-md h-20 border border-gray-200 focus:border-purple focus:outline-none"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    {single.category === "video" && (
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Image className="w-8" src="/file_upload.png" alt="" width={32} height={32} />
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoChange(e, index)}
                            className="hidden"
                            ref={uploadRef}
                          />
                          <button
                            type="button"
                            className="text-purple underline text-sm hover:text-purple/80 transition-colors"
                            onClick={() => uploadRef.current.click()}
                          >
                            Click to upload video
                          </button>
                        </div>

                        {/* Video Preview */}
                        {single.videoFile && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{single.videoFile?.name || 'Unknown file'}</p>
                                <p className="text-sm text-gray-500">
                                  {single.videoFile ? `${(single.videoFile.size / (1024 * 1024)).toFixed(2)} MB • ${single.videoFile.type || 'Unknown type'}` : 'File information not available'}
                                </p>
                              </div>
                            </div>

                            {/* Video Preview Player */}
                            <div className="mt-3 mb-3">
                              {videoObjectUrls[index] && single.videoFile ? (
                                <video
                                  controls
                                  className="w-full max-w-md rounded-lg border border-gray-200"
                                  preload="metadata"
                                >
                                  <source src={videoObjectUrls[index]} type={single.videoFile.type || 'video/mp4'} />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <div className="w-full max-w-md h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                  <p className="text-gray-500 text-sm">Video preview not available</p>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVideoUpload(index)}
                                className="px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/80 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={uploadingVideo === index}
                              >
                                {uploadingVideo === index ? (
                                  <>
                                    <Spinner />
                                    Uploading... {uploadProgress}%
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Video
                                  </>
                                )}
                              </button>
                              {uploadingVideo === index ? (
                                <button
                                  onClick={cancelVideoUpload}
                                  className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    // Revoke object URL to prevent memory leak
                                    if (videoObjectUrls[index]) {
                                      URL.revokeObjectURL(videoObjectUrls[index]);
                                      setVideoObjectUrls((prev) => {
                                        const newUrls = { ...prev };
                                        delete newUrls[index];
                                        return newUrls;
                                      });
                                    }
                                    setLessons((prevLessons) => {
                                      const updatedLessons = [...prevLessons];
                                      updatedLessons[index] = {
                                        ...updatedLessons[index],
                                        videoFile: null
                                      };
                                      return updatedLessons;
                                    });
                                  }}
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            {/* Progress Bar */}
                            {uploadingVideo === index && (
                              <div className="mt-3">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Upload Progress</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-purple h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Uploaded Video Display */}
                        {single.videoUrl && (
                          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-green-900">Video uploaded successfully!</p>
                                <p className="text-sm text-green-700">Video is ready to be viewed</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <video
                                controls
                                className="w-full max-w-md rounded-lg border border-gray-200"
                                preload="metadata"
                              >
                                <source src={single.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <label className="font-semibold text-sm text-gray-700">Description</label>
                          <textarea
                            onChange={(e) => handleLessonInputChange(index, "description", e.target.value)}
                            value={single.description}
                            className="w-full mt-2 p-3 rounded-md h-20 border border-gray-200 focus:border-purple focus:outline-none"
                          ></textarea>
                        </div>
                      </div>
                    )}
                    {single.category === "article" && (
                      <div className="mb-4">
                        <MdEditor
                          modelValue={single.body}
                          onChange={(e) => handleLessonInputChange(index, "body", e)}
                          language="en-US"
                          toolbars={["bold", "underline", "italic", "strikeThrough", "title", "sub", "sup", "quote", "unorderedList", "orderedList", "link", "code"]}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button
              onClick={createOrUpdateCourse}
              className="p-4 w-full text-white bg-purple rounded-xl font-bold text-lg shadow hover:bg-purple/80 transition-colors"
            >
              {loading ? <Spinner /> : "Save Course"}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-8">
            {page ? "Edit Course" : "Course Upload"}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="w-full bg-white p-6 rounded-xl shadow mb-6 flex flex-col items-center">
                {img ? (
                  <Image className="mx-auto rounded-xl w-full h-48 object-cover" src={img} alt="Course" width={400} height={200} style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="bg-purple/5 p-6 rounded-xl w-full h-48 flex items-center justify-center">
                    <Image className="mx-auto w-16 h-16" src="/file_upload.png" alt="Upload" width={64} height={64} />
                  </div>
                )}
                <input
                  id={`img`}
                  type="file"
                  onChange={handleFileChange}
                  ref={uploadRef}
                  className="hidden"
                />
                <button
                  onClick={() => uploadRef.current.click()}
                  className="border rounded-full border-purple px-6 py-2 w-full bg-white text-purple mt-4 font-semibold hover:bg-purple/10 transition-colors"
                >
                  Browse file
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow p-8">
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-700">Course Title</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="bg-white mt-2 rounded-md p-3 w-full border border-gray-200 focus:border-purple focus:outline-none"
                    placeholder="Enter Course Title"
                  />
                </div>
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-700">Description</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="bg-white mt-2 rounded-md h-32 p-3 w-full border border-gray-200 focus:border-purple focus:outline-none"
                    placeholder="Enter Course Description"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-700">Timeframe</label>
                  <input
                    onChange={(e) => setTimeframe(e.target.value)}
                    value={timeframe}
                    type="text"
                    className="bg-white mt-2 rounded-md p-3 w-full border border-gray-200 focus:border-purple focus:outline-none"
                    placeholder="E.g Two (2) Weeks"
                  />
                </div>
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-700">Author</label>
                  <input
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    type="text"
                    className="bg-white mt-2 rounded-md p-3 w-full border border-gray-200 focus:border-purple focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="mb-6">
                  <label className="font-semibold text-sm text-gray-700">Skill Level</label>
                  <select
                    onChange={(e) => setSkill(e.target.value)}
                    value={skill}
                    className="bg-white mt-2 rounded-md p-3 w-full border border-gray-200 focus:border-purple focus:outline-none"
                  >
                    <option value="" className="hidden">Select Skill</option>
                    <option value="beginners">Beginners</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advance">Advance</option>
                  </select>
                </div>
                <div className="mt-8">
                  <Link href={"?content=true"}>
                    <button className="bg-purple w-full p-4 rounded-xl text-white font-bold text-lg shadow hover:bg-purple/80 transition-colors">
                      Next
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default NewCourse;

"use client";

import AdminLayout from "@/src/layouts/AdminLayout";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createSlug } from "@/src/utils/createSlug";
import Spinner from "@/src/components/Spinner";
import { toast } from "react-toastify";

const storage = getStorage();

const NewCourse = () => {
  const content = useSearchParams().get("content");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [skill, setSkill] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [courseId, setCourseId] = useState("");
  // const [video, setVideo] = useState("")
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
  const [lessons, setLessons] = useState([lesson]);
  const [invalidFields, setInvalidFields] = useState([]);

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
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result?.toString() || "");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
    const missing = [];
    if (!title) missing.push("title");
    if (!description) missing.push("description");
    if (!timeframe) missing.push("timeframe");
    if (!author) missing.push("author");
    if (!skill) missing.push("skill");
    if (!img) missing.push("img");

    setInvalidFields(missing);

    if (missing.length > 0) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const createOrUpdateCourse = async () => {
    if (!handleValidation()) return;
    setLoading(true);
    let imgUrl = img;
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.error("Upload failed", error);
        },
        async () => {
          imgUrl = await getDownloadURL(uploadTask.snapshot.ref());
        }
      );
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

    setLoading(false);
    router.push("/admin/courses");
  };

  return (
    <AdminLayout header={false}>
      {content ? (
        <div>
          <div className="lg:flex justify-between">
            <h1 className="text-4xl font-bold">Course Content</h1>

            <div className="flex justify-between w-[30%]">
              <button
                onClick={() => router.back()}
                className="border sm:mt-4 rounded-md border-purple text-purple p-3"
              >
                Go Back
              </button>
              <button
                onClick={() => setLessons([...lessons, lesson])}
                className="border sm:mt-4 rounded-md border-purple text-purple p-3"
              >
                Add Lesson <span className="font-medium ml-3">+</span>
              </button>
            </div>
          </div>
          <div>
            {lessons.map((single, index) => (
              <div key={index}>
                <h2 className="font-bold my-3 text-lg">Lesson {index + 1}</h2>
                <div className="lg:flex justify-between lg:my-3">
                  <div className="lg:w-[49%] sm:my-3">
                    <label htmlFor="">Lesson Title</label>
                    <input
                      onChange={(e) =>
                        handleLessonInputChange(index, "title", e.target.value)
                      }
                      value={single.title}
                      type="text"
                      className="p-3 rounded-md w-full mt-2"
                    />
                  </div>
                  <div className="lg:w-[49%] sm:my-3">
                    <label htmlFor="">Lesson Subtitle (Optional)</label>
                    <input
                      onChange={(e) =>
                        handleLessonInputChange(
                          index,
                          "subtitle",
                          e.target.value
                        )
                      }
                      value={single.subtitle}
                      type="text"
                      className="p-3 rounded-md w-full mt-2"
                    />
                  </div>
                </div>
                <div className="lg:flex justify-between lg:my-3">
                  <div className="lg:w-[49%] sm:my-3">
                    <label htmlFor="">Lesson Category</label>
                    <select
                      onChange={(e) =>
                        handleLessonInputChange(
                          index,
                          "category",
                          e.target.value
                        )
                      }
                      value={single.category}
                      name=""
                      className="p-3 rounded-md w-full mt-2"
                      id=""
                    >
                      <option className="hidden" value="">
                        Select Lesson Category
                      </option>
                      <option value="video">Video</option>
                      <option value="article">Article</option>
                    </select>
                  </div>
                  {single.handsOn && (
                    <div className="lg:w-[49%] sm:my-3">
                      <label htmlFor="">Lesson Code Editor</label>
                      <div className="flex flex-col mt-2">
                        {["html", "css", "js", "solidity"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              value={option}
                              checked={single.editor.includes(option)}
                              onChange={(e) => {
                                const selectedEditors = single.editor.includes(
                                  option
                                )
                                  ? single.editor.filter(
                                    (lang) => lang !== option
                                  )
                                  : [...single.editor, option];
                                handleLessonInputChange(
                                  index,
                                  "editor",
                                  selectedEditors
                                );
                              }}
                              className="mr-2"
                            />
                            <span className="capitalize">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="lg:flex justify-between lg:my-3">
                  <div className="lg:w-[49%] sm:my-3">
                    <label htmlFor="">Hands On</label>
                    <div className="mt-3">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={single.handsOn}
                          onChange={(e) =>
                            handleLessonInputChange(
                              index,
                              "handsOn",
                              e.target.checked
                            )
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                      {/* <input type="checkbox" className='p-3' checked={single.handsOn} /> */}
                    </div>
                  </div>
                </div>
                {single.editor.map((lang, index) => (
                  <div key={index}>
                    <div className="lg:flex justify-between lg:my-3">
                      <div className="lg:w-[49%] my-3">
                        <label htmlFor="">{lang} Task Description</label>
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
                          name=""
                          id=""
                          className="w-full mt-2 p-3 rounded-md h-20"
                        ></textarea>
                      </div>
                      <div className=" lg:w-[49%] my-3">
                        <label htmlFor="">{lang} Boilerplate Code</label>
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
                          name=""
                          id=""
                          className="w-full mt-2 p-3 rounded-md h-20"
                        ></textarea>
                      </div>
                    </div>
                    <div className="lg:flex justify-between lg:my-3">
                      <div className="lg:w-[49%] my-3">
                        <label htmlFor="">{lang} Task Solution</label>
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
                          name=""
                          id=""
                          className="w-full mt-2 p-3 rounded-md h-20"
                        ></textarea>
                      </div>

                      {/* {(lang === "html" || lang === "css") && (
                        <div className="lg:w-[49%] my-3">
                          <label htmlFor="">{lang} Expected Output</label>

                          <textarea
                            name=""
                            id=""
                            className="w-full mt-2 p-3 rounded-md h-20"
                            value={single.task?.[lang]?.expectedOutput || ""}
                            onChange={(e) => {
                              handleLessonInputChange(index, "task", {
                                ...single.task,
                                [lang]: {
                                  ...single.task[lang],
                                  expectedOutput: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                      )} */}
                    </div>

                    {/* <div className="lg:flex justify-between lg:my-3">
                      {(lang === "js" || lang === "solidity") && (
                        <div className="lg:w-[49%] my-3">
                          <h4>{lang} Test Cases</h4>

                          {(single.task?.[lang]?.testCases || []).map(
                            (test, i) => (
                              <div key={i} className="test-case">
                                <input
                                  type="text"
                                  placeholder="Input (comma-separated)"
                                  className="bg-white mt-2 rounded-md p-3 w-full mb-3"
                                  value={test.input?.join(", ") || ""}
                                  onChange={(e) => {
                                    const newTestCases = [
                                      ...(single.task[lang]?.testCases || []),
                                    ];
                                    newTestCases[i] = {
                                      ...newTestCases[i],
                                      input: e.target.value
                                        .split(",")
                                        .map((x) => x.trim()),
                                    };
                                    handleLessonInputChange(index, "task", {
                                      ...single.task,
                                      [lang]: {
                                        ...single.task[lang],
                                        testCases: newTestCases,
                                      },
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  className="bg-white mt-2 rounded-md p-3 w-full mb-3"
                                  placeholder="Expected Output"
                                  value={test.expectedOutput || ""}
                                  onChange={(e) => {
                                    const newTestCases = [
                                      ...(single.task[lang]?.testCases || []),
                                    ];
                                    newTestCases[i] = {
                                      ...newTestCases[i],
                                      expectedOutput: e.target.value,
                                    };
                                    handleLessonInputChange(index, "task", {
                                      ...single.task,
                                      [lang]: {
                                        ...single.task[lang],
                                        testCases: newTestCases,
                                      },
                                    });
                                  }}
                                />
                                <button className="p-3 w-[1/3] text-white bg-purple rounded-md mb-5"
                                  onClick={() => {
                                    const newTestCases = (
                                      single.task[lang]?.testCases || []
                                    ).filter((_, idx) => idx !== i);
                                    handleLessonInputChange(index, "task", {
                                      ...single.task,
                                      [lang]: {
                                        ...single.task[lang],
                                        testCases: newTestCases,
                                      },
                                    });
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            )
                          )}

                          <button className="p-3 w-[1/3] text-white bg-purple rounded-md "
                            onClick={() => {
                              const newTestCases = [
                                ...(single.task?.[lang]?.testCases || []),
                                { input: [], expectedOutput: "" },
                              ];
                              handleLessonInputChange(index, "task", {
                                ...single.task,
                                [lang]: {
                                  ...(single.task?.[lang] || {}),
                                  testCases: newTestCases,
                                },
                              });
                            }}
                          >
                            Add Test Case
                          </button>
                        </div>
                      )}
                    </div> */}
                  </div>
                ))}

                {single.category === "video" && (
                  <div>
                    <div className="my-3">
                      <div className="flex">
                        <img className="w-8" src="/file_upload.png" alt="" />
                        <input
                          type="file"
                          onChange={(e) => handleVideoChange(e, index)}
                          className="my-2 w-[100%] hidden max-w-[400px] lg:w-[100rem]"
                          ref={uploadRef}
                        />
                        <p
                          className="my-auto ml-3"
                          onClick={() => uploadRef.current.click()}
                        >
                          CLick to upload video
                        </p>
                      </div>
                      {single.videoFile && (
                        <button
                          onClick={() => handleVideoUpload(index)}
                          className="p-2 mt-2 bg-purple text-white rounded-md"
                        >
                          Upload Video
                        </button>
                      )}
                      {single.videoUrl && (
                        <p className="text-green-500 mt-2">
                          Video uploaded successfully!
                        </p>
                      )}
                    </div>
                    <div className="my-3">
                      <label htmlFor="">Description</label>
                      <textarea
                        onChange={(e) =>
                          handleLessonInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        value={single.description}
                        name=""
                        id=""
                        className="w-full mt-2 p-3 rounded-md h-20"
                      ></textarea>
                    </div>
                  </div>
                )}
                {single.category === "article" && (
                  <div>
                    <MdEditor
                      modelValue={single.body}
                      onChange={(e) =>
                        handleLessonInputChange(index, "body", e)
                      }
                      language="en-US"
                      toolbars={[
                        "bold",
                        "underline",
                        "italic",
                        "strikeThrough",
                        "title",
                        "sub",
                        "sup",
                        "quote",
                        "unorderedList",
                        "orderedList",
                        "link",
                        "code",
                      ]}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => createOrUpdateCourse()}
              className="p-3 w-full text-white bg-purple rounded-md "
            >
              {loading ? <Spinner /> : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">
            {page ? "Edit Course" : "Course Upload"}
          </h1>
          <div className="lg:flex mt-5 justify-between">
            <div className="lg:w-[27%] lg:order-1 mt-11">
              {img ? (
                <img className="mx-auto" src={img} alt="" />
              ) : (
                <div className={`bg-white p-6 rounded-md w-full ${invalidFields.includes("img") ? "border border-[#EB1515]" : ""}`}>
                  <img className="mx-auto" src="/file_upload.png" alt="" />
                </div>
              )}
              {invalidFields.includes("img") && (
                <span className="text-[#EB1515] text-xs block text-center mt-2">Course image is required.</span>
              )}
              <input
                id={`img`}
                type="file"
                onChange={(e) => handleFileChange(e)}
                ref={uploadRef}
                className="my-2 w-[100%] hidden max-w-[400px] lg:w-[100rem]"
              />
              <button
                onClick={() => uploadRef.current.click()}
                className="border rounded-md border-purple p-3 w-full bg-white text-purple mt-4"
              >
                Browse file
              </button>
            </div>
            <div className="lg:w-[70%] lg:order-0">
              <div className="my-3">
                <label className="test-sm" htmlFor="">
                  Course Title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  className={`bg-white mt-2 rounded-md p-3 w-full ${invalidFields.includes("title") ? "border border-[#EB1515]" : ""}`}
                  placeholder="Enter Course Title"
                />
                {invalidFields.includes("title") && (
                  <span className="text-[#EB1515] text-xs">Course title is required.</span>
                )}
              </div>
              <div className="my-3">
                <label className="test-sm" htmlFor="">
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name=""
                  id=""
                  className={`bg-white mt-2 rounded-md h-32 p-3 w-full ${invalidFields.includes("description") ? "border border-[#EB1515]" : ""}`}
                  placeholder="Enter Course Description"
                ></textarea>
                {invalidFields.includes("description") && (
                  <span className="text-[#EB1515] text-xs">Description is required.</span>
                )}
              </div>
              <div className="my-3">
                <label className="test-sm" htmlFor="">
                  Timeframe
                </label>
                <input
                  onChange={(e) => setTimeframe(e.target.value)}
                  value={timeframe}
                  type="text"
                  className={`bg-white mt-2 rounded-md p-3 w-full ${invalidFields.includes("timeframe") ? "border border-[#EB1515]" : ""}`}
                  placeholder="E.g Two (2) Weeks"
                />
                {invalidFields.includes("timeframe") && (
                  <span className="text-[#EB1515] text-xs">Timeframe is required.</span>
                )}
              </div>
              <div className="my-3">
                <label className="test-sm" htmlFor="">
                  Author
                </label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  type="text"
                  className={`bg-white mt-2 rounded-md p-3 w-full ${invalidFields.includes("author") ? "border border-[#EB1515]" : ""}`}
                  placeholder="John Doe"
                />
                {invalidFields.includes("author") && (
                  <span className="text-[#EB1515] text-xs">Author is required.</span>
                )}
              </div>
              <div className="my-3">
                <label className="test-sm" htmlFor="">
                  Skill Level
                </label>
                <select
                  onChange={(e) => setSkill(e.target.value)}
                  value={skill}
                  className={`bg-white mt-2 rounded-md p-3 w-full ${invalidFields.includes("skill") ? "border border-[#EB1515]" : ""}`}
                  name=""
                  id=""
                >
                  <option value="" className="hidden">
                    Select Skill
                  </option>
                  <option value="beginners">Beginners</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advance">Advance</option>
                </select>
                {invalidFields.includes("skill") && (
                  <span className="text-[#EB1515] text-xs">Skill level is required.</span>
                )}
              </div>
              <div className="my-3">
                <Link href={"?content=true"}>
                  <button className="bg-purple w-full p-3 rounded-md text-white">
                    Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default NewCourse;

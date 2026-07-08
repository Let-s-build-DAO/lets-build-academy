import { v2MvpCourses } from "./v2-mvp-courses";
import { consensusBridgeCourse } from "./consensus-bridge";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const BUILTIN_COURSES = [consensusBridgeCourse, ...v2MvpCourses].filter(Boolean);

const SIMULATION_TYPE_MAP = {
  hash: "hash",
  puzzle: "puzzle",
  blockchain: "blockchain",
};

/** Normalize a legacy lesson into a V2 interaction shape */
export function normalizeLesson(lesson = {}) {
  if (lesson.interactionType) return lesson;

  if (lesson.simulationType && SIMULATION_TYPE_MAP[lesson.simulationType]) {
    return {
      ...lesson,
      interactionType: SIMULATION_TYPE_MAP[lesson.simulationType],
    };
  }

  const body = lesson.content || lesson.body || "";
  if (body.trim()) {
    const isHtml = /<[a-z][\s\S]*>/i.test(body);
    const steps = isHtml
      ? [{ text: body }]
      : body
          .split(/\n\n+/)
          .filter(Boolean)
          .map((chunk) => ({
            text: `<p>${chunk.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`,
          }));
    return {
      ...lesson,
      title: lesson.title || "Lesson",
      interactionType: "ProgressiveReveal",
      interactionData: { steps },
    };
  }

  return {
    ...lesson,
    title: lesson.title || "Lesson",
    interactionType: "ProgressiveReveal",
    interactionData: {
      steps: [{ text: "<p>This lesson is being upgraded to the new interactive format.</p>" }],
    },
  };
}

/** Ensure every course runs through the V2 engine */
export function normalizeCourse(course) {
  if (!course) return null;
  return {
    ...course,
    version: "2.0",
    lessons: (course.lessons || []).map(normalizeLesson),
  };
}

export function getBuiltinCourses() {
  return BUILTIN_COURSES.map((c) => normalizeCourse({ ...c }));
}

export function getBuiltinCourseById(id) {
  const found = BUILTIN_COURSES.find((c) => c.id === id);
  return found ? normalizeCourse({ ...found }) : null;
}

export async function fetchCourseById(db, id) {
  const local = getBuiltinCourseById(id);
  if (local) return local;

  const docSnap = await getDoc(doc(db, "courses", id));
  if (!docSnap.exists()) return null;

  return normalizeCourse({ id: docSnap.id, ...docSnap.data() });
}

export async function fetchEnabledCourses(db) {
  const local = getBuiltinCourses();
  const localIds = new Set(local.map((c) => c.id));

  let remote = [];
  try {
    const q = query(collection(db, "courses"), where("enabled", "==", true));
    const snap = await getDocs(q);
    remote = snap.docs
      .filter((d) => !localIds.has(d.id))
      .map((d) => normalizeCourse({ id: d.id, ...d.data() }));
  } catch {
    remote = [];
  }

  return [...local, ...remote];
}

/** All courses for admin — includes disabled Firestore courses */
export async function fetchAllCourses(db) {
  const local = getBuiltinCourses();
  const localIds = new Set(local.map((c) => c.id));

  let remote = [];
  try {
    const snap = await getDocs(collection(db, "courses"));
    remote = snap.docs
      .filter((d) => !localIds.has(d.id))
      .map((d) => normalizeCourse({ id: d.id, ...d.data() }));
  } catch {
    remote = [];
  }

  return [...local, ...remote];
}

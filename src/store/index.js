import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// export const userAtom = atomWithStorage(null)

export const userAtom = atomWithStorage("user", { id: null });

export const checkLessonTask = atomWithStorage("lessonTask", false);

// academy@letsbuildlabs.org

import { atomWithStorage } from "jotai/utils";

// export const userAtom = atomWithStorage(null)

export const userAtom = atomWithStorage("user", { id: null });

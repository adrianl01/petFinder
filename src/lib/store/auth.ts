import { atom } from "recoil";

export const authAtom = atom<{
  token: string | null;
  email: string | null;
}>({
  key: "authAtom",
  default: {
    token: null,
    email: null,
  },
});
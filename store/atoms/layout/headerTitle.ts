import { atom } from "recoil";

export const headerTitleState = atom<string>({
  key: "headerTitleState",
  default: "",
});

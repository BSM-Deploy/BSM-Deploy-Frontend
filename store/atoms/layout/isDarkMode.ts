import { atom } from "recoil";

export const isDarkModeState = atom<boolean>({
  key: "isDarkModeState",
  default: false,
});

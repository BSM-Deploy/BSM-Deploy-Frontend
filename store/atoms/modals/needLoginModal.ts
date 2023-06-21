import { atom } from "recoil";

export const needLoginModalState = atom<boolean>({
  key: "needLoginModalState",
  default: false,
});

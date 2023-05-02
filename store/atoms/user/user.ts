import { atom } from "recoil";

export const userIsLogin = atom<boolean>({
  key: "UserState",
  default: false,
});
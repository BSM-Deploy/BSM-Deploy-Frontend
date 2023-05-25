import { atom } from "recoil";

export const openSidebarState = atom<boolean>({
  key: "OpenSidebarState",
  default: false,
});

import { atom } from "recoil";

export const settingModalState = atom<boolean>({
  key: "SettingModalState",
  default: false,
});

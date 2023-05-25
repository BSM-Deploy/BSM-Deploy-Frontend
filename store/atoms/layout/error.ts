import { atom } from "recoil";

export const errorMessageState = atom<string>({
  key: "ErrorMessageState",
  default: "",
});

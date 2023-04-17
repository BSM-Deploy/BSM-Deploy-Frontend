import { atom } from "recoil";

export const exampleModalState = atom<boolean>({
  key: "ExampleModalState",
  default: false,
});

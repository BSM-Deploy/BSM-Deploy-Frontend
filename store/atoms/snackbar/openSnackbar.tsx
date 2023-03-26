import { SnackbarType } from "@/types/Setting";
import { atom } from "recoil";

export const openSnackbarState = atom<SnackbarType>({
  key: "OpenSnackbarState",
  default: {
    open: false,
    vertical: "bottom",
    horizontal: "right",
  },
});
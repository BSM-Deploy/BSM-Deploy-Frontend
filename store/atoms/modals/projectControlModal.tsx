import { ProjectControlModalType } from "@/types/project";
import { atom } from "recoil";

export const projectControlModalState = atom<ProjectControlModalType>({
  key: "ProjectControlModal",
  default: {
    isOpen: false,
    id: 0,
    modalType: "CANCEL_DEPLOY",
  },
});

import { projectControlModalState } from "@/store/atoms/modals/projectControlModal";
import { ProjectType } from "@/types/project";
import { cancelDeploy } from "@/utils/api/deploy";
import { deleteProject } from "@/utils/api/project";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdClear } from "react-icons/md";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

function ProjectControlModal({ data }: { data: ProjectType }) {
  const [projectControlModal, setProjectControlModal] = useRecoilState(
    projectControlModalState
  );

  const router = useRouter();

  const isCancelType = () => {
    return modalType === "CANCEL_DEPLOY";
  };

  const closeModal = () => {
    setProjectControlModal({
      id: 0,
      isOpen: false,
      modalType: "CANCEL_DEPLOY",
    });
  };

  const cancelDeployMutation = useMutation({
    mutationFn: () => cancelDeploy(id),
    onSuccess: () => {
      closeModal();
      data.isDeploy = false;
    },
  });
  const deleteProjectMutation = useMutation(() => deleteProject(id), {
    onSuccess: () => {
      closeModal();
      router.replace("/project");
    },
  });

  const { isOpen, id, modalType } = projectControlModal;
  return (
    <Modal open={isOpen} onClose={() => closeModal()}>
      <div className="w-[40rem] flex p-6 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <h1 className="dark:text-textLightGray text-[2.5rem] font-bold text-center">
          {isCancelType() ? "배포 취소" : "프로젝트 삭제"}
        </h1>
        <button
          className="gray-button absolute top-4 right-4"
          onClick={() => closeModal()}
        >
          <MdClear className="dark:text-textLightGray" size={44} />
        </button>
        <h1 className="text-2xl text-center font-bold mt-4 mb-4">
          정말 {isCancelType() ? "배포를 취소" : "프로젝트를 삭제"}하시겠습니까?
        </h1>
        <button
          className="bg-red w-full py-[1.4rem] font-2xl font-bold rounded-lg"
          onClick={() => {
            isCancelType()
              ? cancelDeployMutation.mutate()
              : deleteProjectMutation.mutate();
          }}
        >
          {isCancelType() ? "배포 취소하기" : "프로젝트 삭제하기"}
        </button>
      </div>
    </Modal>
  );
}

export default ProjectControlModal;

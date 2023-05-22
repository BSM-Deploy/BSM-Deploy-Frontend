import useException from "@/hooks/useException";
import { projectControlModalState } from "@/store/atoms/modals/projectControlModal";
import { ProjectType } from "@/types/project";
import { cancelDeploy, deployProject } from "@/utils/api/deploy";
import { deleteProject } from "@/utils/api/project";
import { Modal } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { MdClear } from "react-icons/md";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { ExceptionType } from "@/types/exception";

function ProjectControlModal({ data }: { data: ProjectType }) {
  const [projectControlModal, setProjectControlModal] = useRecoilState(
    projectControlModalState
  );
  const { exceptionHandler } = useException();

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

  const deployProjectMutation = useMutation(() => deployProject(id), {
    onSuccess: () => {
      setTimeout(() => {
        data.isDeploy = true;
        closeModal();
      }, 1000);
    },
    onError: (error: AxiosError) => {
      exceptionHandler(error.response?.data as ExceptionType);
    },
  });

  const { isOpen, id, modalType } = projectControlModal;
  return (
    <Modal open={isOpen} onClose={() => closeModal()}>
      <div className="w-[400px] flex p-[15px] rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <h1 className="dark:text-textLightGray text-[25px] font-bold text-center">
          {(() => {
            switch (modalType) {
              case "CANCEL_DEPLOY":
                return "배포 취소";
              case "DELETE_PROJECT":
                return "프로젝트 삭제";
              case "DEPLOY_PROJECT":
                return "프로젝트 배포";
            }
          })()}
        </h1>
        <button
          className="gray-button absolute top-4 right-4"
          onClick={() => closeModal()}
        >
          <MdClear className="dark:text-textLightGray" size={44} />
        </button>
        {modalType === "DEPLOY_PROJECT" ? (
          <div className="flex items-center justify-center gap-[17.5px] mt-[25px]">
            <button
              onClick={() => deployProjectMutation.mutate()}
              className="blue-button w-[45%] text-[15px] h-[50px] font-bold"
            >
              배포하기
            </button>
            <button
              onClick={() => {
                closeModal();
                router.push(`/upload/${id}`);
              }}
              className="blue-button w-[45%] text-[15px] h-[50px] font-bold"
            >
              파일/폴더 업로드하기
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-[15px] text-center font-bold mt-[10px] mb-[10px]">
              정말 {isCancelType() ? "배포를 취소" : "프로젝트를 삭제"}
              하시겠습니까?
            </h1>
            <button
              className="bg-red w-full py-[14px] text-[15px] font-bold rounded-lg"
              onClick={() => {
                isCancelType()
                  ? cancelDeployMutation.mutate()
                  : deleteProjectMutation.mutate();
              }}
            >
              {isCancelType() ? "배포 취소하기" : "프로젝트 삭제하기"}
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

export default ProjectControlModal;

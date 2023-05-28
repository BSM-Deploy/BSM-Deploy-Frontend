import { ProjectType } from "@/types/project";
import { getContainerLog } from "@/utils/api/container";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { useOnClickOutside } from "usehooks-ts";
import ProjectControlModal from "@/components/modals/ProjectControlModal";
import { projectControlModalState } from "@/store/atoms/modals/projectControlModal";

function ProjectDetailSection({ data }: { data: ProjectType }) {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isView, setIsView] = useState(false);
  const [projectControlModal, setProjectControlModal] = useRecoilState(
    projectControlModalState
  );

  const whiteList = ["BUILT_NEXT_JS", "BUILT_SPRING_JAR"];

  const { isLoading: containerIsLoading, data: containerData } = useQuery<
    string,
    Error
  >("container", () => getContainerLog(String(router.query.projectId)), {
    enabled:
      router.isReady &&
      data?.isDeploy &&
      Boolean(whiteList.indexOf(data?.projectType)),
    refetchInterval: 3000,
  });
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (isOpenMenu) {
      setIsView(false);
      setTimeout(() => {
        setIsOpenMenu(false);
      }, 150);
    }
  });

  const toggleMenu = () => {
    if (!isOpenMenu) {
      setIsView(true);
      setIsOpenMenu(true);
    } else {
      setIsView(false);
      setTimeout(() => {
        setIsOpenMenu(false);
      }, 150);
    }
  };

  const projectType = {
    SINGLE_HTML: "단일 HTML",
    MULTIPLE_FILE: "다중 파일",
    BUILT_REACT_JS: "React.js",
    BUILT_NEXT_JS: "Next.js",
    BUILT_SPRING_JAR: "Spring boot",
  };

  return (
    <>
      <div className="main-section py-28 px-60 mobile:p-10 mobile:pb-20 flex gap-10 flex-col h-full overflow-y-auto mobile:break-all">
        <div className="flex justify-between items-center relative">
          <h1 className="text-6xl font-bold">{data?.name}</h1>
          <div ref={ref}>
            <BiDotsVerticalRounded
              size={40}
              className="cursor-pointer"
              onClick={() => toggleMenu()}
            />
            {isOpenMenu && (
              <ul
                className={`absolute flex flex-col text-center top-[5rem] text-[15px] right-0 z-50 ${
                  isView ? "animate-down" : "animate-up"
                }`}
              >
                {data.isDeploy ? (
                  <>
                    <li
                      onClick={() => {
                        setProjectControlModal({
                          isOpen: true,
                          id: data.id,
                          modalType: "DEPLOY_PROJECT",
                        });
                        toggleMenu();
                      }}
                      className="rounded-t-xl rounded-b-none cursor-pointer bg-lightBlock text-text dark:!bg-textDarkGray dark:hover:!bg-darkHover make-project-button"
                    >
                      재배포하기
                    </li>
                    <li
                      className="rounded-none cursor-pointer bg-lightBlock text-text dark:!bg-textDarkGray dark:hover:!bg-darkHover make-project-button"
                      onClick={() => {
                        setProjectControlModal({
                          isOpen: true,
                          id: data.id,
                          modalType: "CANCEL_DEPLOY",
                        });
                        toggleMenu();
                      }}
                    >
                      배포 취소하기
                    </li>
                    {whiteList.includes(data.projectType) && (
                      <Link
                        href={`/project/${data.id}/env`}
                        className="rounded-none cursor-pointer bg-lightBlock text-text dark:!bg-textDarkGray dark:hover:!bg-darkHover make-project-button"
                      >
                        환경 변수 추가하기
                      </Link>
                    )}
                    <li
                      className="rounded-b-xl rounded-t-none cursor-pointer !bg-red hover:!bg-lightHover dark:hover:!bg-darkHover make-project-button"
                      onClick={() => {
                        setProjectControlModal({
                          isOpen: true,
                          id: data.id,
                          modalType: "DELETE_PROJECT",
                        });
                        toggleMenu();
                      }}
                    >
                      프로젝트 삭제하기
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="rounded-t-xl rounded-b-none cursor-pointer bg-lightBlock text-text dark:!bg-textDarkGray dark:hover:!bg-darkHover make-project-button"
                      onClick={() => {
                        setProjectControlModal({
                          isOpen: true,
                          id: data.id,
                          modalType: "DEPLOY_PROJECT",
                        });
                        toggleMenu();
                      }}
                    >
                      배포하기
                    </li>
                    {whiteList.includes(data.projectType) && (
                      <Link
                        href={`/project/${data.id}/env`}
                        className="rounded-none cursor-pointer bg-lightBlock text-text dark:!bg-textDarkGray dark:hover:!bg-darkHover make-project-button"
                      >
                        환경 변수 추가하기
                      </Link>
                    )}
                    <li
                      className="rounded-b-xl rounded-t-none cursor-pointer !bg-red hover:!bg-lightHover dark:hover:!bg-darkHover make-project-button"
                      onClick={() => {
                        setProjectControlModal({
                          isOpen: true,
                          id: data.id,
                          modalType: "DELETE_PROJECT",
                        });
                        toggleMenu();
                      }}
                    >
                      프로젝트 삭제하기
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
        <hr className="my-6 dark:border-white border-text" />
        <div className="flex flex-wrap">
          {data.isDeploy ? (
            <div className="w-[500px] h-[270px] overflow-hidden">
              <iframe
                src={`https://${data?.domainPrefix}.bssm.kro.kr`}
                width={1920}
                height={1080}
                className="rounded-xl bg-white scale-[0.25] origin-top-left"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <Skeleton variant="rounded" className="bg-lighterGray">
                <iframe
                  src={`https://${data?.domainPrefix}.bssm.kro.kr`}
                  width={470}
                  height={270}
                  className="rounded-xl bg-white"
                />
              </Skeleton>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
                배포되지 않았습니다!
              </span>
            </div>
          )}
          <div className="p-12 flex flex-col gap-10 justify-center">
            <div className="gap-5 flex flex-col">
              <h3 className="font-bold text-[15px] dark:text-textDarkGray">
                DOMAIN
              </h3>
              {data.isDeploy ? (
                <Link
                  href={`https://${data?.domainPrefix}.bssm.kro.kr`}
                  target="_blank"
                >
                  <span
                    className={"text-[22.5px]"}
                  >{`https://${data?.domainPrefix}.bssm.kro.kr`}</span>
                </Link>
              ) : (
                <span className="text-[22.5px] cursor-not-allowed text-textDarkGray">{`https://${data?.domainPrefix}.bssm.kro.kr`}</span>
              )}
            </div>
            <div className="gap-5 flex flex-col">
              <h3 className="font-bold text-[15px] dark:text-textDarkGray">
                TYPE
              </h3>
              <span className="text-[22.5px]">
                {projectType[data.projectType]}
              </span>
            </div>
          </div>
        </div>
        {data?.projectType === "BUILT_NEXT_JS" && (
          <div className="text-[15px] w-full rounded-xl bg-black text-textLightGray p-8 h-96 mt-6 overflow-auto whitespace-pre">
            {containerData}
          </div>
        )}
        {data?.projectType === "BUILT_SPRING_JAR" && (
          <div className="terminal-font text-[15px] w-full rounded-xl bg-black text-textLightGray p-8 h-96 mt-6 overflow-auto whitespace-pre">
            {containerData}
          </div>
        )}
      </div>
      <ProjectControlModal data={data} />
    </>
  );
}

export default ProjectDetailSection;

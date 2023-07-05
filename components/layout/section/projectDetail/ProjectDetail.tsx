import { ProjectType } from "@/types/project";
import { getContainerLog } from "@/utils/api/container";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { useOnClickOutside } from "usehooks-ts";
import ProjectControlModal from "@/components/modals/ProjectControlModal";
import { projectControlModalState } from "@/store/atoms/modals/projectControlModal";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { VerticalDotsIcon } from "@/public";

type whiteListType = "BUILT_NEXT_JS" | "BUILT_SPRING_JAR" | "BUILT_NODE_JS";

function ProjectDetailSection({
  data,
  projectId,
}: {
  data: ProjectType;
  projectId: string;
}) {
  const queryClient = useQueryClient();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isView, setIsView] = useState(false);
  const [, setProjectControlModal] = useRecoilState(projectControlModalState);
  const [refetchInterval, setRefetchInterval] = useState(3000);

  const whiteList = ["BUILT_NEXT_JS", "BUILT_SPRING_JAR", "BUILT_NODE_JS"];

  const { data: containerData, refetch } = useQuery<string, Error>(
    "container",
    () => getContainerLog(projectId),
    {
      enabled: whiteList.includes(data.projectType),
      refetchInterval: refetchInterval,
      onError: () => {
        setRefetchInterval(Infinity);
        queryClient.setQueryData("container", "");
      },
      retry: false,
    }
  );
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
    BUILT_NODE_JS: "Node.js",
  };

  const portByProject = {
    BUILT_NEXT_JS: 3000,
    BUILT_SPRING_JAR: 8080,
    BUILT_NODE_JS: 3000,
  };

  return (
    <>
      <div className="main-section py-28 px-60 mobile:p-10 flex gap-10 mobile:gap-0 flex-col overflow-y-auto mobile:break-all">
        <div className="flex justify-between items-center relative">
          <h1 className="text-6xl font-bold mobile:text-4xl">{data?.name}</h1>
          <div ref={ref}>
            <div className="w-[40px] h-[40px] mobile:w-[30px] mobile:h-[30px] cursor-pointer">
              <VerticalDotsIcon onClick={() => toggleMenu()} />
            </div>
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
            <div className="gap-20 flex">
              <div className="gap-5 flex flex-col">
                <h3 className="font-bold text-[15px] dark:text-textDarkGray">
                  TYPE
                </h3>
                <span className="text-[22.5px]">
                  {projectType[data.projectType]}
                </span>
              </div>
              {whiteList.includes(data.projectType) && (
                <div className="gap-5 flex flex-col">
                  <h3 className="font-bold text-[15px] dark:text-textDarkGray">
                    PORT
                  </h3>
                  <span className="text-[22.5px]">
                    {portByProject[data.projectType as whiteListType]} → 443
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {whiteList.includes(data.projectType) && (
          <div className="relative w-full h-96 mt-6 bg-black rounded-xl mobile:mb-[120px]">
            <div className="mobile:text-[10px] terminal-font text-[15px] text-textLightGray p-8 w-full h-full overflow-auto whitespace-pre">
              {containerData}
            </div>
            <Link
              href={`/project/${data.id}/log`}
              className="right-0 absolute cursor-pointer"
            >
              전체 화면으로 보기
            </Link>
          </div>
        )}
      </div>
      <ProjectControlModal data={data} />
    </>
  );
}

export default ProjectDetailSection;

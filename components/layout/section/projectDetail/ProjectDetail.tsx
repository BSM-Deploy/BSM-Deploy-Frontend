import { loadingState } from "@/store/atoms/loading/loading";
import { ProjectType } from "@/types/project";
import { getContainerLog } from "@/utils/api/container";
import { getProject } from "@/utils/api/project";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

function ProjectDetailSection({ data }: { data: ProjectType }) {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [log, setLog] = useState<string[]>([]);
  const router = useRouter();
  const { isLoading: containerIsLoading, data: containerData } = useQuery<
    string,
    Error
  >("container", () => getContainerLog(String(router.query.projectId)), {
    enabled: router.isReady && data?.projectType === "BUILT_NEXT_JS",
    refetchInterval: 3000,
    onSuccess: () => {
      log && containerData ? setLog((prev) => [...prev, containerData]) : null;
    },
  });

  const projectType = {
    SINGLE_HTML: "단일 HTML",
    MULTIPLE_FILE: "다중 파일",
    BUILT_REACT_JS: "React.js",
    BUILT_NEXT_JS: "Next.js",
  };

  // containerIsLoading ? setLoading(true) : setLoading(false);
  return (
    <>
      <div className="main-section py-28 px-60 flex gap-10 flex-col h-full overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold">{data?.name}</h1>
          <div className="gap-5 flex">
            <button className="!bg-red hover:!bg-lightHover dark:hover:!bg-darkHover make-project-button">
              배포 취소하기
            </button>
            <button className="make-project-button">재배포하기</button>
          </div>
        </div>
        <hr className="my-6 dark:border-white border-text" />
        <div className="flex flex-wrap">
          {data.isDeploy ? (
            <div className="w-[40rem] h-[22.5rem]">
              <iframe
                src={`https://${data?.domainPrefix}.bssm.kro.kr`}
                width={1600}
                height={900}
                className="rounded-xl bg-white scale-[0.25] origin-top-left"
              />
            </div>
          ) : (
            <div className="relative">
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
              <h3 className="font-bold dark:text-textDarkGray">DOMAIN</h3>
              <Link
                href={`https://${data?.domainPrefix}.bssm.kro.kr`}
                target="_blank"
              >
                <span className="text-4xl">{`https://${data?.domainPrefix}.bssm.kro.kr`}</span>
              </Link>
            </div>
            <div className="gap-5 flex flex-col">
              <h3 className="font-bold dark:text-textDarkGray">TYPE</h3>
              <span className="text-4xl">{projectType[data.projectType]}</span>
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl bg-black p-8 h-64 overflow-y-auto">
          {log.map((item, index) => {
            return (
              <>
                <span key={index} className="text-white">
                  {item}
                </span>
                <br />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProjectDetailSection;

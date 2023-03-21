import Loading from "@/components/etc/Loading";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { loadingState } from "@/store/atoms/loading/loading";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

function ProjectDetail() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();
  const { isLoading, data, isSuccess } = useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );
  const projectType = {
    SINGLE_HTML: "단일 HTML",
    MULTIPLE_FILE: "다중 파일",
    BUILT_REACT_JS: "React.js",
    BUILT_NEXT_JS: "Next.js",
  };

  isLoading ? setLoading(true) : setLoading(false);
  return (
    <>
      {isSuccess && (
        <>
          <Header title={data?.name} />
          <Sidebar />
          <div className="main-section py-28 px-60">
            <div className="flex justify-between">
              <h1 className="text-6xl font-bold">{data?.name}</h1>
              <div className="gap-5 flex">
                <button className="make-project-button">배포 취소하기</button>
                <button className="make-project-button">재배포하기</button>
              </div>
            </div>
            <hr className="my-12 dark:border-white border-text" />
            <div className="flex flex-wrap">
              {data.isDeploy ? (
                <iframe
                  src={`https://${data?.domainPrefix}.bssm.kro.kr/1화.pdf`}
                  width={470}
                  height={270}
                  className="rounded-xl bg-white"
                />
              ) : (
                <div className="relative">
                  <Skeleton variant="rounded" className="bg-lighterGray">
                    <iframe
                      src={`https://${data?.domainPrefix}.bssm.kro.kr/1화.pdf`}
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
                  <span className="text-4xl">{`https://${data?.domainPrefix}.bssm.kro.kr`}</span>
                </div>
                <div className="gap-5 flex flex-col">
                  <h3 className="font-bold dark:text-textDarkGray">TYPE</h3>
                  <span className="text-4xl">
                    {projectType[data.projectType]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectDetail;

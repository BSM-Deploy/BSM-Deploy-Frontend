import Header from "@/components/layout/header/Header";
import ProjectDetailSection from "@/components/layout/section/projectDetail/ProjectDetail";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { loadingState } from "@/store/atoms/loading/loading";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { NextSeo, NextSeoProps } from "next-seo";
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
  isLoading ? setLoading(true) : setLoading(false);

  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트의 정보를 보는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      {isSuccess && (
        <>
          <Header title={data?.name} />
          <Sidebar />
          <ProjectDetailSection data={data} />
        </>
      )}
    </>
  );
}

export default ProjectDetail;

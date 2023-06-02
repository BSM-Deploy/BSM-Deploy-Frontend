import ProjectDetailSection from "@/components/layout/section/projectDetail/ProjectDetail";
import NeedLoginModal from "@/components/modals/needLoginModal";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { userIsLogin } from "@/store/atoms/user/user";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ProjectDetail() {
  const login = useRecoilValue(userIsLogin);
  const setTitle = useSetRecoilState(headerTitleState);
  const router = useRouter();
  const { data, isSuccess } = useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );

  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트의 정보를 보는 페이지입니다.",
  };

  if (isSuccess) {
    setTitle(String(data?.name));
  }

  return (
    <>
      <NextSeo {...seoConfig} />
      {!login && <NeedLoginModal />}
      {isSuccess && (
        <>
          <ProjectDetailSection data={data} />
        </>
      )}
    </>
  );
}

export default ProjectDetail;

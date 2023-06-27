"use client";

import ProjectDetailSection from "@/components/layout/section/projectDetail/ProjectDetail";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

interface ProjectDetailProps {
  params: { projectId: string };
}

function ProjectDetail(props: ProjectDetailProps) {
  const setTitle = useSetRecoilState(headerTitleState);

  const { data, isSuccess } = useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(props.params.projectId)),
    {
      onSuccess: (data) => {
        setTitle(data?.name);
      },
    }
  );

  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트의 정보를 보는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      {isSuccess && (
        <>
          <ProjectDetailSection data={data} projectId={props.params.projectId} />
        </>
      )}
    </>
  );
}

export default ProjectDetail;

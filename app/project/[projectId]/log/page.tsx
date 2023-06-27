"use client";

import LogSection from "@/components/layout/section/log";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { NextSeo, NextSeoProps } from "next-seo";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

interface LogProps {
  params: {
    projectId: string;
  };
}

export default function Log(props: LogProps) {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 로그",
    description: "프로젝트의 로그를 보는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(props.params.projectId)),
    {
      onSuccess: (data) => {
        setTitle(data?.name);
      },
    }
  );

  return (
    <>
      <NextSeo {...seoConfig} />
      <LogSection id={props.params.projectId} />
    </>
  );
}

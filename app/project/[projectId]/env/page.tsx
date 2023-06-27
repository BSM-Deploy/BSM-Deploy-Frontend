"use client";

import EnvSection from "@/components/layout/section/env";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { ProjectType } from "@/types/project";
import { getProject } from "@/utils/api/project";
import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

interface EnvProps {
  params: {
    projectId: string;
  };
}

function Env(props: EnvProps) {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 환경변수",
    description: "프로젝트에 환경변수를 추가하는 페이지입니다.",
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
      <EnvSection id={props.params.projectId} />
    </>
  );
}

export default Env;

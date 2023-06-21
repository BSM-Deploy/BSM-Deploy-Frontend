"use client";

import EnvSection from "@/components/layout/section/env";
import { NextSeo, NextSeoProps } from "next-seo";
import React from "react";

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

  return (
    <>
      <NextSeo {...seoConfig} />
      <EnvSection id={props.params.projectId} />
    </>
  );
}

export default Env;

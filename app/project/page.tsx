"use client";

import ProjectSection from "@/components/layout/section/project/Project";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { NextSeoProps, NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function Project() {
  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트들을 모아보는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("내 프로젝트");
  }, [setTitle]);

  return (
    <>
      <NextSeo {...seoConfig} />
      <ProjectSection />
    </>
  );
}

export default Project;

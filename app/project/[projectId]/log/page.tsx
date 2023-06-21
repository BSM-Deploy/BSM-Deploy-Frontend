"use client";

import LogSection from "@/components/layout/section/log";
import { NextSeo, NextSeoProps } from "next-seo";

interface LogProps {
  params: {
    id: string;
  };
}

export default function Log(props: LogProps) {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 로그",
    description: "프로젝트의 로그를 보는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <LogSection id={props.params.id} />
    </>
  );
}

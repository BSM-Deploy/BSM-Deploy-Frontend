"use client";

import DeploySection from "@/components/layout/section/deploy/deploy";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface DeployProps {
  params: {
    id: string;
  };
}

export default function Deploy(props: DeployProps) {
  const seoConfig: NextSeoProps = {
    title: "배포하기",
    description: "프로젝트를 배포하는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("프로젝트 배포하기");
  }, [setTitle]);

  return (
    <>
      <NextSeo {...seoConfig} />
      <DeploySection id={props.params.id} />
      <ErrorSnackbar />
    </>
  );
}

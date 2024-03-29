"use client";

import UploadForm from "@/components/layout/section/upload/uploadForm";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface UploadProps {
  params: {
    id: string;
  };
}

export default function Upload(props: UploadProps) {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 업로드",
    description: "프로젝트를 업로드하는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("프로젝트 업로드");
  }, [setTitle]);

  return (
    <>
      <NextSeo {...seoConfig} />
      <UploadForm id={props.params.id} />
      <ErrorSnackbar />
    </>
  );
}

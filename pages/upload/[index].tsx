import Header from "@/components/layout/header/Header";
import UploadForm from "@/components/layout/section/upload/uploadForm";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import NeedLoginModal from "@/components/modals/needLoginModal";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { userIsLogin } from "@/store/atoms/user/user";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Upload() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "프로젝트 업로드",
    description: "프로젝트를 업로드하는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("프로젝트 업로드");
  }, []);

  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <UploadForm />
      <ErrorSnackbar />
    </>
  );
}

"use client";

import SettingForm from "@/components/layout/section/setting/SettingForm";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userIsLogin } from "@/store/atoms/user/user";
import NeedLoginModal from "@/components/modals/needLoginModal";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { useEffect } from "react";

export default function Setting() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "프로젝트 세팅",
    description: "프로젝트를 만드는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("프로젝트 세팅");
  }, [setTitle]);

  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <SettingForm />
      <ErrorSnackbar />
    </>
  );
}

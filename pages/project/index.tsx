import Header from "@/components/layout/header/Header";
import ProjectSection from "@/components/layout/section/project/Project";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import NeedLoginModal from "@/components/modals/needLoginModal";
import { userIsLogin } from "@/store/atoms/user/user";
import { NextSeoProps, NextSeo } from "next-seo";
import React from "react";
import { useRecoilValue } from "recoil";

function Project() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트들을 모아보는 페이지입니다.",
  };

  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <Header title="내 프로젝트" />
      <Sidebar />
      <ProjectSection />
    </>
  );
}

export default Project;

import ProjectSection from "@/components/layout/section/project/Project";
import NeedLoginModal from "@/components/modals/needLoginModal";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { userIsLogin } from "@/store/atoms/user/user";
import { NextSeoProps, NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Project() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "프로젝트",
    description: "프로젝트들을 모아보는 페이지입니다.",
  };
  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("내 프로젝트");
  }, []);

  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <ProjectSection />
    </>
  );
}

export default Project;

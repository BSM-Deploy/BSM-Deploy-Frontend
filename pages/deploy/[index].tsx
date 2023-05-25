import DeploySection from "@/components/layout/section/deploy/deploy";
import NeedLoginModal from "@/components/modals/needLoginModal";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { userIsLogin } from "@/store/atoms/user/user";
import { NextSeo, NextSeoProps } from "next-seo";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Deploy() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "배포하기",
    description: "프로젝트를 배포하는 페이지입니다.",
  };

  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle('프로젝트 배포하기');
  }, []);
  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <DeploySection />
      <ErrorSnackbar />
    </>
  );
}

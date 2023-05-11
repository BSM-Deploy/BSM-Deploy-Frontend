import Header from "@/components/layout/header/Header";
import DeploySection from "@/components/layout/section/deploy/deploy";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import NeedLoginModal from "@/components/modals/needLoginModal";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { userIsLogin } from "@/store/atoms/user/user";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRecoilValue } from "recoil";

export default function Deploy() {
  const login = useRecoilValue(userIsLogin);
  const seoConfig: NextSeoProps = {
    title: "배포하기",
    description: "프로젝트를 배포하는 페이지입니다.",
  };

  return (
    <>
      {!login && <NeedLoginModal />}
      <NextSeo {...seoConfig} />
      <Header />
      <Sidebar />
      <DeploySection />
      <ErrorSnackbar />
    </>
  );
}

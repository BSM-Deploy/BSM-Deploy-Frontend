import Header from "@/components/layout/header/Header";
import DeploySection from "@/components/layout/section/deploy/deploy";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { NextSeo, NextSeoProps } from "next-seo";

export default function Deploy() {

  const seoConfig: NextSeoProps = {
    title: "배포하기",
    description: "프로젝트를 배포하는 페이지입니다.",
  };

  return (
    <>
    <NextSeo {...seoConfig} />
      <Header />
      <Sidebar />
      <DeploySection />
      <ErrorSnackbar />
    </>
  );
}

import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import SettingForm from "@/components/layout/section/setting/SettingForm";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { NextSeo, NextSeoProps } from "next-seo";

export default function Setting() {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 세팅",
    description: "프로젝트를 만드는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <Header title="프로젝트 세팅" />
      <Sidebar />
      <SettingForm />
      <ErrorSnackbar />
    </>
  );
}

import Header from "@/components/layout/header/Header";
import UploadForm from "@/components/layout/section/upload/uploadForm";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";
import { NextSeo, NextSeoProps } from "next-seo";

export default function Upload() {
  const seoConfig: NextSeoProps = {
    title: "프로젝트 업로드",
    description: "프로젝트를 업로드하는 페이지입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <Header title="프로젝트 업로드" />
      <Sidebar />
      <UploadForm />
      <ErrorSnackbar />
    </>
  );
}

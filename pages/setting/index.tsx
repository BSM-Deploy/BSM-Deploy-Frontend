import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import SettingForm from "@/components/layout/section/setting/SettingForm";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";

export default function Setting() {
  return (
    <>
      <Header title="프로젝트 세팅" />
      <Sidebar />
      <SettingForm />
      <ErrorSnackbar />
    </>
  );
}

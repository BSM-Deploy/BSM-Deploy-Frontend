import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import SettingForm from "@/components/layout/section/setting/SettingForm";
import SettingSnackbar from "@/components/layout/section/setting/SettingSnackbar";

export default function Setting() {
  return (
    <>
      <Header title="프로젝트 세팅" />
      <Sidebar />
      <SettingForm />
      <SettingSnackbar />
    </>
  );
}

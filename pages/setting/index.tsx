import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import SettingForm from "@/components/layout/section/setting/SettingForm";
import SettingSnackbar from "@/components/layout/section/setting/SettingSnackbar";

export default function Setting() {
  return (
    <>
      <Header />
      <Sidebar />
      <SettingForm/>
      <SettingSnackbar/>
    </>
  );
}

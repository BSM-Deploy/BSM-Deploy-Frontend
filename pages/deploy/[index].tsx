import Header from "@/components/layout/header/Header";
import DeploySection from "@/components/layout/section/deploy/deploy";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ErrorSnackbar from "@/components/snackbar/errorSnackbar";

export default function Deploy() {
  return (
    <>
      <Header />
      <Sidebar />
      <DeploySection />
      <ErrorSnackbar />
    </>
  );
}

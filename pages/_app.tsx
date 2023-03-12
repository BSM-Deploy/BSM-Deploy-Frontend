import SettingModal from "@/components/modals/SettingModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <SettingModal />
    </RecoilRoot>
  );
}

import "@/styles/globals.css";
import React, { ReactNode, useEffect } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import Nav from "../etc/nav";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";
import NeedLoginModal from "../modals/needLoginModal";
import { needLoginModalState } from "@/store/atoms/modals/needLoginModal";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

function Layout({ children }: { children: ReactNode }) {
  const needLogin = useRecoilValue(needLoginModalState);
  const [, setOpenSidebar] = useRecoilState(openSidebarState);
  const title = useRecoilValue(headerTitleState);
  const matches = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="grid-wrap mobile:mobile-grid-wrap">
      <Header title={title} />
      <Sidebar />
      <main className="w-full h-full overflow-y-auto overflow-x-hidden" onClick={() => setOpenSidebar(false)}>{children}</main>
      {matches && <Nav />}
      {needLogin && <NeedLoginModal />}
    </div>
  );
}

export default Layout;

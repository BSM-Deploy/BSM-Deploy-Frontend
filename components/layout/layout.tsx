import "@/styles/globals.css";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import Nav from "../etc/nav";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";
import { userIsLogin } from "@/store/atoms/user/user";
import NeedLoginModal from "../modals/needLoginModal";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

function Layout({ children }: { children: ReactNode }) {
  const login = useRecoilValue(userIsLogin);
  const [main, setMain] = useState(false);
  const [, setOpenSidebar] = useRecoilState(openSidebarState);
  const title = useRecoilValue(headerTitleState);
  const matches = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    if (document.location.href.split("/")[3] !== "") {
      setMain(true);
    }
  }, []);

  return (
    <div>
      <Header title={title} />
      <Sidebar />
      <main onClick={() => setOpenSidebar(false)}>{children}</main>
      {matches && <Nav />}
      {!login && main && <NeedLoginModal />}
    </div>
  );
}

export default Layout;

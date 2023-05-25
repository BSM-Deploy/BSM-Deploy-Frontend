import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";

function Layout() {
  const title = useRecoilValue(headerTitleState);
  return (
    <>
      <Header title={title} />
      <Sidebar />
    </>
  );
}

export default Layout;

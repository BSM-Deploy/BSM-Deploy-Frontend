import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { useMediaQuery } from "@mui/material";
import Nav from "../etc/nav";


function Layout() {
  const title = useRecoilValue(headerTitleState);
  const matches = useMediaQuery("(max-width: 480px)")

  return (
    <>
      <Header title={title} />
      <Sidebar />
      {matches && <Nav/>}
    </>
  );
}

export default Layout;

import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import { useMediaQuery } from "@mui/material";
import Nav from "../etc/nav";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";
import { useOnClickOutside } from "usehooks-ts";

function Layout() {
  const [openSidebar, setOpenSidebar] = useRecoilState(openSidebarState);
  const title = useRecoilValue(headerTitleState);
  const matches = useMediaQuery("(max-width: 480px)");

  const ref = React.useRef(null);

  useOnClickOutside(ref, () => {
    setOpenSidebar(false);
  });

  return (
    <div ref={ref}>
      <Header title={title} />
      <Sidebar />
      {matches && <Nav />}
    </div>
  );
}

export default Layout;

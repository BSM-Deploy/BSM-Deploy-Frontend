import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import React from "react";
import Main from "@/components/layout/section/main";

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
    </>
  );
}

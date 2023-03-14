import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import React from "react";
import Main from "@/components/layout/main";

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
    </>
  );
}

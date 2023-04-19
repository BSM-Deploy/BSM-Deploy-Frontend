import Header from "@/components/layout/header/Header";
import ProjectSection from "@/components/layout/section/project/Project";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import React from "react";

function Project() {
  return (
    <>
      <Header title='내 프로젝트'/>
      <Sidebar />
      <ProjectSection />
    </>
  );
}

export default Project;

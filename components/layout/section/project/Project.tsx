import { titleState } from "@/store/atoms/layout/title";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import ProjectItem from "./ProjectItem";

function ProjectSection() {
  const [title, setTitle] = useRecoilState(titleState);
  useEffect(() => {
    setTitle("내 프로젝트");
  }, []);
  return (
    <div className="main-section gap-20 p-20 grid grid-cols-2 overflow-y-auto h-full">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  );
}

export default ProjectSection;

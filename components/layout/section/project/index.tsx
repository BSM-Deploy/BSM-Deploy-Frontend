import { titleState } from "@/store/atoms/layout/title";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

function ProjectSection() {
  const [title, setTitle] = useRecoilState(titleState);
  useEffect(() => {
    setTitle("내 프로젝트");
  }, []);
  return <div className="main-section">Project</div>;
}

export default ProjectSection;

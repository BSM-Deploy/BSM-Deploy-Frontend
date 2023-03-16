import { titleState } from "@/store/atoms/layout/title";
import { getProjectList } from "@/utils/api/project";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import ProjectItem from "./ProjectItem";
import { ProjectType } from "@/types/project";

function ProjectSection() {
  const [title, setTitle] = useRecoilState(titleState);
  const projectQuery = useQuery("projects", () => getProjectList());
  useEffect(() => {
    setTitle("내 프로젝트");
  }, []);
  return (
    <div className="main-section p-60 overflow-y-auto h-full">
      <div className="flex flex-wrap gap-12">
        {projectQuery.isSuccess &&
          (projectQuery.data?.list ? (
            projectQuery.data?.list.map((project: ProjectType) => (
              <ProjectItem key={project.id} data={project} />
            ))
          ) : (
            <></>
          ))}
      </div>
    </div>
  );
}

export default ProjectSection;

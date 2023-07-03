import { getProjectList } from "@/utils/api/project";
import React from "react";
import { useQuery } from "react-query";
import ProjectItem from "./ProjectItem";
import { ProjectType } from "@/types/project";
import Link from "next/link";
import { NonProjectIcon } from "@/public";

function ProjectSection() {
  const projectQuery = useQuery("projects", () => getProjectList());
  return (
    <div className="mobile:grid-main main-section p-52 overflow-y-auto relative">
      {projectQuery.isSuccess &&
        (projectQuery.data?.size !== 0 ? (
          <div className="flex flex-wrap gap-12 mobile:justify-center">
            <Link
              href="/setting"
              className="make-project-button absolute top-16 right-16 text-[15px]"
            >
              프로젝트 생성하기
            </Link>
            {projectQuery.data?.list.map((project: ProjectType) => (
              <Link
                href={{
                  pathname: `/project/${project.id}`,
                  query: { project: JSON.stringify(project) },
                }}
                key={project.id}
                as={`/project/${project.id}`}
              >
                <ProjectItem data={project} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-12">
            <NonProjectIcon />
            <span className="text-5xl font-bold dark:text-textLightGray">
              프로젝트가 없습니다!
            </span>
            <Link href="setting" className="make-project-button">
              프로젝트 생성하기
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ProjectSection;

import { getProjectList } from "@/utils/api/project";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import ProjectItem from "./ProjectItem";
import { ProjectType } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

function ProjectSection() {
  const projectQuery = useQuery("projects", () => getProjectList());
  return (
    <div className="main-section p-60 overflow-y-auto h-full flex justify-center items-center">
      {projectQuery.isSuccess &&
        (projectQuery.data?.list ? (
          <div className="flex flex-wrap gap-12">
            <button className="make-project-button absolute top-16 right-16">
              프로젝트 생성하기
            </button>
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
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src={"./images/noproject.svg"}
              alt="프로젝트 없음"
              width={400}
              height={100}
            />
            <span className="text-5xl font-bold dark:text-textLightGray">
              프로젝트가 없습니다!
            </span>
            {/* <Link> */}
            <button className="make-project-button">프로젝트 생성하기</button>
            {/* </Link> */}
          </div>
        ))}
    </div>
  );
}

export default ProjectSection;

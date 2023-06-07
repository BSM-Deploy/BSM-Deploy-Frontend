import MultipleHtml from "@/components/icons/MultipleHtml";
import NextIcon from "@/components/icons/NextIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import SingleHtml from "@/components/icons/SingleHtml";
import { MdClear, MdCheck } from "react-icons/md";
import { ProjectType } from "@/types/project";
import { Tooltip } from "@mui/material";
import React from "react";
import SpringBoot from "@/components/icons/SpringBoot";
import Nodejs from "@/components/icons/Nodejs";

function ProjectItem({ data }: { data: ProjectType }) {
  const projectType = {
    icon: {
      SINGLE_HTML: <SingleHtml />,
      MULTIPLE_FILE: <MultipleHtml />,
      BUILT_REACT_JS: <ReactIcon />,
      BUILT_NEXT_JS: <NextIcon />,
      BUILT_SPRING_JAR: <SpringBoot />,
      BUILT_NODE_JS: <Nodejs />,
    },
    tooltip: {
      SINGLE_HTML: "단일 HTML",
      MULTIPLE_FILE: "다중 파일",
      BUILT_REACT_JS: "React.js",
      BUILT_NEXT_JS: "Next.js",
      BUILT_SPRING_JAR: "Spring boot",
      BUILT_NODE_JS: "Node.js",
    },
  };
  const { icon, tooltip } = projectType;
  return (
    <div className="h-[200px] w-[200px] dark:bg-itemGray p-8 rounded-2xl border border-solid border-lightBack relative bg-textLightGray hover:bg-lightHover dark:hover:bg-darkHover duration-250">
      <h1 className="m-0 break-words text-[22.5px] dark:text-textLightGray font-bold">
        {data.name}
      </h1>
      <span className="text-[13px] break-words text-textDarkGray">
        {data.domainPrefix}.bssm.kro.kr
      </span>
      <Tooltip title={tooltip[data.projectType]} arrow>
        <div className="bg-textDarkGray dark:bg-textLightGray rounded-full w-[30px] h-[30px] absolute bottom-8 inline-flex justify-center items-center left-8">
          {icon[data.projectType]}
        </div>
      </Tooltip>
      <Tooltip title={data.isDeploy ? "배포됨" : "배포되지 않음"} arrow>
        <div className="absolute bottom-8 right-8">
          {data.isDeploy ? (
            <MdCheck className="text-[22.5px] dark:text-textLightGray text-textDarkGray" />
          ) : (
            <MdClear className="text-[22.5px] dark:text-textLightGray text-textDarkGray" />
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default ProjectItem;

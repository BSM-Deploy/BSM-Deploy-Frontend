import MultipleHtml from "@/components/icons/MultipleHtml";
import NextIcon from "@/components/icons/NextIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import SingleHtml from "@/components/icons/SingleHtml";
import { MdClear, MdCheck } from "react-icons/md";
import { ProjectType } from "@/types/project";
import { Tooltip } from "@mui/material";
import React from "react";

function ProjectItem({ data }: { data: ProjectType }) {
  const projectType = {
    icon: {
      SINGLE_HTML: <SingleHtml />,
      MULTIPLE_FILE: <MultipleHtml />,
      BUILT_REACT_JS: <ReactIcon />,
      BUILT_NEXT_JS: <NextIcon />,
    },
    tooltip: {
      SINGLE_HTML: "단일 HTML",
      MULTIPLE_FILE: "다중 파일",
      BUILT_REACT_JS: "React.js",
      BUILT_NEXT_JS: "Next.js",
    },
  };
  const { icon, tooltip } = projectType;
  return (
    <div className="h-80 w-80 dark:bg-itemGray p-8 rounded-2xl border border-solid border-lightBack relative bg-textLightGray">
      <h1 className="m-0 text-4xl dark:text-textLightGray font-bold">
        {data.name}
      </h1>
      <span className="text-xl text-textDarkGray">
        {data.domainPrefix}.bssm.hs.kr
      </span>
      <Tooltip title={tooltip[data.projectType]} arrow>
        <div className="bg-textDarkGray dark:bg-textLightGray rounded-full w-12 h-12 absolute bottom-8 inline-flex justify-center items-center left-8">
          {icon[data.projectType]}
        </div>
      </Tooltip>
      {data.isDeploy ? (
        <Tooltip title="배포됨" arrow>
          <div className="absolute bottom-8 right-8">
            <MdCheck className="text-4xl dark:text-textLightGray text-textDarkGray" />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="배포되지 않음" arrow>
          <div className="absolute bottom-8 right-8">
            <MdClear className="text-4xl dark:text-textLightGray text-textDarkGray" />
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default ProjectItem;

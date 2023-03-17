import MultipleHtml from "@/components/icons/MultipleHtml";
import NextIcon from "@/components/icons/NextIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import SingleHtml from "@/components/icons/SingleHtml";
import { ProjectType } from "@/types/project";
import React from "react";

function ProjectItem({ data }: { data: ProjectType }) {
  const iconObject = {
    SINGLE_HTML: <SingleHtml />,
    MULTIPLE_FILE: <MultipleHtml />,
    BUILT_REACT_JS: <ReactIcon />,
    BUILT_NEXT_JS: <NextIcon />,
  };
  return (
    <div className="h-80 w-80 dark:bg-itemGray p-8 rounded-2xl border border-solid border-lightBack relative bg-textLightGray">
      <h1 className="m-0 text-4xl dark:text-textLightGray font-bold">
        {data.name}
      </h1>
      <span className="text-xl text-textDarkGray">
        {data.domainPrefix}.bssm.hs.kr
      </span>
      <div className="bg-textDarkGray dark:bg-textLightGray rounded-full w-12 h-12 absolute bottom-8 inline-flex justify-center items-center left-8">
        {iconObject[data.projectType]}
      </div>
    </div>
  );
}

export default ProjectItem;

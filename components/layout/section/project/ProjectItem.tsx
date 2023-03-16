import { ProjectType } from "@/types/project";
import React from "react";

function ProjectItem({ data }: { data: ProjectType }) {
  return (
    <div className="h-80 w-80 bg-itemGray p-8 rounded-2xl border border-solid border-lightBack relative">
      <h1 className="m-0 text-4xl dark:text-textLightGray font-bold">
        {data.name}
      </h1>
      <span className="text-xl dark:text-textDarkGray">
        {data.domainPrefix}.bssm.hs.kr
      </span>
      <div className="dark:bg-textLightGray rounded-full w-12 h-12 absolute bottom-8 inline-block left-8"></div>
    </div>
  );
}

export default ProjectItem;

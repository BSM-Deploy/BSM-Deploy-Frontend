import { HtmlIcon } from "@/public";
import React from "react";


function SingleHtml() {
  return (
    <>
      <div className="w-4 h-4 dark:bg-textLightGray bg-textDarkGray absolute top-[calc(50%+0.25rem)] left-[calc(50%-0.25rem)] -translate-x-1/2 -translate-y-1/2 z-30"></div>
      <HtmlIcon className="text-textLightGray dark:text-text w-8 h-8 z-50 absolute top-[calc(50%+0.25rem)] left-[calc(50%-0.25rem)] -translate-x-1/2 -translate-y-1/2" />
      <HtmlIcon className="text-textLightGray dark:text-text w-8 h-8 absolute top-[0.375rem] right-[0.25rem] z-10" />
    </>
  );
}

export default SingleHtml;

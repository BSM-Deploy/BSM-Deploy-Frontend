import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { getProject } from "@/utils/api/project";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

function ProjectDetail() {
  const router = useRouter();
  const projectQuery = useQuery(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );

  // projectQuery.isLoading ? setLoading(true) : setLoading(false);
  // projectQuery.isLoading && setLoading(true);

  console.log(projectQuery);
  return (
    <>
      <Header title={projectQuery.data?.name} />
      <Sidebar />
      <div className="main-section"></div>
    </>
  );
}

export default ProjectDetail;

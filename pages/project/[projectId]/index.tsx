import Loading from "@/components/etc/Loading";
import Header from "@/components/layout/header/Header";
import ProjectDetailSection from "@/components/layout/section/projectDetail/ProjectDetail";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { loadingState } from "@/store/atoms/loading/loading";
import { ProjectType } from "@/types/project";
import { getContainerLog } from "@/utils/api/container";
import { getProject } from "@/utils/api/project";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

function ProjectDetail() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();
  const { isLoading, data, isSuccess } = useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );
  isLoading ? setLoading(true) : setLoading(false);

  return (
    <>
      {isSuccess && (
        <>
          <Header title={data?.name} />
          <Sidebar />
          <ProjectDetailSection data={data} />
        </>
      )}
    </>
  );
}

export default ProjectDetail;

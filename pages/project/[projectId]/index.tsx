import Loading from "@/components/etc/Loading";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { loadingState } from "@/store/atoms/loading/loading";
import { getProject } from "@/utils/api/project";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

function ProjectDetail() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();
  const { isLoading, data } = useQuery(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );

  isLoading ? setLoading(true) : setLoading(false);
  return (
    <>
      <Header title={data?.name} />
      <Sidebar />
      <div className="main-section"></div>
    </>
  );
}

export default ProjectDetail;

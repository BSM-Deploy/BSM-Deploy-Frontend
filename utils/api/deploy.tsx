import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const cancelDeploy = async (projectId: number) => {
  return (await instance.put(`/deploy/cancel`, { projectId }, getAccessToken()))
    .data;
};

export const deployProject = async (projectId: string) => {
  return (await instance.put(`/deploy`, { projectId }, getAccessToken())).data;
};

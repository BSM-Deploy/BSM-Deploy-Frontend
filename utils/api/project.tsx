import { ProjectsType } from "@/types/project";
import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";
import { SettingType } from "@/types/setting";

export const getProjectList = async (): Promise<ProjectsType> => {
  return (await instance.get("/project", getAccessToken())).data;
};

export const getProject = async (id: string) => {
  return (await instance.get(`/project/${id}`, getAccessToken())).data;
};

export const makeProject = async (data: SettingType) => {
  return (await instance.post("/project", { ...data }, getAccessToken())).data
    .id;
};

export const deleteProject = async (id: number) => {
  return (await instance.delete(`/project/${id}`, getAccessToken())).data;
};
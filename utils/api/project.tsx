import { ProjectsType } from "@/types/project";
import { SettingType } from "@/types/Setting";
import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const getProjectList = async (): Promise<ProjectsType> => {
  return (await instance.get("/project", getAccessToken())).data;
};

export const getProject = async (id: string) => {
  return (await instance.get(`/project/${id}`, getAccessToken())).data;
};
export const project = async (data: SettingType) => {
  return (await instance.post('/project', {...data}, getAccessToken())).data.id
};

import { ProjectsType } from "@/types/project";
import { PostSettingValueType } from "@/types/setting";
import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const getProjectList = async (): Promise<ProjectsType> => {
  return (await instance.get("/project", getAccessToken())).data;
};

export const project = async (data: any) => {
  console.log(data)
};
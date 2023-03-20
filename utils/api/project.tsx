import { ProjectsType } from "@/types/project";
import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const getProjectList = async (): Promise<ProjectsType> => {
  return (await instance.get("/project", getAccessToken())).data;
};

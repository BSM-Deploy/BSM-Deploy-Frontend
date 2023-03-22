import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const getContainerLog = async (id: string) => {
  return (await instance.get(`/container/${id}/log`, getAccessToken())).data;
};

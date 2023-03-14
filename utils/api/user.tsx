import { instance } from "@/utils/instance";
import { getAccessToken } from "../functions/getToken";

export const getUserInfo = async () => {
  return (await instance.get("/user", getAccessToken())).data;
};

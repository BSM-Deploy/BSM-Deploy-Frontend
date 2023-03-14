import { instance } from "@/utils/instance";
import { getRefreshToken } from "../functions/getToken";

export const login = async (code: string | string[] | undefined) => {
  return (await instance.post("/auth/oauth/bsm", { code })).data;
};

export const logout = async () => {
  return (await instance.delete("/auth/logout", getRefreshToken())).data;
};

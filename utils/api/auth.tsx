import { instance } from "@/utils/instance";

export const login = async (code: string | string[] | undefined) => {
  return (await instance.post("/auth/oauth/bsm", { code })).data;
};

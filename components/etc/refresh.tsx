import { refresh } from "@/utils/api/auth";
import { instance } from "@/utils/instance";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

export const Refresh = () => {
  const refreshMutation = useMutation(() => refresh());
  const onResponse = (res: AxiosResponse): AxiosResponse => {
    return res;
  };

  const errorResponse = (err: AxiosError): Promise<AxiosError> => {
    const _err = err as unknown as AxiosError;
    const { response } = _err;
    const originalConfig = _err?.config;
    console.log(localStorage.refreshToken);
    if (localStorage.refreshToken && response && response.status === 401) {
      console.log("asdf");
      const refreshToken = localStorage.refreshToken;
      refreshMutation.mutate();
      if (refreshMutation.isSuccess) {
        console.log(refreshMutation);
        localStorage.setItem("accessToken", refreshMutation.data.accessToken);
      } else if (refreshMutation.isError) {
        console.log(refreshMutation);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(err);
  };

  instance.interceptors.response.use(onResponse, errorResponse);
  return <></>;
};

import { refresh } from "@/utils/api/auth";
import { instance } from "@/utils/instance";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useMutation } from "react-query";

export const Refresh = () => {
  const refreshMutation = useMutation(() => refresh());
  const onResponse = (res: AxiosResponse): AxiosResponse => {
    return res;
  };

  const errorResponse = (err: AxiosError): Promise<AxiosError> => {
    const { response, config } = err;
    const originalRequest = config as InternalAxiosRequestConfig
    if (localStorage.refreshToken && response && response.status === 401) {
      refreshMutation.mutate();
      if (refreshMutation.isSuccess) {
        console.log(refreshMutation)
        const newToken = refreshMutation.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers["BSM-DEPLOY-TOKEN"] = newToken
        return instance(originalRequest)
      } else if (refreshMutation.isError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(err);
  };

  instance.interceptors.response.use(onResponse, errorResponse);
  return <></>;
};

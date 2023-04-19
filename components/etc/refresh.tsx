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
    if (localStorage.refreshToken && response && response.status === 401) {
      refreshMutation.mutate();
      if (refreshMutation.isSuccess) {
        localStorage.setItem("accessToken", refreshMutation.data.accessToken);
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

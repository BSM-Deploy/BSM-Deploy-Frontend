import { needLoginModalState } from "@/store/atoms/modals/needLoginModal";
import { refresh } from "@/utils/api/auth";
import { instance } from "@/utils/instance";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

export const Refresh = () => {
  const [, setNeedLoginModalState] = useRecoilState(needLoginModalState);
  const refreshMutation = useMutation(() => refresh(), { retry: false });
  
  const onResponse = (res: AxiosResponse): AxiosResponse => {
    setNeedLoginModalState(false);
    return res;
  };

  const errorResponse = (err: AxiosError): Promise<AxiosError> => {
    const _err = err as unknown as AxiosError;
    const { response } = _err;
    const originalConfig = _err?.config;
    if (response && response.status === 401) {
      setNeedLoginModalState(true)
    }
    const { response, config } = err;
    const originalRequest = config as InternalAxiosRequestConfig;
    if (localStorage.refreshToken && response && response.status === 401) {
      refreshMutation.mutate();
      if (refreshMutation.isSuccess) {
        const newToken = refreshMutation.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers["BSM-DEPLOY-TOKEN"] = newToken;
        return instance(originalRequest);
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

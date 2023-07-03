import { needLoginModalState } from "@/store/atoms/modals/needLoginModal";
import { refresh } from "@/utils/api/auth";
import { instance } from "@/utils/instance";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";

export const Refresh = () => {
  const [, setNeedLoginModalState] = useRecoilState(needLoginModalState);
  const refreshMutation = useMutation(() => refresh(), {
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    onError: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    retry: false,
  });

  const onResponse = (res: AxiosResponse): AxiosResponse => {
    setNeedLoginModalState(false);
    return res;
  };

  const errorResponse = (err: AxiosError): Promise<AxiosError> => {
    const { response, config } = err;
    if (response && response.status === 401) {
      setNeedLoginModalState(true);
    }
    const originalRequest = config as InternalAxiosRequestConfig;
    if (localStorage.refreshToken && response && response.status === 401) {
      refreshMutation.mutate();
      originalRequest.headers["BSM-DEPLOY-TOKEN"] =
        localStorage.getItem("accessToken");
      return instance(originalRequest);
    }

    return Promise.reject(err);
  };

  instance.interceptors.response.use(onResponse, errorResponse);
  return <></>;
};

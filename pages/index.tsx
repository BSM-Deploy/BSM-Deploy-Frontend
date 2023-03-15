import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Main from "@/components/layout/section/main";
import { useMutation } from "react-query";
import { refresh } from "@/utils/api/auth";
import { AxiosError, AxiosResponse } from "axios";
import { instance } from "@/utils/instance";

export default function Home() {
  const [mount, setMount] = useState(false);
  const refreshMutation = useMutation(() => refresh());

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);

  const onResponse = (res: AxiosResponse): AxiosResponse => {
    return res;
  };

  const errorResponse = (err: AxiosError): Promise<AxiosError> => {
    const _err = err as unknown as AxiosError;
    const { response } = _err;
    const originalConfig = _err?.config;
    if (localStorage.refreshToken && response && response.status === 401) {
      console.log("asdf");
      const refreshToken = mount ? localStorage.refreshToken : null;
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
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
    </>
  );
}

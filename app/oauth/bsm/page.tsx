"use client";

import React from "react";
import { useQuery } from "react-query";
import { Backdrop, CircularProgress } from "@mui/material";
import { login } from "@/utils/api/auth";
import { useRouter, useSearchParams } from "next/navigation";

function Oauth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  useQuery("login", () => login(code), {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/");
    },
  });
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Oauth;

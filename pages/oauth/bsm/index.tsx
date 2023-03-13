import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Backdrop, CircularProgress } from "@mui/material";
import { login } from "@/utils/api/auth";

function Oauth() {
  const router = useRouter();
  const code = router.query.code;
  const loginQuery = useQuery("login", () => login(code), {
    enabled: router.isReady,
  });
  if (loginQuery.isSuccess) {
    const { accessToken, refreshToken } = loginQuery.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    router.push("/");
  }
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

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import { loadingState } from "@/store/atoms/loading/loading";

function Loading() {
  const [loading, setLoading] = useRecoilState(loadingState);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;

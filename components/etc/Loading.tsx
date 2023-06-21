import React from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "@/store/atoms/loading/loading";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

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

import { errorMessageState } from "@/store/atoms/layout/error";
import { openSnackbarState } from "@/store/atoms/snackbar/openSnackbar";
import Snackbar from "@mui/material/Snackbar";
import { useRecoilState, useRecoilValue } from "recoil";

const snackbarStyle = {
  "& .MuiPaper-root": {
    width: "30rem",
    height: "6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function SettingSnackbar() {
  const errorMessage = useRecoilValue(errorMessageState);
  const [snackbar, setSnackbar] = useRecoilState(openSnackbarState);
  const { vertical, horizontal, open } = snackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      message={<span className="text-2xl">{errorMessage}</span>}
      key={vertical + horizontal}
      sx={snackbarStyle}
    />
  );
}

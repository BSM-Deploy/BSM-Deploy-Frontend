import { errorMessageState } from "@/store/atoms/layout/error";
import { openSnackbarState } from "@/store/atoms/snackbar/openSnackbar";
import Alert from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
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

export default function ErrorSnackbar() {
  const errorMessage = useRecoilValue(errorMessageState);
  const [snackbar, setSnackbar] = useRecoilState(openSnackbarState);
  const { vertical, horizontal, open } = snackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      key={vertical + horizontal}
    >
      <Alert
        severity="error"
        sx={snackbarStyle}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <span className="text-2xl">{errorMessage}</span>
      </Alert>
    </Snackbar>
  );
}

import { errorMessageState } from "@/store/atoms/layout/error";
import { openSnackbarState } from "@/store/atoms/snackbar/openSnackbar";
import { ExceptionType } from "@/types/exception";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

export default function useException() {
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [openSnackbar, setOpenSnackbar] = useRecoilState(openSnackbarState);

  const exceptionHandler = useCallback(
    (error: ExceptionType, name?: string) => {
      if (error.statusCode === 400) {
        setErrorMessage(`${name}: ${error.fields[name as string]}`);
        setOpenSnackbar({ ...openSnackbar, open: true });
      } else {
        setErrorMessage(error.message as string);
        setOpenSnackbar({ ...openSnackbar, open: true });
      }
    },
    [setErrorMessage, setOpenSnackbar, openSnackbar]
  );

  return {
    exceptionHandler,
  };
}

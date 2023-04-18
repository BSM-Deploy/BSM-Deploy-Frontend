import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMutation } from "react-query";
import { deployProject } from "@/utils/api/deploy";
import useException from "@/hooks/useException";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";

export default function DeploySection() {
  const router = useRouter();
  const id = router.query.index as string;

  const { exceptionHandler } = useException();

  const [deploy, setDeploy] = useState(false);
  const [failed, setFailed] = useState(false);

  const { mutate, isLoading } = useMutation(deployProject, {
    onSuccess: () => {
      setDeploy(true);
      router.push(`/project/${id}`);
    },
    onError: (error: AxiosError) => {
      exceptionHandler(error.response?.data as ExceptionType, "projectId");
      setFailed(true)
    },
  });

  useEffect(() => {
    mutate(id);
  }, [id, mutate]);

  return (
    <div className="main-section flex flex-col items-center justify-center">
      {deploy && !failed && (
        <>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 300,
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포 완료</p>
        </>
      )}
      {isLoading && (
        <>
          <CircularProgress
            size={300}
            sx={{
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포중...</p>
        </>
      )}
      {failed && (
        <>
          <WarningAmberIcon
            sx={{
              fontSize: 300,
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포 실패</p>
        </>
      )}
    </div>
  );
}

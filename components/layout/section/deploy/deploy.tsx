import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMutation } from "react-query";
import { deployProject } from "@/utils/api/deploy";
import useException from "@/hooks/useException";

export default function DeploySection() {
  const router = useRouter();
  const id = router.query.index as string;

  const { exceptionHandler } = useException()

  const [deploy, setDeploy] = useState(false);

  const { mutate } = useMutation(deployProject, {
    onSuccess: () => {
      setTimeout(() => {
        setDeploy(true)
      }, 1500)
      setTimeout(()=> {
        router.push(`/project/${id}`)
      }, 1500)
    },
    onError: (error: any) => {
      exceptionHandler(error?.response.data, 'projectId')
    }
  })

  useEffect(() => {
    mutate(id)
  }, [id, mutate])

  return (
    <div className="main-section flex flex-col items-center justify-center">
      {deploy ? (
        <>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 300,
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포 완료</p>
        </>
      ) : (
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
    </div>
  );
}

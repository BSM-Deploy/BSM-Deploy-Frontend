import useFileDrop from "@/hooks/useFileDrop";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";
import useReadFolder from "@/hooks/useReadFolder";
import { useMutation, useQuery } from "react-query";
import { getProject, uploadProject } from "@/utils/api/project";
import JSZip from "jszip";
import UploadIcon from "./uploadIcon";
import FileIcon from "./fileIcon";
import Example from "./example";
import ExampleModal from "@/components/modals/exampleModal";
import useException from "@/hooks/useException";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Modal from "@mui/material/Modal/Modal";

export default function UploadForm({ id }: { id: string }) {
  const router = useRouter();
  const [type, setType] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const [modal, setModal] = useState(false);
  const [fail, setFail] = useState(false);

  const { exceptionHandler } = useException();
  const { files, items, fileName, inputRef, isDragActive, labelRef } =
    useFileDrop();
  const { progressManagement, zip } = useReadFolder({
    type: type,
  });

  useQuery(["getProject"], () => getProject(id), {
    onSuccess: (data) => {
      setType(data.projectType);
    },
  });

  useEffect(() => {
    if (items[0]) {
      progressManagement(
        items[0].webkitGetAsEntry() as FileSystemDirectoryEntry
      );
    }
  }, [files, items, progressManagement]);

  const { mutate, isLoading } = useMutation(uploadProject, {
    onSuccess: () => {
      router.push(`/deploy/${id}`);
    },
    onError: (error: AxiosError) => {
      setFail(true);
      const err = error.response?.data as ExceptionType;
      if (err.statusCode === 500) {
        setErrorMsg(err.message);
      } else {
        exceptionHandler(err, "fileExtension");
      }
    },
  });

  const makeZipFile = (z: JSZip) => {
    return new Promise((resolve, reject) => {
      z.generateAsync({ type: "blob", compression: "DEFLATE" }).then(
        (content: Blob) => {
          const file = new File([content], `${id}.zip`);
          resolve(file);
        }
      );
    });
  };

  const submit = async () => {
    const data = new FormData();
    data.append("projectId", id);

    if (files.length > 0) {
      data.append("file", files[0]);
    } else {
      const zipFile = await makeZipFile(zip);
      data.append("file", zipFile as Blob);
    }

    mutate(data);
  };

  return (
    <div className="main-container flex-col mobile:top-0">
      {!isLoading && !fail && (
        <>
          <ExampleModal type={type} />
          <div>
            <input ref={inputRef} type="file" id="upload" hidden disabled />
            <label
              ref={labelRef}
              htmlFor="upload"
              className={`dark:border-white relative flex flex-col items-center justify-center w-[60rem] h-[60rem] mobile:w-[300px] mobile:h-[300px] rounded-4xl border-dotted border-2 border-black ${
                isDragActive && "dragStyle"
              }`}
            >
              <Example />
              {fileName !== "" ? (
                <FileIcon type={type} name={fileName} />
              ) : (
                <UploadIcon />
              )}
            </label>
          </div>
          <div className="flex items-center mt-[5rem]">
            <CancelButton router={router} />
            <SubmitButton onClick={submit} />
          </div>
        </>
      )}
      {isLoading && !fail && (
        <>
          <CircularProgress
            size={150}
            sx={{
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포중...</p>
          <p className="text-4xl font-bold mt-20">
            다소 시간이 걸릴 수 있습니다.
          </p>
        </>
      )}
      {!isLoading && fail && (
        <>
          <WarningAmberIcon
            sx={{
              fontSize: 150,
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-10 mobile:text-5xl">배포 실패</p>
          <div className="flex gap-10 mt-32">
            <button
              className="blue-button w-[200px] h-[50px] mobile:w-[130px] text-[20px] mobile:text-[15px]"
              onClick={() => setFail(false)}
            >
              다시 업로드하기
            </button>
            <button
              onClick={() => setModal(true)}
              className="blue-button w-[200px] h-[50px] mobile:w-[130px] text-[20px] mobile:text-[15px]"
            >
              로그 보기
            </button>
          </div>
          <Modal open={modal} onClose={() => setModal(false)}>
            <div className="terminal-font text-[15px] bg-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] h-[60%] text-textLightGray p-8 overflow-auto whitespace-pre">
              {errorMsg}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

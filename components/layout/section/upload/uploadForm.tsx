import useFileDrop from "@/hooks/useFileDrop";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";
import useReadFolder from "@/hooks/useReadFolder";
import { useMutation } from "react-query";
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

export default function UploadForm() {
  const router = useRouter();
  const id = router.query.index as string;
  const [type, setType] = useState<string>("");

  const { exceptionHandler } = useException();
  const { files, items, fileName, inputRef, isDragActive, labelRef } =
    useFileDrop();
  const { progressManagement, zip } = useReadFolder({
    type: type,
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await getProject(id);
        setType(result.projectType);
      } catch (err) {}
    })();
  }, [id]);

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
      exceptionHandler(error.response?.data as ExceptionType, "fileExtension");
      console.log(zip)
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
      console.log(zip)
      const zipFile = await makeZipFile(zip);
      data.append("file", zipFile as Blob);
    }

    mutate(data);
  };

  return (
    <div className="main-container flex-col relative">
      {!isLoading ? (
        <>
          <ExampleModal type={type} />
          <div>
            <input ref={inputRef} type="file" id="upload" hidden disabled />
            <label
              ref={labelRef}
              htmlFor="upload"
              className={`dark:border-white relative flex flex-col items-center justify-center w-[60rem] h-[60rem] rounded-4xl border-dotted border-2 border-black ${
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
      ) : (
        <>
          <CircularProgress
            size={150}
            sx={{
              color: "#61CDFE",
            }}
          />
          <p className="text-6xl font-bold mt-20">배포중...</p>
          <p className="text-4xl font-bold mt-20">다소 시간이 걸릴 수 있습니다.</p>
        </>
      )}
    </div>
  );
}

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
import { saveAs } from "file-saver";
import FileIcon from "./fileIcon";

export default function UploadForm() {
  const router = useRouter();
  const id = router.query.index as string;

  const [type, setType] = useState<string>("");

  const { files, items, fileName, inputRef, isDragActive, labelRef } = useFileDrop();
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
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const makeZipFile = (z: JSZip) => {
    return new Promise((resolve, reject) => {
      z.generateAsync({ type: "blob", compression: "DEFLATE" }).then(
        (content: Blob) => {
          const file = new File([content], `${id}.zip`);
          saveAs(file, "Tqlkf.zip")
          console.log(file)
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
    <div className="main-container flex-col">
      <div>
        <input ref={inputRef} type="file" id="upload" hidden disabled />
        <label
          ref={labelRef}
          htmlFor="upload"
          className={`dark:border-white relative flex flex-col items-center justify-center w-[60rem] h-[60rem] rounded-4xl border-dotted border-2 border-black ${
            isDragActive && "dragStyle"
          }`}
        >
          {fileName !== "" ? <FileIcon type={type} name={fileName} /> : <UploadIcon />}
        </label>
      </div>
      <div className="flex items-center mt-[5rem]">
        <CancelButton router={router} />
        <SubmitButton onClick={submit} />
      </div>
    </div>
  );
}

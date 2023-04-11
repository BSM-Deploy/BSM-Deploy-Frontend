import useFileDrop from "@/hooks/useFileDrop";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";
import useReadFolder from "@/hooks/useReadFolder";
import { useMutation } from "react-query";
import { getProject, uploadProject } from "@/utils/api/project";
import JSZip from "jszip";
import uuid from "react-uuid";

export default function UploadForm() {
  const router = useRouter();
  const id = router.query.index as string;

  const [type, setType] = useState<string>("");

  const { files, items, inputRef, isDragActive, labelRef } = useFileDrop();
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

  const { mutate } = useMutation(uploadProject, {
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
          const file = new File([content], `${uuid()}.zip`);
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
      console.log(zipFile);
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
          className={`dark:border-white relative flex flex-col items-center w-[60rem] h-[60rem] rounded-4xl border-dotted border-2 border-black ${
            isDragActive && "dragStyle"
          }`}
        >
          <span className="absolute w-1/2 h-1/2 top-1/2 translate-y-[-60%]">
            <Image src="/images/uploadfolder.svg" alt="upload" fill={true} />
          </span>
          <span className="dark:text-black flex items-center justify-center bg-blue rounded-4xl duration-200 text-white absolute w-[80%] h-[7rem] top-[70%]">
            드래그해서 파일/폴더 업로드
          </span>
        </label>
      </div>
      <div className="flex items-center mt-[5rem]">
        <CancelButton router={router} />
        <SubmitButton onClick={submit} />
      </div>
    </div>
  );
}

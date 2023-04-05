import useFileDrop from "@/hooks/useFileDrop";
import { uploadProject } from "@/utils/api/project";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";

export default function UploadForm() {
  const router = useRouter();
  const { id, isFile } = router.query;

  const { files, inputRef, isDragActive, labelRef } = useFileDrop({
    isFile: isFile as string,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { mutate } = useMutation(uploadProject, {
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(files);
    if (files.length > 0) setButtonDisabled(false);
  }, [files]);

  const submit = () => {

    // const zip = JSZip()

    // const test = zip.folder("test")
    // test?.file("test.txt", "test", {base64: true})
    // const test2 = test?.folder("test2")
    // test2?.file("test2.txt", "test2")

    // test?.generateAsync({type: 'blob'}).then((content) => {
    //   saveAs(content, 'test')
    // })

    const data = new FormData();
    data.append("projectId", id as string);
    
    if(isFile === 'false'){
        // ZipAFolder(folder, files[0].name).then((data) => {
        //   console.log
        // })
      // data.append("file")
    }
    else{
      data.append("file", files[0]);
    }

    // mutate(data);
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
        <SubmitButton onClick={submit} disabled={buttonDisabled} />
      </div>
    </div>
  );
}

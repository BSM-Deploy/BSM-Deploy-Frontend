import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import { isDarkModeState } from "@/store/atoms/layout/isDarkMode";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { envUpdate, getProject } from "@/utils/api/project";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";
import useException from "@/hooks/useException";
import { ProjectType } from "@/types/project";

function EnvSection() {
  const isDarkMode = useRecoilValue(isDarkModeState);
  const router = useRouter();
  const editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null> =
    useRef(null);

  const { data, isSuccess } = useQuery<ProjectType, Error>(
    "project",
    () => getProject(String(router.query.projectId)),
    { enabled: router.isReady }
  );

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
  }

  const { exceptionHandler } = useException();

  const { mutate } = useMutation(envUpdate, {
    onSuccess: (data) => {
      router.push(`/project/${router.query?.projectId}`);
    },
    onError: (error: AxiosError) => {
      exceptionHandler(error.response?.data as ExceptionType, "domainPrefix");
    },
  });

  return (
    <div className="main-container flex-col gap-5">
      {data?.envVar !== undefined && (
        <Editor
          height="80%"
          width="80%"
          theme={isDarkMode ? "vs-dark" : "light"}
          onMount={handleEditorDidMount}
          defaultValue={data.envVar ?? ""}
          options={{ fontSize: 16 }}
        />
      )}
      <div className="flex gap-10">
        <button
          onClick={() => router.push(`/project/${router.query?.projectId}`)}
          className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[100px] h-[60px] text-[20px] rounded-[20px] bg-deepGrayButton text-white"
        >
          취소
        </button>
        <button
          onClick={() =>
            mutate({
              projectId: Number(router.query?.projectId),
              envVar: String(editorRef.current?.getValue()),
            })
          }
          className="blue-button w-[100px] h-[60px] text-[20px]"
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default EnvSection;

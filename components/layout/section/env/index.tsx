import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import type monaco from "monaco-editor";
import { isDarkModeState } from "@/store/atoms/layout/isDarkMode";
import { useRecoilValue } from "recoil";
import { useMutation, useQuery } from "react-query";
import { envUpdate, getProject } from "@/utils/api/project";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";
import useException from "@/hooks/useException";
import { ProjectType } from "@/types/project";
import { useRouter } from "next/navigation";

function EnvSection({ id }: { id: string }) {
  const isDarkMode = useRecoilValue(isDarkModeState);

  const editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null> =
    useRef(null);
  const router = useRouter();
  const { data, isSuccess } = useQuery<ProjectType, Error>("project", () =>
    getProject(id)
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
      router.push(`/project/${id}`);
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
          onClick={() => router.push(`/project/${id}`)}
          className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[100px] h-[60px] text-[20px] rounded-[20px] bg-deepGrayButton text-white"
        >
          취소
        </button>
        <button
          onClick={() =>
            mutate({
              projectId: Number(id),
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

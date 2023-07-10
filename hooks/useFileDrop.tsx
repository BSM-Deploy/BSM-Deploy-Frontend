import { useCallback, useEffect, useRef, useState } from "react";

function useFileDrop({ type }: { type: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<DataTransferItem[]>([]);
  const [fileName, setFileName] = useState("");

  const onDragFile = useCallback((event: DragEvent) => {
    if (!event?.dataTransfer?.files) return;

    const { files, items } = event.dataTransfer;

    if (items[0].webkitGetAsEntry()?.isFile) {
      const uploadFile = Array.from(files);
      setFiles(uploadFile);
      setFileName(uploadFile[0].name);
      setItems([]);
    } else {
      const uploadItems = Array.from(items);
      setItems(uploadItems);
      setFileName(uploadItems[0].webkitGetAsEntry()?.name as string);
      setFiles([]);
    }
  }, []);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onDragFile(e);
      setIsDragActive(false);
    },
    [onDragFile]
  );

  useEffect(() => {
    if (!labelRef.current) return;

    labelRef.current.addEventListener("dragenter", onDragEnter);
    labelRef.current.addEventListener("dragleave", onDragLeave);
    labelRef.current.addEventListener("dragover", onDragOver);
    labelRef.current.addEventListener("drop", onDrop);

    if (type !== "SINGLE_HTML") {
      inputRef.current?.setAttribute("webkitdirectory", "");
      inputRef.current?.setAttribute("directory", "");
      inputRef.current?.setAttribute("multiple", "");
      inputRef.current?.setAttribute("mozdirectory", "");
    }

    return () => {
      labelRef.current?.removeEventListener("dragenter", onDragEnter);
      labelRef.current?.removeEventListener("dragleave", onDragLeave);
      labelRef.current?.removeEventListener("dragover", onDragOver);
      labelRef.current?.removeEventListener("drop", onDrop);

      inputRef.current?.removeAttribute("webkitdirectory");
      inputRef.current?.removeAttribute("directory");
      inputRef.current?.removeAttribute("multiple");
      inputRef.current?.removeAttribute("mozdirectory");
    };
  }, [labelRef, onDragEnter, onDragLeave, onDragOver, onDrop, type]);

  return {
    inputRef,
    labelRef,
    files,
    items,
    isDragActive,
    fileName,
  };
}

export default useFileDrop;

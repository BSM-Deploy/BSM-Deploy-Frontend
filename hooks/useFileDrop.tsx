import { useCallback, useEffect, useRef, useState } from "react";

function useFileDrop() {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<DataTransferItem[]>([]);

  const onDragFile = useCallback((event: DragEvent) => {
    if (!event?.dataTransfer?.files) return;

    const { files, items } = event.dataTransfer;

    if (items[0].webkitGetAsEntry()?.isFile) {
      const uploadFile = Array.from(files);
      setFiles(uploadFile);
    } else {
      const uploadItems = Array.from(items);
      setItems(uploadItems);
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

    return () => {
      labelRef.current?.removeEventListener("dragenter", onDragEnter);
      labelRef.current?.removeEventListener("dragleave", onDragLeave);
      labelRef.current?.removeEventListener("dragover", onDragOver);
      labelRef.current?.removeEventListener("drop", onDrop);
    };
  }, [labelRef, onDragEnter, onDragLeave, onDragOver, onDrop]);

  return {
    inputRef,
    labelRef,
    files,
    items,
    isDragActive,
  };
}

export default useFileDrop;

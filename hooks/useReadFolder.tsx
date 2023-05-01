import { checkFile, checkFolder } from "@/utils/functions/validation";
import JSZip from "jszip";
import { useCallback, useState } from "react";

export default function useReadFolder({ type }: { type?: string }) {
  const [zip, setZip] = useState<any>(new JSZip());

  // item: FileSystemFileEntry or FileSystemDirectoryEntry
  const traverseFileTree = useCallback(
    (item: any, folder: JSZip, root: string) => {
      return new Promise((resolve, reject) => {
        if (type === "BUILT_REACT_JS") {
          console.log(item);
          if (item.name === "build") {
            const dirReader = item.createReader();
            dirReader.readEntries((entries: any) => {
              for (let i = 0; i < entries.length; i++) {
                traverseFileTree(entries[i], folder, root);
              }
            });
          } else if (item.isFile) {
            item.file((file: any) => {
              folder.file(file.name, file);
            });
          } else if (item.isDirectory) {
            const dirReader = item.createReader();
            const s_f = folder.folder(item.name);
            dirReader.readEntries((entries: any) => {
              for (let i = 0; i < entries.length; i++) {
                traverseFileTree(entries[i], s_f as JSZip, root);
              }
            });
          }
        } else if (item.isFile) {
          // Get file
          if (type === "BUILT_NEXT_JS") {
            if (checkFile(item, root)) {
              item.file((file: any) => {
                folder.file(file.name, file);
              });
            }
          } else {
            item.file((file: any) => {
              folder.file(file.name, file);
            });
          }
        } else if (item.isDirectory) {
          // Get folder contentsm
          if (type === "BUILT_NEXT_JS") {
            if (checkFolder(item, root)) {
              const dirReader = item.createReader();
              const s_f = folder.folder(item.name);
              dirReader.readEntries((entries: any) => {
                for (let i = 0; i < entries.length; i++) {
                  traverseFileTree(entries[i], s_f as JSZip, root);
                }
              });
            }
          } else {
            const dirReader = item.createReader();
            const s_f = folder.folder(item.name);
            dirReader.readEntries((entries: any) => {
              for (let i = 0; i < entries.length; i++) {
                traverseFileTree(entries[i], s_f as JSZip, root);
              }
            });
          }
        }
        resolve("");
      });
    },
    [type]
  );

  const readFolder = useCallback(
    (folder: FileSystemDirectoryEntry, z: JSZip, root: string) => {
      return new Promise((resolve, reject) => {
        const dirReader = folder?.createReader();
        dirReader?.readEntries(async (entries: any) => {
          for (let i = 0; i < entries.length; i++) {
            if (type === "BUILT_REACT_JS") {
              if (entries[i].fullPath.includes(`${root}/build`)) {
                await traverseFileTree(entries[i], z, root);
              }
            } else {
              await traverseFileTree(entries[i], z, root);
            }
          }
        });
        resolve(z);
      });
    },
    [traverseFileTree, type]
  );

  const progressManagement = useCallback(
    async (folder: FileSystemDirectoryEntry) => {
      const z = new JSZip();
      console.log(folder?.name);
      setZip(await readFolder(folder, z, folder?.name));
    },
    [readFolder]
  );

  return {
    progressManagement,
    zip,
  };
}

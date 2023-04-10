import JSZip from "jszip";
import { useCallback, useState } from "react";

export default function useReadFolder() {
  const [zip, setZip] = useState<JSZip>(new JSZip());

  // item: FileSystemFileEntry or FileSystemDirectoryEntry, folder: zip.folder()
  const traverseFileTree = useCallback((item: any, folder: JSZip) => {
    return new Promise((resolve, reject) => {
      if (item.isFile) {
        // Get file
        item.file((file: any) => {
          folder.file(file.name, file);
        });
      } else if (item.isDirectory) {
        // Get folder contents
        const dirReader = item.createReader();
        const s_f = folder.folder(item.name);
        dirReader.readEntries((entries: any) => {
          for (let i = 0; i < entries.length; i++) {
            traverseFileTree(entries[i], s_f as JSZip);
          }
        });
      }
      resolve("");
    });
  }, []);

  const readFolder = useCallback(
    (folder: FileSystemDirectoryEntry, z: JSZip) => {
      return new Promise((resolve, reject) => {
        const dirReader = folder?.createReader();
        dirReader?.readEntries(async (entries: any) => {
          for (let i = 0; i < entries.length; i++) {
            await traverseFileTree(entries[i], z);
          }
        });
        resolve(z);
      });
    },
    [traverseFileTree]
  );

  const progressManagement = useCallback(
    async (folder: FileSystemDirectoryEntry) => {
      const z = new JSZip();
      const result: any = await readFolder(folder, z);
      setZip(result)
    },
    [readFolder]
  );

  return {
    progressManagement,
    zip,
  };
}

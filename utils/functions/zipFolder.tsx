import JSZip from "jszip";

export const ZipAFolder = async (folder: DataTransferItemList, name: string) => {
  const zip = new JSZip();

  for (let i = 0; i < folder.length; i++) {
    const item = folder[i].webkitGetAsEntry();
    if (item) {
      traverseFileTree(item, zip);
    }
  }

  console.log(zip)
  zip.generateAsync({type: 'blob'}).then((content) => {
      
  })
};

const traverseFileTree = (item: any, folder: any) => {
  console.log(item)
  if (item.isFile) {
    // Get file
    item.file((file: any) => {
      folder?.file(file.name, file);
    });
  } else if (item.isDirectory) {
    // Get folder contents
    const dirReader = item.createReader();
    const s_f = folder?.folder(item.name);
    dirReader.readEntries((entries: any) => {
      for (var i = 0; i < entries.length; i++) {
        traverseFileTree(entries[i], s_f);
      }
    });
  }
};

import { ReactElement } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";

interface ExampleIconPropsType {
  type: string;
  name: string;
  depth: number;
}

export default function ExampleIcon(props: ExampleIconPropsType) {
  const { type, depth, name } = props;

  const iconStyle = {
    fontSize: 50,
  };

  const marginProperty = ['ml-0','ml-10','ml-20','ml-32']

  return (
    <div className={`flex items-center ml- mb-3 ${marginProperty[depth]}`}>
      {type === "folder" ? (
        <FolderIcon sx={iconStyle} />
      ) : (
        <InsertDriveFileIcon sx={iconStyle} />
      )}
      <p className="ml-5 text-3xl">{name}</p>
    </div>
  );
}

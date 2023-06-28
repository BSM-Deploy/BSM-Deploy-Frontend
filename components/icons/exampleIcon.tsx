import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

interface ExampleIconPropsType {
  type: string;
  name: string;
  depth: number;
}

export default function ExampleIcon(props: ExampleIconPropsType) {
  const { type, depth, name } = props;
  const matches = useMediaQuery("(max-width: 480px)");

  const iconStyle = {
    fontSize: matches ? 40 : 50,
  };

  const marginProperty = ['ml-0','ml-10','ml-20','ml-32']

  return (
    <div className={`flex items-center mb-3 ${marginProperty[depth]}`}>
      {type === "folder" ? (
        <FolderIcon sx={iconStyle} />
      ) : (
        <InsertDriveFileIcon sx={iconStyle} />
      )}
      <p className="ml-5 text-[18.75px] mobile:text-[15px]">{name}</p>
    </div>
  );
}

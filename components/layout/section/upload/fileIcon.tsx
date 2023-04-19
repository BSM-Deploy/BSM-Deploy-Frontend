import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

export default function FileIcon({type, name}: {type: string; name: string}) {
  const iconStyle = {
    width: 1,
    height: 1,
  }

  return(
    <div className='relative w-[35rem] h-[35rem] pointer-events-none'>
      {type === 'SINGLE_HTML' ? <InsertDriveFileIcon sx={iconStyle} /> : <FolderIcon sx={iconStyle} />}
      <p className='z-10 absolute top-1/2 left-1/2 translate-x-[-50%] break-all text-white dark:text-black'>{name}</p>
    </div>
  )
};

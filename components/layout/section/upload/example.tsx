import { exampleModalState } from '@/store/atoms/modals/exampleModal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { useRecoilState } from 'recoil';

export default function Example() {
  const matches = useMediaQuery("(max-width: 480px)");
  const [, setExampleModal] = useRecoilState(exampleModalState);

  const openModal = () => {
    setExampleModal(true)
  }

  return(
    <div onClick={openModal} className='z-10 absolute right-10 top-10 cursor-pointer'>
      <ErrorOutlineIcon sx={{
        color: '#61CDFE',
        fontSize: matches ? 50 : 60,
      }} />
    </div>    
  )
};

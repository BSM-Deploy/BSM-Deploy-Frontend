import { exampleModalState } from '@/store/atoms/modals/exampleModal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRecoilState } from 'recoil';

export default function Example() {

  const [exampleModal, setExampleModal] = useRecoilState(exampleModalState);

  const openModal = () => {
    setExampleModal(true)
  }

  return(
    <div onClick={openModal}>
      <ErrorOutlineIcon sx={{
        color: '#61CDFE',
        fontSize: 60,
        position: 'absolute',
        right: 0,
        top: 0
      }} />
    </div>    
  )
};

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Main(){
    return(
        <div className='main-container'>
            <h1 className='text-[7rem] mb-[12rem]'>BSM Deploy</h1>
            <p className='mb-6'>BSM Deploy는 정적/동적 사이트, 백엔드 프로젝트의 배포를 도와주는 서비스입니다.</p>
            <p>여러분들의 웹사이트 도메인 뒤에 bssm.kro.kr을 붙여보세요!</p>
            <button className='blue-button mt-[12rem] w-[180px] h-[60px]'>시작하기 <ArrowForwardIcon className='w-[25px] h-[25px]'/></button>
        </div>
    )
}
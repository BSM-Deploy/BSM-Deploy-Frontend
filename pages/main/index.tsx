import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Main(){
    return(
        <div className='bg-lightBack flex items-center justify-center flex-col w-full h-screen top-0 font-bold text-4xl'>
            <h1 className='text-[7rem] mb-[12rem]'>BSM Deploy</h1>
            <p className='mb-6'>BSM Deploy는 정적/동적 사이트, 백엔드 프로젝트의 배포를 도와주는 서비스입니다.</p>
            <p>여러분들의 웹사이트 도메인 뒤에 bssm.kro.kr을 붙여보세요!</p>
            <button className='flex items-center justify-center bg-[#61CDFE] w-[180px] h-[60px] mt-[12rem] rounded-4xl'>시작하기 <ArrowForwardIcon className='w-[25px] h-[25px]'/></button>
        </div>
    )
}
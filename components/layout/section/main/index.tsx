import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function Main() {
  return (
    <div className="main-section flex items-center justify-center flex-col font-bold text-4xl">
      <h1 className="text-[70px] mb-[120px]">BSM Deploy</h1>
      <p className="mb-[15px] text-[22.5px]">
        BSM Deploy는 정적/동적 사이트의 배포를 도와주는
        서비스입니다.
      </p>
      <p className="text-[22.5px]">여러분들의 웹사이트 도메인 뒤에 bssm.kro.kr을 붙여보세요!</p>
      <Link href={"/setting"} className="w-[180px] h-[60px] mt-[120px] text-[22.5px] blue-button">
        시작하기 <ArrowForwardIcon className="ml-[12.5px] w-[25px] h-[25px]" /> 
      </Link>
    </div>
  );
}

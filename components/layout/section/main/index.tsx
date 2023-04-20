import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function Main() {
  return (
    <div className="main-section flex items-center justify-center flex-col font-bold text-4xl">
      <h1 className="text-[7rem] mb-[12rem]">BSM Deploy</h1>
      <p className="mb-6 text-4xl">
        BSM Deploy는 정적/동적 사이트의 배포를 도와주는
        서비스입니다.
      </p>
      <p className="text-4xl">여러분들의 웹사이트 도메인 뒤에 bssm.kro.kr을 붙여보세요!</p>
      <Link href={"/setting"} className="w-[18rem] h-[6rem] mt-[12rem] blue-button">
        시작하기 <ArrowForwardIcon className="ml-5 w-[2.5rem] h-[2.5rem]" />
      </Link>
    </div>
  );
}

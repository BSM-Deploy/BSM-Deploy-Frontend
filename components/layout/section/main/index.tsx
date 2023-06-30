import { headerTitleState } from "@/store/atoms/layout/headerTitle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Main() {
  const setTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setTitle("");
  }, [setTitle]);

  return (
    <section className="main-section flex items-center justify-center flex-col font-bold">
      <h1 className="text-[70px] mobile:text-[40px] mb-[100px]">BSM Deploy</h1>
      <p className="mb-[15px] text-[22.5px] mobile:text-[20px] mobile:w-[75%]">
        BSM Deploy는 정적/동적 사이트의 배포를 도와주는 서비스입니다.
      </p>
      <p className="text-[22.5px] mobile:text-[20px] mobile:w-[75%]">
        여러분들의 웹사이트 도메인 뒤에 bssm.kro.kr을 붙여보세요!
      </p>
      <Link
        href={"/setting"}
        className="w-[180px] h-[60px] mt-[120px] text-[22.5px] mobile:w-[130px] mobile:h-[45px] mobile:text-[15px] blue-button"
      >
        시작하기{" "}
        <ArrowForwardIcon className="ml-[12.5px] w-[25px] h-[25px] mobile:w-[20px] mobile:h-[20px]" />
      </Link>
    </section>
  );
}

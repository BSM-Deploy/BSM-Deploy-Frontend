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
      <h1 className="text-[70px] mobile:text-[40px] mb-[50px]">BSM Deploy</h1>
      <p className="mb-[15px] text-[22.5px] mobile:text-[20px] mobile:w-[75%]">
        BSM Deploy는 부산소마고 재학생을 위한 웹사이트 배포 서비스입니다.
      </p>
      <p className="text-[22.5px] mobile:text-[20px] mobile:w-[75%]">
        그동안 배포하지 못했던 프로젝트를 무료로 배포해보세요!
      </p>
      <div className="flex gap-10">
        <a
          href="https://www.youtube.com/playlist?list=PL0Lb9XSDAE1fZvQp-ez37nIHMdQgu8OJs"
          target="_blank"
          className="!text-white w-[180px] h-[60px] mt-[100px] text-[22.5px] mobile:w-[130px] mobile:h-[45px] mobile:text-[15px] blue-button bg-deepGrayButton"
        >
          사용 가이드
        </a>
        <Link
          href={"/setting"}
          className="text-black w-[180px] h-[60px] mt-[100px] text-[22.5px] mobile:w-[130px] mobile:h-[45px] mobile:text-[15px] blue-button"
        >
          시작하기{" "}
          <ArrowForwardIcon className="ml-[12.5px] w-[25px] h-[25px] mobile:w-[20px] mobile:h-[20px]" />
        </Link>
      </div>
    </section>
  );
}

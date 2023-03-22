import Header from "@/components/layout/header/Header";
import Link from "next/link";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { settingModalState } from "@/store/atoms/modals/settingModal";

export default function Select(){
    const settingModal = useRecoilValue(settingModalState);

    const [dark, setDark] = useState(false)
    useEffect(()=>{
        if(localStorage.theme === "dark"){
            setDark(true)
        }
        else{
            setDark(false)
        }
    }, [settingModal])

    return (
      <>
        <Header />
        <Sidebar />
        <div className="main-container">
          <div className="flex flex-col items-center mr-[20rem]">
            <div className="w-[30rem] h-[30rem] relative">
              <Image src={`/images/${dark ? "whitebackend" : "backend"}.svg`} fill={true} alt="backend" />
              <div className="absolute bg-lightBack dark:bg-darkGray w-[30rem] h-[5rem] bottom-0"></div>
            </div>
            <Link href="/setting" className="blue-button w-[25rem] h-[6rem]">
              백엔드로 시작하기
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[30rem] h-[30rem] relative">
            <Image src={`/images/${dark ? "whitefrontend" : "frontend"}.svg`} fill={true} alt="frontend" />
              <div className="absolute bg-lightBack dark:bg-darkGray w-[30rem] h-[5rem] bottom-0"></div>
            </div>
            <Link href="/setting" className="blue-button w-[25rem] h-[6rem]">
                프론트로 시작하기
              </Link>
          </div>
        </div>
      </>
    );
}
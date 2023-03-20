import Link from "next/link";
import React from "react";
import { Settings } from "@mui/icons-material";
import { settingModalState } from "@/store/atoms/modals/settingModal";
import { useRecoilState } from "recoil";

function Header({ title }: { title?: string }) {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  return (
    <header className="z-50 dark:bg-black bg-lightBackground p-[5px] h-[54px] flex items-center gap-2 fixed top-0 w-full">
      <Link
        href="/"
        className="gray-button text-[2rem] font-bold h-full tracking-tight px-[1.8rem] w-[144.48px]"
      >
        BSM Deploy
      </Link>
      <div
        className="!w-[4.4rem] !h-[4.4rem] gray-button"
        onClick={() => setSettingModal(true)}
      >
        <Settings className="dark:text-textLightGray !text-5xl" />
      </div>
      <div className="dark:text-textLightGray text-center w-[calc(100%-198.48px)] text-[2rem] font-bold cursor-default">
        {title}
      </div>
    </header>
  );
}

export default Header;

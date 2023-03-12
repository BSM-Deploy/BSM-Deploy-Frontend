import Link from "next/link";
import React from "react";
import { Settings } from "@mui/icons-material";
import { settingModalState } from "@/store/atoms/modals/settingModal";
import { useRecoilState } from "recoil";

function Header() {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  return (
    <header className="bg-black p-[5px] h-[54px] flex items-center gap-2">
      <Link
        href="/"
        className="gray-button text-[2rem] font-bold h-full tracking-tight px-[1.8rem]"
      >
        BSM Deploy
      </Link>
      <div
        className="!w-[4.4rem] !h-[4.4rem] gray-button"
        onClick={() => setSettingModal(true)}
      >
        <Settings className="text-textLightGray !text-5xl" />
      </div>
    </header>
  );
}

export default Header;

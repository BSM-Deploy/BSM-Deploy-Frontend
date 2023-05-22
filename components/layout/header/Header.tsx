import Link from "next/link";
import React from "react";
import { Settings } from "@mui/icons-material";
import { settingModalState } from "@/store/atoms/modals/settingModal";
import { useRecoilState } from "recoil";
import SettingModal from "@/components/modals/SettingModal";

function Header({ title }: { title?: string }) {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  return (
    <>
      <header className="z-50 dark:bg-leeBlack bg-lightBackground p-[5px] h-[54px] flex items-center gap-2 fixed top-0 w-full">
        <Link
          href="/"
          className="gray-button text-[20px] font-bold h-full tracking-tight w-[144.48px]"
        >
          BSM Deploy
        </Link>
        <div
          className="!w-[44px] !h-[44px] gray-button"
          onClick={() => setSettingModal(true)}
        >
          <Settings className="dark:text-textLightGray !text-[30px]" />
        </div>
        <div className="dark:text-textLightGray text-center w-[calc(100%-198.48px)] text-[20px] font-bold cursor-default">
          {title}
        </div>
      </header>
      <SettingModal />
    </>
  );
}

export default Header;

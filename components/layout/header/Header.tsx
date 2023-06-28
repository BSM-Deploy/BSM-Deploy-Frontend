import Link from "next/link";
import React from "react";
import { settingModalState } from "@/store/atoms/modals/settingModal";
import { useRecoilState } from "recoil";
import MenuIcon from "@mui/icons-material/Menu";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";
import SettingModal from "@/components/modals/SettingModal";
import SettingsIcon from "@mui/icons-material/Settings";

function Header({ title }: { title?: string }) {
  const [, setSettingModal] = useRecoilState(settingModalState);
  const [, setOpenSidebar] = useRecoilState(openSidebarState);

  return (
    <>
      <header className="grid-header dark:bg-leeBlack bg-lightBackground p-[5px] h-[54px] flex items-center gap-2 w-full">
        <Link
          href="/"
          className="mobile:hidden gray-button text-[20px] font-bold h-full tracking-tight w-[144.48px]"
        >
          BSM Deploy
        </Link>
        <div
          className="mobile:absolute mobile:left-[5px] laptop:hidden desktop:hidden tablet:hidden !w-[44px] !h-[44px] gray-button"
          onClick={() => setOpenSidebar((prev) => !prev)}
        >
          <MenuIcon className="dark:text-textLightGray !text-[30px]" />
        </div>
        <div
          className="mobile:absolute mobile:right-[5px] !w-[44px] !h-[44px] gray-button"
          onClick={() => setSettingModal(true)}
        >
          <SettingsIcon className="dark:text-textLightGray !text-[30px]" />
        </div>
        <div className="dark:text-textLightGray text-center absolute left-1/2 translate-x-[-50%] text-[20px] font-bold cursor-default">
          {title}
        </div>
      </header>
      <SettingModal />
    </>
  );
}

export default Header;

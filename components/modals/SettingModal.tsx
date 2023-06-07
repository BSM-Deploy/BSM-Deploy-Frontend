import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MdClear } from "react-icons/md";
import { settingModalState } from "@/store/atoms/modals/settingModal";
import { isDarkModeState } from "@/store/atoms/layout/isDarkMode";

function SettingModal() {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  const [mount, setMount] = useState(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  useEffect(() => {
    setMount(true);
    setIsDarkMode(localStorage.theme === "dark");
    return () => setMount(false);
  }, []);

  const changeTheme = () => {
    if (localStorage.theme === "dark") {
      localStorage.setItem("theme", "white");
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };
  return (
    <Modal open={settingModal} onClose={() => setSettingModal(false)}>
      <div className="mobile:w-[90%] w-[400px] flex p-6 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <h1 className="dark:text-textLightGray text-[25px] font-bold text-center">
          설정
        </h1>
        <button
          className="gray-button absolute top-4 right-4"
          onClick={() => setSettingModal(false)}
        >
          <MdClear className="dark:text-textLightGray" size={44} />
        </button>
        <div>
          <h3 className="text-[#606164] dark:text-textDarkGray text-[16px] px-6 pt-8 pb-4 font-bold">
            모양
          </h3>
          <div
            className="px-6 cursor-pointer flex justify-between rounded-4xl bg-lighterGray dark:bg-modalBlack h-[46px] items-center hover:bg-lightHover dark:hover:bg-darkHover duration-200"
            onClick={() => {
              if (mount) {
                changeTheme();
              }
            }}
          >
            <span className="dark:text-textLightGray text-[16px] font-bold">
              다크 모드
            </span>
            <div className="w-[38px] h-[22px] rounded-full dark:bg-blue relative bg-[#808080]">
              <div
                className={`w-[16px] h-[16px] bg-white rounded-full absolute left-[3px] top-[3px] duration-[.25s] ${
                  isDarkMode ? "translate-x-full" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SettingModal;

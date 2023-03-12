import { settingModalState } from "@/store/atoms/modals/settingModal";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MdClear } from "react-icons/md";

function SettingModal() {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  const [mount, setMount] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
      <div className="w-[40rem] flex p-6 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <h1 className="dark:text-textLightGray text-[2.5rem] font-bold text-center">
          설정
        </h1>
        <button
          className="gray-button absolute top-4 right-4"
          onClick={() => setSettingModal(false)}
        >
          <MdClear className="dark:text-textLightGray" size={44} />
        </button>
        <div>
          <h3 className="text-[#606164] dark:text-textDarkGray text-[1.6rem] px-6 pt-8 pb-4 font-bold">
            모양
          </h3>
          <div className="px-6 flex justify-between rounded-4xl bg-lighterGray dark:bg-modalBlack h-[46px] items-center hover:bg-lightHover dark:hover:bg-darkHover duration-200">
            <span className="dark:text-textLightGray font-bold">다크 모드</span>
            <div
              className="w-[3.8rem] h-[2.2rem] rounded-full dark:bg-blue relative cursor-pointer bg-[#808080]"
              onClick={() => {
                if (mount) {
                  changeTheme();
                }
              }}
            >
              <div
                className={`w-[1.6rem] h-[1.6rem] bg-white rounded-full absolute left-[0.3rem] top-[0.3rem] duration-[.25s] ${
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

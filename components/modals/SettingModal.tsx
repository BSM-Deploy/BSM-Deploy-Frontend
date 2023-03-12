import { settingModalState } from "@/store/atoms/modals/settingModal";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MdClear } from "react-icons/md";

function SettingModal() {
  const [settingModal, setSettingModal] = useRecoilState(settingModalState);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);

    return () => setMount(false);
  }, []);
  return (
    <Modal open={settingModal} onClose={() => setSettingModal(false)}>
      <div className="w-[40rem] flex p-6 rounded-3xl flex-col bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute">
        <h1 className="text-textLightGray text-[2.5rem] font-bold text-center">
          설정
        </h1>
        <button
          className="gray-button absolute top-4 right-4"
          onClick={() => setSettingModal(false)}
        >
          <MdClear className="text-textLightGray" size={44} />
        </button>
        <div>
          <h3 className="text-textDarkGray text-[1.6rem] px-6 pt-8 pb-4 font-bold">
            모양
          </h3>
          <div className="px-6 flex justify-between rounded-4xl bg-modalBlack h-[46px] items-center">
            <span className="text-textLightGray font-bold">다크 모드</span>
            <div className="w-16 h-[2.2rem] rounded-full bg-blue relative cursor-pointer">
              <div className="w-[1.6rem] h-[1.6rem] bg-white rounded-full absolute left-[0.3rem] top-[0.3rem]" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SettingModal;

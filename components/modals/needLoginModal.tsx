import Modal from "@mui/material/Modal/Modal";
import { needLoginModalState } from "@/store/atoms/modals/needLoginModal";
import { useRecoilValue } from "recoil";

export default function NeedLoginModal() {
  const needLogin = useRecoilValue(needLoginModalState);

  return (
    <>
      {needLogin && (
        <Modal open={true}>
          <div className="justify-center items-center min-w-[40rem] flex p-10 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
            <p className="text-4xl mb-16">로그인이 필요한 서비스입니다.</p>
            <a
              href={process.env.NEXT_PUBLIC_BSM_OAUTH_URI}
              className="text-3xl blue-button w-[17rem] h-[5rem] cursor-pointer"
            >
              로그인 하러가기
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}

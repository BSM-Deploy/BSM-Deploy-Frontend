import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export default function CancelButton({ router }: { router: AppRouterInstance }) {
  return (
    <>
      <input
        type="button"
        onClick={() => router.back()}
        value="취소"
        className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 mobile:h-[50px] mobile:w-[80px] mobile:text-[16px] w-[100px] h-[60px] text-[20px] rounded-[20px] mr-10 bg-deepGrayButton text-white"
      />
    </>
  );
};

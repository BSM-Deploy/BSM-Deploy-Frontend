import { NextRouter, useRouter } from "next/router"

export default function CancelButton({ router }: { router: NextRouter }) {
  return (
    <>
      <input
        type="button"
        onClick={() => router.back()}
        value="취소"
        className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[100px] h-[60px] text-[20px] rounded-[20px] mr-10 bg-deepGrayButton text-white"
      />
    </>
  );
};

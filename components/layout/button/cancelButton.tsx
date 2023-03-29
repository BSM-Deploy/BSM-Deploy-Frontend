import { NextRouter, useRouter } from "next/router"

export default function CancelButton({ router }: { router: NextRouter }) {
  return (
    <>
      <input
        type="button"
        onClick={() => router.back()}
        value="취소"
        className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[10rem] h-[6rem] rounded-4xl mr-10 bg-deepGrayButton text-white"
      />
    </>
  );
};

import React from "react";
import Image from "next/image";

function SidebarItems({
  profileImg,
  nickname,
}: {
  profileImg?: string;
  nickname: string;
}) {
  return (
    <div className="cursor-pointer [&:hover>span]:text-accentBlue rounded-lg w-full h-[4.5rem] flex items-center gap-6 px-6 py-3 dark:hover:bg-darkHover hover:bg-lightHover duration-250">
      <div className="w-[2.75rem] h-[2.75rem] relative rounded-full">
        {profileImg ? (
          <Image
            src={profileImg}
            fill
            alt={`${nickname}의 프로필사진`}
            className="rounded-full"
          />
        ) : (
          <> </>
        )}
      </div>
      <span className="font-bold text-sidebarLightText duration-250">
        {nickname}
      </span>
    </div>
  );
}

export default SidebarItems;

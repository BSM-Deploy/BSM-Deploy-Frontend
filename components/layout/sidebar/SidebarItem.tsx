import React, { ReactNode } from "react";
import Image from "next/image";
import { ExpandMoreRounded } from "@mui/icons-material";

function SidebarItems({
  profileImg,
  name,
  isDropdown,
  isDropdownMenu,
  isOpenDropdown,
  index,
  Icon,
}: {
  profileImg?: string;
  name?: string;
  isDropdown?: boolean;
  isDropdownMenu?: boolean;
  isOpenDropdown?: boolean;
  index?: number;
  Icon?: ReactNode;
}) {
  return (
    <div 
      className={`relative cursor-pointer [&:hover>svg]:text-accentBlue [&:hover>span]:text-accentBlue dark:[&:hover>svg]:text-blue dark:[&:hover>span]:text-blue dark:[&:hover>span>svg]:text-blue ${
        isOpenDropdown && "[&>svg]:rotate-180"
      } rounded-lg ${
        isDropdownMenu ? "w-[calc(100%-1.5rem)]" : "w-full"
      } h-[45px] flex items-center gap-[15px] px-6 py-3 ${
        isDropdownMenu && "ml-6"
      } dark:hover:bg-darkHover hover:bg-lightBack duration-250`}
    >
      {profileImg ? (
        <div className="w-[27.5px] h-[27.5px] relative rounded-full">
          <Image
            src={profileImg}
            fill
            alt={`${name}의 프로필사진`}
            className="rounded-full"
          />
        </div>
      ) : (
        <span className="w-[27.5px] h-[27.5px] relative flex justify-center items-center">
          {Icon}
        </span>
      )}
      <span className="font-bold text-[15px] text-sidebarLightText dark:text-textDarkGray duration-250">
        {name}
      </span>
      {isDropdown && (
        <ExpandMoreRounded
          sx={{ fontSize: "32px" }}
          className="text-sidebarLightText dark:text-textDarkGray absolute right-6 duration-250 transition-all"
        />
      )}
    </div>
  );
}

export default SidebarItems;

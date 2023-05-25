import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { Construction, Settings } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 w-full">
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          router.push(`/${newValue}`)
        }}
      >
        <BottomNavigationAction label="내 프로젝트" value={"project"} icon={<Construction />} />
        <BottomNavigationAction label="메인화면" value={""} icon={<HomeIcon />} />
        <BottomNavigationAction label="프로젝트 생성" value={"setting"} icon={<Settings />} />
      </BottomNavigation>
    </div>
  );
}

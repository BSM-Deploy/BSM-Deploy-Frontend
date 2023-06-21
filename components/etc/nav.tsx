import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from "@mui/icons-material/Home";
import BottomNavigation from "@mui/material/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction/BottomNavigationAction";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="mobile:grid-navbar fixed bottom-0 w-full">
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          router.push(`/${newValue}`);
        }}
      >
        <BottomNavigationAction
          label="내 프로젝트"
          value={"project"}
          icon={<ConstructionIcon />}
        />
        <BottomNavigationAction
          label="메인화면"
          value={""}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="프로젝트 생성"
          value={"setting"}
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </nav>
  );
}

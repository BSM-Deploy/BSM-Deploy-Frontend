import ConstructionIcon from "@mui/icons-material/Construction";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import BottomNavigation from "@mui/material/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction/BottomNavigationAction";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

export default function Nav() {
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 480px)");

  return (
    <>
      {matches && (
        <nav className="mobile:grid-nav w-screen">
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
      )}
    </>
  );
}

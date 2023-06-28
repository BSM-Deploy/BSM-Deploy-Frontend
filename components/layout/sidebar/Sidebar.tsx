import { getUserInfo } from "@/utils/api/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SidebarItems from "./SidebarItem";
import { useQuery, useMutation } from "react-query";
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { logout } from "@/utils/api/auth";
import useException from "@/hooks/useException";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";
import { useRecoilValue } from "recoil";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";

function Sidebar() {
  const openSidebar = useRecoilValue(openSidebarState);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);
  
  const userQuery = useQuery(["user"], () => getUserInfo(), {
    enabled: mount && localStorage.accessToken !== undefined,
  });
  const [userDropdown, setUserDropdown] = useState(false);
  const [isView, setIsView] = useState(false);
  const { exceptionHandler } = useException();

  const logoutMutation = useMutation(() => logout(), {
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    },
    onError: (err: AxiosError) => {
      exceptionHandler(err.response?.data as ExceptionType);
    },
  });

  const toggleMenu = () => {
    if (!userDropdown) {
      setIsView(true);
      setUserDropdown(true);
    } else {
      setIsView(false);
      setTimeout(() => {
        setUserDropdown(false);
      }, 150);
    }
  };

  return (
    <aside
      className={`z-10 duration-300 grid-sidebar mobile:translate-x-[-25rem] w-[25rem] mobile:w-[0px] overflow-x-hidden inline-block h-full bg-lightBackground dark:bg-leeBlack ${
        openSidebar && "!translate-x-0 !w-[25rem]"
      }`}
    >
      {userQuery.isSuccess ? (
        <>
          <div onClick={toggleMenu}>
            <SidebarItems
              name={userQuery.data.nickname}
              profileImg={userQuery.data.profileImg}
              isDropdown
              isOpenDropdown={userDropdown}
            />
          </div>
          <div className={`${isView ? "animate-down" : "animate-up"}`}>
            {userDropdown && (
              <>
                <Link href="https://auth.bssm.kro.kr/user" target="_blank">
                  <SidebarItems
                    name="내 정보"
                    isDropdownMenu
                    index={1}
                    Icon={
                      <PersonOutlineIcon
                        fontSize="large"
                        className="dark:text-textDarkGray"
                      />
                    }
                  />
                </Link>
                <div
                  onClick={() => {
                    logoutMutation.mutate();
                  }}
                >
                  <SidebarItems
                    name="로그아웃"
                    isDropdownMenu
                    index={2}
                    Icon={
                      <LogoutIcon
                        fontSize="large"
                        className="dark:text-textDarkGray"
                      />
                    }
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <a href={process.env.NEXT_PUBLIC_BSM_OAUTH_URI}>
          <SidebarItems
            name="로그인"
            Icon={
              <PersonOutlineIcon
                fontSize="large"
                className="dark:text-textDarkGray"
              />
            }
            isOpenDropdown={userDropdown}
          />
        </a>
      )}
      <Link href="/project">
        <SidebarItems
          name="내 프로젝트"
          Icon={
            <ConstructionIcon fontSize="large" className="dark:text-textDarkGray" />
          }
        />
      </Link>
      <Link href="/setting">
        <SidebarItems
          name="프로젝트 만들기"
          Icon={
            <SettingsIcon fontSize="large" className="dark:text-textDarkGray" />
          }
        />
      </Link>
    </aside>
  );
}

export default Sidebar;

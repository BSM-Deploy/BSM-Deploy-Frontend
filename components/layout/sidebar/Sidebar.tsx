import { getUserInfo } from "@/utils/api/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SidebarItems from "./SidebarItem";
import { useQuery, useMutation } from "react-query";
import {
  Logout,
  PersonOutline,
  Construction,
  Settings,
} from "@mui/icons-material";
import { logout } from "@/utils/api/auth";
import useException from "@/hooks/useException";
import { AxiosError } from "axios";
import { ExceptionType } from "@/types/exception";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLogin } from "@/store/atoms/user/user";
import { openSidebarState } from "@/store/atoms/modals/openSideBar";

function Sidebar() {
  const openSidebar = useRecoilValue(openSidebarState);
  const [login, setLogin] = useRecoilState(userIsLogin);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);
  const userQuery = useQuery("user", () => getUserInfo(), {
    enabled: mount && localStorage.accessToken !== undefined,
    onSuccess: () => {
      setLogin(true);
    },
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
      className={`mobile:translate-x-[-100%] fixed top-[54px] z-30 w-[250px] inline-block h-full min-h-screen bg-lightBackground dark:bg-leeBlack p-[0.5rem] ${
        openSidebar && "!translate-x-[0%]"
      } duration-300`}
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
                <a href="https://auth.bssm.kro.kr/user" target="_blank">
                  <SidebarItems
                    name="내 정보"
                    isDropdownMenu
                    index={1}
                    Icon={
                      <PersonOutline
                        fontSize="large"
                        className="dark:text-textDarkGray"
                      />
                    }
                  />
                </a>
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
                      <Logout
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
        <a href={process.env.BSM_OAUTH_URI}>
          <SidebarItems
            name="로그인"
            Icon={
              <PersonOutline
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
            <Construction fontSize="large" className="dark:text-textDarkGray" />
          }
        />
      </Link>
      <Link href="/setting">
        <SidebarItems
          name="프로젝트 만들기"
          Icon={
            <Settings fontSize="large" className="dark:text-textDarkGray" />
          }
        />
      </Link>
    </aside>
  );
}

export default Sidebar;

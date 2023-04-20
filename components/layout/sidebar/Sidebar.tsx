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

function Sidebar() {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);
  const userQuery = useQuery("user", () => getUserInfo(), {
    enabled: mount && localStorage.accessToken !== undefined,
  });
  const [userDropdown, setUserDropdown] = useState(false);
  const [isView, setIsView] = useState(false);

  const logoutMutation = useMutation(() => logout());

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
    <aside className="fixed top-[54px] z-30 w-100 inline-block h-full min-h-screen bg-lightBackground dark:bg-black p-[0.5rem]">
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
                  if (logoutMutation.isSuccess) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.reload();
                  }
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
        <a href="https://auth.bssm.kro.kr/oauth?clientId=347a7232&redirectURI=http://localhost:3000/oauth/bsm">
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
          Icon={<Settings fontSize="large" />}
        />
      </Link>
    </aside>
  );
}

export default Sidebar;

import { getUserInfo } from "@/utils/api/user";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import SidebarItems from "./SidebarItems";
import { useQuery, useMutation } from "react-query";
import { Logout, PersonOutline } from "@mui/icons-material";
import { logout } from "@/utils/api/auth";

function Sidebar() {
  const userQuery = useQuery("user", () => getUserInfo());
  const [userDropdown, setUserDropdown] = useState(false);

  const logoutMutation = useMutation(() => logout());

  return (
    <aside className="fixed top-[5.4rem] z-30 w-100 inline-block h-full min-h-screen bg-lightBackground dark:bg-black p-[0.5rem]">
      {userQuery.isSuccess ? (
        <>
          <div onClick={() => setUserDropdown((prev) => !prev)}>
            <SidebarItems
              name={userQuery.data.nickname}
              profileImg={userQuery.data.profileImg}
              isDropdown
              isOpenDropdown={userDropdown}
            />
          </div>
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
    </aside>
  );
}

export default Sidebar;

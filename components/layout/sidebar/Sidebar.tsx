import { getUserInfo } from "@/utils/api/user";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SidebarItems from "./SidebarItems";
import { useQuery } from "react-query";

function Sidebar() {
  const userQuery = useQuery("user", () => getUserInfo());

  return (
    <aside className="fixed top-[5.4rem] z-30 w-100 inline-block h-full min-h-screen bg-lightBackground dark:bg-black p-[0.5rem]">
      {userQuery.isSuccess && (
        <SidebarItems
          nickname={userQuery.data.nickname}
          profileImg={userQuery.data.profileImg}
          isDropdown
        />
      )}
      <a href="https://auth.bssm.kro.kr/oauth?clientId=347a7232&redirectURI=http://localhost:3000/oauth/bsm">
        테스트!!!
      </a>
    </aside>
  );
}

export default Sidebar;

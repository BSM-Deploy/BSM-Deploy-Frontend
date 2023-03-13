import { getUserInfo } from "@/utils/api/user";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import SidebarItems from "./SidebarItems";

function Sidebar() {
  const userSample = {
    id: 7,
    nickname: "임베가희망이다",
    profileImg: "/images/logo.png",
  };
  const { id, nickname, profileImg } = userSample;
  return (
    <aside className="w-100 inline-block h-full min-h-screen bg-lightBackground dark:bg-black border-2 p-[0.5rem]">
      <SidebarItems nickname={nickname} profileImg={profileImg} />
      <a href="https://auth.bssm.kro.kr/oauth?clientId=347a7232&redirectURI=http://localhost:3000/oauth/bsm">
        테스트!!!
      </a>
    </aside>
  );
}

export default Sidebar;

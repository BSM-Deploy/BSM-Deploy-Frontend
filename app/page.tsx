"use client";

import React from "react";
import Main from "@/components/layout/section/main";
import { NextSeoProps, NextSeo } from "next-seo";

export default function Home() {
  const seoConfig: NextSeoProps = {
    title: "BSM-Deploy",
    description: "정적/동적 웹 사이트를 쉽게 배포할 수 있는 사이트입니다.",
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <Main />
    </>
  );
}

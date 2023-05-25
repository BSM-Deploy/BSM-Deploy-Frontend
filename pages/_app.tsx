import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Refresh } from "@/components/etc/refresh";
import Loading from "@/components/etc/Loading";
import Nav from "@/components/etc/nav";
import { useMediaQuery } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  const matches = useMediaQuery("(max-width: 480px)")

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Loading />
        <Refresh />
        {matches && <Nav />}
      </QueryClientProvider>
    </RecoilRoot>
  );
}

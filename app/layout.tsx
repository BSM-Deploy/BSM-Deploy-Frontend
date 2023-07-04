"use client";

import Loading from "@/components/etc/Loading";
import { Refresh } from "@/components/etc/refresh";
import Layout from "@/components/layout/layout";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="kr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="keyword" content="BSM, BSM-Deploy, 배포" />
        <meta name="application-name" content="BSM-Deploy" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta
          name="description"
          content="BSM Deploy는 정적/동적 사이트의 배포를 도와주는 서비스입니다."
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/icons/icon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-192x192.png"
          sizes="192x192"
        />
        <title>BSM-Deploy</title>
      </head>
      <body>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Loading />
            <Refresh />
            <Layout>{children}</Layout>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}

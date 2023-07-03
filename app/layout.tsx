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
        <meta charSet="UTF-8" />
        <meta name="keyword" content="BSM, BSM-Deploy, 배포" />
        <meta name="application-name" content="BSM-Deploy" />
        <meta
          name="description"
          content="BSM Deploy는 정적/동적 사이트의 배포를 도와주는 서비스입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-48x48.png"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-72x72.png"
          sizes="72x72"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-128x128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-144x144.png"
          sizes="144x144"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-152x152.png"
          sizes="152x152"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-384x384.png"
          sizes="384x384"
        />
        <link
          rel="icon"
          type="image/png"
          href="./icons/icon-512x512.png"
          sizes="512x512"
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

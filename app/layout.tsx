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

'use client';

import { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <JotaiProvider>
        {/* TODO: auth() に統一して削除したい */}
        <SessionProvider>{children}</SessionProvider>
      </JotaiProvider>

      <ProgressBar
        height="3px"
        color="#2eb2ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

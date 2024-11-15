'use client';

import { Provider as JotaiProvider } from 'jotai';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <JotaiProvider>{children}</JotaiProvider>

      <ProgressBar
        height="3px"
        color="#2eb2ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

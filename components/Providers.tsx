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
        color="#00b200"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

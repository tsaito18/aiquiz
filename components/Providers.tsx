'use client';

import { ReactNode } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#2eb2ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

import { ReactNode } from 'react';

export default function PlayLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col items-center justify-center px-4 py-10">
      {children}
    </div>
  );
}

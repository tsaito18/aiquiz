'use client';

import Link from 'next/link';

// import { userAtom } from '@/atoms/user';
// import { useAtomValue } from 'jotai';

export default function Home() {
  // const user = useAtomValue(userAtom);

  return (
    <>
      <p>Hello, World!</p>
      <Link href="/quiz/75bd1b07-0e5d-4dca-bedc-b726025eca78" className="btn">
        例）情報系クイズ
      </Link>

      <div className="bg-amber-100 w-full h-10" />

      {/* <pre>User atom: {JSON.stringify(user)}</pre> */}
    </>
  );
}

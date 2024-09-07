'use client';

import Link from 'next/link';

// import { userAtom } from '@/atoms/user';
// import { useAtomValue } from 'jotai';

export default function Home() {
  // const user = useAtomValue(userAtom);

  return (
    <>
      <p>Hello, World!</p>
      <Link href="/quiz/1">Quiz 1</Link>

      {/* <pre>User atom: {JSON.stringify(user)}</pre> */}
    </>
  );
}

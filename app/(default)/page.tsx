'use client';

import Link from 'next/link';

// import { userAtom } from '@/atoms/user';
// import { useAtomValue } from 'jotai';

export default function Home() {
  // const user = useAtomValue(userAtom);

  return (
    <>
      <p>Hello, World!</p>
      <Link href="/quiz/f1e3bbe3-0c9d-418b-b0bd-bd5c3822c9a2" className="btn">
        Quiz f1e3bbe3-0c9d-418b-b0bd-bd5c3822c9a2
      </Link>

      {/* <pre>User atom: {JSON.stringify(user)}</pre> */}
    </>
  );
}

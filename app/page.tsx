import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <p>Hello, World!</p>

      <pre>Session: {JSON.stringify(session, null, 2)}</pre>
    </>
  );
}

import BottomNavLinks from '@/components/BottomNavLinks';
import { BottomLoginButton } from '@/components/LoginButton';
import { getSession } from '@/libs/auth';

export default async function BottomNav() {
  const session = await getSession();

  return (
    <div className="btm-nav flex bg-base-200 sm:hidden">
      <BottomNavLinks session={session} />

      {!session.isLoggedIn && <BottomLoginButton />}
    </div>
  );
}

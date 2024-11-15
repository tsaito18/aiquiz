import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { getSession } from '@/libs/dal';
import { ReactNode } from 'react';

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <div className="flex min-h-[calc(100svh+5rem)] flex-col justify-between sm:min-h-svh">
        <Header />
        <main className="mx-auto mb-auto mt-6 w-screen max-w-2xl px-4 sm:mt-24 lg:px-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </div>

      {!session.isLoggedIn && <LoginModal />}
    </>
  );
}

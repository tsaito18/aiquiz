'use client';

import { links } from '@/components/Header';
import type { Session } from '@/interfaces/session';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavLinks({ session }: { session: Session }) {
  const path = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.to}
          className={
            (link.to === '/' && path === '/') ||
            (link.to !== '/' && path.startsWith(link.to))
              ? 'active bg-base-200'
              : ''
          }
        >
          <link.icon className="size-5" />
          <span className="btm-nav-label text-sm text-gray-600">
            {link.name}
          </span>
        </Link>
      ))}

      {session.isLoggedIn && (
        <Link
          href="/mypage"
          className={path === '/mypage' ? 'active bg-base-200' : ''}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user?.avatar!}
            alt="ユーザーのプロフィール画像"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="btm-nav-label text-sm text-gray-600">
            マイページ
          </span>
        </Link>
      )}
    </>
  );
}

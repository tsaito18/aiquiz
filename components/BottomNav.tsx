'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { links } from '@/components/Header';
import { BottomLoginButton } from '@/components/LoginButton';

export default function BottomNav() {
  const path = usePathname();
  // TODO: auth() を使ってセッションを取得したい
  const { data: session } = useSession();

  return (
    <div className="btm-nav flex bg-base-200 sm:hidden">
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

      {session ? (
        <Link
          href="/mypage"
          className={path === '/mypage' ? 'active bg-base-200' : ''}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user?.image!}
            alt="ユーザー画像"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="btm-nav-label text-sm text-gray-600">
            マイページ
          </span>
        </Link>
      ) : (
        <BottomLoginButton />
      )}
    </div>
  );
}

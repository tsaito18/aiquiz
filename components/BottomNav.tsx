'use client';

import { usePathname } from 'next/navigation';
import { links } from './Header';
import Link from 'next/link';

export default function BottomNav() {
  const path = usePathname();

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
          <link.icon className="h-5 w-5" />
          <span className="btm-nav-label text-sm text-gray-600">
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

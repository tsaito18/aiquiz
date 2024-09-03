'use client';

import { usePathname } from 'next/navigation';
import { links } from './Header';
import Link from 'next/link';

export default function BottomNav() {
  const path = usePathname();

  return (
    <div className="btm-nav flex sm:hidden">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.to}
          className={
            (link.to === '/' && path === '/') ||
            (link.to !== '/' && path.startsWith(link.to))
              ? 'active'
              : ''
          }
        >
          <link.icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
}

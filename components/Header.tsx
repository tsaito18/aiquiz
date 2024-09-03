import Link from 'next/link';
import Image from 'next/image';
import {
  FaMagnifyingGlass,
  FaCompass,
  FaCirclePlus,
  FaUser,
} from 'react-icons/fa6';

export const links = [
  {
    icon: FaCompass,
    name: '見つける',
    to: '/',
  },
  {
    icon: FaMagnifyingGlass,
    name: '探す',
    to: '/search',
  },
  {
    icon: FaCirclePlus,
    name: '作る',
    to: '/contacts',
  },
  {
    icon: FaUser,
    name: '自分',
    to: '/profile',
  },
];

export default function Header() {
  return (
    <div className="top-0 z-40 w-full bg-base-200 drop-shadow-md sm:fixed">
      <div className="navbar mx-auto max-w-5xl justify-center">
        {/* サイトタイトル */}
        <div className="sm:flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src="/img/icon.webp"
              alt="ロゴ"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl">チャレンジ AI クイズ</span>
          </Link>
        </div>

        {/* PCメニュー */}
        <div className="hidden flex-none sm:block">
          {links.map((link) => (
            <Link href={link.to} key={link.name} className="btn btn-ghost px-3">
              <link.icon className="h-4 w-4" />
              <span className="text-base font-normal">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

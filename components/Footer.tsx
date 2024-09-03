import Link from 'next/link';

export default function Footer() {
  const links = [
    {
      name: 'ホーム',
      to: '/',
    },
    {
      name: 'プライバシーポリシー',
      to: '/privacy',
    },
  ];

  return (
    <footer className="mb-16 mt-6 items-center bg-base-200 p-4 text-gray-600 sm:mb-0">
      <div className="footer mx-auto max-w-4xl gap-y-3">
        <div className="grid-flow-col">
          <p>©2024- Taiga Saito.</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          {links.map((link) => (
            <Link href={link.to} key={link.name}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

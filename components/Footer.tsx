import Link from 'next/link';

export default function Footer() {
  const links = [
    {
      name: 'ホーム',
      to: '/',
    },
    // {
    //   name: '利用規約',
    //   to: '/terms',
    // },
    // {
    //   name: 'プライバシーポリシー',
    //   to: '/privacy',
    // },
  ];

  return (
    <footer className="mb-16 mt-6 bg-base-200 p-4 text-gray-600 sm:mb-0">
      <div className="footer mx-auto max-w-4xl gap-y-3">
        <div className="order-2 grid-flow-col sm:order-none">
          <p>
            ©2024-{' '}
            <a
              href="https://taigasaito.org"
              target="_blank"
              className="underline-offset-4 hover:text-black hover:underline"
            >
              Taiga Saito
            </a>
            .
          </p>
        </div>
        <div className="order-1 grid-flow-col gap-4 sm:order-none md:place-self-center md:justify-self-end">
          {links.map((link) => (
            <Link
              href={link.to}
              key={link.name}
              className="underline-offset-4 hover:text-black hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

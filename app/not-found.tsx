import Link from 'next/link';
import { Metadata } from 'next';
import { FaHouse } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: '404 Not Found | チャレンジAIクイズ',
  description:
    'お探しのページが見つかりませんでした。ページが移動したか、削除された可能性があります。',
};

export default function NotFound() {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-5xl font-bold">404 Not Found</h1>
      <p className="text-xl text-gray-600">
        お探しのページが見つかりませんでした。
        <br />
        ページが移動したか、削除された可能性があります。
      </p>

      <Link href="/" className="btn btn-primary mt-4 w-32">
        <FaHouse className="h-4 w-4" />
        ホーム
      </Link>
    </div>
  );
}

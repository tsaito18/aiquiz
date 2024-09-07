'use server';

import { signIn } from '@/auth';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

export default async function LoginModal() {
  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box text-center">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-2xl font-bold">ログイン</h3>
        <p className="mb-6 mt-3">
          ログインすると、結果の保存やクイズの作成などができます。
        </p>

        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button type="submit" className="btn w-64">
            <FcGoogle className="size-6" />
            Login with Google
          </button>
        </form>

        <div className="mt-6 flex gap-1.5">
          <HiOutlineInformationCircle className="mt-0.5 size-4 shrink-0 text-gray-600" />
          <p className="text-left text-sm text-gray-600">
            <Link
              href="/terms"
              target="_blank"
              className="text-blue-500 underline-offset-4 hover:underline"
            >
              利用規約
            </Link>
            &nbsp;と&nbsp;
            <Link
              href="/privacy"
              target="_blank"
              className="text-blue-500 underline-offset-4 hover:underline"
            >
              プライバシーポリシー
            </Link>
            &nbsp;に同意した上でログインしてください。
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>ダイアログを閉じる</button>
      </form>
    </dialog>
  );
}

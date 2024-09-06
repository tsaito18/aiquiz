'use client';

import { FaArrowRightToBracket } from 'react-icons/fa6';

export function HeaderLoginButton() {
  return (
    <button
      className="btn btn-primary ml-3 px-3"
      // @ts-expect-error
      onClick={() => document.getElementById('login_modal')?.showModal()}
    >
      <FaArrowRightToBracket className="size-4" />
      <span className="text-base font-normal">ログイン</span>
    </button>
  );
}

export function BottomLoginButton() {
  return (
    <button
      className="bg-primary text-white"
      // @ts-expect-error
      onClick={() => document.getElementById('login_modal')?.showModal()}
    >
      <FaArrowRightToBracket className="size-5" />
      <span className="btm-nav-label text-sm text-white">ログイン</span>
    </button>
  );
}

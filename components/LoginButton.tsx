'use client';

import { FaArrowRightToBracket } from 'react-icons/fa6';

export default function LoginButton() {
  return (
    <button
      className="btn btn-primary ml-3 px-3"
      // @ts-expect-error
      onClick={() => document.getElementById('login_modal')?.showModal()}
    >
      <FaArrowRightToBracket className="h-4 w-4" />
      <span className="text-base font-normal">ログイン</span>
    </button>
  );
}

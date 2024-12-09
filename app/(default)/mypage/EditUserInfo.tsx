'use client';

import { Session } from '@/interfaces/session';
import { useState } from 'react';
import { FaCheck, FaPen } from 'react-icons/fa6';

export default function EditUserInfo({ session }: { session: Session }) {
  const [userName, setUserName] = useState(session.user?.name);
  const [isLoading, setIsLoading] = useState(false);

  function changeUserName() {
    if (isLoading) return;
    setIsLoading(true);

    fetch('/api/users/me/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // @ts-expect-error
          document.getElementById('edit_user_info_modal')?.close();
          location.reload();
        } else {
          alert('ユーザー名を変更できませんでした。入力内容をご確認ください。');
          throw new Error('Failed to change user name');
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-circle"
        onClick={() => {
          // @ts-expect-error
          document.getElementById('edit_user_info_modal')?.showModal();
        }}
      >
        <FaPen className="size-4" />
      </button>

      <dialog id="edit_user_info_modal" className="modal">
        <div className="modal-box text-center">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-2xl font-bold">名前の変更</h3>
          <p className="mb-6 text-gray-700 mt-1">
            チャレンジ AI クイズ上で使用する名前を変更します。
          </p>

          <input
            type="text"
            min={3}
            max={32}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input input-bordered input-primary w-full"
            required
          />

          <div className="modal-action">
            <button
              type="button"
              onClick={changeUserName}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {!isLoading ? (
                <>
                  <FaCheck /> 変更を確定
                </>
              ) : (
                <>
                  <span className="loading loading-spinner loading-md" />{' '}
                  送信しています...
                </>
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>ダイアログを閉じる</button>
        </form>
      </dialog>
    </>
  );
}

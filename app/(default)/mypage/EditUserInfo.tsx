'use client';

import { Session } from '@/interfaces/session';
import { useState } from 'react';
import { FaCheck, FaPen } from 'react-icons/fa6';

export default function EditUserInfo({ session }: { session: Session }) {
  const [userName, setUserName] = useState(session.user?.name);
  const [avatarURL, setAvatarURL] = useState(session.user?.avatar);

  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  function changeUserName() {
    if (isLoading || isAvatarUploading) return;

    if (!userName || userName.length < 3 || userName.length > 32) {
      alert('ユーザー名は 3 文字以上 32 文字以下の文字列でないといけません。');
      return;
    }
    if (
      !avatarURL ||
      avatarURL.length < 7 ||
      avatarURL.length > 512 ||
      !avatarURL.startsWith('https://')
    ) {
      alert(
        'アバター画像の URL は 7 文字以上 512 文字以下の、https:// から始まる文字列でないといけません。',
      );
      return;
    }

    setIsLoading(true);

    fetch('/api/users/me/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        avatar: avatarURL,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // @ts-expect-error
          document.getElementById('edit_user_info_modal')?.close();
          location.reload();
        } else {
          alert(
            'プロフィールを変更できませんでした。入力内容をご確認ください。',
          );
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

  async function uploadAvatar(image: File) {
    setIsAvatarUploading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('filename', image.name);

    const request = await fetch('/api/users/me/upload_avatar', {
      method: 'POST',
      body: formData,
    });
    if (!request.ok) {
      alert('アバター画像のアップロードに失敗しました。');
      setIsAvatarUploading(false);
      return;
    }

    const response = await request.json();
    setAvatarURL(response.url);

    setIsAvatarUploading(false);
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
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center">
            <h3 className="text-2xl font-bold">プロフィールの変更</h3>
            <p className="mb-6 text-gray-700 mt-1">
              チャレンジ AI クイズでのプロフィールを変更します。
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-gray-700">
                ユーザー名 <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                min={3}
                max={32}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-700">
                アバター画像 <span className="text-red-500">*</span>
              </span>
              <input
                id="avatar"
                type="file"
                accept="image/*,.png,.jpg,.jpeg,.webp,.gif"
                onChange={(e) => {
                  if (!e.target.files) return;

                  if (e.target.files[0].size > 2 * 1024 * 1024) {
                    alert('アバター画像は 2MB 以下である必要があります。');
                    return;
                  }
                  uploadAvatar(e.target.files[0]);
                }}
                className="file-input file-input-primary file-input-bordered w-full"
                required
              />
              <input
                type="text"
                min={7}
                max={512}
                value={avatarURL}
                onChange={(e) => setAvatarURL(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={changeUserName}
              className="btn btn-primary"
              disabled={isLoading || isAvatarUploading}
            >
              {!isLoading && !isAvatarUploading ? (
                <>
                  <FaCheck /> 変更を確定
                </>
              ) : (
                <>
                  <span className="loading loading-spinner loading-md" />{' '}
                  {!isAvatarUploading
                    ? '送信しています...'
                    : 'アップロード中...'}
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

'use client';

import { useState } from 'react';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa6';

export default function EditQuiz({
  quizData,
}: {
  quizData: {
    quiz_id: string;
    title: string;
    description: string | undefined;
    prompt: string;
    play_count: number;
    'user.name': string | null;
    'user.avatar': string | null;
    'user.user_id': string | null;
  };
}) {
  const [quizTitle, setQuizTitle] = useState(quizData.title);
  const [quizDescription, setQuizDescription] = useState(quizData.description);
  const [quizPrompt, setQuizPrompt] = useState(quizData.prompt);

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  function editQuiz() {
    if (isEditLoading) return;
    setIsEditLoading(true);

    fetch('/api/quiz/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_id: quizData.quiz_id,
        title: quizTitle,
        description: quizDescription,
        prompt: quizPrompt,
      }),
    })
      .then((res) => {
        if (res.ok) {
          // @ts-expect-error
          document.getElementById('edit_quiz_modal')?.close();
          location.reload();
        } else {
          alert('クイズを編集できませんでした。入力内容をご確認ください。');
          throw new Error('Failed to edit quiz');
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsEditLoading(false);
      });
  }

  function deleteQuiz() {
    if (isDeleteLoading) return;
    if (
      !confirm(
        '本当にこのクイズを削除しますか？\n一度削除したクイズは復元できません。',
      )
    )
      return;

    setIsDeleteLoading(true);

    fetch('/api/quiz/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_id: quizData.quiz_id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          location.href = '/mypage';
        } else {
          alert('クイズを削除できませんでした。');
          throw new Error('Failed to delete quiz');
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsDeleteLoading(false);
      });
  }

  return (
    <>
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn"
          onClick={() => {
            // @ts-expect-error
            document.getElementById('edit_quiz_modal')?.showModal();
          }}
        >
          <FaPen className="size-4" /> クイズを編集
        </button>
      </div>

      <dialog id="edit_quiz_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="text-center">
            <h3 className="text-2xl font-bold">クイズを編集</h3>
            <p className="mb-6 text-gray-700 mt-1">
              クイズのタイトルや説明、プロンプトを編集します。
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-gray-700">
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                min={3}
                max={32}
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-700">
                クイズの説明
              </label>
              <textarea
                id="description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                className="textarea textarea-primary textarea-bordered"
                placeholder="例: 情報Ⅰ程度の情報系クイズです。自分の知識の確認にどうぞ。"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="prompt" className="text-gray-700">
                AI に与えるプロンプト <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prompt"
                value={quizPrompt}
                onChange={(e) => setQuizPrompt(e.target.value)}
                className="textarea textarea-primary textarea-bordered"
                placeholder="例: 情報系のクイズを出題してください。難易度は高校の情報Ⅰ程度にしてください。"
                required
              />
            </div>
          </div>

          <div className="modal-action justify-between">
            <button
              type="button"
              onClick={deleteQuiz}
              className="btn btn-error"
              disabled={isEditLoading || isDeleteLoading}
            >
              {!isDeleteLoading ? (
                <>
                  <FaTrash /> クイズを削除
                </>
              ) : (
                <>
                  <span className="loading loading-spinner loading-md" />{' '}
                  削除しています...
                </>
              )}
            </button>
            <button
              type="button"
              onClick={editQuiz}
              className="btn btn-primary"
              disabled={isEditLoading || isDeleteLoading}
            >
              {!isEditLoading ? (
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

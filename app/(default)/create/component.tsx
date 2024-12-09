'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

export default function CreateQuizComponent() {
  const router = useRouter();

  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizPrompt, setQuizPrompt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  async function createQuiz() {
    if (isLoading) return;
    setIsLoading(true);

    const req = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: quizTitle,
        description: quizDescription,
        prompt: quizPrompt,
      }),
    });
    const res = await req.json();

    if (!res.quiz_id) {
      alert('クイズを作成できませんでした。入力内容をご確認ください。');
      setIsLoading(false);
      return;
    }

    router.push(`/quiz/${res.quiz_id}`);
  }

  return (
    <>
      <h1 className="font-bold mt-4 text-center text-3xl">クイズをつくる</h1>
      <p className="text-center text-gray-700 mt-2">
        オリジナルのクイズをつくりましょう！
      </p>

      <div className="flex gap-4 w-full mx-auto max-w-2xl mt-8 flex-col">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-700">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            min={3}
            max={32}
            id="title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="例: 情報系クイズ (情報Ⅰ程度)"
            className="input input-primary input-bordered w-full"
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

        <button
          type="button"
          onClick={createQuiz}
          className="btn mt-5 btn-primary"
          disabled={isLoading}
        >
          {!isLoading ? (
            <>
              <FaCheck /> つくる
            </>
          ) : (
            <>
              <span className="loading loading-spinner loading-md" />{' '}
              作成しています...
            </>
          )}
        </button>
      </div>
    </>
  );
}

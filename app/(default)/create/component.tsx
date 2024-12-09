'use client';

import { redirect } from 'next/navigation';
import { FormEventHandler } from 'react';

export default function CreateQuizComponent() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const title = form.get('title') || '';
    const description = form.get('description') || '';
    const prompt = form.get('prompt') || '';

    const req = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, prompt }),
    });
    const res = await req.json();

    redirect(`/quiz/${res.quiz_id}`);
  };

  return (
    <>
      <h1 className="font-bold mt-4 text-center text-3xl">クイズをつくる</h1>
      <p className="text-center text-gray-700 mt-2">
        オリジナルのクイズをつくりましょう！
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-full mx-auto max-w-2xl mt-8 flex-col"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-700">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            min={3}
            max={32}
            id="title"
            name="title"
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
            name="description"
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
            name="prompt"
            className="textarea textarea-primary textarea-bordered"
            placeholder="例: 情報系のクイズを出題してください。難易度は高校の情報Ⅰ程度にしてください。"
            required
          />
        </div>

        <button type="submit" className="btn mt-5 btn-primary">
          つくる
        </button>
      </form>
    </>
  );
}

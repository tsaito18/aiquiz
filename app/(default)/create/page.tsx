'use client';

import { FormEventHandler } from 'react';

export default function CreateQuizPage() {
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

    console.log(res);
  };

  return (
    <>
      <h1 className="font-bold mt-4 text-center text-3xl">クイズをつくる</h1>
      <p className="text-center text-gray-700 mt-2">
        オリジナルのクイズをつくりましょう！
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="title"
          placeholder="例: 情報系クイズ (情報Ⅰ程度)"
          className="input input-bordered w-full max-w-xs"
          required
        />

        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="例: 情報Ⅰ程度の情報系クイズです。自分の知識の確認にどうぞ。"
          required
        />

        <textarea
          name="prompt"
          className="textarea textarea-bordered"
          placeholder="例: 情報系のクイズを出題してください。難易度は高校の情報Ⅰ程度にしてください。"
          required
        />

        <button type="submit" className="btn">
          つくる
        </button>
      </form>
    </>
  );
}

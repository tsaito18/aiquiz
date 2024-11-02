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
      <h1>クイズをつくる</h1>
      <p>オリジナルのクイズをつくりましょう！</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full max-w-xs"
          required
        />

        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Description"
          required
        />

        <textarea
          name="prompt"
          className="textarea textarea-bordered"
          placeholder="Prompt"
          required
        />

        <button type="submit" className="btn">
          create
        </button>
      </form>
    </>
  );
}

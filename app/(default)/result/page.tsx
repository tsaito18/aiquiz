'use client';

import InvalidAccess from '@/components/InvalidAccess';
import { quizAtom } from '@/libs/atoms';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();

  const [quiz, setQuiz] = useAtom(quizAtom);
  const resetQuiz = useResetAtom(quizAtom);

  const [isLoading, setIsLoading] = useState(true);

  function playAgain() {
    const quizId = quiz.quizId;
    const title = quiz.title;

    resetQuiz();
    setQuiz((prev) => ({ ...prev, quizId, title, mode: 'play' }));

    router.push('/play');
  }

  useEffect(() => {
    if (quiz.mode !== 'result' || !quiz.quizId || !quiz.title) return;

    fetch('/api/quiz/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_id: quiz.quizId,
        score: quiz.score,
        correct_count: quiz.correctCount,
        total_count: quiz.totalCount,
      }),
    })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (quiz.mode !== 'result' || !quiz.quizId || !quiz.title) {
    resetQuiz();
    return <InvalidAccess mt />;
  }

  return (
    <div className="flex flex-col gap-2 items-center mt-5">
      <h1 className="text-3xl font-bold mb-1">今回の結果</h1>
      <p className="mb-4">{quiz.title}</p>

      <div className="bg-amber-100 mb-2 text-center py-5 w-full max-w-md rounded-lg">
        <h2 className="mb-2">スコア</h2>
        <span className="font-bold text-3xl">{quiz.score}</span>
      </div>

      <div className="bg-amber-100 text-center py-5 w-full max-w-md rounded-lg">
        <h2 className="mb-2">正解した問題</h2>
        <span className="font-bold">
          <span className="text-3xl">{quiz.correctCount} 問</span> /{' '}
          {quiz.totalCount} 問中
        </span>
      </div>

      {/* ToDo: ここに AI からの講評とかを入れてもいいかも？ */}

      {/* ToDo: シェアボタン */}

      <div className="flex flex-col gap-y-3 mt-6 w-full max-w-sm">
        <button
          onClick={playAgain}
          disabled={isLoading}
          className="btn btn-primary btn-block"
        >
          もういちど遊ぶ
        </button>
        <Link
          href={`/quiz/${quiz.quizId}`}
          className={`btn btn-block ${isLoading ? 'btn-disabled' : ''}`}
        >
          もどる
        </Link>
      </div>
    </div>
  );
}

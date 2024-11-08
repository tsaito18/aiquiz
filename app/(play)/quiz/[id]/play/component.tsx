'use client';

import { Question } from '@/interfaces/question';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBars,
  FaHeart,
  FaRegCircle,
  FaRegHeart,
  FaXmark,
} from 'react-icons/fa6';

export const revalidate = 0;

export default function QuizPlayComponent({ id }: { id: string }) {
  // 問題の状態
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);

  // 設問ごとの状態
  const [questionNumber, setQuestionNumber] = useState(0);
  const [TorF, setTorF] = useState<boolean | null>(null);

  async function generateQuestion() {
    const req = await fetch(`/api/quiz/${id}/generate`, {
      // cache: 'no-store',
    });
    const res = await req.json();

    setQuestions(res);
  }

  function answerQuestion(number: number) {
    setTorF(
      questions[questionNumber].answers[number as 0 | 1 | 2 | 3].isAnswer,
    );

    setScore(score + 100);
    setLife(3);

    // @ts-expect-error
    document.getElementById('explanation_modal')?.showModal();
  }

  function nextQuestion() {
    setQuestionNumber(questionNumber + 1);
  }

  useEffect(() => {
    generateQuestion().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-ring size-16" />
        <p className="text-xl">問題を作成しています...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">クイズタイトル</h1>
          <button
            className="btn btn-circle"
            onClick={() => {
              // @ts-expect-error
              document.getElementById('menu_modal')?.showModal();
            }}
          >
            <FaBars className="size-6" />
          </button>
        </div>

        <div className="flex w-full gap-x-3">
          <div className="w-full rounded-md bg-blue-50 px-5 py-3 text-center">
            <h2>Score</h2>
            <span className="text-xl font-bold">{score}</span>
          </div>
          <div className="w-full rounded-md bg-red-50 px-5 py-3 text-center">
            <h2>Life</h2>
            <div className="flex justify-center gap-x-1">
              {Array.from({ length: life }).map((_, index) => (
                <FaHeart key={index} className="size-6 text-red-500" />
              ))}
              {Array.from({ length: 3 - life }).map((_, index) => (
                <FaRegHeart key={index} className="size-6 text-gray-500" />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-3xl font-bold">Q.{questionNumber + 1}</p>

        {/* ToDo: 1文字ずつ表示されるようにする */}
        <p className="text-xl">{questions[questionNumber].question}</p>

        {/* ToDo: 時間制限を追加 */}

        {/* 回答ボタン */}
        <div className="mt-5 flex w-full flex-col items-center gap-3">
          {Object.values(questions[questionNumber].answers).map(
            (answer, index) => (
              <button
                key={index}
                className="btn btn-block h-auto max-w-md py-3 text-2xl"
                onClick={() => answerQuestion(index)}
              >
                {answer.text}
              </button>
            ),
          )}
        </div>

        {/* 解説モーダル */}
        <dialog
          id="explanation_modal"
          className="modal"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
            }
          }}
        >
          <div className="modal-box">
            <h3 className="mt-1 flex items-center justify-center gap-3 text-lg font-bold">
              {TorF ? (
                <FaRegCircle className="size-8 text-green-500" />
              ) : (
                <FaXmark className="size-10 text-red-500" />
              )}
              <span className="text-3xl">{TorF ? '正解' : '不正解'}</span>
            </h3>
            <p className="py-4">
              {
                Object.values(questions[questionNumber].answers).find(
                  (answer) => answer.isAnswer,
                )?.text
              }
              <br />
              {questions[questionNumber].explanation}
            </p>

            <div className="modal-action">
              <form method="dialog" className="w-full">
                <button
                  type="submit"
                  className="btn btn-block"
                  onClick={nextQuestion}
                >
                  次の問題へ <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* メニュー */}
        <dialog id="menu_modal" className="modal">
          <div className="modal-box">
            <button className="btn">記録してやめる</button>
            <button className="btn">記録せずにやめる</button>

            <div className="modal-action">
              <form method="dialog" className="w-full">
                <button type="submit" className="btn btn-block">
                  とじる
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>とじる</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

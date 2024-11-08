'use client';

import { Question } from '@/interfaces/question';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaRegCircle, FaXmark } from 'react-icons/fa6';
// import { useState } from 'react';

export const revalidate = 0;

export default function QuizPlayComponent({ id }: { id: string }) {
  // const segmenter = create Intl.Segmenter('ja', { granularity: 'grapheme' });

  // 問題の状態
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  // 設問ごとの状態
  const [questionNumber, setQuestionNumber] = useState(0);
  const [TorF, setTorF] = useState<boolean | null>(null);

  async function generateQuestion() {
    const req = await fetch(`/api/quiz/${id}/generate`, {
      cache: 'no-store',
    });
    const res = await req.json();

    setQuestions(res);
  }

  function answerQuestion(number: number) {
    setTorF(
      questions[questionNumber].answers[number as 0 | 1 | 2 | 3].isAnswer,
    );

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

  // const questionSegment = segmenter.segment(questions[0].question);
  // const questionArr = Array.from(questionSegment);

  // setInterval(() => {
  //   setQuestion(question + questionArr.shift());
  // }, 100);

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
      <div className="flex flex-col items-center gap-3">
        <p className="text-3xl font-bold">Q.{questionNumber + 1}</p>

        {/* ToDo: 1文字ずつ表示されるようにする */}
        <p>{questions[questionNumber].question}</p>

        {/* ToDo: 時間制限を追加 */}

        {/* 回答ボタン */}
        <div className="flex flex-col gap-3">
          {Object.values(questions[questionNumber].answers).map(
            (answer, index) => (
              <button
                key={index}
                className="btn btn-wide"
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
      </div>
    </>
  );
}

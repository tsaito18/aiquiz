'use client';

import InvalidAccess from '@/components/InvalidAccess';
import { Question } from '@/interfaces/question';
import { quizAtom } from '@/libs/atoms';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBars,
  FaHeart,
  FaRegCircle,
  FaRegHeart,
  FaXmark,
} from 'react-icons/fa6';

export default function PlayComponent() {
  const router = useRouter();

  const [quiz, setQuiz] = useAtom(quizAtom);
  const resetQuiz = useResetAtom(quizAtom);

  // 問題の状態
  // ToDo: ↓
  // eslint-disable-next-line no-unused-vars
  const [isLoading, _setIsLoading] = useState(false);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  // ToDo: ↓
  const [questions, setQuestions] = useState<Question[]>([
    {
      question:
        'テストの質問ああああああああああああああああああああああああああああああああ',
      answers: {
        0: { text: '選択肢 1', isAnswer: true },
        1: { text: '選択肢 2', isAnswer: false },
        2: { text: '選択肢 3', isAnswer: false },
        3: { text: '選択肢 4', isAnswer: false },
      },
      explanation: 'テストの解説',
    },
  ]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);

  // 設問ごとの状態
  // ToDo: ↓
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingTime, setRemainingTime] = useState(100);
  const [TorF, setTorF] = useState<boolean | null>(null);

  async function generateQuestion() {
    try {
      const req = await fetch(`/api/quiz/generate?quiz_id=${quiz.quizId}`, {
        // ToDo: ↓本番環境ではキャッシュを無効にする
        // cache: 'no-store',
      });
      const res: Question[] = await req.json();

      setQuestions([...questions, ...res]);
    } catch (err) {
      console.error(err);
      alert(
        '問題の取得に失敗しました。AI (Gemini API) の負荷が高いことが原因であるため、しばらく待ってから再度お試しください。',
      );
    }
  }

  function answerQuestion(number: number) {
    const isCorrect =
      questions[questionNumber].answers[number as 0 | 1 | 2 | 3].isAnswer;
    setTorF(isCorrect);

    if (isCorrect) {
      setScore(score + 100);
    } else {
      setScore(score - 50);
      setLife(life - 1);
    }

    // @ts-expect-error
    document.getElementById('explanation_modal')?.showModal();
  }

  async function nextQuestion() {
    setQuestionNumber(questionNumber + 1);

    if (questions.length - (questionNumber + 1) <= 3 && !isBackgroundLoading) {
      setIsBackgroundLoading(true);
      generateQuestion().then(() => setIsBackgroundLoading(false));
    }

    // 1 文字ずつ表示する
  }

  function endQuiz(record = true) {
    if (record) {
      setQuiz((prev) => ({
        ...prev,
        mode: 'result',
      }));
      router.push('/result');
    } else {
      const quizId = quiz.quizId;

      resetQuiz();
      router.push(`/quiz/${quizId}`);
    }
  }

  function closeMenu() {
    // ToDo: タイマー再開処理など

    // @ts-expect-error
    document.getElementById('menu_modal')?.close();
  }

  useEffect(() => {
    if (quiz.mode !== 'play' || !quiz.quizId || !quiz.title) return;

    setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          setLife(life - 1);
          return 100;
        }

        // 8s
        return prev - 0.125;
      });
    }, 10);

    // ToDo: ↓
    // generateQuestion().then(() => {
    //   nextQuestion();
    //   setIsLoading(false);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (quiz.mode !== 'play' || !quiz.quizId || !quiz.title) {
    resetQuiz();
    return <InvalidAccess />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-y-3">
        <span className="loading loading-ring size-16" />
        <p className="text-xl">問題を作成しています...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center gap-3 min-h-svh max-w-md justify-center px-4 py-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">{quiz.title}</h1>
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

        <p className="mt-12 text-3xl font-bold">Q.{questionNumber + 1}</p>

        {/* ToDo: 1文字ずつ表示されるようにする */}
        <p className="text-3xl mt-4">{questions[questionNumber].question}</p>

        {/* ToDo: 時間制限を追加 */}
        <progress
          className="progress mt-8 progress-error w-full"
          value={remainingTime}
          max="100"
        />

        {/* 回答ボタン */}
        <div className="mt-3 flex w-full flex-col items-center gap-y-3">
          {Object.values(questions[questionNumber].answers).map(
            (answer, index) => (
              <button
                key={index}
                className="btn btn-block h-auto py-3 text-2xl"
                onClick={() => answerQuestion(index)}
              >
                {answer.text}
              </button>
            ),
          )}
        </div>
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
        <form
          method="dialog"
          className="w-full modal-box max-w-sm flex flex-col gap-y-3"
        >
          <button
            type="submit"
            onClick={() => endQuiz()}
            className="btn btn-block"
          >
            記録してやめる
          </button>
          <button
            type="submit"
            onClick={() => endQuiz(false)}
            className="btn btn-block"
          >
            記録せずにやめる
          </button>

          <button
            type="submit"
            onClick={closeMenu}
            className="btn btn-block mt-6"
          >
            とじる
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" onClick={closeMenu}>
            とじる
          </button>
        </form>
      </dialog>
    </>
  );
}

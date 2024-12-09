'use client';

import InvalidAccess from '@/components/InvalidAccess';
import { Question } from '@/interfaces/question';
import { quizAtom } from '@/libs/atoms';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaBars,
  FaHeart,
  FaRegCircle,
  FaRegClock,
  FaRegHeart,
  FaXmark,
} from 'react-icons/fa6';

export default function PlayComponent() {
  const router = useRouter();

  const [quiz, setQuiz] = useAtom(quizAtom);
  const resetQuiz = useResetAtom(quizAtom);

  // 全体の状態
  const [isInitialized, setIsInitialized] = useState(false);
  const isLoading = useRef(false);
  const generateCount = useRef(0);
  const isMenuOpened = useRef(false);
  const [isEnded, setIsEnded] = useState(false);

  // 残り時間
  const [remainingTime, setRemainingTime] = useState(8000);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // 問題の状態
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);

  // 設問ごとの状態
  const [questionNumber, setQuestionNumber] = useState(-1);
  const [TorF, setTorF] = useState<'correct' | 'wrong' | 'timeout' | null>(
    null,
  );

  async function generateQuestion() {
    if (isLoading.current) return;
    isLoading.current = true;

    generateCount.current++;

    try {
      const req = await fetch(
        `/api/quiz/generate?quiz_id=${quiz.quizId}&count=${generateCount}`,
        { cache: 'no-store' },
      );
      const res: Question[] = await req.json();

      setQuestions((prev) => [...prev, ...res]);
    } catch (err) {
      console.error(err);
      alert(
        '問題の取得に失敗しました。AI (Gemini API) に負荷がかかりすぎている可能性が高いです。しばらく待ってから再度お試しください。',
      );
    } finally {
      isLoading.current = false;
    }
  }

  function answerQuestion(number: -1 | 0 | 1 | 2 | 3) {
    clearInterval(timer.current!);

    if (number !== -1) {
      const isCorrect = questions[questionNumber].answers[number].isAnswer;
      setTorF(isCorrect ? 'correct' : 'wrong');
    } else {
      setTorF('timeout');
    }

    setTorF((TorF) => {
      if (TorF === 'correct') {
        setScore(score + 100);
      } else if (TorF === 'wrong') {
        setScore(score - 50);
        setLife(life - 1);
      } else {
        setScore(score - 30);
        setLife(life - 1);
      }

      setQuiz((prev) => ({
        ...prev,
        score:
          TorF === 'correct'
            ? prev.score + 100
            : TorF === 'wrong'
              ? prev.score - 50
              : prev.score - 30,
        correctCount:
          TorF === 'correct' ? prev.correctCount + 1 : prev.correctCount,
        totalCount: questionNumber + 1,
      }));

      return TorF;
    });

    // @ts-expect-error
    document.getElementById('explanation_modal')?.showModal();
  }

  function nextQuestion() {
    if (life <= 0) {
      endQuiz();
      return;
    }

    setQuestionNumber(questionNumber + 1);

    if (questions.length - (questionNumber + 1) <= 3 && !isLoading.current) {
      generateQuestion();
    }

    setRemainingTime(8000);
    timer.current = setInterval(() => {
      if (isMenuOpened.current) return;

      setRemainingTime((prev) => prev - 10);

      setRemainingTime((remainingTime) => {
        if (remainingTime <= 0) {
          answerQuestion(-1);
        }

        return remainingTime;
      });
    }, 10);

    // ToDo: 1 文字ずつ表示する
  }

  function endQuiz(record = true) {
    setIsEnded(true);

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

  function openMenu() {
    isMenuOpened.current = true;
    // @ts-expect-error
    document.getElementById('menu_modal')?.showModal();
  }

  function closeMenu() {
    isMenuOpened.current = false;
    // @ts-expect-error
    document.getElementById('menu_modal')?.close();
  }

  useEffect(() => {
    if (
      quiz.mode !== 'play' ||
      !quiz.quizId ||
      !quiz.title ||
      isInitialized ||
      isLoading.current
    )
      return;

    async function init() {
      await generateQuestion();
      await nextQuestion();
    }
    init().then(() => setIsInitialized(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isEnded && (quiz.mode !== 'play' || !quiz.quizId || !quiz.title)) {
    resetQuiz();

    return (
      <div className="flex justify-center w-full h-svh items-center">
        <InvalidAccess />
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center w-full h-svh items-center gap-y-3">
        <span className="loading loading-ring size-16" />
        <p className="text-xl">問題を作成しています...</p>
        <p className="text-gray-700 -mt-1">10 秒ほどかかる場合があります</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center gap-3 min-h-svh max-w-md justify-center px-4 py-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <button className="btn btn-circle" onClick={openMenu}>
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

        <p className="mt-8 text-3xl font-bold">Q.{questionNumber + 1}</p>

        {/* ToDo: 1文字ずつ表示されるようにする */}
        <div className="overflow-y-auto w-full h-28 flex items-center mt-4">
          <p className="leading-snug text-2xl">
            {questions[questionNumber].question}
          </p>
        </div>

        <progress
          className="progress mt-5 progress-primary w-full"
          value={remainingTime}
          max="8000"
        />

        {/* 回答ボタン */}
        <div className="mt-3 flex w-full flex-col items-center gap-y-3">
          {Object.values(questions[questionNumber].answers).map(
            (answer, index) => (
              <button
                key={index}
                className="btn btn-block h-auto py-3 text-2xl"
                onClick={() => answerQuestion(index as 0 | 1 | 2 | 3)}
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
            {TorF === 'correct' ? (
              <FaRegCircle className="size-8 text-green-500" />
            ) : TorF === 'wrong' ? (
              <FaXmark className="size-10 text-red-500" />
            ) : (
              <FaRegClock className="size-10 text-blue-500" />
            )}
            <span className="text-3xl">
              {TorF === 'correct'
                ? '正解'
                : TorF === 'wrong'
                  ? '不正解'
                  : '時間切れ'}
            </span>
          </h3>
          <p className="py-4">
            正答:{' '}
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
                className="btn btn-primary btn-block"
                onClick={nextQuestion}
                disabled={typeof questions[questionNumber + 1] === 'undefined'}
              >
                次の問題へ <FaArrowRight />
              </button>

              {typeof questions[questionNumber + 1] === 'undefined' && (
                <p className="text-gray-700 mt-2 text-center">
                  次の問題を作成中です...
                </p>
              )}
            </form>
          </div>
        </div>
      </dialog>

      {/* メニュー */}
      <dialog id="menu_modal" className="modal">
        <form
          method="dialog"
          className="w-full pt-5 modal-box max-w-sm flex flex-col gap-y-3"
        >
          <h2 className="text-center mb-2 font-bold text-2xl">メニュー</h2>

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
            className="btn btn-block btn-primary mt-6"
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

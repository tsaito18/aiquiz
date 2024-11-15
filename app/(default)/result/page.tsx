'use client';

import InvalidAccess from '@/components/InvalidAccess';
import { quizAtom } from '@/libs/atoms';
import { useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';

export default function ResultPage() {
  const quiz = useAtomValue(quizAtom);
  const resetQuiz = useResetAtom(quizAtom);

  if (quiz.mode !== 'result' || !quiz.quizId || !quiz.title) {
    resetQuiz();
    return <InvalidAccess mt />;
  }

  return (
    <div className="flex flex-col gap-2 items-center mt-5">
      <h1 className="text-3xl font-bold">今回の結果</h1>

      <div>
        スコア
        <br />
        {quiz.score}
      </div>

      <div>
        正解した問題
        <br />
        {quiz.correctCount}問 / {quiz.totalCount}問中
      </div>

      {/* ToDo: ここに AI からの講評とかを入れてもいいかも？ */}

      <div>
        <button className="btn">もういちど遊ぶ</button>
        <button className="btn">もどる</button>
      </div>
    </div>
  );
}

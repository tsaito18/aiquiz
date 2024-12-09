'use client';

import { quizAtom } from '@/libs/atoms';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useRouter } from 'next/navigation';

export default function QuizPlayButton({
  quizId,
  title,
}: {
  quizId: string;
  title: string;
}) {
  const router = useRouter();

  const setQuiz = useSetAtom(quizAtom);
  const resetQuiz = useResetAtom(quizAtom);

  function play() {
    resetQuiz();
    setQuiz((prev) => ({
      ...prev,
      quizId,
      title,
      mode: 'play',
    }));

    router.push('/play');
  }

  return (
    <button onClick={play} className="btn btn-lg btn-primary btn-block">
      このクイズであそぶ
    </button>
  );
}

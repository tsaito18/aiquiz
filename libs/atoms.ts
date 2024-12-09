import { PlayStateAtom, QuizAtom } from '@/interfaces/atom';
import { atomWithReset } from 'jotai/utils';

export const quizAtom = atomWithReset<QuizAtom>({
  // quizId: null,
  // title: null,
  // mode: 'ready',
  // score: 0,
  // correctCount: 0,
  // totalCount: 0,

  quizId: '8064ae5f-689c-4547-8722-10b5bd14417f',
  title: '情報系クイズ',
  mode: 'result',
  score: 550,
  correctCount: 14,
  totalCount: 16,
});

export const playStateAtom = atomWithReset<PlayStateAtom>({
  isLoading: false,
});

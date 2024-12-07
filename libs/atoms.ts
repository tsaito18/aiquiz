import { QuizAtom } from '@/interfaces/atom';
import { atomWithReset } from 'jotai/utils';

export const quizAtom = atomWithReset<QuizAtom>({
  quizId: null,
  title: null,
  mode: 'ready',
  score: 0,
  correctCount: 0,
  totalCount: 0,

  // quizId: '75bd1b07-0e5d-4dca-bedc-b726025eca78',
  // title: '情報系クイズ',
  // mode: 'play',
  // score: 0,
  // correctCount: 0,
  // totalCount: 0,

  // quizId: '75bd1b07-0e5d-4dca-bedc-b726025eca78',
  // title: '情報系クイズ',
  // mode: 'result',
  // score: 4000,
  // correctCount: 8,
  // totalCount: 10,
});

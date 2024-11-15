import { QuizAtom } from '@/interfaces/atom';
import { atomWithReset } from 'jotai/utils';

export const quizAtom = atomWithReset<QuizAtom>({
  quizId: null,
  title: null,
  mode: 'ready',
  score: 0,
  correctCount: 0,
  totalCount: 0,
});

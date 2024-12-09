export interface QuizAtom {
  quizId: string | null;
  title: string | null;
  mode: 'ready' | 'play' | 'result';
  score: number;
  correctCount: number;
  totalCount: number;
}

export interface PlayStateAtom {
  isLoading: boolean;
}

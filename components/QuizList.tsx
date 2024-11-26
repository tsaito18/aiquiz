import QuizCard from '@/components/QuizCard';

export default function QuizList({
  data,
}: {
  data: {
    quiz_id: string;
    title: string;
    description?: string;
    'user.name': string | null;
    'user.avatar': string | null;
    'user.user_id': string | null;
  }[];
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {data.map((quiz) => (
        <QuizCard
          key={quiz.quiz_id}
          title={quiz.title}
          description={quiz.description || '説明がありません'}
          quizId={quiz.quiz_id}
        />
      ))}
    </div>
  );
}

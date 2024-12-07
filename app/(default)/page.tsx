import QuizList from '@/components/QuizList';
import { db } from '@/database';

export default async function Home() {
  const discover = await db
    .selectFrom('quizzes as q')
    .leftJoin('users as u', 'q.created_by', 'u.user_id')
    .select([
      'q.quiz_id as quiz_id',
      'q.title as title',
      'q.description as description',
      'u.name as user.name',
      'u.avatar as user.avatar',
      'u.user_id as user.user_id',
    ])
    .orderBy('q.play_count', 'desc')
    .execute();

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col bg-amber-100 mb-5 rounded-md py-10 px-4">
        <h1 className="font-bold text-3xl">チャレンジ AI クイズ</h1>
        <p>AI によって作られた無限のクイズを解こう！</p>
      </div>

      <QuizList data={discover} />
    </>
  );
}

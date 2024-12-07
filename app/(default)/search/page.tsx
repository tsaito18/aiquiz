import Index from '@/components/QuizList';
import SearchField from '@/components/SearchField';
import { db } from '@/database';

export default async function SearchPage({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const results = q
    ? await db
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
        .where((eb) =>
          eb.or([
            eb('q.title', 'ilike', `%${q}%`),
            eb('q.description', 'ilike', `%${q}%`),
            eb('q.prompt', 'ilike', `%${q}%`),
          ]),
        )
        .orderBy('q.play_count', 'desc')
        .execute()
    : [];

  return (
    <>
      <SearchField />
      <Index data={results} />

      {!q && <p className="text-center">検索したいことばを入力してください</p>}
      {q && results.length === 0 && (
        <p className="text-center">検索結果がありませんでした</p>
      )}
    </>
  );
}

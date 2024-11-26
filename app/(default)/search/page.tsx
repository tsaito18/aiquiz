import QuizList from '@/components/QuizList';
import SearchField from '@/components/SearchField';
import { db } from '@/database';

export default async function SearchPage({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  const results = q
    ? await db
        .selectFrom('quizzes')
        .where((eb) =>
          eb.or([
            eb('title', 'ilike', `%${q}%`),
            eb('description', 'ilike', `%${q}%`),
            eb('prompt', 'ilike', `%${q}%`),
          ]),
        )
        .selectAll()
        .execute()
    : [];

  return (
    <>
      <SearchField />
      <QuizList data={results} />

      {!q && <p className="text-center">検索したいことばを入力してください</p>}
      {q && results.length === 0 && (
        <p className="text-center">検索結果がありませんでした</p>
      )}
    </>
  );
}

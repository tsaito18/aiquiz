import SearchField from '@/components/SearchField';
import { db } from '@/database';
import Link from 'next/link';

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

      {results.map((quiz) => {
        return (
          <Link key={quiz.quiz_id} href={`/quiz/${quiz.quiz_id}`}>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
            </div>
          </Link>
        );
      })}

      {!q && <p className="text-center">検索したいことばを入力してください</p>}
      {q && results.length === 0 && (
        <p className="text-center">検索結果がありませんでした</p>
      )}
    </>
  );
}

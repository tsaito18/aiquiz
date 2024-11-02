import Link from 'next/link';
import { db } from '@/database';

export const revalidate = 60;

export default async function QuizDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const quizData = await db
    .selectFrom('quizzes')
    .selectAll()
    .where('quiz_id', '=', id)
    .executeTakeFirst();

  console.log('quizData', quizData);

  return (
    <>
      <p>
        QuizDetailPage
        <br />
        ID: {id}
      </p>

      <Link href={`/quiz/${id}/play`} className="btn">
        Play
      </Link>
    </>
  );
}

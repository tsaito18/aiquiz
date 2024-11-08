import Link from 'next/link';
import { db } from '@/database';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function QuizDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const quizData = await db
    .selectFrom('quizzes')
    .where('quiz_id', '=', id)
    .leftJoin('users', 'quizzes.created_by', 'users.user_id')
    .selectAll()
    .executeTakeFirst();

  if (!quizData) {
    return notFound();
  }

  console.log('quizData', quizData);

  return (
    <>
      <p>
        QuizDetailPage
        <br />
        ID: {quizData.quiz_id}
      </p>

      {/* ToDo: user と quiz を区別させる必要がある */}
      <p>
        Created at: {quizData.created_at?.toLocaleString()}
        <br />
        Updated at: {quizData.updated_at?.toLocaleString()}
      </p>

      <p>
        Created by: {quizData.name}
        <br />
        Title: {quizData.title}
        <br />
        Description: {quizData.description}
        <br />
        Prompt: {quizData.prompt}
      </p>

      <Link href={`/quiz/${id}/play`} className="btn">
        Play
      </Link>
    </>
  );
}

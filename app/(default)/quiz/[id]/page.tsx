import Link from 'next/link';
import { db } from '@/database';
import { notFound } from 'next/navigation';
import { FaArrowTrendUp } from 'react-icons/fa6';

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
    .executeTakeFirst()
    .catch(() => null);

  if (!quizData) {
    return notFound();
  }

  return (
    <>
      <div className="flex h-[30svh] w-full items-center justify-center rounded-md bg-green-100">
        <p className="text-3xl font-bold">{quizData.title}</p>
      </div>

      <h1 className="mt-5 text-4xl font-bold">{quizData.title}</h1>

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

      <div className="w-full rounded-lg bg-blue-50">
        <div className="flex gap-x-2">
          <FaArrowTrendUp className="size-6 text-blue-500" />
          <h2>自分のデータ</h2>
        </div>
        <span>ログインすると、自分のプレイデータを保存できます</span>
      </div>

      <Link href={`/quiz/${id}/play`} className="btn">
        Play
      </Link>
    </>
  );
}

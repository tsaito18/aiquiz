import QuizPlayComponent from '@/app/(play)/quiz/[id]/play/component';
import { db } from "@/database"
import {notFound} from "next/navigation"

export default async function QuizPlayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const quizData = await db
    .selectFrom('quizzes')
    .selectAll()
    .where('quiz_id', '=', id)
    .executeTakeFirst();

    if (!quizData) {
      return notFound();
    }

  return <QuizPlayComponent id={id} quizData={quizData} />;
}

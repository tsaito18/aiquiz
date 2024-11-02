import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log(session);
  if (!session) {
    return Response.error();
  }

  const { title, description, prompt } = await req.json();
  if (!title || !description || !prompt) {
    return NextResponse.error();
  }

  const newQuiz = await db
    .insertInto('quizzes')
    .values({
      quiz_id: crypto.randomUUID(),
      title,
      description,
      created_by: session.user.id!,
      prompt,
    })
    .returning('quiz_id')
    .executeTakeFirst();

  return Response.json(newQuiz);
}

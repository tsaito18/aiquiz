import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log(session);
  if (!session) {
    return Response.json({error: "ログインしてください"}, { status: 401 });
  }

  const { title, description, prompt } = await req.json();
  if (!title || !description || !prompt) {
    return NextResponse.json({error: "title, description, prompt は必須です"}, { status: 400 });
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

import { db } from '@/database';
import { getSession } from '@/libs/auth';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return Response.json(
      {
        success: false,
        error: 'クイズを作成するには、ログインする必要があります。',
      },
      { status: 401 },
    );
  }

  const { title, description, prompt } = await req.json();
  if (!title || !description || !prompt) {
    return NextResponse.json(
      { success: false, error: 'title, description, prompt は必須です。' },
      { status: 400 },
    );
  }

  const newQuiz = await db
    .insertInto('quizzes')
    .values({
      quiz_id: crypto.randomUUID(),
      title,
      description,
      created_by: session.user?.user_id!,
      prompt,
      play_count: 0,
    })
    .returning('quiz_id')
    .executeTakeFirst();

  return Response.json(newQuiz);
}

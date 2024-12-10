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
  if (
    !title ||
    typeof title !== 'string' ||
    title.length < 3 ||
    title.length > 32
  ) {
    return NextResponse.json(
      {
        success: false,
        error: 'title は 3 文字以上 32 文字以下の文字列でないといけません。',
      },
      { status: 400 },
    );
  }
  if (
    description &&
    (typeof description !== 'string' ||
      description.length < 3 ||
      description.length > 128)
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          'description を指定する場合は 3 文字以上 128 文字以下の文字列でないといけません。',
      },
      { status: 400 },
    );
  }
  if (
    !prompt ||
    typeof prompt !== 'string' ||
    prompt.length < 3 ||
    prompt.length > 512
  ) {
    return NextResponse.json(
      {
        success: false,
        error: 'prompt は 3 文字以上 512 文字以下の文字列でないといけません。',
      },
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

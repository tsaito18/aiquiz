import { db } from '@/database';
import { getSession } from '@/libs/auth';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return Response.json(
      {
        success: false,
        error: 'クイズを編集するには、ログインする必要があります。',
      },
      { status: 401 },
    );
  }

  const { quiz_id, title, description, prompt } = await request.json();
  if (!quiz_id || typeof quiz_id !== 'string') {
    return NextResponse.json(
      { success: false, error: 'quiz_id は必須です。' },
      { status: 400 },
    );
  }
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

  const targetQuiz = await db
    .selectFrom('quizzes')
    .selectAll()
    .where('quiz_id', '=', quiz_id)
    .executeTakeFirst();
  if (!targetQuiz) {
    return NextResponse.json(
      { success: false, error: '指定された ID のクイズは存在しません。' },
      { status: 404 },
    );
  }
  if (targetQuiz.created_by !== session.user?.user_id) {
    return NextResponse.json(
      {
        success: false,
        error: '他のユーザーが作成したクイズは編集できません。',
      },
      { status: 403 },
    );
  }

  await db
    .updateTable('quizzes')
    .set({ title, description, prompt })
    .where('quiz_id', '=', quiz_id)
    .execute();

  return Response.json({ success: true });
}

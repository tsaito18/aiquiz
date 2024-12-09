import { db } from '@/database';
import { getSession } from '@/libs/auth';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return Response.json(
      {
        success: false,
        error: 'クイズを削除するには、ログインする必要があります。',
      },
      { status: 401 },
    );
  }

  const { quiz_id } = await request.json();
  if (!quiz_id || typeof quiz_id !== 'string') {
    return NextResponse.json(
      { success: false, error: 'quiz_id は必須です。' },
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
        error: '他のユーザーが作成したクイズは削除できません。',
      },
      { status: 403 },
    );
  }

  await db.deleteFrom('quizzes').where('quiz_id', '=', quiz_id).execute();

  return Response.json({ success: true });
}

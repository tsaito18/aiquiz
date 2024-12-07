import { db } from '@/database';
import { getSession } from '@/libs/dal';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return Response.json(
      {
        success: false,
        error: '結果を保存するには、ログインする必要があります。',
      },
      { status: 401 },
    );
  }

  const { quiz_id, score, correct_count, total_count } = await req.json();
  if (!quiz_id || !score || !correct_count || !total_count) {
    return NextResponse.json(
      {
        success: false,
        error: 'quiz_id, score, correct_count, total_count は必須です。',
      },
      { status: 400 },
    );
  }
  if (
    !isNaN(score) ||
    !isNaN(correct_count) ||
    !isNaN(total_count) ||
    Number(score) < 0 ||
    Number(correct_count) < 0 ||
    Number(total_count) < 0 ||
    Number(correct_count) > Number(total_count)
  ) {
    return NextResponse.json(
      { success: false, error: 'データの形式が間違っています。' },
      { status: 400 },
    );
  }

  await db
    .insertInto('play_logs')
    .values({
      play_log_id: crypto.randomUUID(),
      user_id: session.user?.user_id!,
      quiz_id,
      score: Number(score),
      correct_count: Number(correct_count),
      total_count: Number(total_count),
    })
    .execute();

  await db
    .updateTable('quizzes')
    .set((eb) => ({
      play_count: eb('play_count', '+', 1),
    }))
    .where('quiz_id', '=', quiz_id)
    .execute();

  return Response.json({ success: true });
}

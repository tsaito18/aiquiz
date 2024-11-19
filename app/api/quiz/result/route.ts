import { db } from '@/database';
import { getSession } from '@/libs/dal';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

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

  await db
    .insertInto('play_logs')
    .values({
      play_log_id: crypto.randomUUID(),
      user_id: session.user?.user_id!,
      quiz_id,
      score,
      correct_count,
      total_count,
    })
    .execute();

  return NextResponse.json({ success: true });
}

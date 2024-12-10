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
        error: 'プロフィールを編集するには、ログインする必要があります。',
      },
      { status: 401 },
    );
  }

  const { name, avatar } = await request.json();
  if (
    !name ||
    typeof name !== 'string' ||
    name.length < 3 ||
    name.length > 32
  ) {
    return NextResponse.json(
      {
        success: false,
        error: 'name は 3 文字以上 32 文字以下の文字列でないといけません。',
      },
      { status: 400 },
    );
  }
  if (
    avatar &&
    (typeof avatar !== 'string' ||
      avatar.length < 7 ||
      avatar.length > 512 ||
      !avatar.startsWith('https://'))
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          'avatar を指定する場合は 7 文字以上 512 文字以下の、https:// から始まる文字列でないといけません。',
      },
      { status: 400 },
    );
  }

  await db
    .updateTable('users')
    .set({ name, avatar })
    .where('user_id', '=', session.user?.user_id!)
    .execute();

  return Response.json({ success: true });
}

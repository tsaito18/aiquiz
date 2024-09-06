import { auth } from '@/auth';
import { db } from '@/database';

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.error();
  }

  console.log(session.user);
  const userData = await db
    .selectFrom('user')
    .selectAll()
    .where('google_id', '=', session.user.googleId)
    .executeTakeFirst();
  console.log(userData);

  if (userData) {
    return Response.json(userData);
  } else {
    const newUserId = crypto.randomUUID();
    const newUser = await db
      .insertInto('user')
      .values({
        user_id: newUserId,
        name: session.user.name || '名無しさん',
        google_id: session.user.googleId,
        avatar: session.user.image || '',
        email: session.user.email || '',
      })
      .returningAll()
      .executeTakeFirst();

    return Response.json(newUser);
  }
}

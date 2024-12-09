import CopyButton from '@/components/CopyButton';
import QuizPlayButton from '@/components/QuizPlayButton';
import { db } from '@/database';
import { getSession } from '@/libs/auth';
import { notFound } from 'next/navigation';
import { FaArrowTrendUp, FaPlay, FaXTwitter } from 'react-icons/fa6';

export const revalidate = 60;

export default async function QuizDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getSession();

  const quizData = await db
    .selectFrom('quizzes as q')
    .where('quiz_id', '=', id)
    .leftJoin('users as u', 'q.created_by', 'u.user_id')
    .select([
      'q.quiz_id as quiz_id',
      'q.title as title',
      'q.description as description',
      'q.prompt as prompt',
      'q.play_count as play_count',
      'u.name as user.name',
      'u.avatar as user.avatar',
      'u.user_id as user.user_id',
    ])
    .executeTakeFirst()
    .catch(() => null);

  const playLogs = session.isLoggedIn
    ? await db
        .selectFrom('play_logs')
        .where('user_id', '=', session.user?.user_id!)
        .where('quiz_id', '=', id)
        .select((eb) => [
          eb.fn.count('play_log_id').as('count'),
          eb.fn.max('score').as('max_score'),
          eb.fn.max('correct_count').as('max_correct_count'),
        ])
        .executeTakeFirst()
    : null;

  if (!quizData) {
    return notFound();
  }

  return (
    <>
      <div className="flex h-[30svh] flex-col w-full items-center justify-center rounded-md bg-amber-100">
        <h1 className="text-3xl font-bold">{quizData.title}</h1>
        <p className="text-gray-700 mt-1">by {quizData['user.name']}</p>

        <div className="flex mt-3 gap-1 items-center text-gray-700">
          <FaPlay className="size-3" /> {quizData.play_count}{' '}
          回プレイされています
        </div>
      </div>

      <div className="flex mt-5 flex-col items-center">
        <p className="mb-5">{quizData.description}</p>

        <div className="flex gap-2">
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(`${quizData.title} | チャレンジAIクイズ`)}&url=${encodeURIComponent(`https://aiquiz.taigasaito.org/quiz/${quizData.quiz_id}`)}`}
            target="_blank"
            className="btn"
          >
            <FaXTwitter />
            ポスト
          </a>
          <CopyButton
            text={`https://aiquiz.taigasaito.org/quiz/${quizData.quiz_id}`}
          />
        </div>
      </div>

      <div className="w-full py-2 max-w-lg mx-auto mt-10 mb-5 px-4 rounded-lg bg-blue-50">
        <div className="flex items-center gap-x-2">
          <FaArrowTrendUp className="size-6 text-blue-500" />
          <h2 className="font-bold text-lg">自分のデータ</h2>
        </div>
        {session.isLoggedIn ? (
          playLogs && playLogs?.count !== '0' ? (
            <div className="grid grid-cols-3">
              <div>
                プレイ回数:{' '}
                <span className="font-bold text-2xl">{playLogs.count}</span>
              </div>
              <div>
                ハイスコア:{' '}
                <span className="font-bold text-2xl">{playLogs.max_score}</span>
              </div>
              <div>
                最高正解数:{' '}
                <span className="font-bold text-2xl">
                  {playLogs.max_correct_count}
                </span>
              </div>
            </div>
          ) : (
            <p>まだデータがありません</p>
          )
        ) : (
          <p>ログインすると、自分のプレイデータを保存できます</p>
        )}
      </div>

      <QuizPlayButton quizId={quizData.quiz_id} title={quizData.title} />
    </>
  );
}

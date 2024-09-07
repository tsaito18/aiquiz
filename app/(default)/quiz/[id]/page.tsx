import Link from 'next/link';

export default function QuizDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <p>
        QuizDetailPage
        <br />
        ID: {id}
      </p>

      <Link href={`/quiz/${id}/play`} className="btn">
        Play
      </Link>
    </>
  );
}

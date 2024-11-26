import Link from 'next/link';

export default function QuizCard({
  title,
  description,
  quizId,
}: {
  title: string;
  description: string;
  quizId: string;
}) {
  return (
    <Link href={`/quiz/${quizId}`} className="h-fit">
      <div className="p-4 hover:bg-gray-200 transition-colors bg-gray-100 rounded-lg">
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
}

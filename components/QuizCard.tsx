import Link from 'next/link';

export default function QuizCard({
  title,
  description,
  createdBy,
  quizId,
  hideCreatedBy = false,
}: {
  title: string;
  description: string;
  createdBy: string;
  quizId: string;
  hideCreatedBy?: boolean;
}) {
  return (
    <Link href={`/quiz/${quizId}`} className="h-fit">
      <div className="p-4 hover:bg-gray-200 transition-colors bg-gray-100 rounded-lg">
        <h2 className="font-bold text-xl">{title}</h2>
        {!hideCreatedBy && <p className="text-sm">by {createdBy}</p>}
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
}

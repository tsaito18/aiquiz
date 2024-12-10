import Image from 'next/image';
import Link from 'next/link';

export default function QuizCard({
  title,
  description,
  createdBy,
  userAvatar,
  quizId,
  hideCreatedBy = false,
}: {
  title: string;
  description: string;
  createdBy: string;
  userAvatar: string;
  quizId: string;
  hideCreatedBy?: boolean;
}) {
  return (
    <Link href={`/quiz/${quizId}`} className="h-fit">
      <div className="px-4 pt-4 pb-1 hover:bg-gray-200 transition-colors bg-gray-100 rounded-lg">
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>
        {!hideCreatedBy && (
          <div className="text-sm my-2 items-center flex gap-2">
            <Image
              src={userAvatar}
              alt={`${createdBy} さんのアバター`}
              width={50}
              height={50}
              className="size-6 rounded-full"
            />
            {createdBy}
          </div>
        )}
      </div>
    </Link>
  );
}

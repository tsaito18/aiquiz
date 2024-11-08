import QuizPlayComponent from '@/app/(play)/quiz/[id]/play/component';

export default function QuizPlayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <QuizPlayComponent id={id} />;
}

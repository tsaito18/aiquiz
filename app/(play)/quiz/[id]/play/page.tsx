import AnswerButtons from '@/components/play/AnswerButtons';
import ExplanationModal from '@/components/play/ExplanationModal';
import { Question } from '@/interfaces/question';
// import { useState } from 'react';

export const revalidate = 0;

export default async function QuizPlayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

  const genAPI = await fetch(`${process.env.APP_URL}/api/quiz/${id}/generate`);
  const questions: Question[] = await genAPI.json();

  // const questionSegment = segmenter.segment(questions[0].question);
  // const questionArr = Array.from(questionSegment);

  // setInterval(() => {
  //   setQuestion(question + questionArr.shift());
  // }, 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-3xl font-bold">Q.1</p>

      {/* ToDo: 1文字ずつ表示されるようにする */}
      <p>{questions[0].question}</p>

      {/* ToDo: 時間制限を追加 */}

      <AnswerButtons question={questions[0]} />

      <ExplanationModal TorF={true} answer="正解" explanation="正解はこちら" />
    </div>
  );
}

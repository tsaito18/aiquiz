'use client';

import AnswerButtons from '@/components/play/AnswerButtons';
import ExplanationModal from '@/components/play/ExplanationModal';
import { Question } from '@/interfaces/question';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

export default function QuizPlayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  async function generateQuestion() {
    const genAPI = await fetch(`/api/quiz/${id}/generate`);
    const questions = await genAPI.json();

    setQuestions(questions);
  }

  useEffect(() => {
    generateQuestion().then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const questionSegment = segmenter.segment(questions[0].question);
  // const questionArr = Array.from(questionSegment);

  // setInterval(() => {
  //   setQuestion(question + questionArr.shift());
  // }, 100);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-ring size-16" />
        <p className="text-xl">問題を作成しています...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-3xl font-bold">Q.1</p>

      {/* ToDo: 1文字ずつ表示されるようにする */}
      <p>{questions[0].question}</p>

      {/* ToDo: 時間制限を追加 */}

      <AnswerButtons question={questions[0]} />
      <ExplanationModal
        TorF={false}
        answer={questions[0].explanation}
        explanation={questions[0].explanation}
      />
    </div>
  );
}

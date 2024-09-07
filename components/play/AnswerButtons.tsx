'use client';

import { Question } from '@/interfaces/question';

export default function AnswerButtons({
  answers,
}: {
  answers: Question['answers'];
}) {
  function answerQuestion(number: number) {
    const TorF = answers[number as unknown as '0' | '1' | '2' | '3'].isAnswer;
    alert(TorF ? '正解' : '不正解');
  }

  return (
    <div className="flex flex-col gap-3">
      {Object.values(answers).map((answer, index) => (
        <button
          key={index}
          className="btn btn-wide"
          onClick={() => answerQuestion(index)}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
}

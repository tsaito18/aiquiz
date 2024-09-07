'use client';

import { Question } from '@/interfaces/question';

export default function AnswerButtons({ question }: { question: Question }) {
  // eslint-disable-next-line no-unused-vars
  function answerQuestion(_number: number) {
    // const TorF =
    //   question.answers[number as unknown as '0' | '1' | '2' | '3'].isAnswer;
    // alert(`${TorF ? '正解' : '不正解'}\n${question.explanation}`);

    // @ts-expect-error
    document.getElementById('explanation_modal')?.showModal();

    document
      .getElementById('explanation_modal')
      ?.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
        }
      });
  }

  return (
    <div className="flex flex-col gap-3">
      {Object.values(question.answers).map((answer, index) => (
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

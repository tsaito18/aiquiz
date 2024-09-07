import { Question } from '@/interfaces/question';

export default async function QuizPlayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const genAPI = await fetch(`${process.env.APP_URL}/api/quiz/${id}/generate`);
  const questions: Question[] = await genAPI.json();
  console.log(questions);

  return (
    <>
      <p>QuizPlayPage</p>
      {/* <pre>{JSON.stringify(questions)}</pre> */}

      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <ul>
            {Object.values(question.answers).map((answer, index) => (
              <li key={index}>{answer.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

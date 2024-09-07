import { FaArrowRight } from 'react-icons/fa6';

export default function ExplanationModal({
  TorF,
  answer,
  explanation,
}: {
  TorF: boolean;
  answer: string;
  explanation: string;
}) {
  return (
    <dialog id="explanation_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{TorF ? '正解' : '不正解'}</h3>
        <p className="py-4">
          {answer}
          <br />
          {explanation}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-block">
              次の問題へ <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

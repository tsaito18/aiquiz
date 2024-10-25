import { FaArrowRight, FaRegCircle, FaXmark } from 'react-icons/fa6';

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
        <h3 className="mt-1 flex items-center justify-center gap-3 text-lg font-bold">
          {TorF ? (
            <FaRegCircle className="size-8 text-green-500" />
          ) : (
            <FaXmark className="size-10 text-red-500" />
          )}
          <span className="text-3xl">{TorF ? '正解' : '不正解'}</span>
        </h3>
        <p className="py-4">
          {answer}
          <br />
          {explanation}
        </p>
        <div className="modal-action">
          <form method="dialog" className="w-full">
            <button className="btn btn-block">
              次の問題へ <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

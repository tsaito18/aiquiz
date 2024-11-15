import { FaCircleExclamation } from 'react-icons/fa6';

export default function InvalidAccess({ mt }: { mt?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center text-center gap-y-3 ${mt ? 'mt-10' : ''}`}
    >
      <FaCircleExclamation className="size-10 text-red-500" />
      <p className="text-xl">
        無効なアクセスです。
        <br />
        戻ってやりなおしてください。
      </p>
    </div>
  );
}

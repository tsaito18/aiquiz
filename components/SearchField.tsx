'use client';

import { useSearchParams } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchField() {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';

  return (
    <form className="join mb-7 w-full">
      <input
        className="input join-item input-primary input-bordered w-full"
        type="search"
        name="q"
        placeholder="検索したいことばをいれてください..."
        defaultValue={defaultQuery}
      />
      <button type="submit" className="btn btn-primary join-item">
        <FaMagnifyingGlass className="h-4 w-4" />
        検索
      </button>
    </form>
  );
}

import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchPage() {
  async function search(formData: FormData) {
    'use server';

    const query = formData.get('query') as string;

    console.log('query', query);
  }

  return (
    <>
      <form action={search} className="join w-full">
        <input
          name="query"
          className="input input-bordered join-item"
          placeholder="検索したいことばを入力..."
        />
        <button type="submit" className="btn join-item">
          <FaMagnifyingGlass className="size-4" />
          検索
        </button>
      </form>
    </>
  );
}

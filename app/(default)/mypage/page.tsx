import { signOut } from '@/auth';

export default function MyPage() {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit" className="btn w-64">
          ログアウト
        </button>
      </form>
    </>
  );
}

import CreateQuizComponent from '@/app/(default)/create/component';
import LoginModal from '@/components/LoginModal';
import { getSession } from '@/libs/auth';

export default async function CreateQuizPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <LoginModal force />;
  }

  return <CreateQuizComponent />;
}

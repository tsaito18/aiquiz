'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';

import { userAtom } from '@/atoms/user';

export default function AuthHandler() {
  const setUserInfo = useSetAtom(userAtom);
  const { data: session } = useSession();
  console.log(session);

  async function setUserData() {
    if (session) {
      // TODO: リクエストしすぎているので修正する
      const userData = await fetch('/api/users/me').then((res) => res.json());

      setUserInfo({
        isLoading: false,
        isLoggedIn: true,
        userId: userData.user_id,
        name: userData.name,
        avatar: userData.avatar,
        googleId: userData.google_id,
        email: userData.email,
      });
    } else {
      setUserInfo({
        isLoading: false,
        isLoggedIn: false,
        userId: '',
        name: '',
        avatar: '',
        googleId: '',
        email: '',
      });
    }
  }

  useEffect(() => {
    setUserData();
  }, [/* session */]);

  return null;
}

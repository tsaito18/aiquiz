import { UserAtom } from '@/interfaces/atom';
import { atom } from 'jotai';

export const authAtom = atom<UserAtom>({
  isLoading: true,
  isLoggedIn: false,
  userId: '',
  name: '',
  googleId: '',
  email: '',
});

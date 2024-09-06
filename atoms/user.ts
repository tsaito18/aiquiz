import { UserAtom } from '@/interfaces/atom';
import { atom } from 'jotai';

export const userAtom = atom<UserAtom>({
  isLoading: true,
  isLoggedIn: false,
  userId: '',
  name: '',
  avatar: '',
  googleId: '',
  email: '',
});

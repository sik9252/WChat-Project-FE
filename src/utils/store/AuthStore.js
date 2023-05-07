import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

/** 로그인 여부 판단 */
export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
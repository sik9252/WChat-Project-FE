import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

/** 로그인 여부 판단 */
export const myInfoAtom = atom({
  key: 'myInfoAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
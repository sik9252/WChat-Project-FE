import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

/** 접속한 채팅방의 제목 */
export const enteredRoomNameAtom = atom({
  key: 'enteredRoomNameAtom',
  default: { roomName: '', roomId: '' },
  effects_UNSTABLE: [persistAtom],
});

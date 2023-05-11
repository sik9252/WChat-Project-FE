import { useAxios } from '../useAxios';

/** 채팅 방 생성하기 */
export const createRoomsReq = async (data) => {
  return await useAxios.post(`/chat/create`, data);
};

/** 채팅 방 조회(페이징) */
export const getAllRoomsReq = async (page) => {
  return await useAxios.get(`/chat/rooms/p/${page}`);
};

/** 채팅 방 조회(검색) */
export const getSearchedRoomsReq = async (roomName) => {
  return await useAxios.get(`/chat/room?roomName=${roomName}`);
};

/** 특정 채팅 방 조회 */
export const uniqueRoomReq = async (roomId) => {
  return await useAxios.get(`/chat/room/${roomId}`);
};

/** 채팅 방 입장시 유효한 채팅방인지 검증 */
export const checkRoomPasswordRef = async (data) => {
  return await useAxios.post(`/chat/room/enter`, data);
};

/** 채팅방 안에 접속해있는 유저 정보 */
export const getUserListInRoomReq = async (roomId) => {
  return await useAxios.get(`/chat/room/users/${roomId}`);
};

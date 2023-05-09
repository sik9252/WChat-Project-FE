import { useAxios } from '../useAxios';

/** 채팅 방 생성하기 */
export const createRoomsReq = async (data) => {
  return await useAxios.post(`/chat/create`, data);
};

/** 채팅 방 조회(페이징) */
export const getAllRoomsReq = async (page) => {
  return await useAxios.get(`/chat/rooms/p/${page}`);
};

/** 특정 채팅 방 조회 */
export const uniqueRoomReq = async (roomId) => {
  return await useAxios.get(`/chat/room/${roomId}`);
};

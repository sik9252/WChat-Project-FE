import { useAxios } from '../axios/useAxios';

/** 채팅 방 생성하기 */
export const createRoomsReq = async (data) => {
  return await useAxios.post(`/chat/room`, data);
};

/** 채팅 방 전체 조회 */
export const getAllRoomsReq = async (roomName) => {
  return await useAxios.get(`/chat/rooms`, roomName);
};

/** 특정 채팅 방 조회 */
export const uniqueRoomReq = async (roomId) => {
  return await useAxios.get(`/chat/room/${roomId}`);
};

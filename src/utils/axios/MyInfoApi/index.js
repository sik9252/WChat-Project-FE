import { useAxios } from '../useAxios';

/** 내 정보 조회 */
export const getMyInfoReq = async () => {
  return await useAxios.get(`/auth/info`);
};

/** 내 닉네임 변경 */
export const changeMyNickReq = async (data) => {
  return await useAxios.put(`/auth/change`, data);
};

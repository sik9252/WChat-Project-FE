import { useAxios } from '../useAxios';

/** 내 정보 조회 */
export const getMyInfoReq = async () => {
  return await useAxios.get(`/auth/info`);
};

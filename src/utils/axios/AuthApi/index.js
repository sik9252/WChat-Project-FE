import { useAxios } from '../useAxios';

/** 카카오 로그인 */
export const kakaoLoginReq = async (code) => {
  return await useAxios.get(`/auth/kakao/callback?code=${code}`);
};

/** 로그아웃 */
export const logoutReq = async () => {
  return await useAxios.post(`/auth/logout`);
};

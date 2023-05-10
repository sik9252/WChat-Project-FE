import { useAxios } from '../useAxios';

/** 카카오 로그인 */
export const kakaoLoginReq = async (code) => {
  return await useAxios.get(`/auth/kakao/callback?code=${code}`);
};

/** 로그아웃 */
export const logoutReq = async () => {
  return await useAxios.post(`/auth/logout`);
};

/** 회원 탈퇴 */
export const withDrawlReq = async () => {
  return await useAxios.delete(`/auth/withdrawal`);
};

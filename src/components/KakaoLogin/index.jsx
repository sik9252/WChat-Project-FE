import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { kakaoOauthCallback } from '../../../axiosManage/Auth';

function KakaoLogin() {
  const navigate = useNavigate();
  let authCode = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // 서버로 카카오 인가코드 보내고 응답받고 토큰 저장 및 이후 처리(내정보 저장 등) 로직 작성
  }, []);
}

export default KakaoLogin;

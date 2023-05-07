import React from 'react';

/** styles */
import { LoginPageContainer } from './style';

function LoginPage() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  // 카카오 로그인 버튼 클릭시
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginPageContainer>
      <div onClick={handleKakaoLogin}>
        {/* <img src={KakaoLoginBtn} /> */}
        <p>카카오 로그인</p>
      </div>
    </LoginPageContainer>
  );
}

export default LoginPage;

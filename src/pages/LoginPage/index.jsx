import React, { useEffect } from 'react';

/** assets */
import KakaoLoginBtn from '../../assets/kakao_login_btn.png';
import WchatLogo from '../../assets/wchatLogo.png';

/** styles */
import { LoginPageContainer, LogoBox } from './style';

/** store */
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../utils/store/AuthStore';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);

  useEffect(() => {
    if (isLogin) {
      navigate('/rooms');
    }
  }, []);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  // 카카오 로그인 버튼 클릭시
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const test = () => {
    axios.get('https://list-api.link/hello').then((res) => {
      console.log(res);
    });
  };

  return (
    <LoginPageContainer>
      <button onClick={() => test()}>테스트</button>
      <LogoBox>
        <img src={WchatLogo} alt="로고" />
      </LogoBox>
      <div onClick={handleKakaoLogin}>
        <img src={KakaoLoginBtn} alt="카카오 로그인" />
      </div>
    </LoginPageContainer>
  );
}

export default LoginPage;

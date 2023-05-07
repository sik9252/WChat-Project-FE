import React, { useEffect } from 'react';

/** assets */
import KakaoLoginBtn from '../../assets/kakao_login_btn.png';

/** styles */
import { LoginPageContainer } from './style';

/** store */
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../utils/store/AuthStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인된 상태입니다');
      navigate(-1);
    }
  }, []);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  // 카카오 로그인 버튼 클릭시
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginPageContainer>
      <div onClick={handleKakaoLogin}>
        <img src={KakaoLoginBtn} alt="카카오 로그인" />
      </div>
    </LoginPageContainer>
  );
}

export default LoginPage;

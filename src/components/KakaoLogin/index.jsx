import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** axios */
import { kakaoLoginReq } from '../../utils/axios/AuthApi';
import { getMyInfoReq } from '../../utils/axios/MyInfoApi';

/** store */
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../utils/store/AuthStore';
import { myInfoAtom } from '../../utils/store/MyInfoStore';

function KakaoLogin() {
  const navigate = useNavigate();
  let authCode = new URL(window.location.href).searchParams.get('code');

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const setMyInfo = useSetRecoilState(myInfoAtom);

  useEffect(() => {
    if (isLogin) {
      navigate('/rooms');
    }
  }, []);

  useEffect(() => {
    // 서버로 카카오 인가코드 보내고 응답받고 토큰 저장 및 이후 처리(내정보 저장 등) 로직 작성
    kakaoLoginReq(authCode)
      .then((res) => {
        setIsLogin(true);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        getMyInfoReq()
          .then((res) => {
            setMyInfo(res.data.nickName);
            navigate('/rooms');
          })
          .catch((err) => {
            alert('유저 정보를 가져오는데 실패하였습니다.');
          });
      })
      .catch((err) => {
        alert('로그인에 실패하였습니다! 다시 시도해주세요.');
        navigate('/');
        console.log(err);
      });
  }, [authCode]);
}

export default KakaoLogin;

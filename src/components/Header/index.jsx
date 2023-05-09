import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** style */
import { HeaderContainer, LogoBox, InfoBox } from './style';

/** assets */
import WchatLogo from '../../assets/wchatLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/** components */
import { Button } from '../Button';

/** axios */
import { logoutReq } from '../../utils/axios/AuthApi';

/** store */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { isLoginAtom } from '../../utils/store/AuthStore';

function Header() {
  const navigate = useNavigate();
  // 로그인 전역 상태
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const myNickName = useRecoilValue(myInfoAtom);
  const location = useLocation();

  // 로그아웃
  const onClickLogout = () => {
    logoutReq()
      .then((res) => {
        alert('로그아웃 하셨습니다.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
        navigate('/');
      })
      .catch((err) => {
        alert('로그아웃에 실패했습니다.');
      });
  };

  // 마이페이지로 이동
  const onClickMyPage = () => {
    navigate('/mypage');
  };

  // 로고 클릭시 메인페이지로 이동
  const onClickLogo = () => {
    navigate('/rooms');
  };

  return (
    <HeaderContainer>
      <LogoBox>
        <img src={WchatLogo} alt="WChat" onClick={() => onClickLogo()} />
      </LogoBox>
      <InfoBox>
        {location.pathname === '/rooms' ? (
          <>
            <div>
              <Button
                width={50}
                height={40}
                onClick={() => {
                  onClickMyPage();
                }}
              >
                MY
              </Button>
            </div>
            <div>
              <Button
                width={80}
                height={40}
                onClick={() => {
                  onClickLogout();
                }}
              >
                로그아웃
              </Button>
            </div>
          </>
        ) : location.pathname === '/mypage' ? (
          <div>
            <Button
              width={80}
              height={40}
              onClick={() => {
                onClickLogout();
              }}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          ''
        )}
      </InfoBox>
    </HeaderContainer>
  );
}

export default Header;

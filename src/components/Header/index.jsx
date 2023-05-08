import React from 'react';
import { useLocation } from 'react-router-dom';

/** style */
import { HeaderContainer, LogoBox, InfoBox } from './style';

/** assets */
import WchatLogo from '../../assets/wchatLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/** components */
import { Button } from '../Button';

/** store */
import { useRecoilValue } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';

function Header() {
  const myNickName = useRecoilValue(myInfoAtom);
  const location = useLocation();

  console.log(location);

  return (
    <HeaderContainer>
      <LogoBox>
        <img src={WchatLogo} alt="WChat" />
      </LogoBox>
      <InfoBox>
        <div>
          <FontAwesomeIcon icon={faUser} /> {myNickName}
        </div>
        {location.pathname === '/rooms' ? (
          <div>
            <Button width={80} height={37}>
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

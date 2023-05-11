import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** style */
import COLOR from '../../styles/common/colors';
import {
  MyPageContainer,
  MyPageTitle,
  ChangeNickBox,
  MyPageOptionBox,
} from './style';

/** components */
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';

/** axios */
import { changeMyNickReq } from '../../utils/axios/MyInfoApi';
import { withDrawlReq } from '../../utils/axios/AuthApi';

/** store */
import { useRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { isLoginAtom } from '../../utils/store/AuthStore';

function MyPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      navigate('/');
    }
  }, []);

  /** 닉네임 변경 기능 */
  // 유저가 입력한 변경할 닉네임
  const [nickName, setNickName] = useState('');
  // 현재 저장된 닉네임 및 새로운 닉네임 설정(전역)
  const [currentNick, setCurrentNickName] = useRecoilState(myInfoAtom);

  const onChangeNick = (e) => {
    setNickName(e.target.value);
  };

  const onClickChangeNick = () => {
    const nickData = {
      nickName: nickName,
    };

    changeMyNickReq(nickData)
      .then((res) => {
        if (res.data.success) {
          alert('닉네임 변경이 완료되었습니다.');
          setCurrentNickName(nickName);
          navigate('/rooms');
        } else {
          alert('3분 후에 다시 변경하실 수 있습니다.');
          navigate('/rooms');
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  /** 회원 탈퇴 기능 */
  const onClickWithdrawal = () => {
    let withdrawal = window.confirm('정말 탈퇴하시겠습니까?');

    if (withdrawal) {
      withDrawlReq().then((res) => {
        if (res.data.success) {
          alert('회원 탈퇴가 완료되었습니다.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLogin(false);
          navigate('/');
        } else {
          alert('회원 탈퇴에 실패하였습니다.');
        }
      });
    }
  };

  return (
    <MyPageContainer>
      <MyPageTitle>
        <p>{currentNick}</p>님의 마이페이지
      </MyPageTitle>
      <ChangeNickBox>
        <div>닉네임 변경하기</div>
        <div>
          <InputBox
            height={40}
            placeholder="변경할 닉네임을 입력하세요."
            onChange={onChangeNick}
          ></InputBox>
          <Button
            width={80}
            height={40}
            onClick={() => {
              onClickChangeNick();
            }}
          >
            변경하기
          </Button>
        </div>
        <div>* 닉네임 변경은 3분마다 가능합니다.</div>
      </ChangeNickBox>
      <MyPageOptionBox>
        <Button
          width={80}
          height={40}
          bgColor={COLOR.GREEN_7}
          color={COLOR.GRAY_0}
          onClick={() => {
            onClickWithdrawal();
          }}
        >
          회원 탈퇴
        </Button>
        <a href="mailto:easyst0228@gmail.com?subject=메일의 제목을 입력해주세요.&body=내용을 입력해주세요.">
          문의하기
        </a>
      </MyPageOptionBox>
    </MyPageContainer>
  );
}

export default MyPage;

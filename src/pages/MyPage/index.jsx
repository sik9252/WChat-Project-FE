import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** style */
import { MyPageContainer } from './style';

/** axios */
import { changeMyNickReq } from '../../utils/axios/MyInfoApi';

/** store */
import { useRecoilValue, useRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { isLoginAtom } from '../../utils/store/AuthStore';

function MyPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);

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

  return (
    <MyPageContainer>
      <div>내 닉네임: {currentNick}</div>
      <div>
        <input
          placeholder="변경할 닉네임을 입력하세요."
          onChange={onChangeNick}
        ></input>
        <button
          onClick={() => {
            onClickChangeNick();
          }}
        >
          닉네임 변경하기
        </button>
      </div>
    </MyPageContainer>
  );
}

export default MyPage;

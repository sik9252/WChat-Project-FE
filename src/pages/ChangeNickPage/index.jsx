import React, { useState, useEffect } from 'react';

/** axios */
import { changeMyNickReq } from '../../utils/axios/MyInfoApi';

/** store */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { useNavigate } from 'react-router-dom';
import { isLoginAtom } from '../../utils/store/AuthStore';

function ChangeNickPage() {
  const isLogin = useRecoilValue(isLoginAtom);
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      navigate('/');
    }
  }, []);

  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');
  const setRecoilNickName = useSetRecoilState(myInfoAtom);

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
          setRecoilNickName(nickName);
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

  return (
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
  );
}

export default ChangeNickPage;

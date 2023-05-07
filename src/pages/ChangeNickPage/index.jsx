import React, { useState } from 'react';

/** axios */
import { changeMyNickReq } from '../../utils/axios/MyInfoApi';

/** store */
import { useSetRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';

function ChangeNickPage() {
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
        alert('닉네임 변경이 완료되었습니다.');
        setRecoilNickName(nickName);
      })
      .catch((err) => {
        alert('닉네임 변경에 실패하셨습니다.');
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

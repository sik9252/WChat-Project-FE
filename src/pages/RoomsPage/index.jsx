import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/** styles */
import { RoomsPageContainer, RoomsListBox } from './style';

/** axios */
import { useQuery } from 'react-query';
import { createRoomsReq, getAllRoomsReq } from '../../utils/axios/RoomsApi';
import { logoutReq } from '../../utils/axios/AuthApi';

/** store */
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { isLoginAtom } from '../../utils/store/AuthStore';

function RoomsPage() {
  const navigate = useNavigate();

  // 로그인 전역 상태
  const setIsLogin = useSetRecoilState(isLoginAtom);

  // 내 정보 전역 상태
  const myNickName = useRecoilValue(myInfoAtom);

  // 전체 채팅방 목록 조회
  const [roomsList, setRoomsList] = useState([]);
  const { refetch: getAllRoomsRefetch } = useQuery(
    'getAllRoomsReq',
    getAllRoomsReq,
    {
      retry: 0,
      onSuccess: (data) => {
        console.log(data.data);
        setRoomsList(data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // 채팅방 생성하기
  const [roomName, setRoomName] = useState('');

  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const onClickCreateRoom = () => {
    const roomData = {
      name: roomName,
    };

    createRoomsReq(roomData)
      .then((res) => {
        console.log(res);
        getAllRoomsRefetch();
        navigate(`/chat/${res.data.roomId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 채팅방 입장
  const onClickEnterRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

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

  return (
    <RoomsPageContainer>
      <button
        onClick={() => {
          onClickLogout();
        }}
      >
        로그아웃
      </button>
      <div>내 닉네임:{myNickName}</div>
      <Link to="/changeNick">닉네임 변경하기</Link>
      <input
        placeholder="채팅방 이름을 입력하세요."
        onChange={onChangeRoomName}
      ></input>
      <button onClick={onClickCreateRoom}>생성하기</button>
      <RoomsListBox>
        {roomsList && roomsList.length > 0 ? (
          <>
            {roomsList.map((room) => (
              <div
                key={room.roomId}
                onClick={() => {
                  onClickEnterRoom(room.roomId);
                }}
              >
                {JSON.parse(room.roomName).name}
              </div>
            ))}
          </>
        ) : (
          <div>개설된 채팅방이 없습니다.</div>
        )}
      </RoomsListBox>
    </RoomsPageContainer>
  );
}

export default RoomsPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** styles */
import { RoomsPageContainer, RoomsListBox } from './style';

/** axios */
import { useQuery } from 'react-query';
import { createRoomsReq, getAllRoomsReq } from '../../utils/RoomsApi';

function RoomsPage() {
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 채팅방 입장
  const onClickEnterRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <RoomsPageContainer>
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

import React, { useState, useEffect } from 'react';

/** styles */
import { UserListContainer, UserListBox, User } from './style';

/** axios */
import { getUserListInRoomReq } from '../../utils/axios/RoomsApi';

function UserListInRoomPage({ roomId }) {
  console.log(roomId);
  // 접속해 있는 유저 정보 리스트
  const [userListInRoom, setUserListInRoom] = useState([]);

  useEffect(() => {
    getUserListInRoomReq(roomId).then((res) => {
      console.log(res.data);
      setUserListInRoom(res.data.nickNameResponseDtoList);
    });
  }, []);
  return (
    <UserListContainer>
      <div>유저 목록</div>
      <UserListBox>
        {userListInRoom &&
          userListInRoom.map((user) => <User>{user.nickName}</User>)}
      </UserListBox>
    </UserListContainer>
  );
}

export default UserListInRoomPage;

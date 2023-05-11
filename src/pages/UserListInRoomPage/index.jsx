import React, { useState, useEffect } from 'react';

/** styles */
import { UserListContainer, UserListBox, User } from './style';

/** axios */
import { getUserListInRoomReq } from '../../utils/axios/RoomsApi';

function UserListInRoomPage({ roomId }) {
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
      <div>현재 접속중인 유저</div>
      <UserListBox>
        {userListInRoom &&
          userListInRoom.map((user, i) => <User key={i}>{user.nickName}</User>)}
      </UserListBox>
    </UserListContainer>
  );
}

export default UserListInRoomPage;

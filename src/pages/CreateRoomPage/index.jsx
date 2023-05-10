import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** styles */
import {
  CreateRoomPageContainer,
  EndOptionBox,
  ErrorBox,
  RoomNameBox,
  MaxPeopleBox,
  RoomPassWordBox,
  IsSecretBox,
} from './style';

/** compontents */
import { Button } from '../../components/Button';
import { InputBox } from '../../components/InputBox';

/** axios */
import { createRoomsReq } from '../../utils/axios/RoomsApi';

/** store */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { enteredRoomNameAtom } from '../../utils/store/RoomStore';
import { isLoginAtom } from '../../utils/store/AuthStore';

function CreateRoomPage() {
  const navigate = useNavigate();
  // 접속한 채팅방의 제목
  const setEnteredRoomName = useSetRecoilState(enteredRoomNameAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      navigate('/');
    }
  }, []);

  /** 채팅방 생성하기 */
  // 채팅방 이름
  const [roomName, setRoomName] = useState('');
  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  // 채팅방 최대 인원수
  const [maxPeople, setMaxPeople] = useState(0);
  const onChangeMaxPeople = (e) => {
    setMaxPeople(e.target.value);
  };

  // 비밀방 여부
  const [isSecret, setIsSecret] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');

  const onClickIsSecret = () => {
    setIsSecret((isSecret) => !isSecret);
  };

  const onChangeRoomPassword = (e) => {
    setRoomPassword(e.target.value);
  };

  const [checkRoomName, setCheckRoomName] = useState(false);
  const [checkMaxPeople, setCheckMaxPeople] = useState(false);
  const [checkRoomPassword, setCheckRoomPassword] = useState(false);

  useEffect(() => {
    if (roomName !== '' && roomName.length >= 1 && roomName.length <= 20) {
      setCheckRoomName(true);
    } else {
      setCheckRoomName(false);
    }
  }, [roomName]);

  useEffect(() => {
    if (
      Number.isSafeInteger(Number(maxPeople)) &&
      maxPeople >= 2 &&
      maxPeople <= 10
    ) {
      setCheckMaxPeople(true);
    } else {
      setCheckMaxPeople(false);
    }
  }, [maxPeople]);

  useEffect(() => {
    if (isSecret === true) {
      if (roomPassword !== '') {
        setCheckRoomPassword(true);
      } else {
        setCheckRoomPassword(false);
      }
    } else if (isSecret === false) {
      setCheckRoomPassword(true);
    }
  }, [isSecret, roomPassword]);

  const onClickCreateRoom = () => {
    if (checkRoomName && checkMaxPeople && checkRoomPassword) {
      const roomData = {
        roomName: roomName,
        roomPassword: roomPassword,
        maxPeople: Number(maxPeople),
        secret: isSecret,
      };

      createRoomsReq(roomData)
        .then((res) => {
          setEnteredRoomName({
            roomName: res.data.roomName,
            roomId: res.data.roomId,
          });
          navigate(`/chat/${res.data.roomId}`);
        })
        .catch((error) => {
          alert('방 생성에 실패하였습니다.');
          console.log(error);
        });
    }
  };

  return (
    <CreateRoomPageContainer>
      <div>
        <RoomNameBox>
          <div>채팅방 이름</div>
          <InputBox
            height={40}
            placeholder="1~20자 이내의 채팅방 이름을 입력해주세요."
            onChange={onChangeRoomName}
          ></InputBox>
        </RoomNameBox>
        <ErrorBox checkRoomName={checkRoomName}>
          * 채팅방 이름은 1~20자여야 합니다.
        </ErrorBox>
        <div>
          <MaxPeopleBox>
            <div>최대 인원수</div>
            <InputBox
              height={40}
              placeholder="2~10 사이의 수를 입력해주세요."
              onChange={onChangeMaxPeople}
            ></InputBox>
          </MaxPeopleBox>
          <ErrorBox checkMaxPeople={checkMaxPeople}>
            * 최대 인원수는 2~10사이의 값이여야 합니다.
          </ErrorBox>
          <IsSecretBox>
            <div>비밀방 여부</div>
            {isSecret ? (
              <Button
                width={140}
                height={40}
                onClick={() => {
                  onClickIsSecret();
                }}
              >
                비밀방 취소하기
              </Button>
            ) : (
              <Button
                width={140}
                height={40}
                onClick={() => {
                  onClickIsSecret();
                }}
              >
                비밀방으로 설정하기
              </Button>
            )}
          </IsSecretBox>
        </div>
        {isSecret ? (
          <>
            <RoomPassWordBox>
              <div>방 비밀번호</div>
              <InputBox
                height={40}
                placeholder="방 입장시 필요한 비밀번호를 설정해주세요."
                onChange={onChangeRoomPassword}
              ></InputBox>
            </RoomPassWordBox>
            <ErrorBox checkRoomPassword={checkRoomPassword}>
              * 비밀방 설정시 비밀번호는 필수값 입니다.
            </ErrorBox>
          </>
        ) : (
          ''
        )}
      </div>
      <EndOptionBox>
        <Button
          width={80}
          height={40}
          onClick={() => {
            navigate('/rooms');
          }}
        >
          취소하기
        </Button>
        <Button
          width={80}
          height={40}
          onClick={() => {
            onClickCreateRoom();
          }}
        >
          생성하기
        </Button>
      </EndOptionBox>
    </CreateRoomPageContainer>
  );
}

export default CreateRoomPage;

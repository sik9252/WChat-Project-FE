import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import moment from 'moment-timezone';

/** style */
import {
  ChatPageContainer,
  ChatListSection,
  ChatListBox,
  ChatBox,
  Chat,
  ChatNotice,
  InputSection,
} from './style';
import COLOR from '../../styles/common/colors';

/** components */
import { Button } from '../../components/Button';
import { InputBox } from '../../components/InputBox';
import Modal from '../../components/Modal';

/** pages */
import UserListInRoomPage from '../UserListInRoomPage';

/** hooks */
import useModal from '../../hooks/useModal';

/** store */
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../utils/store/AuthStore';
import { myInfoAtom } from '../../utils/store/MyInfoStore';

function ChatPage() {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      navigate('/');
    }
  }, []);

  const roomId = useParams();
  const myNickName = useRecoilValue(myInfoAtom);

  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const onChangeInputMessage = (e) => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    if (isLogin) {
      connect();
      return () => unSubscribe();
    }
  }, [isLogin]);

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_SERVER_IP}/ws/chat`),
      connectHeaders: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
      debug: function (str) {
        //console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // connection이 established되면 호출되는 함수 onConnect()
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
        alert('채팅방 입장에 실패하였습니다.');
        navigate('/rooms');
      },
    });

    client.current.activate();
  };

  // 소켓 연결 해제
  const unSubscribe = () => {
    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'EXIT',
        roomId: roomId.roomId,
        sender: myNickName,
      }),
    });

    client.current.unsubscribe(roomId.roomId);
    client.current.deactivate();
  };

  // 채팅방 입장(구독)
  const subscribe = () => {
    const headers = {
      roomId: roomId.roomId,
      Authorization: localStorage.getItem('accessToken'),
    };

    client.current.subscribe(
      `/topic/chat/room/${roomId.roomId}`,
      ({ body }) => {
        setChatMessages((_chatMessages) => [
          ..._chatMessages,
          JSON.parse(body),
        ]);
      },
      headers,
    );

    if (client.current.connected) {
      client.current.publish({
        destination: '/app/chat/message',
        body: JSON.stringify({
          type: 'ENTER',
          roomId: roomId.roomId,
          sender: myNickName,
        }),
      });
    }
  };

  // 메시지 전송
  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    if (message !== '') {
      client.current.publish({
        destination: '/app/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: roomId.roomId,
          sender: myNickName,
          message: message,
          sendAt: new Date(),
        }),
      });
    }
    setInputMessage('');
  };

  // 채팅 스크롤 하단 유지
  const ChatList = useRef();

  const scrollToBottom = () => {
    const { scrollHeight } = ChatList.current;
    ChatList.current.scrollTop = scrollHeight;
  };

  // 채팅 보낸 시간 출력해주는 함수
  const getCurrentTime = (time) => {
    var m = moment(time).tz('Asia/Seoul');
    return m.format('HH:mm');
  };

  /** 모달에 접속해 있는 유저 정보 보여주기 */

  // 접속해 있는 유저 정보 모달 열고 닫기
  const [modalOption, showModal] = useModal();

  // 접속해 있는 유저 정보 모달 오픈
  const openUserListInRooms = useCallback(() => {
    showModal(true, null, null, <UserListInRoomPage roomId={roomId.roomId} />);
    document.body.style.overflow = 'hidden';
  }, [showModal]);

  // 엔터로 채팅 보내기
  const SendByEnter = (e) => {
    if (e.key === 'Enter') {
      publish(inputMessage);
    }
  };

  // 보내기 버튼으로 채팅 보내기
  const clickSend = () => {
    publish(inputMessage);
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  return (
    <ChatPageContainer>
      <Modal modalOption={modalOption} />
      <Button
        width={100}
        height={40}
        bgColor={COLOR.GREEN_7}
        color={COLOR.GRAY_0}
        onClick={() => openUserListInRooms()}
      >
        참여자 보기
      </Button>
      <ChatListSection>
        {chatMessages && chatMessages.length > 0 && (
          <ChatListBox ref={ChatList}>
            {chatMessages.map((_chatMessage, index) => {
              if (
                _chatMessage.type === 'ENTER' ||
                _chatMessage.type === 'EXIT'
              ) {
                return (
                  <ChatNotice key={index}>{_chatMessage.message}</ChatNotice>
                );
              } else {
                return (
                  <ChatBox
                    key={index}
                    isMe={myNickName === _chatMessage.sender}
                  >
                    <div>{_chatMessage.sender}</div>
                    <div>
                      <Chat>
                        <div>{_chatMessage.message}</div>
                      </Chat>
                      <div>{getCurrentTime(_chatMessage.sendAt)}</div>
                    </div>
                  </ChatBox>
                );
              }
            })}
          </ChatListBox>
        )}
      </ChatListSection>
      <InputSection>
        <InputBox
          height={40}
          type={'text'}
          placeholder={'내용을 입력하세요.'}
          value={inputMessage}
          onChange={onChangeInputMessage}
          onKeyPress={() => SendByEnter()}
        />
        <Button width={80} height={40} onClick={() => clickSend()}>
          보내기
        </Button>
      </InputSection>
    </ChatPageContainer>
  );
}

export default ChatPage;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import moment from 'moment-timezone';

/** style */
import { ChatPageContainer } from './style';

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
      return () => disconnect();
    }
  }, [isLogin]);

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_SERVER_IP}/ws/chat`), // proxy를 통한 접속
      connectHeaders: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  // 소켓 연결 해제
  const disconnect = () => {
    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'EXIT',
        roomId: roomId.roomId,
        sender: myNickName,
      }),
    });

    if (client.current != null) {
      if (client.current.connected) {
        client.current.deactivate();
        client.current.unsubscribe();
      }
    }
    // client.current.deactivate();
  };

  // 채팅방 입장(구독)
  const subscribe = () => {
    client.current.subscribe(
      `/topic/chat/room/${roomId.roomId}`,
      ({ body }) => {
        console.log('subscribe', body);
        setChatMessages((_chatMessages) => [
          ..._chatMessages,
          JSON.parse(body),
        ]);
      },
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

  // 채팅 보낸 시간 출력해주는 함수
  const getCurrentTime = (time) => {
    var m = moment(time).tz('Asia/Seoul');
    return m.format('HH:mm');
  };

  return (
    <ChatPageContainer>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => {
            if (_chatMessage.type === 'ENTER' || _chatMessage.type === 'EXIT') {
              return <li key={index}>{_chatMessage.message}</li>;
            } else {
              return (
                <li key={index}>
                  {myNickName}님: {_chatMessage.message}
                  {getCurrentTime(_chatMessage.sendAt)}
                </li>
              );
            }
          })}
        </ul>
      )}
      <div>
        <input
          type={'text'}
          placeholder={'내용을 입력하세요.'}
          value={inputMessage}
          onChange={onChangeInputMessage}
          // onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(inputMessage)}>보내기</button>
      </div>
    </ChatPageContainer>
  );
}

export default ChatPage;

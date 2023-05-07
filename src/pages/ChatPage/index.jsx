import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

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

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_SERVER_IP}/ws/chat`), // proxy를 통한 접속
      connectHeaders: {
        'auth-token': 'spring-chat-auth-token',
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

  const disconnect = () => {
    client.current.deactivate();
    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'EXIT',
        roomId: roomId.roomId,
        sender: myNickName,
      }),
    });
  };

  const subscribe = () => {
    client.current.subscribe(
      `/topic/chat/room/${roomId.roomId}`,
      ({ body }) => {
        console.log(body);
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

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'TALK',
        roomId: roomId.roomId,
        sender: myNickName,
        message: message,
      }),
    });

    setInputMessage('');
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => {
            const currentMessage = JSON.stringify(_chatMessage);
            if (
              currentMessage.includes(`${myNickName}님이 입장하였습니다.`) ||
              currentMessage.includes(`${myNickName}님이 퇴장하였습니다.`)
            ) {
              return <li key={index}>{_chatMessage.message}</li>;
            } else {
              return (
                <li key={index}>
                  {myNickName}님: {_chatMessage.message}
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
    </div>
  );
}

export default ChatPage;

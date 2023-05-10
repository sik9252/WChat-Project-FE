import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** styles */
import {
  RoomsPageContainer,
  RoomPageContents,
  WelcomeTitle,
  RoomsListBox,
  Room,
  SearchBox,
  RoomListTitleBox,
  PaginationContainer,
} from './style';

/** components*/
import { SearchInputBox } from '../../components/InputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button';

/** axios */
import { useQuery } from 'react-query';
import {
  getAllRoomsReq,
  checkRoomPasswordRef,
  getSearchedRoomsReq,
} from '../../utils/axios/RoomsApi';

/** store */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myInfoAtom } from '../../utils/store/MyInfoStore';
import { isLoginAtom } from '../../utils/store/AuthStore';
import { enteredRoomNameAtom } from '../../utils/store/RoomStore';

function RoomsPage() {
  const navigate = useNavigate();

  /** 로그인 여부 판단 */
  const isLogin = useRecoilValue(isLoginAtom);
  useEffect(() => {
    if (!isLogin) {
      alert('로그인을 해주세요!');
      navigate('/');
    }
  }, []);

  // 접속한 채팅방의 제목
  const setEnteredRoomName = useSetRecoilState(enteredRoomNameAtom);

  // 내 닉네임 조회
  const myNickName = useRecoilValue(myInfoAtom);

  /** 채팅방 목록 조회(페이징) */
  const [currentPage, setCurrentPage] = useState(0);
  const [roomsList, setRoomsList] = useState([]);

  useEffect(() => {
    if (isLogin) {
      getAllRoomsReq(currentPage)
        .then((res) => {
          console.log(res.data);
          setRoomsList(res.data);
        })
        .catch((err) => {
          alert('채팅방 목록을 불러오는데 실패하였습니다.');
        });
    }
  }, [isLogin, navigate, currentPage]);

  // 페이징 이전, 다음 버튼
  const onClickPrevBtn = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNextBtn = () => {
    if (currentPage !== roomsList.chatRoomTotalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  /** 새로고침 버튼 클릭 시 데이터 패칭 */
  const onClickRefresh = () => {
    getAllRoomsReq(currentPage)
      .then((res) => {
        console.log(res.data);
        setRoomsList(res.data);
      })
      .catch((err) => {
        alert('채팅방 목록을 불러오는데 실패하였습니다.');
      });
  };

  // 채팅방 생성하러 가기
  const onClickCreateRoom = () => {
    navigate('/createRoom');
  };

  /** 채팅방 입장 및 비밀번호 확인 */
  const onClickEnterRoom = (room, roomId) => {
    // 비밀방인 경우
    if (room.secret) {
      const roomPassword = prompt('비밀번호를 입력해주세요!');
      const roomData = {
        roomId: roomId,
        roomPassword: roomPassword,
      };
      checkRoomPasswordRef(roomData).then((res) => {
        if (res.data.success) {
          setEnteredRoomName({ roomName: room.roomName, roomId: roomId });
          navigate(`/chat/${roomId}`);
        } else {
          alert(res.data.message);
        }
      });
    } else {
      // 공개방인 경우
      const roomData = {
        roomId: roomId,
      };
      checkRoomPasswordRef(roomData).then((res) => {
        console.log(res);
        if (res.data.success) {
          setEnteredRoomName({ roomName: room.roomName, roomId: roomId });
          navigate(`/chat/${roomId}`);
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const onChangeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const SearchByEnter = (e) => {
    if (e.key === 'Enter') {
      setIsSearchClicked(true);
    }
  };

  const onClickSearch = () => {
    setIsSearchClicked(true);
  };

  const { refetch: getSearchedRoomsReqRefetch } = useQuery(
    ['getSearchedRoomsReq', isSearchClicked],
    () => getSearchedRoomsReq(searchKeyword),
    {
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        console.log(data.data);
        setRoomsList(data.data);
        setIsSearchClicked(false);
        setSearchKeyword('');
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    if (isSearchClicked) {
      getSearchedRoomsReqRefetch();
    }
  }, [isSearchClicked]);

  return (
    <RoomsPageContainer>
      <RoomPageContents>
        <WelcomeTitle>
          <p>{myNickName}</p>님, 환영합니다!
        </WelcomeTitle>
        {/* 채팅방 검색창 */}
        <SearchBox>
          <SearchInputBox
            height={40}
            value={searchKeyword}
            placeholder={'찾으시는 방이 있으신가요?'}
            onChange={onChangeSearchKeyword}
            onKeyPress={SearchByEnter}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={() => {
              onClickSearch();
            }}
          />
        </SearchBox>
        <RoomListTitleBox>
          <div>채팅방 목록</div>
          <div>
            <Button
              width={100}
              height={40}
              onClick={() => {
                onClickCreateRoom();
              }}
            >
              채팅방 만들기
            </Button>
            <FontAwesomeIcon
              icon={faRotateRight}
              onClick={() => onClickRefresh()}
            />
          </div>
        </RoomListTitleBox>
        <RoomsListBox>
          {roomsList.chatRoomResponseDtoList &&
          roomsList.chatRoomResponseDtoList.length > 0 ? (
            <>
              {roomsList.chatRoomResponseDtoList.map((room) => (
                <Room
                  key={room.roomId}
                  onClick={() => {
                    onClickEnterRoom(room, room.roomId);
                  }}
                  isSecret={room.secret}
                >
                  <div>{room.roomName}</div>
                  <div>
                    {room.secret ? (
                      <div>
                        <FontAwesomeIcon icon={faLock} />
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon icon={faLockOpen} />
                      </div>
                    )}

                    <div>
                      {room.countPeople}/{room.maxPeople}
                    </div>
                  </div>
                </Room>
              ))}
            </>
          ) : (
            <Room>개설된 채팅방이 없습니다.</Room>
          )}
        </RoomsListBox>
      </RoomPageContents>
      {/* <Pagination
        totalPageCount={roomsList.chatRoomTotalPages}
        currentPage={currentPage + 1}
        setCurrentPage={setCurrentPage}
      /> */}
      <PaginationContainer>
        {roomsList.chatRoomTotalPages === 0 ? (
          <>
            <Button></Button>
            <div>{currentPage}</div>
            <Button></Button>
          </>
        ) : (
          <>
            {currentPage === 0 ? (
              <Button width={60}></Button>
            ) : (
              <Button width={60} height={40} onClick={() => onClickPrevBtn()}>
                이전
              </Button>
            )}
            <div>{currentPage + 1}</div>
            {roomsList.chatRoomTotalPages - 1 === currentPage ? (
              <Button width={60}></Button>
            ) : (
              <Button width={60} height={40} onClick={() => onClickNextBtn()}>
                다음
              </Button>
            )}
          </>
        )}
      </PaginationContainer>
    </RoomsPageContainer>
  );
}

export default RoomsPage;

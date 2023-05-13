import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** pages */
import CommonLayout from '../components/CommonLayout';
import LoginPage from '../pages/LoginPage';
import RoomsPage from '../pages/RoomsPage';
import CreateRoomPage from '../pages/CreateRoomPage';
import ChatPage from '../pages/ChatPage';
import MyPage from '../pages/MyPage';
import KakaoLogin from '../components/KakaoLogin';
import PageNotFound from '../pages/PageNotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더가 있는 페이지 */}
        <Route element={<CommonLayout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/createRoom" element={<CreateRoomPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />
          <Route path="/myPage" element={<MyPage />} />
        </Route>
        {/* 헤더가 없는 페이지 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** pages */
import LoginPage from '../pages/LoginPage';
import RoomsPage from '../pages/RoomsPage';
import ChatPage from '../pages/ChatPage';
import MyPage from '../pages/MyPage';
import KakaoLogin from '../components//KakaoLogin';
import PageNotFound from '../pages/PageNotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

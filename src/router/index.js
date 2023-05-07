import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** pages */
import LoginPage from '../pages/LoginPage';
import RoomsPage from '../pages/RoomsPage';
import ChatPage from '../pages/ChatPage';
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
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

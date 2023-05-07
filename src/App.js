import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/common/theme';

function App() {
  // 모바일 뷰에서 100vh 제대로 적용되도록 하는 함수
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <ThemeProvider theme={theme['main']}>
      <GlobalStyle />
      <div>메인페이지</div>
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/common/theme';

import { useAxiosInterceptor } from './utils/axios/useAxiosInterceptor';
import Router from './router';

function App() {
  useAxiosInterceptor();

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
      <Router />
    </ThemeProvider>
  );
}

export default App;

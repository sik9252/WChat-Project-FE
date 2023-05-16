import { css } from 'styled-components';
import COLOR from '../../styles/common/colors';

// 전체 컨테이너 정의 -> GlobalStyle보다 여기가 먼저..?
const mainTheme = {
  container: {
    mainContainer: css`
      width: 100vw;
      height: calc(var(--vh, 1vh) * 100 - 60px);
      //height: 100vh;
      background: #fefbe9;
      padding: 20px;

      // 데스크탑
      @media screen and (min-width: 1024px) {
        //width: 400px;
      }

      // 태블릿 large
      @media screen and (max-width: 1024px) {
      }

      // 태블릿 small
      @media screen and (max-width: 720px) {
      }

      // 모바일 large
      @media screen and (max-width: 600px) {
      }

      // 모바일 medium
      @media screen and (max-width: 400px) {
      }

      // 모바일 small
      @media screen and (max-width: 320px) {
      }
    `,
  },
};

const theme = {
  main: mainTheme,
};

export default theme;

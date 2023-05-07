import { css } from 'styled-components';

// 전체 컨테이너 정의
const mainTheme = {
  container: {
    mainContainer: css`
      width: 100vw;
      height: calc(var(--vh, 1vh) * 100);
      margin: 0 auto;
    `,
  },
};

const theme = {
  main: mainTheme,
};

export default theme;

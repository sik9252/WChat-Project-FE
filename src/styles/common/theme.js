import { css } from 'styled-components';
import COLOR from '../../styles/common/colors';

// 전체 컨테이너 정의
const mainTheme = {
  container: {
    mainContainer: css`
      width: 100%;
      height: calc(var(--vh, 1vh) * 100);
      background: #fefbe9;
      padding: 20px;

      // 데스크탑
      @media screen and (min-width: 1024px) {
        height: 700px;
      }
    `,
  },
};

const theme = {
  main: mainTheme,
};

export default theme;

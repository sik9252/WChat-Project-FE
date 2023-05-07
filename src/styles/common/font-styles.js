import { css } from 'styled-components';

const getFontWeight = (weight) => {
  switch (weight) {
    case 'EB':
      return 800;
    case 'B':
      return 700;
    case 'SB':
      return 600;
    case 'M':
      return 500;
    case 'R':
      return 400;
    case 'L':
      return 300;
    case 'EL':
      return 200;
    case 'T':
      return 100;
    default:
      return 300;
  }
};

// 나눔스퀘어
export const N_FONT = ({ weight }) => css`
  font-family: NanumSquare;
  font-weight: ${getFontWeight(weight)};
`;

// Pretendard
export const P_FONT = ({ weight }) => css`
  font-family: Pretendard Variable;
  font-weight: ${getFontWeight(weight)};
`;

export const FONT_STYLES = {
  // -------나눔스퀘어
  N_EB: N_FONT({ weight: 'EB' }),

  N_B: N_FONT({ weight: 'B' }),

  N_R: N_FONT({ weight: 'R' }),

  // ------Pretendard
  P_EB: P_FONT({ weight: 'EB' }),

  P_B: P_FONT({ weight: 'B' }),

  P_SB: P_FONT({ weight: 'SB' }),

  P_M: P_FONT({ weight: 'M' }),

  P_R: P_FONT({ weight: 'R' }),

  P_L: P_FONT({ weight: 'L' }),

  P_EL: P_FONT({ weight: 'EL' }),

  P_T: P_FONT({ weight: 'T' }),
};
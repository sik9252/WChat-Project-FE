import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
       --vh: 100%;
   }
   // 이후 모바일 100vh가 필요한 곳에서 아래와 같이 사용
   // height: calc(var(--vh, 1vh) * 100);
   
    html, 
    body {
        font-family: Pretendard Variable, NanumSquare, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
        font-size: 16px;
        font-weight: 500;
        background-color: white; 
        ::-webkit-scrollbar{ display:none; }
        width: 100vw;

        // 태블릿 large
        @media screen and (max-width: 1024px) {
            background: white;
        }
 
        // 태블릿 small
        @media screen and (max-width: 720px) {
            background: yellow;
        }

        // 모바일 large
        @media screen and (max-width: 600px) {
            background: orange;
        }

        // 모바일 medium
        @media screen and (max-width: 400px) {
            background: blue;
        }

        // 모바일 small
        @media screen and (max-width: 320px) {
            background: pink;
        }
    }
    *{
        box-sizing: border-box;
    }
    a,
    a:link,
    a:visited,
    a:hover{
        text-decoration: none;
        color: inherit;
    }
    input{
         font-family: Pretendard Variable, NanumSquare,-apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
        padding: 0;
        margin: 0;
    }
    textarea {
        font-family: Pretendard Variable, NanumSquare, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    }
    button{
        font-family: Pretendard Variable, NanumSquare,-apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
         background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
    }
`;

export default GlobalStyle;

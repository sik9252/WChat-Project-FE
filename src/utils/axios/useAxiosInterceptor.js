import { useEffect } from 'react';
import axios from 'axios';
import { useAxios } from './useAxios';
import { isLoginAtom } from '../store/AuthStore';
import { useSetRecoilState } from 'recoil';
import jwt_decode from 'jwt-decode';

export const useAxiosInterceptor = () => {
  const setIsLogin = useSetRecoilState(isLoginAtom);

  const requestInterceptor = useAxios.interceptors.request.use(
    async function (config) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        return config;
      }

      try {
        const nowDate = new Date().getTime() / 1000;
        const accessTokenDecode = jwt_decode(accessToken);
        console.log('exp:', accessTokenDecode.exp, 'nowDate:', nowDate);

        if (accessTokenDecode.exp < nowDate) {
          console.log('리프레쉬 할 시간입니다.');
          const refreshRequest = await axios.post(
            `${process.env.REACT_APP_SERVER_IP}/auth/refresh`,
            {
              refreshToken: refreshToken,
            },
          );
          if (refreshRequest.status === 200) {
            localStorage.setItem(
              'accessToken',
              refreshRequest.data.accessToken,
            );
            config.headers.Authorization = `Bearer ${localStorage.getItem(
              'accessToken',
            )}`;
          }
        } else {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            'accessToken',
          )}`;
        }
      } catch (error) {
        window.location.href = '/';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
      }
      return config;
    },
    function (error) {
      // Do something with request error
      // eslint-disable-next-line no-undef
      return Promise.reject(error);
    },
  );

  const responseInterceptor = useAxios.interceptors.response.use(
    function (response) {
      // error 구문으로 안잡히는거 같아서 일단 여기에 로직 작성
      if (response) {
        return response;
      } else {
        window.location.href = '/';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
      }
      //return response;
    },
    function (error) {
      if (error.status === 401) {
        window.location.href = '/';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false);
      }
      // eslint-disable-next-line no-undef
      return error.response;
    },
  );

  useEffect(() => {
    return () => {
      useAxios.interceptors.request.eject(requestInterceptor);
      useAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

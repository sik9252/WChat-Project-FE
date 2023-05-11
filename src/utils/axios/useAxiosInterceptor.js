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

        if (accessTokenDecode.exp < nowDate) {
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

  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        if (error.response.data.message === '잘못된 토큰입니다.') {
          const originalRequest = config;
          const refreshToken = localStorage.getItem('refreshToken');
          // token refresh 요청
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_IP}/auth/refresh`, // token refresh api
            {
              refreshToken: refreshToken,
            },
          );
          // 새로운 토큰 저장
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            data;

          localStorage.setItem('accessToken', newAccessToken);

          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        } else {
          window.location.href = '/';
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLogin(false);
        }
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      useAxios.interceptors.request.eject(requestInterceptor);
      useAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

import { useEffect } from 'react';
import axios from 'axios';
import { useAxios } from './useAxios';
import jwt_decode from 'jwt-decode';

export const useAxiosInterceptor = () => {
  const requestInterceptor = useAxios.interceptors.request.use(
    async function (config) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken === undefined || refreshToken === undefined) {
        return config;
      }
      try {
        const nowDate = new Date().getTime() / 1000;
        const accessTokenDecode = jwt_decode(accessToken);

        if (accessTokenDecode.exp < nowDate) {
          const refreshRequest = await axios.post(
            `${process.env.REACT_APP_AXIOS}/auth/refresh`,
            {
              refreshToken: refreshToken,
            },
          );
          if (refreshRequest.status === 200) {
            localStorage.setItem(
              'accessToken',
              refreshRequest.data.accessToken,
            );
            config.headers.Authorization = localStorage.getItem('accessToken');
          }
        } else {
          config.headers.Authorization = localStorage.getItem('accessToken');
        }
      } catch (error) {
        window.location.href = '/';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // setIsLogin(false);
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
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        window.location.href = '/login';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // setIsLogin(false);
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

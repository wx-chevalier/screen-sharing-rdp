import jwtDecode from 'jwt-decode';

import { setRequestHeader } from '../api/umi/request';

import { axiosAgent } from './../api/axios/agent';

/** 基于 Token 的鉴权方式 */
export let token: string | null = null;
const LOCAL_KEY = 'ufc-token';

export function getToken() {
  if (token) {
    return token;
  }

  const storedToken = localStorage.getItem(LOCAL_KEY);

  if (storedToken) {
    return JSON.parse(storedToken);
  }

  return storedToken;
}

export function setToken(_token: string | null) {
  token = _token;

  if (_token === null) {
    // 设置 Token 之后，修改 request 的 Header
    setRequestHeader({});
  } else {
    setRequestHeader({
      Authorization: `Bearer ${token}`,
    });
    axiosAgent.defaults.headers.Authorization = `Bearer ${token}`;
  }

  if (_token) {
    return localStorage.setItem(LOCAL_KEY, JSON.stringify(_token));
  } else {
    return localStorage.removeItem(LOCAL_KEY);
  }
}

/** 判断是否过期 */
export function isTokenExpired(token: string | undefined, lead = 0) {
  if (!token) {
    return true;
  }

  const { exp } = jwtDecode(token);

  // 这里引入提前量，以提前进行 Token 更新
  if (exp * 1000 > Date.now() + lead) {
    return false;
  }

  return true;
}

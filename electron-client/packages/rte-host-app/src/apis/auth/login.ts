/** 用户鉴权相关操作 */
import { message, notification } from 'antd';
import _ from 'lodash';
import * as S from 'ufc-schema';

import { i18nFormat } from '@/i18n';
import {
  HOST,
  getToken,
  history,
  isTokenExpired,
  setAuthority,
  setToken,
  umiRequest,
} from '@/skeleton';

const getProfile = async () => {
  return new S.User();
};

/**
 * @start Person Token 登陆接口
 */

/** 通过用户名密码登陆 */
export async function loginByUsername(username?: string, password?: string) {
  const {
    data: { token },
  } = await umiRequest.post<{ data: any }>(`${HOST}/noauth/login/person`, {
    data: { username, credential: password, type: 'PASSWORD' },
    errorHandler: () => {
      notification.error({
        message: `${i18nFormat('登录失败')}`,
        description: `${i18nFormat('用户名或密码错误')}`,
      });
    },
  });

  return token;
}

/** 使用手机号登录 */
export async function loginByPhone(phone: string, verifyCode: string) {
  const {
    data: { token },
  } = await umiRequest.post<{ data: any }>(`${HOST}/noauth/login/person`, {
    data: {
      username: phone,
      credential: verifyCode,
      type: 'VERIFICATION_CODE',
    },
    errorHandler: () => {
      notification.error({
        message: `${i18nFormat('登录失败')}`,
        description: `${i18nFormat('用户名或密码错误')}`,
      });
    },
  });

  return token;
}

/**
 * @end Person Token 登陆接口
 */
export async function getPersonInfoAndLoginAsUser(personToken: string) {
  const { data: personInfo } = await umiRequest.get<{ data: S.Person }>(
    `${HOST}/noauth/person`,
    {
      params: {
        token: `Bearer ${personToken}`,
      },
    },
  );

  if (!S.isValidArray(personInfo.userIds)) {
    message.error('您还没有加入到任何租户，请联系管理员添加！');
    throw new Error('');
  }

  // 执行登陆操作，默认登录到首个租户
  const {
    data: { token },
  } = await umiRequest.post<{ data: { token: string } }>(
    `${HOST}/noauth/login/user`,
    {
      data: {
        personId: personInfo.id,
        personToken: `Bearer ${personToken}`,
        userId: personInfo.userIds[0],
      },
      errorHandler: () => {
        notification.error({
          message: `${i18nFormat('登录失败')}`,
          description: `${i18nFormat('您没有租户权限！')}`,
        });
      },
    },
  );

  if (!token) {
    message.error('登陆租户失败，您没有租户权限！');
    throw new Error('');
  }

  await postLogin(token);
}

/** 使用 PersonInfo 登录 */
export async function loginAsUserWithPersonInfo(
  personInfo: S.Person,
  personToken: string,
  userId: string,
) {
  // 执行登陆操作，默认登录到首个租户
  const {
    data: { token },
  } = await umiRequest.post<{ data: { token: string } }>(
    `${HOST}/noauth/login/user`,
    {
      data: {
        personId: personInfo.id,
        personToken: `Bearer ${personToken}`,
        userId,
      },
      errorHandler: () => {
        notification.error({
          message: `${i18nFormat('登录失败')}`,
          description: `${i18nFormat('您没有租户权限！')}`,
        });
      },
    },
  );

  if (!token) {
    message.error('登陆租户失败，您没有租户权限！');
    throw new Error('');
  }

  await postLogin(token);
}

export async function changeTenantUserWithTenantId(tenantId: S.Id) {
  // 获取关联的 userId
  const users = getGlobalUser().person.users;
  const userId = users.find((u: S.User) => u.tenantId === tenantId).id;

  await changeTenantUser(userId);
}

/** 当前用户更改关联的租户 */
export async function changeTenantUser(userId: S.Id) {
  // 首先获取 Token
  const token = getToken();

  const {
    data: { token: newToken },
  } =
    (await umiRequest.patch<{ data: { token: string } }>(`${HOST}/user/login`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId },
      errorHandler: () => {
        message.error(`${i18nFormat('切换失败，请稍候重试')}`);

        // 清空本地的 Token
        setToken(null);
        setAuthority(null);
      },
    })) || ({ data: {} } as any);

  if (newToken) {
    // 设置获取到的新 token
    await postLogin(newToken);

    message.success(`已经将身份切换到：${getGlobalUser().tenant.name}`);
  }
}

/**
 * @start User Token 登陆接口
 */
export async function loginByUserToken() {
  // 首先获取 Token
  const token = getToken();

  // 判断 token 是否过期，
  if (!isTokenExpired(token, 24 * 3600)) {
    await postLogin(token);

    return;
  }

  if (token) {
    const {
      data: { token: newToken },
    } =
      (await umiRequest.patch<{ data: { token: string } }>(
        `${HOST}/user/login`,
        {
          headers: { Authorization: `Bearer ${token}` },
          errorHandler: () => {
            message.error(`${i18nFormat('登录失效，跳转重新登录')}`);

            // 清空本地的 Token
            setToken(null);
            setAuthority(null);
          },
        },
      )) || ({ data: {} } as any);

    if (newToken) {
      // 设置获取到的新 token
      await postLogin(newToken);
    }
  } else {
    await postLogin(null);
  }
}

/** 统一的登陆后处理 */
async function postLogin(token: string | null) {
  if (token) {
    setToken(token);

    // 这里获取用户信息，并且设置权限
    const profile = await getProfile();

    setGlobalUser(profile);

    if (!profile) {
      setToken(null);
      setAuthority(null);
      return;
    }

    // 获取到用户的权限信息
    const permissionNames = (profile.permissions || []).map((p: any) =>
      p.name.trim(),
    );

    // 注册权限信息
    const authority = [profile.authority, ...permissionNames];

    if (authority.indexOf('SYS_ADMIN') > -1) {
      authority.push('TENANT_ADMIN');
    }

    if (authority.indexOf('TENANT_ADMIN') > -1) {
      authority.push('TENANT_USER');
    }

    if (authority.indexOf('TENANT_ADMIN') > -1) {
      authority.push(...['PRODUCT_BOARD', 'MACHINE_BOARD']);
    }

    setAuthority(authority);
  } else {
    setToken(null);
    setAuthority(null);
  }
}

export async function setGlobalUser(profile: S.User) {
  if (profile) {
    window.gConfig.user = profile;

    if (window.Sentry) {
      window.Sentry.configureScope((scope: any) => {
        scope.setUser({ ...profile });
      });
    }
  }
}

export function getGlobalUser() {
  return window.gConfig.user;
}

export function logout() {
  setToken(null);
  setAuthority(null);
  window.gConfig.user = null;
  history.push('/auth/login');

  // 需要刷新界面，清空 redux
  window.location.reload();
}

/** 获取登录验证码 */
export async function getLoginCode(sendDst: string) {
  const { status } = await umiRequest.post<{ status: string }>(
    `${HOST}/noauth/verification_code`,
    {
      data: {
        channel: 'SMS',
        sendDst,
      },
    },
  );

  return status === 'ok';
}

/** 获取 personInfo */
export async function getPersonInfoWithToken(personToken: string) {
  const { data: personInfo } = await umiRequest.get<{ data: S.Person }>(
    `${HOST}/noauth/person`,
    {
      params: {
        token: `Bearer ${personToken}`,
      },
    },
  );

  return new S.Person(personInfo);
}

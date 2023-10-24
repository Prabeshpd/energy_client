import { setCookie, deleteCookie } from 'cookies-next';

export async function setAuthTokenCookie(accessToken: string) {
  setCookie('auth-cookie', accessToken);
}

export async function clearAuthTokenCookie() {
  deleteCookie('auth-cookie');
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export const authTokenKey = 'Authentication';

export const getToken = (): AuthToken | undefined => {
  const jsonAuthTokens = localStorage.getItem(authTokenKey);
  if (!jsonAuthTokens) {
    return;
  }

  const tokens: AuthToken = JSON.parse(jsonAuthTokens);

  return tokens;
};

export const setToken = (accessToken: string, refreshToken: string): void => {
  const tokens: AuthToken = {
    accessToken,
    refreshToken,
  };
  localStorage.setItem(authTokenKey, JSON.stringify(tokens));
};

export const clearToken = (): void => {
  localStorage.removeItem(authTokenKey);
};

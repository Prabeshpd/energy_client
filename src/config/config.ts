export interface Config {
  nodeEnv?: string;
  env?: string;
  apiBaseUrl: string;
  apiVersion: string;
  endpoints: {
    login: string;
    refreshToken: string;
    createUser: string;
    fetchUser: string;
    fetchProjects: string;
    fetchProjectHistory: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  apiBaseUrl: process.env.NEXT_PUBLIC_REACT_BASE_API_URL || '',
  apiVersion: '/v1',
  endpoints: {
    // user
    fetchUser: '/users/me',
    createUser: '/users',

    // login
    login: '/auth/login',
    refreshToken: '/auth/refresh',

    //projects
    fetchProjects: '/projects',

    //projectHistory
    fetchProjectHistory: '/projectHistories',
  },
};

export default config;

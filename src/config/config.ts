export interface Config {
  nodeEnv?: string;
  env?: string;
  apiBaseUrl: string;
  apiVersion: string;
  endpoints: {
    login: string;
    createUser: string;
    fetchUser: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  apiBaseUrl: process.env.REACT_BASE_API_URL || 'http://localhost:3000',
  apiVersion: '/v1',
  endpoints: {
    // user
    fetchUser: '/users/:id',
    createUser: '/users',

    // login
    login: '/login',
  },
};

export default config;

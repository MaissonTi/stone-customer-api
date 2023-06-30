const config = () => ({
  isDeployment: process.env.NODE_ENV === 'development',
  application: {
    serviceName: process.env.APP_NAME,
    port: process.env.APP_PORT,
    env: process.env.NODE_ENV || 'development',
  },
  httpRetry: {
    attempts: process.env.HTTP_RETRY_ATTEMPTS || 3,
    delay: process.env.HTTP_RETRY_DELAY || 5000,
    timeout: process.env.HTTP_RETRY_TIMEOUT || 5000,
  },
  infra: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    sso: {
      url: process.env.SSO_URL,
      clientId: process.env.SSO_CLIENT_ID,
      username: process.env.SSO_CLIENT_USERNAME,
      secret: process.env.SSO_CLIENT_SECRET,
    },
  },
});

export type AppConfig = typeof config;

export default config;

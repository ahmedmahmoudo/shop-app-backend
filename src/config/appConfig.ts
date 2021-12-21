import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
}));

import * as Joi from 'joi';

export const configValidation = Joi.object({
  DATABASE_URL: Joi.string().default(
    'postgres://shopApp:shopApp@localhost:5438/shopApp_db',
  ),
  APP_PORT: Joi.number().default(4000),
  JWT_SECRET: Joi.string().default('change_me'),
});

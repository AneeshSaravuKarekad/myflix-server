import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
  ALGO: process.env.ALGO,
};

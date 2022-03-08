import jwt from 'jsonwebtoken';

import config from '../config/index.js';
const { JWT_KEY, EXPIRES_IN, ALGO } = config;

export const createToken = (user) => {
  jwt.sign({ id: user._id }, JWT_KEY, {
    expiresIn: EXPIRES_IN,
    algorithm: ALGO,
  });
};

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};

export default { createToken, verifyToken };

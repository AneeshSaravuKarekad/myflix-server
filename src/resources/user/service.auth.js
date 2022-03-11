import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from './model.user.js';
import config from '../../config/index.js';

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyLocalCallback = async (email, password, done) => {
  try {
    let normalizedEmail = email.normalize('NFC');
    const user = await UserModel.findOne({ email: normalizedEmail }).select(
      '+password'
    );
    if (!user) {
      done(null, false, { message: 'Incorrect Email or Password' });
    } else {
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        done(null, false, { message: 'Incorrect Email or Password' });
      } else {
        done(null, user);
      }
    }
  } catch (error) {
    done(error);
  }
};

const localStrategy = new LocalStrategy(localOptions, verifyLocalCallback);

passport.use(localStrategy);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_KEY,
};

const verifyJwtCallback = async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (error) {
    done(null, false);
  }
};

const jwtStrategy = new JWTStrategy(jwtOptions, verifyJwtCallback);

passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });

export const authJwt = passport.authenticate('jwt', { session: false });

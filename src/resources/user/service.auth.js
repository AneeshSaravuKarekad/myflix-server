import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import UserModel from './model.user.js';

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

export const authLocal = passport.authenticate('local', { session: false });

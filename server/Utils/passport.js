import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel.js';

dotenv.config(); // load env file

// Setup work and export for the JWT passport strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export function auth() {
  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const userId = jwtPayload._id;
      const user = await UserModel.findById(userId);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  }));
}

// initiate the JwtStrategy
auth();

// authenticates the JWT token to protect routes
export const checkAuth = passport.authenticate('jwt', { session: false });

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import UserModel from '../models/UserModel.js';

// Setup work and export for the JWT passport strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export function auth() {
  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const userId = jwtPayload._id;
    UserModel.findById(userId, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
}

// initiate the JwtStrategy
auth();

// authenticates the JWT token to protect routes
export const checkAuth = passport.authenticate('jwt', { session: false });

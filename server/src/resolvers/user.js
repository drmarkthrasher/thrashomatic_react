import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';
import { UserInputError } from 'apollo-server';
import { register, login } from '../schemas'; //for Joi validation
import { User } from '../models';
import { CircularProgress } from '@material-ui/core';

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth check, projection, pagination
      console.log(context.userId, context.email, context.isAuth);
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return User.findById(id);
    },
  },
  Mutation: {
    register: async (
      root,
      { firstname, lastname, email, password },
      context,
      info
    ) => {
      await register.validate({ firstname, lastname, email, password });

      //test if email is already in use
      const myuser = await User.find({ email });
      return myuser.length > 0
        ? console.log('User already exists')
        : User.create({ firstname, lastname, email, password });
    },
    login: async (root, { email, password }, context, info) => {
      await login.validate({ email, password });

      const user = await User.findOne({ email });
      if (!user) throw new Error('User does not exist!');

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new Error('Password is incorrect!');

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: 604800 } // seconds in 1 week
      );
      return { userId: user.id, token: token, tokenExpiration: 604800 };
    },
  },
};

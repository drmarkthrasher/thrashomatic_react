import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-core';
import { Liquor } from '../models';
import { addLiquor } from '../schemas';

export default {
  Query: {
    liquors: async (root, args, { userId, email, isAuth }, info) => {
      // if (!isAuth) throw new AuthenticationError('You must be logged in');
      try {
        return await Liquor.find({}).populate({
          path: 'owner',
          model: 'User',
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addLiquor: async (root, args, { userId, email, isAuth }, info) => {
      console.log('Add Resolver Executed');
      if (!isAuth) throw new AuthenticationError('You must be logged in');
      const index = args.index;
      const title = args.title;
      const isChecked = args.isChecked;
      const amount = args.amount;
      const isAvailable = args.isAvailable;
      const type = args.type;
      // for testing, can hard code owner as owner: '5f91d298b3e5c52d0734e9c7'
      return Liquor.create({
        index,
        title,
        isChecked,
        amount,
        isAvailable,
        type,
        owner: userId,
      });
    },
    editLiquor: async (root, args, { userId, emaill, isAuth }, info) => {
      console.log('Edit liquor resolver is executed');
      args.liquors.forEach(async function (liquor) {
        try {
          let liq = await Liquor.findOne({
            _id: liquor.id,
          });
          liq.index = liquor.index;
          liq.title = liquor.title;
          liq.isChecked = liquor.isChecked;
          liq.amount = liquor.amount;
          liq.isAvailable = liquor.isAvailable;
          liq.type = liquor.type;
          await liq.save();
        } catch (err) {
          console.log(err);
        }
      });
      console.log(args.liquors);
      // return array of liquors so apollo auto updates cache in client
      return await args.liquors;
    },
  },
};

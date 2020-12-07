import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-core';
import { Cocktail } from '../models';
import { addCocktail } from '../schemas';

export default {
  Query: {
    cocktails: async (root, args, { userId, email, isAuth }, info) => {
      // if (!isAuth) throw new AuthenticationError('You must be logged in');
      try {
        return await Cocktail.find({}).populate({
          path: 'owner',
          model: 'User',
        });
      } catch (err) {
        throw err;
      }
    },
    getCocktail: async (root, { id }, { userId, email, isAuth }, info) => {
      if (!isAuth) throw new AuthenticationError('You must be logged in');
      try {
        return await Cocktail.findOne({
          _id: id,
          owner: userId,
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addCocktail: async (root, args, { userId, email, isAuth }, info) => {
      console.log('Add Resolver Executed');
      if (!isAuth) throw new AuthenticationError('You must be logged in');
      const name = args.name;
      const otherIngredients = args.otherIngredients;
      const liquors = args.liquors;
      // for testing, can hard code owner as owner: '5f91d298b3e5c52d0734e9c7'
      return Cocktail.create({
        name,
        otherIngredients,
        liquors,
        owner: userId,
      });
    },
    deleteCocktail: async (root, { id }, { userId, email, isAuth }, info) => {
      console.log('Delete Resolver Executed');
      if (!isAuth) throw new AuthenticationError('You must be logged in');
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid distillery ID.`);
      }
      return await Cocktail.findByIdAndDelete({ owner: userId, _id: id });
    },
    editCocktail: async (
      root,
      { id, name, otherIngredients, liquors },
      { userId, email, isAuth },
      info
    ) => {
      console.log('Edit Resolver Executed');
      if (!isAuth) throw new AuthenticationError('You must be logged in');
      try {
        let cocktail = await Cocktail.findOne({
          _id: id,
          owner: userId,
        });
        cocktail.name = name;
        cocktail.otherIngredients = otherIngredients;
        cocktail.liquors = liquors;
        return await cocktail.save();
      } catch (err) {
        throw err;
      }
    },
  },
};

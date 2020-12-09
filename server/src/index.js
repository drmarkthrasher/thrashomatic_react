// require('dotenv').config();

// this is for using variables in .env file
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import getUser from './middleware/getuser.js';
// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');
// const typeDefs = require('./typeDefs');
// const resolvers = require('./resolvers');

//NOTE: I removed the config.js file.  These variables are now in .env
// This is for security reasons when pushed to github.
// import {
//   APP_PORT,
//   IN_PROD,
//   DB_USERNAME,
//   DB_PASSWORD,
//   DB_HOST,
//   DB_NAME,
// } from './config';

(async () => {
  try {
    console.log('Using MongoDB database ' + process.env.DB_NAME);
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const server = new ApolloServer({
      cors: true,
      typeDefs,
      resolvers,
      playground: true,
      context: ({ req, res }) => {
        const token = req.headers.authorization;
        const [userId, email, isAuth] = getUser(token);
        req.userId = userId;
        req.email = email;
        req.isAuth = isAuth;
        // console.log(req.body);
        // console.log(res);
        // console.log(token);
        return req;
      },
    });

    // Note: The endpoint for Apollo Server is always '/'.  It can't be changed.
    // Any path after the '/' will work and give the same result.

    server.listen({ port: process.env.APP_PORT }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
    // server.listen({ port: process.env.PORT }).then(({ url }) => {
    //   console.log(`Server ready at ${url}`);
    // });
  } catch (e) {
    console.error(e);
  }
})();

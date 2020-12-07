import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

//NOTE: I removed the config.js file.  These variables are now in .env
// import {
//   APP_PORT,
//   IN_PROD,
//   DB_USERNAME,
//   DB_PASSWORD,
//   DB_HOST,
//   DB_NAME,
// } from './config';

import getUser from './middleware/getuser';

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

import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { resolvers } from './resolvers';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();
require('./models/User');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true
});

const app = express();
server.applyMiddleware({ app });

let allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.SSL_FRONTEND_URL
];
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            'The CORS policy for this site does not allow access from the specified Origin.'
          ),
          false
        );
      }
      return callback(null, true);
    }
  })
);

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT });

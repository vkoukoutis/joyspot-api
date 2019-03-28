import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { resolvers } from './resolvers';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Api from './utils/Api';
import { User } from './models/User';
import { Product } from './models/Product';

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .catch(err => console.error(err));

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

let allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000',
  process.env.FRONTEND_URL,
  process.env.SSL_FRONTEND_URL,
  process.env.SSL_HEROKU_URL,
  process.env.HEROKU_URL
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

app.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }
  next();
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req, res }) => ({
    ...req,
    ...res,
    model: {
      User,
      Product
    },
    util: {
      Api
    }
  })
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT });

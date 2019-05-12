import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { resolvers } from './resolvers';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import loadDB from './utils/mongodb';
import Api from './utils/Api';
import { User } from './models/User';
import { Product } from './models/Product';

require('dotenv').config();

loadDB(process.env.MONGO_URI);

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

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
      Api: Api(process.env.API_LINK, process.env.API_KEY)
    }
  })
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

server.applyMiddleware({ app, cors: corsOptions });

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT });

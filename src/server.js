import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import { resolvers } from './resolvers';
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at port ${PORT}`)
);

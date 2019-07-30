const env = require('dotenv').config().parsed
const express = require('express')
const apollo = require('apollo-server-express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const helmet = require('helmet')
const axios = require('axios')
const mongoose = require('mongoose')

const graphqlImport = require('graphql-import')
const resolvers = require('require-all')({
  dirname: __dirname + '/graphql/resolvers',
  filter: /(.+)\.js$/,
  resolve: function(Resolver) {
    return new Resolver(env, jwt, bcrypt)
  }
})
const models = require('require-all')({
  dirname: __dirname + '/graphql/models',
  filter: /(.+)\.js$/,
  resolve: function(Model) {
    return new Model(mongoose)
  }
})
const schema = require('./graphql/graphqlSchema')(graphqlImport)

const middleware = require('./middleware')(cookieParser, jwt, helmet, env)
const services = require('./services')(axios, mongoose, env)
const graphql = require('./graphql')(
  env,
  apollo.ApolloServer,
  services.Api,
  resolvers,
  schema,
  models
)

const app = express()

middleware.applyMiddleware(app)
services.connectDatabase(env.MONGO_URI)
graphql.applyApollo(app)

const PORT = process.env.PORT || 4000
app.listen({ port: PORT })

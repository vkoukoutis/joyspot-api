import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './graphqlResolvers'
import schema from './graphqlSchema'
import Api from '../utils/api'
import { User } from '../graphql/user/User.model'

const applyApollo = app => {
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
  const server = ApolloConfig

  return server.applyMiddleware({ app, cors: corsOptions })
}

const ApolloConfig = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req, res }) => ({
    ...req,
    ...res,
    model: {
      User
    },
    util: {
      Api: Api(process.env.API_LINK, process.env.API_KEY)
    }
  })
})

export { applyApollo }

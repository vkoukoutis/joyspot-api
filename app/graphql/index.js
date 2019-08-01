module.exports = factory

function factory(ApolloServer, Api, resolvers, schema, models) {
  const exports = { applyApollo }

  function applyApollo(app) {
    const corsOptions = {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
    const server = ApolloConfig

    return server.applyMiddleware({ app, cors: corsOptions, path: '/api' })
  }

  function getResolvers() {
    const allResolvers = { Query: {}, Mutation: {} }

    Object.keys(resolvers).forEach(resolver => {
      allResolvers.Query = {
        ...allResolvers.Query,
        ...resolvers[resolver].Query
      }
      allResolvers.Mutation = {
        ...allResolvers.Mutation,
        ...resolvers[resolver].Mutation
      }
    })

    return allResolvers
  }

  function getModels() {
    const allModels = {}

    Object.keys(models).forEach(model => {
      allModels[model] = models[model]()
    })

    return allModels
  }

  const ApolloConfig = new ApolloServer({
    typeDefs: schema(),
    resolvers: getResolvers(),
    introspection: true,
    playground: process.env.NODE_ENV === 'development',
    context: ({ req, res }) => ({
      req,
      res,
      model: getModels(),
      util: {
        Api
      }
    })
  })

  return exports
}

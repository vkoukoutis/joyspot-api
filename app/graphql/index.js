module.exports = factory

function factory(env, ApolloServer, Api, resolvers, schema, models) {
  const exports = { applyApollo }

  function applyApollo(app) {
    const corsOptions = {
      origin: env.FRONTEND_URL,
      credentials: true
    }
    const server = ApolloConfig

    return server.applyMiddleware({ app, cors: corsOptions })
  }

  function getResolvers() {
    const allResolvers = { Query: {}, Mutation: {} }

    Object.keys(resolvers).forEach(resolver => {
      allResolvers.Query = { ...resolvers[resolver].Query }
      allResolvers.Mutation = { ...resolvers[resolver].Mutation }
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
    playground: true,
    context: ({ req, res }) => ({
      ...req,
      ...res,
      model: getModels(),
      util: {
        Api
      }
    })
  })

  return exports
}

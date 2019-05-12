import { UserQuery } from '../graphql/user/User.query'
import { UserMutations } from '../graphql/user/User.mutations'

export const resolvers = {
  Query: {
    ...UserQuery
  },
  Mutation: {
    ...UserMutations
  }
}

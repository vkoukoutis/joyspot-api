import { Query } from './Query';
import { User } from './Mutations/User';
import { Product } from './Mutations/Product';

export const resolvers = {
  Query,
  Mutation: {
    ...User,
    ...Product
  }
};

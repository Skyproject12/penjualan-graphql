import {GraphQLObjectType, GraphQLBoolean} from 'graphql';

export const SimpleResultType = new GraphQLObjectType({
  name: "SimpleResult",
  fields: () => ({
    isSuccess: { type: GraphQLBoolean}
  })
})
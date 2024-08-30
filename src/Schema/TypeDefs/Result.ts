import {GraphQLObjectType, GraphQLInt, GraphQLBoolean} from 'graphql';

export const ResultType = new GraphQLObjectType({
  name: "Result",
  fields: () => ({
    isSuccess: { type: GraphQLBoolean},
    id: { type: GraphQLInt},
  })
})
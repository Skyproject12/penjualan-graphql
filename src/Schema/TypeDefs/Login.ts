import {GraphQLObjectType, GraphQLBoolean, GraphQLString} from 'graphql';

export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    isSuccess: { type: GraphQLBoolean},
    accessToken: {type: GraphQLString}
  })
})
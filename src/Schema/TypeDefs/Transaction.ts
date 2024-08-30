import {GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLString} from 'graphql';

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    documentNumber: { type: GraphQLString},
    productCode: { type: GraphQLString},
    price: { type: GraphQLInt},
    quantity: { type: GraphQLString},
    unit: { type: GraphQLString},
    subTotal: { type: GraphQLInt},
    currency: { type: GraphQLString},
    documentCode: { type: GraphQLString},
    user: { type: GraphQLString},
  })
})
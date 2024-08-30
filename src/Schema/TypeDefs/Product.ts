import {GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLString} from 'graphql';

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    productCode: { type: GraphQLString},
    productName: { type: GraphQLString},
    price: { type: GraphQLInt},
    currency: { type: GraphQLString},
    discount: { type: GraphQLInt},
    dimention: { type: GraphQLString},
    unit: { type: GraphQLString},
  })
})
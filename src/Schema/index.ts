import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {GET_ALL_PRODUCT} from './Queries/Product';
import {GET_ALL_TRANSACTION} from './Queries/Transaction';
import {LOGIN_MEMBER} from './Mutations/Login';
import { TRANSACTION_PRODUCT } from "./Mutations/transaction";

/**
 * Ini Query
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    /**
     * Product
     */
    getAllProduct: GET_ALL_PRODUCT,
    /**
     * transaction
     */
    getAllTransaction: GET_ALL_TRANSACTION,
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /**
     * login
     */
    loginMember: LOGIN_MEMBER,
    /**
     * transaction
     */
    transactionProduct: TRANSACTION_PRODUCT
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
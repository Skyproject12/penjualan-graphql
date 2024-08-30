import { GraphQLList } from 'graphql';
import {ProductType} from '../TypeDefs/Product';
import { getManager }  from 'typeorm';
import SqlQuery from '../../Database/SqlQuery';
import {validationToken} from '../../Utils';
import { get } from 'lodash';

export const GET_ALL_PRODUCT = {
  type: new GraphQLList(ProductType),
  async resolve(parent: any, args: any, ctx: any) {
    validationToken(ctx)
    const entityManager = getManager();
    const product = await entityManager.query(SqlQuery.getAllProduct());

    return product;
  }
}


import { GraphQLList } from 'graphql';
import {TransactionType} from '../TypeDefs/Transaction';
import { getManager }  from 'typeorm';
import SqlQuery from '../../Database/SqlQuery';
import {validationToken} from '../../Utils';
import { get } from 'lodash';

export const GET_ALL_TRANSACTION = {
  type: new GraphQLList(TransactionType),
  async resolve(parent: any, args: any, ctx: any) {
    validationToken(ctx)
    const entityManager = getManager();
    const transaction = await entityManager.query(SqlQuery.getAllTransactionByUser(ctx.member.user));

    return transaction;
  }
}

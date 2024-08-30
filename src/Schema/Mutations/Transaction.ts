import { GraphQLInt, GraphQLString } from "graphql";
import { getManager }  from 'typeorm'; 
import SqlQuery from "../../Database/SqlQuery";
import jwt from 'jsonwebtoken';
import { SimpleResultType } from "../TypeDefs/SimpleResult";
import moment from "moment";

export const TRANSACTION_PRODUCT = {
  type: SimpleResultType,
  args: {
    productCode: {type: GraphQLString}
  },
  async resolve(parent: any, args: any, ctx: any) {
    if(!args.productCode) {
      throw new Error("Input tidak valid")
    } 
    console.log("ctx.member.user", ctx.member.user);
    
    const entityManager = getManager();
    const now = moment().format('YYYY-MM-DD');
    const [product] = await entityManager.query(SqlQuery.getProductByCode(args.productCode));
    const [transaction] = await entityManager.query(SqlQuery.getTransaction(ctx.member.user));
    let id = 0;

    if(transaction) {
      id = transaction.Document_Number;
      const priceNow = Number(transaction.Total) + Number(product.price);
      await entityManager.query(SqlQuery.updateTransactionHeader(priceNow, now, ctx.member.user));
    } else {
      const {insertId} = await entityManager.query(SqlQuery.createTransactionHeader('TRX', ctx.member.user, product.price, now));
      id = insertId;
    }
    
    const [transactionDetail] = await entityManager.query(SqlQuery.getTransactionDetail(id, product.productCode, ctx.member.user));
    if(transactionDetail) {
      await entityManager.query(SqlQuery.updateTransactionDetail(Number(transactionDetail.Quantity)+1, Number(transactionDetail.Sub_Total) + product.price , product.productCode, id));
    } else {
      await entityManager.query(SqlQuery.createTransactionDetail('TRX', id, product.productCode, product.price, 1, product.unit, product.price,  product.currency, ctx.member.user));
    }
    
    return {isSuccess: true} ;
  }
}

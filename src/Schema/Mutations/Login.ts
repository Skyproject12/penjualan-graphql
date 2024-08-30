import { GraphQLInt, GraphQLString } from "graphql";
import { getManager }  from 'typeorm'; 
import SqlQuery from "../../Database/SqlQuery";
import jwt from 'jsonwebtoken';
import { LoginType } from "../TypeDefs/Login";

export const LOGIN_MEMBER = {
  type: LoginType,
  args: {
    user: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  async resolve(parent: any, args: any) {
    if(!args.user || !args.password) {
      throw new Error("Input tidak valid")
    } 
    const entityManager = getManager();
    const product = await entityManager.query(SqlQuery.checkUserExists(args.user, args.password));
    console.log("dasdsads", product)

    if (product.length == 0) {
      throw new Error("Username atau password tidak valid")
    }
    const jwtPayload = {
      user: args.user,
      grant_type: 'access_token'
    };

    const privateKey = 'penjualan-login';
    const accessToken = jwt.sign(jwtPayload, privateKey, { expiresIn: "30d" });
    
    return {isSuccess: true, accessToken} ;
  }
}
